import ProjectCardPublic from "@/components/modules/Projects/ProjectCardPublic";
import PaginationControl from "@/components/shared/PaginationControl";
import { ProjectProps } from "@/types";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "All Project | Nusrat Jahan",
    description:
        "Browse all project of web development. Full stack, only frontend, only backend",
};

const LIMIT = 6;

const AllProjectsPage = async ({ searchParams }: { searchParams: Promise<{ page?: string }>; }) => {
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects?page=${currentPage}&limit=${LIMIT}`, {
        next: {
            tags: ["PROJECTS"],
        },
    });

    const result = await res.json();
    const { data: projects, meta } = result;

    const totalPages = meta?.totalPage || 1;

    return (
        <div className="bg-[#07102A] py-30">
            <div className="container mx-auto px-4 2xl:px-14">
                <h3 className="text-center text-4xl sm:text-5xl xl:text-[56px] xl:leading-[88px] tracking-[-2px] font-bold mb-4 text-white">Checkout
                    <span className="bg-gradient-to-r from-[#FFCFCC] via-[#FD705C] to-[#FF2056] bg-clip-text text-transparent"> My Projects</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-7">
                    {projects?.map((project: ProjectProps) => (
                        <ProjectCardPublic key={project._id} project={project} />
                    ))}
                </div>
                
                <PaginationControl totalPages={totalPages} currentPage={currentPage} />

            </div>
        </div>
    );
};

export default AllProjectsPage;