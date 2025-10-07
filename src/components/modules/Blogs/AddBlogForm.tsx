"use client";

import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import { useState } from "react";
import SingleImageUploader from "./SingleImageUploader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createBlog } from "@/actions/blog/createBlog";

const blogZodSchema = z.object({
    title: z
        .string()
        .min(5, { message: "Title must be at least 5 characters" }),
    content: z
        .string()
        .refine((val) => val.replace(/<(.|\n)*?>/g, "").trim().length > 20, {
            message: "Content is required",
        }),
    thumbnail: z
        .string()
        .optional(),
    tags: z
        .array(z.string().min(1, "Tags cannot be empty"))
        .min(2, { message: "At least 2 tags are required" }),
});

export default function AddBlogForm() {
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const [tagsInput, setTagsInput] = useState("");

    const form = useForm<z.infer<typeof blogZodSchema>>({
        resolver: zodResolver(blogZodSchema),
        defaultValues: {
            title: "",
            content: "",
            thumbnail: "",
            tags: [],
        },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleTagsBlur = (field: any) => {
        const normalizedTags = tagsInput
            .toString()
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);
        field.onChange(normalizedTags);
    };

    const onSubmit = async (values: z.infer<typeof blogZodSchema>) => {
        const formData = new FormData();

        formData.append("title", values.title);
        formData.append("content", values.content);
        formData.append("file", image as File);
        values?.tags?.forEach((tag) => formData.append("tags", tag));

        const toastId = toast.loading("Processing....");
        try {
            const response = await createBlog(formData);

            if (response.success) {
                toast.success(response.message, {id: toastId});
                router.push("/dashboard/all-blogs");
                form.reset();
                setImage(null);
            } else {
                toast.error(response.message, {id: toastId});
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Error caught in catch:", err);
            const message =
                err?.data?.message || err?.response?.data?.message || err?.message || "Something went wrong";
            toast.error(message, {id: toastId});
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
                                    <Input placeholder="Type Blog Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Content */}
                    <div className="mb-14">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <ReactQuill
                                            theme="snow"
                                            value={field.value || ""}
                                            onChange={(value) => field.onChange(value)}
                                            placeholder="Write your blog content..."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <SingleImageUploader onChange={setImage}></SingleImageUploader>

                    {/* Tags */}
                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tags (comma separated)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="e.g. react,nextjs,typescript"
                                        value={tagsInput}
                                        onChange={(e) => setTagsInput(e.target.value)}
                                        onBlur={() => handleTagsBlur(field)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="w-full bg-[#FD705C] text-white font-medium py-2 rounded-md hover:bg-[#07102A] transition-colors duration-300"
                    >
                        Create
                    </Button>
                </form>
            </Form>
        </div>
    );
}
