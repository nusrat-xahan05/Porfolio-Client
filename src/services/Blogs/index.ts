export const getBlogById = async (slug: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/${slug}`);
    const { data: blogs } = await res.json();
    return blogs;
};

