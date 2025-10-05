import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar/Navbar"
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Nusrat Jahan | Portfolio",
    description: "Explore blogs, projects and information",
};

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar></Navbar>
            <main className="min-h-screen">{children}</main>
            <Footer></Footer>
        </>
        // <div className="min-h-screen flex flex-col">
        //     <Navbar />
        //     <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
        //     <Footer />
        // </div>

    );
}
