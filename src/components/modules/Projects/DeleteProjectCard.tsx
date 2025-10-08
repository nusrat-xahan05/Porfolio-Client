'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { deleteProjectBySlug } from "@/actions/project/deleteProjectBySlug";

interface DeleteProjectCardProps {
    slug: string;
}

export default function DeleteProjectCard({ slug }: DeleteProjectCardProps) {
    const router = useRouter();

    const handleDelete = async (slug: string) => {
        const toastId = toast.loading("Processing....");
        try {
            const res = await deleteProjectBySlug(slug)

            if (res.success) {
                toast.success(res.message, {id: toastId});
                router.push("/dashboard/all-projects");
            } else {
                toast.error(res.message ?? "Failed to Delete project");
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Error caught in catch:", err);
            toast.error("Something Went Wrong During Deleting", {id: toastId});
        }
    };

    return (
        <div className="">
            <div className="flex items-center gap-3">
                <Link href="/dashboard/all-projects">
                    <Button variant="outline" className="flex items-center gap-1 cursor-pointer">
                        <ArrowLeft className="w-4 h-4" /> Cancel
                    </Button>
                </Link>

                <Button
                    onClick={() => handleDelete(slug)}
                    className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2"
                ><Trash2 className="w-4 h-4" /> Delete
                </Button>
            </div>
        </div>
    );
}
