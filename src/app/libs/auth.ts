import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCollection } from "@/app/libs/mongodb";
const bcrypt = require("bcrypt");

const findUser = async (email: string, password: string) => {
    try {
        const col = await getCollection("users");
        const user = await col.findOne({ email: email.toLowerCase() });
        if (!user) return null;
        const match = await bcrypt.compare(password, user.password);
        if (!match) return null;
        return { id: user._id.toString(), email: user.email, username: user.username, role: user.role };
    } catch {
        return null;
    }
};

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/signin",
    },
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            id: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;
                const user = await findUser(credentials.email, credentials.password);
                if (!user) return null;
                return {
                    id: user.id,
                    email: user.email,
                    name: user.username,
                    randomKey: user.role,
                };
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.randomKey,
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as any;
                return { ...token, id: u.id, randomKey: u.randomKey };
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
