/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import Product from "@/models/Products";
import { authMiddleware } from "@/middleware/authMiddleware";

export async function GET(req: NextRequest) {
  await connect(); // Hubungkan ke database

  // Lakukan autentikasi dengan authMiddleware
  const authResponse = await authMiddleware(req);
  if (authResponse.status !== 200) {
    return authResponse; // Jika token tidak valid, kembalikan error
  }

  try {
    // Ambil semua produk tanpa filter berdasarkan userId dan populate field userId untuk mendapatkan nama user
    const products = await Product.find().populate("userId", "name");

    // Format data agar memiliki properti userName yang digunakan di frontend
    const formattedProducts = products.map((product: any) => ({
      _id: product._id,
      userName: product.userId?.name || "Unknown",
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Error fetching products" }, { status: 500 });
  }
}
