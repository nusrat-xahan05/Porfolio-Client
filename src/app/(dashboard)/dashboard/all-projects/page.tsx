import ProjectCardPrivate from "@/components/modules/Projects/ProjectCardPrivate";
import PaginationControl from "@/components/shared/PaginationControl";
import { ProjectProps } from "@/types";
import { PlusCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
    title: "All Project | Portfolio Project",
    description:
        "Browse all project of web development. Full stack, only frontend, only backend",
};

const LIMIT = 6;

const AllProjectsPageFromDashboard = async ({ searchParams }: { searchParams: Promise<{ page?: string }>; }) => {
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
        <div className="w-full bg-[rgba(255,207,204,0.5)] min-h-screen py-14">
            <div className="px-4">
                <div className="text-center mb-7">
                    <h3 className="text-center text-4xl sm:text-5xl xl:text-[56px] xl:leading-[88px] tracking-[-2px] font-bold text-[#07102A]">All
                        <span className="bg-gradient-to-r from-[#07102A] via-[#FD705C] to-[#FF2056] bg-clip-text text-transparent"> Projects</span>
                    </h3>
                    <p className="text-base font-medium text-[rgba(7,16,42,0.6)] italic">
                        Create, Read, Update & Delete Projects From here.
                    </p>
                </div>
                <div className="flex flex-wrap justify-end">
                    <div className="inline-block">
                        <Link
                            href="/dashboard/create-project"
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium bg-[#07102A] hover:bg-[#FD705C] text-white transition-colors duration-300">
                            <PlusCircle className="h-4 w-4" />Create Project
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10 mb-7">
                    {projects?.map((project: ProjectProps) => (
                        <ProjectCardPrivate key={project._id} project={project} />
                    ))}
                </div>

                <PaginationControl totalPages={totalPages} currentPage={currentPage} />
            </div>
        </div>
    );
};

export default AllProjectsPageFromDashboard;