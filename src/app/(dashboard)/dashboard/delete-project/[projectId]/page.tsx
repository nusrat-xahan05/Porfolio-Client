import DeleteProjectCard from "@/components/modules/Projects/DeleteProjectCard";
import { getProjectById } from "@/services/Projects";


const DeleteProjectPage = async ({ params }: { params: Promise<{ projectId: string }> }) => {
    const { projectId } = await params;
    const project = await getProjectById(projectId);

    return (
        <div className="max-w-[500px] mx-auto my-30 px-4">
            <div className="bg-red-50 border border-red-100 p-10 rounded-xl shadow-sm ">
                <div className="mb-7">
                    <h3 className='text-lg xl:text-3xl tracking-[-2px] font-bold text-gray-800'>{project?.title}</h3>
                    <p className="text-gray-600 text-base mt-3.5 mb-1.5">
                        Are you sure you want to delete?
                    </p>

                    <p className="text-sm italic text-gray-500">
                        ⚠️ This action cannot be undone.
                    </p>
                </div>

                <DeleteProjectCard slug={project?.slug} />
            </div>
        </div>
    );
};

export default DeleteProjectPage;
