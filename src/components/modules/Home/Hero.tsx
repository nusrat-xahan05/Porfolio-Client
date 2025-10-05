"use client"

import { ChevronsDown, Crown, Download } from 'lucide-react';
import Image from 'next/image';
import profileImage from '@/assets/images/nusrat.png';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaDiscord } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa6';
import { RiLinkedinFill } from 'react-icons/ri';
import { motion } from 'framer-motion';

const Hero = () => {
    const scrollToNextSection = () => {
        const section = document.getElementById('next-section');
        section?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="xl:pt-[70px] relative">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-x-8">
                    {/* Left / Content */}
                    <div className="flex flex-col justify-center text-center lg:text-left mx-auto lg:mx-0 pt-6">
                        <div className="w-fit flex gap-1.5 items-center px-4 py-2 rounded-lg bg-[#FFCFCC] bg-opacity-40 mb-1.5 mx-auto lg:mx-0">
                            <Crown className="size-5 fill-[#07102A] text-[#07102A]" />
                            <h5 className="text-sm font-semibold uppercase tracking-[2px] text-[#07102A]">
                                Hi I&apos;m Nusrat Jahan
                            </h5>
                        </div>
                        <h2 className="text-5xl sm:text-6xl xl:text-[72px] xl:leading-[88px] tracking-[-2px] font-bold bg-gradient-to-r from-[#FFCFCC] via-[#FD705C] to-[#FF2056] bg-clip-text text-transparent mb-4">
                            MernStack Developer
                        </h2>
                        <p className="text-gray-400 subtitle max-w-[600px] mx-auto lg:mx-0 text-justify">
                            I design and develop modern web applications that combine intuitive, responsive user interfaces with secure, scalable backend systems. With a strong focus on clean architecture and performance, I transform ideas into reliable digital solutions that enhance user experience and drive business growth.
                        </p>

                        <div className="flex flex-col md:flex-row gap-y-3 gap-x-3 mx-auto lg:mx-0 mb-12 mt-5 justify-center lg:justify-start">
                            <Link href="#" className="border-2 bg-[#FD705C] border-[#FD705C] rounded-[9px]">
                                <Button className="gap-x-2 bg-[#FD705C]">Resume <Download size={18} /></Button>
                            </Link>

                            <div className="flex items-center gap-x-2 justify-center lg:justify-start">
                                <Link href="#" className="p-[1.5px] rounded-[5px] bg-gradient-to-r from-[#f5ebeb] to-[#FD705C] inline-block">
                                    <div className="rounded-[5px] bg-[#07102A] p-2 flex items-center justify-center">
                                        <FaGithub className="size-[18px] fill-[#f5ebeb]" />
                                    </div>
                                </Link>
                                <Link href="#" className="p-[1.5px] rounded-[5px] bg-gradient-to-r from-[#f5ebeb] to-[#FD705C] inline-block">
                                    <div className="rounded-[5px] bg-[#07102A] p-2 flex items-center justify-center">
                                        <FaDiscord className="size-[18px] fill-[#f5ebeb]" />
                                    </div>
                                </Link>
                                <Link href="#" className="p-[1.5px] rounded-[5px] bg-gradient-to-r from-[#f5ebeb] to-[#FD705C] inline-block">
                                    <div className="rounded-[5px] bg-[#07102A] p-2 flex items-center justify-center">
                                        <RiLinkedinFill className="size-[18px] fill-[#f5ebeb]" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right / Image - only lg+ */}
                    <div className="hidden lg:flex relative justify-center">
                        <Image src={profileImage} alt="Profile-Image" className="rounded-lg" />
                    </div>
                </div>

                {/* Bounce Arrow */}
                <motion.div
                    className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 bottom-10 xl:bottom-8 py-3 px-1 rounded-3xl border-2 border-[#FD705C] cursor-pointer"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    onClick={scrollToNextSection}
                >
                    <ChevronsDown className="text-3xl text-[#FD705C]" />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
