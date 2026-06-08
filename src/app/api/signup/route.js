import { connect } from "@/utils/config/dbConfig";
import User from "@/utils/models/auth";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { rateLimit } from "@/app/libs/rateLimit";
import { isValidEmail } from "@/app/libs/validators";

export async function POST(req) {
  const limited = rateLimit(req, "signup", 5);
  if (limited) return limited;

  await connect();
  try {
    const { firstname, lastname, email, password, isGoogleUser } = await req.json();

    if (!isValidEmail(email)) {
      return NextResponse.json({ success: false, error: "Invalid email address" }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, error: "User already exists" }, { status: 400 });
    }

    let hashedPassword = undefined;
    if (!isGoogleUser && password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      isGoogleUser: isGoogleUser || false,
    });

    await newUser.save();
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
