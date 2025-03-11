// \auth.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../lib/jwt";

declare module "next/server" {
  export interface NextRequest {
    user?: { id: string; email: string };
  }
}

export async function authMiddleware(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1]; // Mengambil token dari header
  if (!token) {
    return NextResponse.json({ message: "Access denied" }, { status: 403 });
  }

  const decoded = verifyToken(token) as { id: string; email: string }; // Memverifikasi token
  if (!decoded) {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }

  // Menambahkan informasi user ke dalam request
  req.user = decoded;
  return NextResponse.next(); // Melanjutkan ke route berikutnya
}
