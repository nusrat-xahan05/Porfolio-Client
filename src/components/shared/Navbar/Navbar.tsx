"use client";

import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, } from "@/components/ui/navigation-menu"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import Logo from "@/assets/icons/Logo"
import { Menu } from "lucide-react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react";


export default function Navbar() {
  const { data: session } = useSession();

  // Navigation links array to be used in both desktop and mobile menus
  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "My Projects" },
    { href: "/blogs", label: "Blogs" },
    ...(session?.user?.role === "ADMIN" ? [{ href: "/dashboard", label: "Dashboard" }] : []),
  ]

  return (
    <header className="fixed top-0 left-0 w-full text-white z-50 bg-[#07102A]/90 backdrop-blur-md shadow-md">
      <div className="mx-auto max-w-7xl flex items-center justify-between py-5 px-4 md:px-6">
        {/* Left side */}
        <Link className="text-primary hover:text-primary/90" href="/"><Logo /></Link>

        {/* Right side */}
        <div className="flex items-center justify-end gap-6">
          {/* Main nav */}
          <NavigationMenu className="hidden lg:flex items-center">
            <NavigationMenuList className="gap-x-5">
              {navigationLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink asChild className="text-[17px] font-medium hover:bg-[#FFCFCC] hover:text-[#07102A] transition-colors duration-300">
                    <Link href={link.href}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {!session ? (
            <Button asChild className="bg-[#FD705C] text-[17px] border-2 border-[#FD705C] hover:bg-transparent hover:border-[#FFCFCC] transition-colors duration-300">
              <Link href="/login">Login</Link>
            </Button>
          ) : (
            <Button onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-[#FD705C] text-[17px] border-2 border-[#FD705C] hover:bg-transparent hover:border-[#FFCFCC] transition-colors duration-300">
              Logout
            </Button>
          )}

          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="group size-8 lg:hidden text-white" variant="ghost" size="icon">
                <Menu></Menu>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 lg:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="gap-2 grid">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink asChild className="text-[17px] font-medium hover:bg-[#FFCFCC] hover:text-[#07102A] transition-colors duration-300">
                        <Link href={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  )
}