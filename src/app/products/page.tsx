"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MainLayout from "@/components/MainLayout";
// import Hero from "@/components/hero";
import ProductGrid from "../../components/product-grid";
// import Articles from "@/components/articles";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) return null;

  return (
    <MainLayout>
      {/* <Hero /> */}
      <ProductGrid />
      {/* <Articles /> */}
    </MainLayout>
  );
}
