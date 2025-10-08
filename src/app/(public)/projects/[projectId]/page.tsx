import ProjectDetailsCard from "@/components/modules/Projects/ProjectDetailsCard";
import { getProjectById } from "@/services/Projects";
import { ProjectProps } from "@/types";

export const generateStaticParams = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`);
    const { data: projects } = await res.json();

    return projects?.map((projects: ProjectProps) => ({
        projectId: String(projects._id),
    }));
};

export const generateMetadata = async ({ params }: { params: Promise<{ projectId: string }> }) => {
    const { projectId } = await params;
    const project = await getProjectById(projectId);

    return {
        title: project?.title,
        description: project?.description,
    };
};

const ProjectDetailsPage = async ({ params }: { params: Promise<{ projectId: string }> }) => {
    const { projectId } = await params;
    const project = await getProjectById(projectId);

    return (
        <div className="bg-[#07102A] py-30 px-4">
            <div className="max-w-7xl mx-auto">
                <ProjectDetailsCard project={project} />
            </div>
        </div>
    );
};

export default ProjectDetailsPage;
