"use server";

import { getUserSession } from "@/helpers/getUserSession";
import { revalidatePath, revalidateTag } from "next/cache";

export const createProject = async (data: FormData) => {
    try {
        const session = await getUserSession();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/create-project`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
            },
            body: data,
        });

        const result = await res.json();
        console.log('create project action result: ', result);

        if (result?.success) {
            revalidateTag("PROJECTS");
            revalidatePath("/projects");
        }
        return {
            success: result?.success ?? false,
            message: result?.message ?? "Something went wrong",
        };
    } catch (error) {
        console.error("Create project error:", error);
        return { success: false, message: "Unexpected error while creating project." };
    }
};
