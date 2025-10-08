"use server";

import { getUserSession } from "@/helpers/getUserSession";
import { revalidatePath, revalidateTag } from "next/cache";

export const updateProjectBySlug = async (id: string, data: FormData) => {
    try {
        const session = await getUserSession();
        if (!session?.user?.accessToken) {
            return { success: false, message: "User not authenticated" };
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${session.user.accessToken}`,
            },
            body: data,
        });

        const result = await res.json();
        if (!res.ok) {
            return {
                success: false,
                message: result?.message || "Failed to update blog",
            };
        }

        revalidateTag("PROJECTS");
        revalidatePath("/projects");

        return {
            success: true,
            message: result?.message || "Project updated successfully",
        };
    } catch (error) {
        console.error("Update project error:", error);
        return { success: false, message: "Unexpected error while updating project." };
    }
};
