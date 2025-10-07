import BlogCardPrivate from "@/components/modules/Blogs/BlogCardPrivate";
import { BlogProps } from "@/types";
import { PlusCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
    title: "All Blogs | Portfolio Blog",
    description:
        "Browse all blog posts on web development, Next.js, React, and more. Stay updated with the latest tutorials and articles.",
};

const AllBlogsPageFromDashboard = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs`, {
        next: {
            tags: ["BLOGS"],
        },
    });
    const { data: blogs } = await res.json();

    return (
        <div className="w-full bg-[rgba(255,207,204,0.5)] min-h-screen py-14">
            <div className="px-4">
                <div className="text-center mb-7">
                    <h3 className="text-center text-4xl sm:text-5xl xl:text-[56px] xl:leading-[88px] tracking-[-2px] font-bold text-[#07102A]">Featured
                        <span className="bg-gradient-to-r from-[#07102A] via-[#FD705C] to-[#FF2056] bg-clip-text text-transparent"> Blogs</span>
                    </h3>
                    <p className="text-base font-medium text-[rgba(7,16,42,0.6)] italic">
                        Create, Read, Update & Delete Blogs From here.
                    </p>
                </div>
                <div className="flex flex-wrap justify-end">
                    <div className="inline-block">
                        <Link
                            href="/dashboard/create-blog"
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium bg-[#07102A] hover:bg-[#FD705C] text-white transition-colors duration-300">
                            <PlusCircle className="h-4 w-4" />Create Blog
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-7">
                    {blogs?.map((blog: BlogProps) => (
                        <BlogCardPrivate key={blog._id} blog={blog} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllBlogsPageFromDashboard;