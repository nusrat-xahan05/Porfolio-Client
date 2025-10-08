import ProjectCardPublic from "@/components/modules/Projects/ProjectCardPublic";
import { ProjectProps } from "@/types";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "All Project | Portfolio Project",
    description:
        "Browse all project of web development. Full stack, only frontend, only backend",
};

const AllProjectsPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`, {
        next: {
            tags: ["PROJECTS"],
        },
    });
    const { data: projects } = await res.json();

    return (
        <div className="bg-[#07102A] py-30 px-4">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-center text-4xl sm:text-5xl xl:text-[56px] xl:leading-[88px] tracking-[-2px] font-bold mb-4 text-white">Checkout
                    <span className="bg-gradient-to-r from-[#FFCFCC] via-[#FD705C] to-[#FF2056] bg-clip-text text-transparent"> My Projects</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-7">
                    {projects?.map((project: ProjectProps) => (
                        <ProjectCardPublic key={project._id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllProjectsPage;