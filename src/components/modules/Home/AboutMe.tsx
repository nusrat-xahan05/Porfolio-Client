import { Button } from "@/components/ui/button";
import { FaLaptopCode, FaLightbulb, FaUsers } from "react-icons/fa6";

const AboutMe = () => {
    return (
        <section className="py-28" id="next-section">
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
                        <Button className="p-[1.5px] rounded-[5px] bg-gradient-to-r from-[#f5ebeb] to-[#FD705C] inline-block">
                            <div className="rounded-[5px] bg-[#07102A] p-2 flex items-center justify-center">
                                Technical Skills
                            </div>
                        </Button>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex items-center text-left gap-7">
                            <div className="bg-[rgba(41,54,92,0.9)] p-3.5 rounded-full">
                                <FaLaptopCode className="text-[#FD705C] text-3xl" />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-300 mb-1">Passionate in Coding</h4>
                                <p className="text-gray-500 text-sm">
                                    Love solving complex problems with clean and efficient code.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center text-left gap-7">
                            <div className="bg-[rgba(41,54,92,0.9)] p-3.5 rounded-full">
                                <FaLightbulb className="text-[#FD705C] text-3xl" />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-300 mb-1">Creative Thinker</h4>
                                <p className="text-gray-500 text-sm">
                                    Continuously explore new technologies to innovate smarter solutions.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center text-left gap-7">
                            <div className="bg-[rgba(41,54,92,0.9)] p-3.5 rounded-full">
                                <FaUsers className="text-[#FD705C] text-3xl" />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-300 mb-1">Team Player</h4>
                                <p className="text-gray-500 text-sm">
                                    Collaborate effectively to deliver high-quality results on time.
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
