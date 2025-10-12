import UpdateInfoForm from "@/components/modules/UserInfo/UpdateInfoForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Blog | Portfolio Dashboard",
    description: "Create new blogs to share your insights on web development and tech.",
};

const UpdateUserInfoPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${process.env.ADMIN_EMAIL}`, {
        next: {
            tags: ["INFO"],
        },
    });
    const { data: userInfo } = await res.json();


    return (
        <div className="w-full bg-[rgba(255,207,204,0.5)] min-h-screen py-14 px-4">
            <div className="text-center mb-7">
                <h3 className="text-center text-4xl sm:text-5xl xl:text-[56px] xl:leading-[88px] tracking-[-2px] font-bold text-[#07102A]">Update
                    <span className="bg-gradient-to-r from-[#07102A] via-[#FD705C] to-[#FF2056] bg-clip-text text-transparent"> Information</span>
                </h3>
                <p className="text-base font-medium text-[rgba(7,16,42,0.6)] italic">
                    Fill To Update the Information
                </p>
            </div>
            <UpdateInfoForm userInfo={userInfo}></UpdateInfoForm>
        </div>
    );
};

export default UpdateUserInfoPage;