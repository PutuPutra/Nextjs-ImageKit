import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "../components/theme-provider";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 ">
        <Navbar />
        <main className="">
          {children}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
