import { NextRequest, NextResponse } from "next/server";
import { sendemaildata } from "../emailTemplate";
import { rateLimit } from "@/app/libs/rateLimit";

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, "contactform", 5);
  if (limited) return limited;

  const { name, email, phone, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ success: false, error: "Name, email and message are required" }, { status: 400 });
  }

  try {
    if (process.env.NEXT_AWS_ACCESS_KEY) {
      await sendemaildata(email, name, phone, message);
      return NextResponse.json({ success: true, message: "Your message has been sent successfully!" });
    }
    return NextResponse.json(
      { success: false, error: "Contact form not configured — email service is not set up in this environment" },
      { status: 503 }
    );
  } catch {
    return NextResponse.json({ success: false, error: "Email failed to send!" }, { status: 500 });
  }
}
