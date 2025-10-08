"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, PlusCircle, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function DashboardSidebar() {
    const session = useSession();

    return (
        <aside className="flex w-64 flex-col border-r bg-[#07102A] text-white">
            {/* Top navigation */}
            <nav className="flex-1 space-y-2 p-4">
                <Link
                    href="/"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#FD705C]">
                    <Home className="h-4 w-4" />Home
                </Link>

                <Link
                    href="/dashboard/all-blogs"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#FD705C]">
                    <PlusCircle className="h-4 w-4" />All Blogs
                </Link>

                <Link
                    href="/dashboard/all-projects"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#FD705C]">
                    <PlusCircle className="h-4 w-4" />All Projects
                </Link>
            </nav>

            {/* Bottom action */}
            <div className="p-4 border-t border-gray-500">
                {session.status === "authenticated" && (
                    <Button
                        variant="destructive"
                        className="w-full justify-start gap-2 cursor-pointer bg-[#FD705C]"
                        onClick={() => signOut({ callbackUrl: "/" })}
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Button>
                )}
            </div>
        </aside>
    );
}
