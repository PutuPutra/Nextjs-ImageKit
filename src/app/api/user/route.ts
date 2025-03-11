/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import Connect from "@/lib/mongodb"; // Sesuaikan dengan path yang diperlukan
import User from "@/models/User";
import { authMiddleware } from "@/middleware/authMiddleware"; // Pastikan middleware auth tersedia

// Endpoint untuk memeriksa user yang sedang login
export async function GET(req: NextRequest) {
  try {
    // Gunakan middleware untuk memastikan user terautentikasi
    const authResponse = await authMiddleware(req);
    if (authResponse.status !== 200) {
      return authResponse; // Jika tidak terautentikasi, kirimkan error
    }

    // Dapatkan informasi user dari request yang telah diupdate oleh middleware
    const user = (req as any).user;

    // Ambil data user dari database berdasarkan user.id
    await Connect();
    const userData = await User.findById(user.id).select("name email");

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Kembalikan data user beserta avatar default
    return NextResponse.json({
      ...userData.toObject(),
      avatar: "/img/user.png", // Ganti jika ada avatar yang spesifik
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
