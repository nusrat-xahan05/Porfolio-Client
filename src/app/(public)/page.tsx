import BlogCardPublic from "@/components/modules/Blogs/BlogCardPublic";
import AboutMe from "@/components/modules/Home/AboutMe";
import Hero from "@/components/modules/Home/Hero";
import { BlogProps } from "@/types";
import Link from "next/link";


export default async function HomePage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs`, {
        next: {
            tags: ["BLOGS"],
        },
    });
    const { data: blogs } = await res.json();

    return (
        <div className="bg-[#07102A]">
            <Hero></Hero>
            <AboutMe></AboutMe>

            {/* BLOGS */}
            <div className="max-w-7xl mx-auto px-4 pb-24 flex flex-col items-center">
                <h3 className="text-4xl sm:text-5xl xl:text-[56px] xl:leading-[88px] tracking-[-2px] font-bold mb-4 text-white">Featured
                    <span className="bg-gradient-to-r from-[#FFCFCC] via-[#FD705C] to-[#FF2056] bg-clip-text text-transparent"> Blogs</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-7">
                    {blogs?.slice(0, 3).map((blog: BlogProps) => (
                        <BlogCardPublic key={blog?._id} blog={blog} />
                    ))}
                </div>
                <Link href="/blogs" className="mt-2.5 p-[1.5px] rounded-[5px] bg-gradient-to-r from-[#f5ebeb] to-[#FD705C] inline-block">
                    <div className="bg-[#FD705C] hover:bg-[#07102A] text-white transition-colors duration-300 rounded-[5px] font-medium p-2 px-3.5">
                        See More
                    </div>
                </Link>
            </div>
        </div>
    );
}


