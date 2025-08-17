import dbConnect from "@/lib/dbConnect";
import User from "@/lib/model/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

  const { name, email, password, role } = await req.json();
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "All fields (name, email, password, role) are required" },
        { status: 400 }
      );
    }

    if (!["user", "admin", "intern"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role selected" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 400 }
      );
    }

    const newUser = await User.create({ name, email, password, role });
    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (err) {
    console.error("Register Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
