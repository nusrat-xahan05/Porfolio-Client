"use client";

import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SingleImageUploader from "./SingleImageUploader";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { updateProjectBySlug } from "@/actions/project/updateProjectBySlug";
import Image from "next/image";


// Simple URL regex (matches most http/https URLs)
const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
const projectZodSchema = z.object({
    title: z.string({
        error: (issue) =>
            issue.input === undefined
                ? "Title is required"
                : "Title must be a string",
    }).min(5, { message: "Title must be at least 5 characters" }),

    description: z
        .string()
        .refine((val) => val.replace(/<(.|\n)*?>/g, "").trim().length > 10, {
            message: "Description must be at least 10 characters",
        }),

    thumbnail: z
        .string()
        .optional(),

    githubLink: z.string({
        error: (issue) =>
            issue.input === undefined
                ? "GitHub link is required"
                : "GitHub link must be a string",
    }).regex(urlRegex, { message: "GitHub link must be a valid URL" }),

    liveSite: z.string({
        error: (issue) =>
            issue.input === undefined
                ? "Live site link is required"
                : "Live site link must be a string",
    }).regex(urlRegex, { message: "Live site must be a valid URL" }),

    technologies: z
        .array(z.string().min(1, "Technologies cannot be empty"))
        .min(2, { message: "At least 2 techs are required" }),
});

interface UpdateProjectFormProps {
    project: {
        _id: string;
        title: string;
        description: string;
        githubLink: string;
        liveSite: string;
        thumbnail?: string;
        technologies?: string[];
    };
}

export default function UpdateProjectForm({ project }: UpdateProjectFormProps) {
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const [techInput, setTechInput] = useState(project.technologies?.join(",") || "");

    const form = useForm<z.infer<typeof projectZodSchema>>({
        resolver: zodResolver(projectZodSchema),
        defaultValues: {
            title: project.title || "",
            description: project.description || "",
            thumbnail: project.thumbnail || "",
            githubLink: project.githubLink || "",
            liveSite: project.liveSite || "",
            technologies: project.technologies || [],
        },
    });

    const onSubmit = async (values: z.infer<typeof projectZodSchema>) => {
        const formData = new FormData();

        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("githubLink", values.githubLink);
        formData.append("liveSite", values.liveSite);
        if (image) {
            formData.append("file", image as File);
        }
        values?.technologies?.forEach((tag) => formData.append("technologies", tag));


        const toastId = toast.loading("Processing....");
        try {
            const response = await updateProjectBySlug(project._id, formData);

            if (response.success) {
                toast.success(response.message, { id: toastId });
                router.push("/dashboard/all-projects");
            } else {
                toast.error(response.message, { id: toastId });
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Update project error:", err);
            const message =
                err?.data?.message ||
                err?.response?.data?.message ||
                err?.message ||
                "Something went wrong";
            toast.error(message, { id: toastId });
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                    {/* Title */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Type Project Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Description */}
                    <div className="mb-14">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <ReactQuill
                                            theme="snow"
                                            value={field.value || ""}
                                            onChange={(value) => field.onChange(value)}
                                            placeholder="Write your project description..."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="mt-6 flex flex-col gap-6">
                        <FormField
                            control={form.control}
                            name="githubLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#07102A] font-medium">
                                        Github Site URL
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="url"
                                            placeholder="e.g. https://github.com/nusrat-xahan05/my-project"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="liveSite"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#07102A] font-medium">
                                        Live Site URL
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="url"
                                            placeholder="e.g. https://myproject.vercel.app"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <p className="font-medium text-gray-700 mb-2">Thumbnail</p>
                        {project.thumbnail && !image && (
                            <div className="mb-3">
                                <Image
                                    src={project?.thumbnail}
                                    alt="Current Thumbnail"
                                    className="w-40 h-28 object-cover rounded-md shadow"
                                    width={100}
                                    height={100}
                                />
                            </div>
                        )}
                        <SingleImageUploader onChange={setImage} />
                    </div>

                    <FormField
                        control={form.control}
                        name="technologies"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Technologies (comma separated)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="e.g. react,nextjs,typescript"
                                        value={techInput}
                                        onChange={(e) => setTechInput(e.target.value)}
                                        onBlur={() =>
                                            field.onChange(
                                                techInput
                                                    .split(",")
                                                    .map((tag) => tag.trim())
                                                    .filter((tag) => tag !== "")
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit */}
                    <div className="flex items-center justify-center gap-3">
                        <Link href="/dashboard/all-projects">
                            <Button variant="outline" className="flex items-center gap-1 cursor-pointer">
                                <ArrowLeft className="w-4 h-4" /> Cancel
                            </Button>
                        </Link>

                        <Button
                            type="submit"
                            className="bg-green-600 text-white font-medium py-2 rounded-md hover:bg-green-700 transition">Update
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
