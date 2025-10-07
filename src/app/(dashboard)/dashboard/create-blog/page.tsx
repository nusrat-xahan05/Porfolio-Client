import AddBlogForm from "@/components/modules/Blogs/AddBlogForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Blog | Portfolio Dashboard",
  description: "Create new blogs to share your insights on web development and tech.",
};

const CreateBlogPage = () => {
    return (
        <div className="w-full bg-[rgba(255,207,204,0.5)] min-h-screen py-14">
            <div className="text-center mb-7">
                <h3 className="text-4xl font-bold text-[#07102A] mb-1.5">
                    Create Blog
                </h3>
                <p className="text-[14px] text-[rgba(7,16,42,0.6)] italic">
                    Fill All the Information To Create A Blog
                </p>
            </div>
            <AddBlogForm></AddBlogForm>
        </div>
    );
};

export default CreateBlogPage;