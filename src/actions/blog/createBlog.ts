"use server";

import { getUserSession } from "@/helpers/getUserSession";
import { revalidatePath, revalidateTag } from "next/cache";

export const createBlog = async (data: FormData) => {
    try {
        const session = await getUserSession();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/create-blog`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
            },
            body: data,
        });

        const result = await res.json();
        console.log('from server res: ', result);

        if (result?.success) {
            revalidateTag("BLOGS");
            revalidatePath("/blogs");
        }
        return {
            success: result?.success ?? false,
            message: result?.message ?? "Something went wrong",
        };
    } catch (error) {
        console.error("Create blog error:", error);
        return { success: false, message: "Unexpected error while creating blog." };
    }
};
