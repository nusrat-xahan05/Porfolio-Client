import { Metadata } from "next";
import { FaGraduationCap, FaEnvelope, FaGithub, FaDiscord } from "react-icons/fa6";
import { RiLinkedinFill } from "react-icons/ri";
import SkillsCard from "@/components/modules/UserInfo/SkillsCard";
import { IEducation } from "@/types";
import Link from "next/link";
import parse from "html-react-parser";

export const metadata: Metadata = {
    title: "About Me | Nusrat Jahan",
    description:
        "Learn more about Nusrat Jahan — Full Stack Developer with a CSE background, passionate about building scalable web applications.",
};

const AboutPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${process.env.ADMIN_EMAIL}`, {
        next: { tags: ["INFO"] },
    });
    const { data: userInfo } = await res.json();

    return (
        <div className="bg-[#07102A] py-30 min-h-screen text-white">
            <div className="container mx-auto px-4 2xl:px-14">
                {/* HEADER */}
                <section className="text-center mb-20">
                    <h3 className="text-4xl sm:text-5xl xl:text-[56px] xl:leading-[88px] tracking-[-2px] font-bold mb-4 text-white">
                        <span className="bg-gradient-to-r from-[#FFCFCC] via-[#FD705C] to-[#FF2056] bg-clip-text text-transparent italic">
                            {userInfo?.jobTitle}
                        </span>
                    </h3>


                    <div className="text-gray-300 max-w-3xl mx-auto mt-7 mb-5 leading-relaxed">
                        {userInfo?.description ? parse(userInfo.description) : null}
                    </div>


                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
                        <div className="flex items-center gap-2 bg-[#0E1A3A] px-4 py-2 rounded-lg text-sm text-gray-300">
                            <FaEnvelope className="text-[#FD705C]" /> {userInfo?.contactEmail}
                        </div>

                        <div className="flex items-center gap-x-3 justify-center lg:justify-start">
                            {userInfo?.githubLink && (
                                <Link
                                    href={userInfo.githubLink}
                                    target="_blank"
                                    className="p-[1.5px] rounded-[5px] bg-gradient-to-r from-[#f5ebeb] to-[#FD705C] inline-block"
                                >
                                    <div className="rounded-[5px] bg-[#07102A] p-2 flex items-center justify-center">
                                        <FaGithub className="size-[18px] fill-[#f5ebeb]" />
                                    </div>
                                </Link>
                            )}
                            {userInfo?.discordLink && (
                                <Link
                                    href={userInfo.discordLink}
                                    target="_blank"
                                    className="p-[1.5px] rounded-[5px] bg-gradient-to-r from-[#f5ebeb] to-[#FD705C] inline-block"
                                >
                                    <div className="rounded-[5px] bg-[#07102A] p-2 flex items-center justify-center">
                                        <FaDiscord className="size-[18px] fill-[#f5ebeb]" />
                                    </div>
                                </Link>
                            )}
                            {userInfo?.linkedinLink && (
                                <Link
                                    href={userInfo.linkedinLink}
                                    target="_blank"
                                    className="p-[1.5px] rounded-[5px] bg-gradient-to-r from-[#f5ebeb] to-[#FD705C] inline-block"
                                >
                                    <div className="rounded-[5px] bg-[#07102A] p-2 flex items-center justify-center">
                                        <RiLinkedinFill className="size-[18px] fill-[#f5ebeb]" />
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </section>

                {/* EDUCATION SECTION */}
                <section className="my-20 py-16 bg-[#0B1635] rounded-lg">
                    <h3 className="text-center text-3xl sm:text-4xl xl:text-[40px] tracking-[-2px] font-semibold mb-10 text-white">
                        Education{" "}
                        <span className="bg-gradient-to-r from-[#FFCFCC] via-[#FD705C] to-[#FF2056] bg-clip-text text-transparent">
                            Journey
                        </span>
                    </h3>

                    <div className="max-w-xl lg:max-w-3xl mx-auto space-y-6">
                        {userInfo?.education?.map((edu: IEducation, idx: number) => (
                            <div
                                key={idx}
                                className="flex items-start gap-4 bg-gradient-to-r from-[#0E1A3A] to-[#0C1533] p-5 rounded-xl border border-white/10 hover:border-[#FD705C]/30 transition"
                            >
                                <div className="bg-[#FD705C]/20 p-3 rounded-full">
                                    <FaGraduationCap className="text-[#FD705C] text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{edu.level}</h3>
                                    <p className="text-gray-400">{edu.institution}</p>
                                    <p className="text-gray-500 text-sm italic">
                                        {edu.startDate} - {edu.endDate}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SKILLS SECTION */}
                <section className="text-center">
                    <h3 className="text-center text-3xl sm:text-4xl xl:text-[40px] tracking-[-2px] font-semibold mb-10 text-white">
                        Technical{" "}
                        <span className="bg-gradient-to-r from-[#FFCFCC] via-[#FD705C] to-[#FF2056] bg-clip-text text-transparent">
                            Skills
                        </span>
                    </h3>

                    <div className="max-w-3xl xl:max-w-4xl mx-auto">
                        <SkillsCard userInfo={userInfo} />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutPage;
