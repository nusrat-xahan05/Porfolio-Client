import { BlogProps } from "@/types";
import Image from "next/image";
import parse from "html-react-parser";
import { ArrowRight, Calendar, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default async function BlogCardPublic({ blog }: { blog: BlogProps }) {
    return (
        <div className="block group transform hover:-translate-y-1 transition-transform duration-300">
            <div className="bg-[#0E1A3A] shadow-md rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">

                {/* BLOG THUMBNAIL */}
                {blog?.thumbnail ? (
                    <div className="relative h-56 w-full overflow-hidden">
                        <Image
                            src={blog?.thumbnail}
                            alt={blog?.title}
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
                    <h3 className="text-lg font-bold mb-2 text-[#FFCFCC]">{blog?.title}</h3>
                    <h5 className="text-sm text-[#B0B6C2] mb-6 line-clamp-1">{parse(blog?.content)}</h5>

                    <div className="flex justify-between text-[rgba(168,177,197,0.8)] text-xs mb-4">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-[#FD705C]" />
                            {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </span>
                        <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4 text-[#FD705C]" /> {blog?.viewCount} views
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {blog?.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="text-xs font-semibold text-[#FD705C] bg-[#FFCFCC1A] px-2 py-1 rounded"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <Link href={`/blogs/${blog.slug}`} className="w-full block">
                        <Button className="w-full bg-[#FD705C] hover:bg-[#07102A] text-white cursor-pointer transition-colors duration-300">
                            Details <ArrowRight size={18} />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};