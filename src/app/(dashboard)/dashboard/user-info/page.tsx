import SkillsCard from "@/components/modules/UserInfo/SkillsCard";
import { PlusCircle } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
    title: "All Skills | Portfolio Skills",
    description:
        "Browse all blog posts on web development, Next.js, React, and more. Stay updated with the latest tutorials and articles.",
};

const UserInfoPageFromDashboard = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${process.env.ADMIN_EMAIL}`, {
        next: {
            tags: ["INFO"],
        },
    });
    const { data: userInfo } = await res.json();


    return (
        <div className="w-full bg-[rgba(255,207,204,0.5)] min-h-screen py-14">
            <div className="px-4">
                <div className="text-center mb-7">
                    <h3 className="text-center text-4xl sm:text-5xl xl:text-[56px] xl:leading-[88px] tracking-[-2px] font-bold text-[#07102A]">About
                        <span className="bg-gradient-to-r from-[#07102A] via-[#FD705C] to-[#FF2056] bg-clip-text text-transparent"> Information</span>
                    </h3>
                    <p className="text-base font-medium text-[rgba(7,16,42,0.6)] italic">
                        View & Update Skills From here.
                    </p>
                </div>
                <div className="flex flex-wrap justify-end">
                    <div className="inline-block">
                        <Link
                            href="/dashboard/update-userInfo"
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium bg-[#07102A] hover:bg-[#FD705C] text-white transition-colors duration-300">
                            <PlusCircle className="h-4 w-4" />Add/Update Info
                        </Link>
                    </div>
                </div>

                <div className="mt-10 max-w-4xl p-8 mx-auto border-2 border-amber-300">
                    <SkillsCard userInfo={userInfo}></SkillsCard>
                </div>
            </div>
        </div >
    );
};

export default UserInfoPageFromDashboard;