"use server";

import { getUserSession } from "@/helpers/getUserSession";
import { revalidatePath, revalidateTag } from "next/cache";

export const updateInfoByEmail = async (data: FormData) => {
    for (const [key, value] of data.entries()) {
        console.log(`fff ${key}:`, value);
    }

    try {
        const session = await getUserSession();
        if (!session?.user?.accessToken) {
            return { success: false, message: "User not authenticated" };
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/${process.env.ADMIN_EMAIL}`, {
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
                message: result?.message || "Failed to update info",
            };
        }

        revalidateTag("INFO");
        revalidatePath("/dashboard/user-info");

        return {
            success: true,
            message: result?.message || "Info updated successfully",
        };
    } catch (error) {
        console.error("Update Info error:", error);
        return { success: false, message: "Unexpected error while updating Info." };
    }
};
