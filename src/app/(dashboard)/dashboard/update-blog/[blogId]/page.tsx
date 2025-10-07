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
        <div className="w-full bg-[rgba(255,207,204,0.5)] min-h-screen py-14">
            <div className="px-4">
                <div className="text-center mb-7">
                    <h3 className="text-center text-4xl sm:text-5xl xl:text-[56px] xl:leading-[88px] tracking-[-2px] font-bold text-[#07102A]">Update
                        <span className="bg-gradient-to-r from-[#07102A] via-[#FD705C] to-[#FF2056] bg-clip-text text-transparent"> Blogs</span>
                    </h3>
                    <p className="text-base font-medium text-[rgba(7,16,42,0.6)] italic">
                        Fill the Required Information To Update the Blog
                    </p>
                </div>
                <UpdateBlogForm blog={blog}></UpdateBlogForm>
            </div>
        </div>
    );
};

export default UpdateBlogPage;