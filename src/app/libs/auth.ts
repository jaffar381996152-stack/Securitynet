import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connect } from "@/utils/config/dbConfig";
import UserModel from "@/utils/models/auth";
const bcrypt = require("bcrypt");

// Mongoose's generated overloads for findOne/create don't resolve cleanly
// against this model's union type (mongoose.models.User || mongoose.model(...)).
const User = UserModel as any;

const userDisplayName = (user: any) => {
    const name = `${user.firstname || ""} ${user.lastname || ""}`.trim();
    return name || user.email;
};

const findUser = async (email: string, password: string) => {
    try {
        await connect();
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user || !user.password) return null;
        const match = await bcrypt.compare(password, user.password);
        if (!match) return null;
        return {
            id: user._id.toString(),
            email: user.email,
            name: userDisplayName(user),
            role: user.role || "user",
        };
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
                    name: user.name,
                    randomKey: user.role,
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        signIn: async ({ account, profile }) => {
            if (account?.provider === "google") {
                if (!profile?.email) return false;
                await connect();
                const email = profile.email.toLowerCase();
                let dbUser = await User.findOne({ email });
                if (!dbUser) {
                    const fullName = (profile as any).name || "";
                    const [firstname, ...rest] = fullName.split(" ").filter(Boolean);
                    dbUser = await User.create({
                        firstname: firstname || "Google",
                        lastname: rest.join(" ") || "User",
                        email,
                        isGoogleUser: true,
                    });
                }
            }
            return true;
        },
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    name: token.name,
                    role: token.randomKey,
                },
            };
        },
        jwt: async ({ token, user, account, profile }) => {
            if (account?.provider === "google" && profile?.email) {
                await connect();
                const dbUser = await User.findOne({ email: (profile.email as string).toLowerCase() });
                if (dbUser) {
                    return {
                        ...token,
                        id: dbUser._id.toString(),
                        name: userDisplayName(dbUser),
                        randomKey: dbUser.role || "user",
                    };
                }
            }
            if (user) {
                const u = user as any;
                return { ...token, id: u.id, name: u.name, randomKey: u.randomKey };
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
