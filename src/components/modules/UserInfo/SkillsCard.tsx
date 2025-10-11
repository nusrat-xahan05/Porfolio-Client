"use client";

import { motion } from "framer-motion";
import { UserProps } from "@/types";

export default function SkillsCard({ userInfo }: { userInfo: UserProps }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-[2px] rounded-2xl bg-gradient-to-r from-[#FFCFCC] via-[#FD705C] to-[#FF2056]"
        >
            <div className=" bg-[#07102A] rounded-2xl p-8 flex flex-wrap justify-center gap-4 sm:gap-6">
                {userInfo?.techSkills?.map((skill: string, idx: number) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.08, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="p-[2px] rounded-lg bg-gradient-to-r from-[#FFCFCC] via-[#FD705C] to-[#FF2056]"
                    >
                        <div className="bg-[#0E1A3A] rounded-lg px-6 py-3 text-white text-sm sm:text-base font-medium hover:text-[#FD705C] transition-colors duration-300">
                            {skill}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}