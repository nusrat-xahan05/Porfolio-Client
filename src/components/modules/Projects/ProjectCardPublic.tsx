import { ProjectProps } from "@/types";
import Image from "next/image";
import parse from "html-react-parser";
import { Expand, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";


export default async function ProjectCardPublic({ project }: { project: ProjectProps }) {
    return (
        <div className="block group transform hover:-translate-y-1 transition-transform duration-300">
            <div className="bg-[#0E1A3A] shadow-md rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">

                {/* BLOG THUMBNAIL */}
                {project?.thumbnail ? (
                    <div className="relative h-56 w-full overflow-hidden">
                        <Image
                            src={project?.thumbnail}
                            alt={project?.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ) : (
                    <div className="h-56 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
                        No Image
                    </div>
                )}

                {/* Content */}
                <div className="p-6">
                    <h5 className="text-sm text-[#B0B6C2] mb-6 line-clamp-1">{parse(project?.description)}</h5>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {project?.technologies.map((tag, idx) => (
                            <span
                                key={idx}
                                className="text-xs font-semibold text-[#FD705C] bg-[#FFCFCC1A] px-2 py-1 rounded"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="mt-3.5 flex items-center gap-1.5 flex-wrap">
                        <Link href={`${project.liveSite}`} className="p-[1.5px] rounded-[5px] bg-gradient-to-r from-[#f5ebeb] to-[#FD705C] inline-block hover:fill-[#FD705C] hover:text-[#FD705C] text-white fill-white transition-colors duration-300">
                            <div className="rounded-[5px] bg-[#07102A] p-2 flex items-center gap-1 justify-center">
                                <SquareArrowOutUpRight className="size-[16px]" />
                                <p className="text-sm">Live</p>
                            </div>
                        </Link>

                        <Link href={`${project.githubLink}`} className="p-[1.5px] rounded-[5px] bg-gradient-to-r from-[#f5ebeb] to-[#FD705C] inline-block hover:fill-[#FD705C] hover:text-[#FD705C] text-white fill-white transition-colors duration-300">
                            <div className="rounded-[5px] bg-[#07102A] p-2 flex items-center gap-1 justify-center">
                                <FaGithub className="size-[16px]" />
                                <p className="text-sm">Github</p>
                            </div>
                        </Link>

                        <Link href={`/projects/${project.slug}`} className="p-[1.5px] rounded-[5px] bg-gradient-to-r from-[#f5ebeb] to-[#FD705C] inline-block hover:fill-[#FD705C] hover:text-[#FD705C] text-white fill-white transition-colors duration-300">
                            <div className="rounded-[5px] bg-[#07102A] p-2 flex items-center gap-1 justify-center">
                                <Expand className="size-[16px]" />
                                <p className="text-sm">Details</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};