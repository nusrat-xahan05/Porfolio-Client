import { IEducation } from "@/types";
import { CalendarDays, Code, GraduationCap, Mail, PlusCircle, User, Briefcase, Link2 } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About Info | Portfolio Dashboard",
    description: "View and manage personal information, education, and skills.",
};

const UserInfoPageFromDashboard = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${process.env.ADMIN_EMAIL}`);
    const { data: userInfo } = await res.json();

    return (
        <div className="w-full bg-[rgba(255,207,204,0.5)] min-h-screen py-14">
            <div className="px-4">
                {/* HEADER TITLE */}
                <div className="text-center mb-7">
                    <h3 className="text-center text-4xl sm:text-5xl xl:text-[56px] xl:leading-[88px] tracking-[-2px] font-bold text-[#07102A]">
                        About
                        <span className="bg-gradient-to-r from-[#07102A] via-[#FD705C] to-[#FF2056] bg-clip-text text-transparent">
                            {" "}
                            Information
                        </span>
                    </h3>
                    <p className="text-base font-medium text-[rgba(7,16,42,0.6)] italic">
                        View & Update your complete profile information from here.
                    </p>
                </div>

                {/* UPDATE BUTTON */}
                <div className="max-w-4xl mx-auto flex flex-wrap justify-end">
                    <div className="inline-block">
                        <Link
                            href="/dashboard/update-userInfo"
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium bg-[#07102A] hover:bg-[#FD705C] text-white transition-colors duration-300"
                        >
                            <PlusCircle className="h-4 w-4" />
                            Add/Update Info
                        </Link>
                    </div>
                </div>

                {/* USER INFO CARD */}
                <div className="max-w-4xl mx-auto mt-10 bg-white/80 backdrop-blur-md border border-[rgba(253,111,92,0.65)] shadow-md rounded-2xl p-8 space-y-8">
                    {/* NAME + EMAIL + JOB */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-[#FD705C]/20 p-3 rounded-full">
                                <User className="text-[#FD705C] w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-[#07102A]">{userInfo?.name}</h2>
                                <div className="flex flex-wrap gap-3 items-center">
                                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                                        <Mail className="w-4 h-4 text-[#FD705C]" />
                                        <span>{userInfo?.contactEmail}</span>
                                    </div>
                                    <div className="font-semibold text-gray-600">|</div>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                                        <Briefcase className="w-4 h-4 text-[#FD705C]" />
                                        <span>{userInfo?.jobTitle}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-sm text-gray-500 italic">
                            <p>Created: {new Date(userInfo?.createdAt).toLocaleDateString()}</p>
                            <p>Updated: {new Date(userInfo?.updatedAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div
                        className="text-gray-700 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: userInfo?.description }}
                    />

                    {/* EDUCATION */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-[#07102A] flex items-center gap-2">
                            <GraduationCap className="text-[#FD705C]" />
                            Education
                        </h3>

                        <div className="grid gap-4">
                            {userInfo?.education?.length ? (
                                userInfo.education.map((edu: IEducation, idx: number) => (
                                    <div
                                        key={idx}
                                        className="border border-[rgba(253,111,92,0.65)] rounded-lg p-4 bg-[rgba(253,112,92,0.05)] hover:shadow-sm transition"
                                    >
                                        <h4 className="text-lg font-medium text-[#07102A]">{edu.level}</h4>
                                        <p className="text-gray-600 font-medium">{edu.institution}</p>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                            <CalendarDays className="w-4 h-4 text-[#FD705C]" />
                                            <span>
                                                {edu.startDate} - {edu.endDate}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic text-sm">No education info added yet.</p>
                            )}
                        </div>
                    </div>

                    {/* TECHNICAL SKILLS */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-[#07102A] flex items-center gap-2">
                            <Code className="text-[#FD705C]" />
                            Technical Skills
                        </h3>

                        <div className="border border-[rgba(253,111,92,0.65)] rounded-lg p-4 bg-[rgba(253,112,92,0.05)] hover:shadow-sm transition">
                            <div className="flex flex-wrap gap-2">
                                {userInfo?.techSkills?.length > 0 ? (
                                    userInfo.techSkills.map((skill: string, idx: number) => (
                                        <span
                                            key={idx}
                                            className="px-4 py-2 bg-[#FD705C]/10 border border-[#FD705C]/30 text-[#07102A] rounded-[5px] text-sm font-medium hover:bg-[#FD705C]/20 transition hover:text-[#FD705C]"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic text-sm">No technical skills added yet.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* SOCIAL LINKS */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-[#07102A] flex items-center gap-2">
                            <Link2 className="text-[#FD705C]" />
                            Social Links
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {userInfo?.githubLink && (
                                <Link
                                    href={userInfo.githubLink}
                                    target="_blank"
                                    className="px-4 py-2 bg-[#FD705C]/10 border border-[#FD705C]/30 text-[#07102A] rounded-[5px] text-sm font-medium hover:bg-[#FD705C]/20 transition hover:text-[#FD705C]"
                                >
                                    GitHub
                                </Link>
                            )}
                            {userInfo?.linkedinLink && (
                                <Link
                                    href={userInfo.linkedinLink}
                                    target="_blank"
                                    className="px-4 py-2 bg-[#FD705C]/10 border border-[#FD705C]/30 text-[#07102A] rounded-[5px] text-sm font-medium hover:bg-[#FD705C]/20 transition hover:text-[#FD705C]"
                                >
                                    LinkedIn
                                </Link>
                            )}
                            {userInfo?.discordLink && (
                                <Link
                                    href={userInfo.discordLink}
                                    target="_blank"
                                    className="px-4 py-2 bg-[#FD705C]/10 border border-[#FD705C]/30 text-[#07102A] rounded-[5px] text-sm font-medium hover:bg-[#FD705C]/20 transition hover:text-[#FD705C]"
                                >
                                    Discord
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfoPageFromDashboard;
