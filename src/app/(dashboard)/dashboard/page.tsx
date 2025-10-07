import { getUserSession } from '@/helpers/getUserSession';
import Image from 'next/image';
import profile from '@/assets/images/nusrat.png'

const DashboardHome = async () => {
    const quote = "Every line of code, every blog you write, every project you build—it all adds up to the story of your growth. Start small, keep building, and let the progress speak.";
    const session = await getUserSession();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[rgba(255,207,204,0.5)] p-6 w-full">
            <div className='rounded-full bg-[#FD705C] mb-3.5'>
                <Image
                    src={profile}
                    alt='Nusrat Jahan'
                    width={100}
                    height={100}
                    className="object-fit"
                />
            </div>
            <h3 className="text-4xl font-bold text-[#07102A] mb-1.5">
                Welcome, Nusrat Jahan!
            </h3>
            <p className="text-[14px] text-[rgba(7,16,42,0.6)] italic text-center mb-5">
                {session?.user?.email}
            </p>
            <p className="text-lg text-gray-600 italic text-center max-w-4xl">{quote}</p>
        </div>
    );
};

export default DashboardHome;