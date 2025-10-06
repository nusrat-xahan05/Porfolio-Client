import Image from "next/image";
import { BlogProps } from "@/types";
import parse from "html-react-parser";


export default async function BlogDetailsCard({ blog }: { blog: BlogProps }) {
  if (!blog) {
    return (
      <div className="py-20 text-center text-[#FFCFCC]">Blog not found.</div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto py-8">
      <h3 className='text-lg xl:text-4xl tracking-[-2px] font-bold text-[#FFCFCC] mb-6'>{blog?.title}</h3>
      <div className="flex items-center gap-4 mb-8">
        <Image
          src={
            "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
          }
          alt={"Nusrat Jahan"}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <p className="font-semibold text-white">Nusrat Jahan
            <span className="inline-block ml-1 text-blue-500">✔</span>
          </p>
          <p className="text-gray-500 text-sm">
            {new Date(blog?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })} • {blog.viewCount} views
          </p>
        </div>
      </div>

      {blog.thumbnail ? (
        <div className="relative h-80 w-full overflow-hidden">
          <Image
            src={blog?.thumbnail}
            alt={blog?.title}
            fill
            className="rounded-lg"
          />
        </div>
      ) : (
        <div className="h-80 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
          No Image
        </div>
      )}


      <article className="py-10 text-gray-200">
        {parse(blog.content)}
      </article>

      <div className="flex flex-wrap items-center gap-2">
        {blog?.tags.map((tag, idx) => (
          <span key={idx}
            className="mt-3.5 text-xs font-semibold text-[#FD705C] bg-[#FFEAEA] px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    </main>
  );
}
