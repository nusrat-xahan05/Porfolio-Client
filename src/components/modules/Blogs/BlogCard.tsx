// import Link from "next/link";
// import Image from "next/image";
// import { ArrowRight, Calendar, Eye } from "lucide-react";
// import { BlogProps } from "@/types";
// import parse from "html-react-parser";
// import { Button } from "@/components/ui/button";


// export default async function BlogCard({ blog }: { blog: BlogProps }) {

//   return (
//     <div className="block group transform hover:-translate-y-1 transition-transform duration-300">
//       <div className="bg-[#FFCFCC] shadow-md rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300">
//         {/* BLOG THUMBNAIL */}
//         {blog.thumbnail ? (
//           <div className="relative h-56 w-full overflow-hidden">
//             <Image
//               src={blog?.thumbnail}
//               alt={blog?.title}
//               fill
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//               className="object-cover group-hover:scale-105 transition-transform duration-300"
//             />
//           </div>
//         ) : (
//           <div className="h-56 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
//             No Image
//           </div>
//         )}

//         {/* Content */}
//         <div className="p-6">
//           <h3 className="text-lg font-bold mb-2 text-[rgba(7,16,42,0.9)]">{blog?.title}</h3>
//           <h5 className="text-sm text-[rgba(7,16,42,0.7)] mb-6 line-clamp-3">{parse(blog?.content)}</h5>

//           <div className="flex flex-wrap items-center justify-between text-[rgba(7,16,42,0.6)] text-sm gap-2 my-2.5">
//             <span className="flex items-center gap-1">
//               <Calendar className="w-4 h-4" />
//               {new Date(blog?.createdAt).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "short",
//                 day: "numeric",
//               })}
//             </span>
//             <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {blog?.viewCount} views</span>
//           </div>
//           <div className="inline-block w-full pt-1 bg-gradient-to-r from-[rgba(7,16,42,0.9)] via-[#FD705C] to-[#FFCFCC]">
//             <div className="bg-[#FFCFCC] w-full pt-1.5 flex flex-wrap items-center gap-2">
//               {blog?.tags.map((tag, idx) => (
//                 <span key={idx}
//                   className="mt-3.5 text-xs font-semibold text-[#FD705C] bg-[#FFEAEA] px-2 py-1 rounded">
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div className="mt-3.5 flex items-center justify-between gap-2 flex-wrap">
//             <Link className="" href={`/blogs/${blog.slug}`}>
//               <Button className='bg-[#07102A] cursor-pointer transition-colors duration-300'>Details <ArrowRight size={18} /></Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import Image from "next/image";
import Link from "next/link";
import { BlogProps } from "@/types";
import parse from "html-react-parser";

export default async function BlogCard({ blog }: { blog: BlogProps }) {
  if (!blog) {
    return (
      <div className="py-20 text-center text-[#FFCFCC] text-lg font-medium">
        Blog not found.
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto py-16 px-5 bg-[#07102A] text-white">
      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#FF2056] via-[#FD705C] to-[#FFCFCC] bg-clip-text text-transparent mb-6 text-center leading-tight">
        {blog?.title}
      </h1>

      {/* Author Info */}
      <div className="flex items-center justify-center gap-4 mb-10">
        <Image
          src="https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
          alt="Author"
          width={56}
          height={56}
          className="rounded-full border-2 border-[#FD705C]"
        />
        <div>
          <p className="font-semibold text-[#FFCFCC] text-lg">
            Nusrat Jahan
            <span className="inline-block ml-1 text-[#FD705C]">✔</span>
          </p>
          <p className="text-sm text-[#B0B6C2]">
            {new Date(blog?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            • {blog.viewCount} views
          </p>
        </div>
      </div>

      {/* Thumbnail */}
      {blog.thumbnail ? (
        <div className="relative w-full h-[420px] mb-12 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(253,112,92,0.25)]">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
            className="object-cover rounded-xl hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </div>
      ) : (
        <div className="h-[420px] w-full bg-[#0E1A3A] flex items-center justify-center text-[#B0B6C2] rounded-xl">
          No Image Available
        </div>
      )}

      {/* Blog Content */}
      <article className="prose prose-invert max-w-none leading-relaxed tracking-wide text-[#E7E9EF]">
        {parse(blog.content)}
      </article>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mt-10 pt-6 border-t border-[#FD705C]/30">
        {blog?.tags?.map((tag, idx) => (
          <span
            key={idx}
            className="text-sm font-medium text-[#FD705C] bg-[#FFCFCC1A] px-3 py-1.5 rounded-md tracking-wide hover:bg-[#FD705C1A] transition-colors duration-300"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Back to Blogs Button */}
      <div className="mt-12 text-center">
        <Link
          href="/blogs"
          className="inline-block bg-[#FD705C] text-[#07102A] font-semibold px-6 py-2.5 rounded-md hover:bg-[#FF836C] transition-all duration-300 shadow-[0_0_10px_rgba(253,112,92,0.3)]"
        >
          ← Back to Blogs
        </Link>
      </div>
    </main>
  );
}

