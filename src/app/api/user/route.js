import dbConnect from "@/lib/dbConnect";
import User from "@/lib/model/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const user = await User.findById(id);
      if (!user) {
        return NextResponse.json(
          { success: false, message: "User not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: user }, { status: 200 });
    }

    const users = await User.find({});
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (err) {
    console.error("Fetch User Error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
