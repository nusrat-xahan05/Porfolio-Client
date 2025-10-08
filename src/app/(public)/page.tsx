import BlogCardPublic from "@/components/modules/Blogs/BlogCardPublic";
import AboutMe from "@/components/modules/Home/AboutMe";
import Hero from "@/components/modules/Home/Hero";
import ProjectCardPublic from "@/components/modules/Projects/ProjectCardPublic";
import { BlogProps, ProjectProps } from "@/types";
import Link from "next/link";


export default async function HomePage() {
    let blogs: BlogProps[] = [];
    let projects: ProjectProps[] = [];

    try {
        const [blogsRes, projectsRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs`, {
                next: { tags: ["BLOGS"] },
            }),
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`, {
                next: { tags: ["PROJECTS"] },
            }),
        ]);

        const [blogsData, projectsData] = await Promise.all([
            blogsRes.json(),
            projectsRes.json(),
        ]);

        blogs = blogsData?.data || [];
        projects = projectsData?.data || [];
    } catch (error) {
        console.error("Error fetching data:", error);
    }


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

            {/* PROJECTS */}
            <div className="max-w-7xl mx-auto px-4 pb-24 flex flex-col items-center">
                <h3 className="text-4xl sm:text-5xl xl:text-[56px] xl:leading-[88px] tracking-[-2px] font-bold mb-4 text-white">Checkout
                    <span className="bg-gradient-to-r from-[#FFCFCC] via-[#FD705C] to-[#FF2056] bg-clip-text text-transparent"> My Projects</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-7">
                    {projects?.slice(0, 3).map((project: ProjectProps) => (
                        <ProjectCardPublic key={project?._id} project={project} />
                    ))}
                </div>
                <Link href="/projects" className="mt-2.5 p-[1.5px] rounded-[5px] bg-gradient-to-r from-[#f5ebeb] to-[#FD705C] inline-block">
                    <div className="bg-[#FD705C] hover:bg-[#07102A] text-white transition-colors duration-300 rounded-[5px] font-medium p-2 px-3.5">
                        See More
                    </div>
                </Link>
            </div>
        </div>
    );
}


