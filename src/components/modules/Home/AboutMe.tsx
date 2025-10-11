"use client"

import Link from "next/link";
import { FaLaptopCode, FaLightbulb, FaUsers } from "react-icons/fa6";

const AboutMe = () => {
    return (
        <section className="py-28" id="aboutMe">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-between">
                    {/* Left Side */}
                    <div className="space-y-6 py-4">
                        <div>
                            <h3 className="text-4xl sm:text-5xl xl:text-[56px] xl:leading-[88px] tracking-[-2px] font-bold mb-4 text-white">About
                                <span className="bg-gradient-to-r from-[#FFCFCC] via-[#FD705C] to-[#FF2056] bg-clip-text text-transparent"> Me</span>
                            </h3>
                            <p className="text-gray-400">
                                I am a Full Stack Developer with a CSE background, passionate about building scalable and modern web applications. I have hands-on experience in freelancing projects, delivering solutions that combine performance, security, and user-friendly design.
                            </p>
                        </div>
                        <Link href="/about" className="p-[1.5px] rounded-[5px] bg-gradient-to-r from-[#f5ebeb] to-[#FD705C] inline-block">
                            <div className="rounded-[5px] bg-[#07102A] text-white p-2 flex items-center justify-center">
                                <p className="px-3">See More</p>
                            </div>
                        </Link>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex items-center text-left gap-7">
                            <div className="bg-[#0E1A3A] p-3.5 rounded-full">
                                <FaLaptopCode className="text-[#FD705C] text-3xl" />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-300 mb-1">Frontend Development</h4>
                                <p className="text-gray-500 text-sm">
                                    Crafting engaging and responsive user interfaces to deliver seamless digital experiences across devices.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center text-left gap-7">
                            <div className="bg-[#0E1A3A] p-3.5 rounded-full">
                                <FaLightbulb className="text-[#FD705C] text-3xl" />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-300 mb-1">Backend Engineering</h4>
                                <p className="text-gray-500 text-sm">
                                    Design and implement robust, secure, and high-performance RESTful APIs to power efficient data-driven applications.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center text-left gap-7">
                            <div className="bg-[#0E1A3A] p-3.5 rounded-full">
                                <FaUsers className="text-[#FD705C] text-3xl" />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-300 mb-1">Continuous Learning</h4>
                                <p className="text-gray-500 text-sm">
                                    Constantly practice modern development technologies to stay ahead in the evolving tech landscape.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
