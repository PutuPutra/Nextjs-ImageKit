import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken, verifyToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  await connect();
  try {
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Generate token with user info
    const token = signToken({ id: user._id, email: user.email });

    // Return token and user info
    return NextResponse.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        avatar: "/img/user.png", // Default avatar, modify as needed
      },
    });
  } catch (error) {
    console.error("Error in login request:", error);
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    const decoded = verifyToken(token) as { id: string; email: string };
    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    const user = await User.findById(decoded.id);
    if (!user || user.email !== decoded.email) {
      return NextResponse.json({ message: "Invalid user" }, { status: 403 });
    }

    // Return the user info
    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        avatar: "/img/user.png", // Default avatar, modify as needed
      },
    });
  } catch (error) {
    console.error("Error in verifying user:", error);
    return NextResponse.json({ message: "Error verifying user" }, { status: 500 });
  }
}
