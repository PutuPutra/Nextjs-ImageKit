"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/buttons";
import { Input } from "@/components/ui/inputs";
import { useRouter, usePathname } from "next/navigation"; // Updated import

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Dapatkan current path

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  function logoutHandler() {
    localStorage.removeItem("jwt");
    router.push("/login");
  }

  const getActiveClasses = (path: string) =>
    pathname === path ? "text-gray-700 dark:text-white font-bold" : "";

  return (
    <header
      className={`w-full transition-all duration-300 ${
        isScrolled
          ? "fixed top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className={`text-gray-500 text-xl font-bold dark:text-gray-500 hover:text-black dark:hover:text-white ${getActiveClasses(
                "/"
              )}`}
            >
              Store
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/products"
                prefetch={false}
                className={`text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white ${getActiveClasses(
                  "/products"
                )}`}
              >
                Products
              </Link>
              <Link
                href="/categories"
                prefetch={false}
                className={`text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white ${getActiveClasses(
                  "/categories"
                )}`}
              >
                Categories
              </Link>
              <Link
                href="/admin/products"
                prefetch={false}
                className={`text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white ${getActiveClasses(
                  "/admin/products"
                )}`}
              >
                Dashboard
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block w-64">
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <Button onClick={logoutHandler} variant="outline" size="sm" className="hidden sm:flex">
              Logout
            </Button>
            <Button size="icon" variant="ghost" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-2 flex justify-between">
          <Link
            href="/products"
            className={`text-sm text-gray-700 dark:text-gray-300 ${getActiveClasses("/products")}`}
          >
            Products
          </Link>
          <Link
            href="/categories"
            className={`text-sm text-gray-700 dark:text-gray-300 ${getActiveClasses(
              "/categories"
            )}`}
          >
            Categories
          </Link>
          <Link
            href="/brands"
            className={`text-sm text-gray-700 dark:text-gray-300 ${getActiveClasses("/brands")}`}
          >
            Brands
          </Link>
          <button className="text-sm text-gray-700 dark:text-gray-300" title="Search">
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
