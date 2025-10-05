import Link from "next/link";
import faq from '@/assets/images/faq.jpg'
import Image from "next/image";
import { ArrowRight, Calendar, Eye, SquarePen, Trash2 } from "lucide-react";
import { BlogProps } from "@/types";
import parse from "html-react-parser";
import { getUserSession } from "@/helpers/getUserSession";
import { Button } from "@/components/ui/button";


export default async function BlogCard({ blog }: { blog: BlogProps }) {
  const session = await getUserSession();

  return (
    <div className="block group transform hover:-translate-y-1 transition-transform duration-300">
      <div className="bg-[#FFCFCC] shadow-md rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
        {/* BLOG THUMBNAIL */}
        {blog.thumbnail ? (
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={blog?.thumbnail || faq}
              alt={blog?.title}
              fill
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
          <h3 className="text-lg font-bold mb-2 text-[rgba(7,16,42,0.9)]">{blog?.title}</h3>
          <h5 className="text-sm text-[rgba(7,16,42,0.7)] mb-6 line-clamp-3">{parse(blog?.content)}</h5>

          <div className="flex flex-wrap items-center justify-between text-[rgba(7,16,42,0.6)] text-sm gap-2 my-2.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {blog?.viewCount} views</span>
          </div>
          <div className="inline-block w-full pt-1 bg-gradient-to-r from-[rgba(7,16,42,0.9)] via-[#FD705C] to-[#FFCFCC]">
            <div className="bg-[#FFCFCC] w-full pt-1.5 flex flex-wrap items-center gap-2">
              {blog?.tags.map((tag, idx) => (
                <span key={idx}
                  className="mt-3.5 text-xs font-semibold text-[#FD705C] bg-[#FFEAEA] px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3.5 flex items-center justify-between gap-2 flex-wrap">
            <Link className="" href={`/blogs/${blog.slug}`}>
              <Button className='bg-[#07102A] cursor-pointer transition-colors duration-300'>Details <ArrowRight size={18} /></Button>
            </Link>

            {session ? (
              <div className="py-4 flex items-center gap-2">
                <Link href={`/dashboard/update-blog/${blog.slug}`}><SquarePen size={20} /></Link>
                <Link href={`/dashboard/delete-blog/${blog.slug}`}><Trash2 size={20} /></Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
