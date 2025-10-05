import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Nusrat Jahan",
  description: "Full-stack developer portfolio and blog",
  keywords: ["portfolio", "full-stack", "next.js", "react", "developer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <AuthProvider>
          {children}
          <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
