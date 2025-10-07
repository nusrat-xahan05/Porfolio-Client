import DeleteBlogCard from "@/components/modules/Blogs/DeleteBlogCard";
import { getBlogById } from "@/services/Blogs";


export const generateMetadata = async ({ params }: { params: Promise<{ blogId: string }> }) => {
    const { blogId } = await params;
    const blog = await getBlogById(blogId);

    return {
        title: blog?.title,
        description: blog?.content,
    };
};

const DeleteBlogPage = async ({ params }: { params: Promise<{ blogId: string }> }) => {
    const { blogId } = await params;
    const blog = await getBlogById(blogId);

    return (
        <div className="w-[500px] mx-auto my-30">
            <div className="bg-red-50 border border-red-100 p-10 rounded-xl shadow-sm ">
                <div className="mb-7">
                    <h3 className='text-lg xl:text-3xl tracking-[-2px] font-bold text-gray-800'>{blog?.title}</h3>
                    <p className="text-gray-600 text-base mt-3.5 mb-1.5">
                        Are you sure you want to delete?
                    </p>

                    <p className="text-sm italic text-gray-500">
                        ⚠️ This action cannot be undone.
                    </p>
                </div>

                <DeleteBlogCard slug={blog?.slug} />
            </div>
        </div>
    );
};

export default DeleteBlogPage;
