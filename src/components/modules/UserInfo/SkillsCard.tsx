import { UserProps } from "@/types";



export default async function SkillsCard({ userInfo }: { userInfo: UserProps }) {
    return (
        <div className="flex flex-wrap items-center gap-4 justify-center">
            {
                userInfo?.techSkills.map((item: string, idx: number) => (
                    <div
                        key={idx}
                        className="p-[2px] rounded-[5px] bg-gradient-to-r from-[#f5ebeb] to-[#FD705C] inline-block hover:fill-[#FD705C] hover:text-[#FD705C] text-white fill-white transition-colors duration-300">
                        <div className="rounded-[5px] bg-[#07102A] p-3 flex items-center gap-1 justify-center">
                            <p className="text-sm px-2.5">{item}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};