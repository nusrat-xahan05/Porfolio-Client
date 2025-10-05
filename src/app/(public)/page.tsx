import AboutMe from "@/components/modules/Home/AboutMe";
import Hero from "@/components/modules/Home/Hero";


export default async function HomePage() {

    return (
        <div className="bg-[#07102A]">
            <Hero></Hero>
            <AboutMe></AboutMe>
        </div>
    );
}


