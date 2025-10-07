"use server";

import { getUserSession } from "@/helpers/getUserSession";
import { revalidatePath, revalidateTag } from "next/cache";

export async function deleteBlogBySlug(slug: string) {
  try {
    const session = await getUserSession();
    if (!session?.user?.accessToken) {
      return { success: false, message: "User not authenticated" };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/${slug}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    const result = await res.json();

    if (result?.success) {
      revalidateTag("BLOGS");
      revalidatePath("/blogs");
    }

    return {
      success: result?.success ?? false,
      message: result?.message ?? "Something went wrong",
    };
  } catch (error) {
    console.error("Delete blog error:", error);
    return { success: false, message: "Unexpected error while deleting blog." };
  }
}
