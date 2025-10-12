// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Home, PlusCircle, LogOut } from "lucide-react";
// import { signOut, useSession } from "next-auth/react";

// export default function DashboardSidebar() {
//     const session = useSession();

//     return (
//         <aside className="flex w-64 flex-col border-r bg-[#07102A] text-white">
//             {/* Top navigation */}
//             <nav className="flex-1 space-y-2 p-4">
//                 <Link
//                     href="/"
//                     className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#FD705C]">
//                     <Home className="h-4 w-4" />Home
//                 </Link>

//                 <Link
//                     href="/dashboard/all-blogs"
//                     className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#FD705C]">
//                     <PlusCircle className="h-4 w-4" />All Blogs
//                 </Link>

//                 <Link
//                     href="/dashboard/all-projects"
//                     className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#FD705C]">
//                     <PlusCircle className="h-4 w-4" />All Projects
//                 </Link>

//                 <Link
//                     href="/dashboard/user-info"
//                     className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#FD705C]">
//                     <PlusCircle className="h-4 w-4" />User Info
//                 </Link>
//             </nav>

//             {/* Bottom action */}
//             <div className="p-4 border-t border-gray-500">
//                 {session.status === "authenticated" && (
//                     <Button
//                         variant="destructive"
//                         className="w-full justify-start gap-2 cursor-pointer bg-[#FD705C]"
//                         onClick={() => signOut({ callbackUrl: "/" })}
//                     >
//                         <LogOut className="h-4 w-4" />
//                         Logout
//                     </Button>
//                 )}
//             </div>
//         </aside>
//     );
// }

"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, PlusCircle, LogOut, Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, } from "@/components/ui/sheet";

export default function DashboardSidebar() {
    const session = useSession();
    const [open, setOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home", icon: Home },
        { href: "/dashboard/all-blogs", label: "All Blogs", icon: PlusCircle },
        { href: "/dashboard/all-projects", label: "All Projects", icon: PlusCircle },
        { href: "/dashboard/user-info", label: "User Info", icon: PlusCircle },
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 flex-col border-r bg-[#07102A] text-white">
                <nav className="flex-1 space-y-2 p-4">
                    {navLinks.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#FD705C] transition-colors"
                        >
                            <Icon className="h-4 w-4" />
                            {label}
                        </Link>
                    ))}
                </nav>

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

            {/* Mobile Menu Button */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="bg-[#07102A] border-[#FD705C] text-white hover:bg-[#FD705C]"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-[#07102A] text-white p-0">
                        <SheetHeader className="border-b border-[#FD705C]/30 p-4">
                            <SheetTitle className="text-[#FD705C] text-lg font-semibold">
                                Dashboard Menu
                            </SheetTitle>
                        </SheetHeader>
                        <nav className="flex flex-col gap-2 p-4">
                            {navLinks.map(({ href, label, icon: Icon }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#FD705C] transition-colors"
                                >
                                    <Icon className="h-4 w-4" />
                                    {label}
                                </Link>
                            ))}
                        </nav>

                        {session.status === "authenticated" && (
                            <div className="p-4 border-t border-gray-500">
                                <Button
                                    variant="destructive"
                                    className="w-full justify-start gap-2 cursor-pointer bg-[#FD705C]"
                                    onClick={() => {
                                        setOpen(false);
                                        signOut({ callbackUrl: "/" });
                                    }}
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </Button>
                            </div>
                        )}
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}
