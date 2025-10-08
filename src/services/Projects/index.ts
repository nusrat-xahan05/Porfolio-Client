export const getProjectById = async (slug: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${slug}`);
    const { data: projects } = await res.json();
    return projects;
};

