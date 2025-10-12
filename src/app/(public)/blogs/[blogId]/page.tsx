
import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";
import { getBlogById } from "@/services/Blogs";
import { BlogProps } from "@/types";


export const generateStaticParams = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs`, {
        next: { revalidate: 60 },
    });
    const { data: blogs } = await res.json();

    return blogs?.map((blog: BlogProps) => ({
        blogId: String(blog._id),
    }));
};

export const revalidate = 120;

export const generateMetadata = async ({ params }: { params: Promise<{ blogId: string }> }) => {
    const { blogId } = await params;
    const blog = await getBlogById(blogId);

    return {
        title: blog?.title || "Blog Details",
        description: blog?.content,
    };
};


const BlogDetailsPage = async ({ params }: { params: Promise<{ blogId: string }> }) => {
    const { blogId } = await params;
    const blog = await getBlogById(blogId);

    return (
        <div className="bg-[#07102A] py-30 px-4">
            <div className="max-w-7xl mx-auto">
                <BlogDetailsCard blog={blog} />
            </div>
        </div>
    );
};

export default BlogDetailsPage;



