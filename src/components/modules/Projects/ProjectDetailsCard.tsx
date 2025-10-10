import Image from "next/image";
import { ProjectProps } from "@/types";
import parse from "html-react-parser";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { SquareArrowOutUpRight } from "lucide-react";

export default async function ProjectDetailsCard({ project }: { project: ProjectProps }) {
  if (!project) {
    return (
      <div className="py-20 text-center text-[#FFCFCC]">Project not found.</div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto py-16 px-6 bg-[#07102A] text-white">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FF2056] via-[#FD705C] to-[#FFCFCC] bg-clip-text text-transparent mb-6 leading-tight">
        {project?.title}
      </h1>

      {/* Author */}
      <div className="flex items-center gap-4 mb-10">
        <Image
          src="https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
          alt="Author"
          width={56}
          height={56}
          className="rounded-full"
        />
        <div>
          <p className="font-semibold text-white text-lg">
            Nusrat Jahan <span className="inline-block ml-1 text-blue-500">✔</span>
          </p>
        </div>
      </div>

      {/* Thumbnail */}
      {project?.thumbnail ? (
        <div className="relative h-96 w-full mb-12 rounded-xl overflow-hidden shadow-md">
          <Image
            src={project?.thumbnail}
            alt={project?.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
            className="object-cover rounded-lg"
          />
        </div>
      ) : (
        <div className="h-96 w-full bg-[#0E1A3A] flex items-center justify-center text-[#B0B6C2] rounded-lg">
          No Image
        </div>
      )}

      {/* Description */}
      <article className="prose prose-invert max-w-none text-[#E7E9EF] py-6">
        {parse(project.description)}
      </article>

      <div>
        <h3 className="text-base font-semibold mb-3">Features: </h3>
        <ul className="space-y-1">
          {project?.features?.map((item, index) => (
            <li key={index} className="flex items-center">
              <span className="text-[#FD705C] mr-2">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mt-10 pt-6 border-t border-[#FD705C]/30">
        {project?.technologies?.map((tag, idx) => (
          <span key={idx} className="text-sm font-medium text-[#FD705C] bg-[#FFCFCC1A] px-3 py-1.5 rounded-md tracking-wide hover:bg-[#FD705C1A] transition-colors duration-300">
            {tag}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-12 flex-wrap">
        {project?.liveSite && (
          <Link href={project.liveSite} target="_blank" rel="noopener noreferrer"
            className="p-[1.5px] rounded-[5px] bg-gradient-to-r from-[#f5ebeb] to-[#FD705C] inline-block text-white hover:text-[#FD705C] transition">
            <div className="rounded-[5px] bg-[#07102A] px-4 py-2 flex items-center gap-2 justify-center">
              <SquareArrowOutUpRight className="size-[16px]" />
              <span className="text-sm font-medium">Live Site</span>
            </div>
          </Link>
        )}

        {project?.githubLink && (
          <Link href={project.githubLink} target="_blank" rel="noopener noreferrer"
            className="p-[1.5px] rounded-[5px] bg-gradient-to-r from-[#f5ebeb] to-[#FD705C] inline-block text-white hover:text-[#FD705C] transition">
            <div className="rounded-[5px] bg-[#07102A] px-4 py-2 flex items-center gap-2 justify-center">
              <FaGithub className="size-[16px]" />
              <span className="text-sm font-medium">GitHub</span>
            </div>
          </Link>
        )}
      </div>

      {/* Back Link */}
      <div className="mt-14 text-center">
        <Link
          href="/projects"
          className="inline-block bg-[#FD705C] text-white font-semibold px-6 py-2.5 rounded-md hover:bg-[#07102A] transition-all duration-300 shadow-[0_0_10px_rgba(253,112,92,0.3)]"
        >
          ← Back to Projects
        </Link>
      </div>
    </main>
  );
}
