import BlogCardPublic from "@/components/modules/Blogs/BlogCardPublic";
import AboutMe from "@/components/modules/Home/AboutMe";
import ContactForm from "@/components/modules/Home/ContactForm";
import Hero from "@/components/modules/Home/Hero";
import ProjectCardPublic from "@/components/modules/Projects/ProjectCardPublic";
import SkillsCard from "@/components/modules/UserInfo/SkillsCard";
import { BlogProps, ProjectProps, UserProps } from "@/types";
import Link from "next/link";


export default async function HomePage() {
    let blogs: BlogProps[] = [];
    let projects: ProjectProps[] = [];
    let userInfo: UserProps | null = null;

    try {
        const [blogsRes, projectsRes, userInfoRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs`, {
                next: { tags: ["BLOGS"] },
            }),
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`, {
                next: { tags: ["PROJECTS"] },
            }),
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${process.env.ADMIN_EMAIL}`),
        ]);

        const [blogsData, projectsData, userInfoData] = await Promise.all([
            blogsRes.json(),
            projectsRes.json(),
            userInfoRes.json(),
        ]);

        blogs = blogsData?.data || [];
        projects = projectsData?.data || [];
        userInfo = userInfoData?.data || null;
    } catch (error) {
        console.error("Error fetching data:", error);
    }


    return (
        <div className="bg-[#07102A]">

            {/* BANNER/HERO SECTION */}
            {userInfo ? (
                <Hero userInfo={userInfo}></Hero>
            ) : (
                <p className="text-white italic text-center">Loading Banner...</p>
            )}

            {/* ABOUT ME SECTION */}
            <AboutMe></AboutMe>

            {/* TECHNICAL SKILLS */}
            <div className="container mx-auto px-4 2xl:px-14 pb-24 flex flex-col items-center">
                <h3 className="text-4xl sm:text-5xl xl:text-[56px] xl:leading-[88px] tracking-[-2px] font-bold mb-4 text-white">Technical
                    <span className="bg-gradient-to-r from-[#FFCFCC] via-[#FD705C] to-[#FF2056] bg-clip-text text-transparent"> Skills</span>
                </h3>
                <div className="mt-7 mb-7 max-w-3xl xl:max-w-4xl mx-auto w-full">
                    {userInfo ? (
                        <SkillsCard userInfo={userInfo} />
                    ) : (
                        <p className="text-white italic text-center">Loading skills...</p>
                    )}
                </div>
            </div>

            {/* PROJECTS */}
            <div className="container mx-auto px-4 2xl:px-14 pb-24 flex flex-col items-center">
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

            {/* BLOGS */}
            <div className="container mx-auto px-4 2xl:px-14 pb-24 flex flex-col items-center">
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

            {/* Contact Form */}
            <ContactForm></ContactForm>

        </div>
    );
}


