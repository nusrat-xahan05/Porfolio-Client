import BlogCardPublic from "@/components/modules/Blogs/BlogCardPublic";
import { BlogProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Blogs | Portfolio Blog",
  description:
    "Browse all blog posts on web development, Next.js, React, and more. Stay updated with the latest tutorials and articles.",
};

const AllBlogsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs`, {
    next: {
      tags: ["BLOGS"],
    },
  });
  const { data: blogs } = await res.json();

  return (
    <div className="bg-[#07102A] py-30">
      <div className="container mx-auto px-4 2xl:px-14">
        <h3 className="text-center text-4xl sm:text-5xl xl:text-[56px] xl:leading-[88px] tracking-[-2px] font-bold mb-4 text-white">Featured
          <span className="bg-gradient-to-r from-[#FFCFCC] via-[#FD705C] to-[#FF2056] bg-clip-text text-transparent"> Blogs</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-7">
          {blogs?.map((blog: BlogProps) => (
            <BlogCardPublic key={blog?._id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBlogsPage;
