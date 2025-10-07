import UpdateBlogForm from "@/components/modules/Blogs/UpdateBlogForm";
import { getBlogById } from "@/services/Blogs";


export const generateMetadata = async ({ params }: { params: Promise<{ blogId: string }> }) => {
    const { blogId } = await params;
    const blog = await getBlogById(blogId);

    return {
        title: blog?.title,
        description: blog?.content,
    };
};

const UpdateBlogPage = async ({ params }: { params: Promise<{ blogId: string }> }) => {
    const { blogId } = await params;
    const blog = await getBlogById(blogId);

    return (
        <div className="w-full bg-[rgba(255,207,204,0.5)] py-14">
            <div className="text-center mb-7">
                <h3 className="text-4xl font-bold text-[#07102A] mb-1.5">
                    Update Blog
                </h3>
                <p className="text-[14px] text-[rgba(7,16,42,0.6)] italic">
                    Fill the Required Information To Update the Blog
                </p>
            </div>
            <UpdateBlogForm blog={blog}></UpdateBlogForm>
        </div>
    );
};

export default UpdateBlogPage;