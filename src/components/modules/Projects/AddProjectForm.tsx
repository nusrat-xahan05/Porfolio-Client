"use client";

import dynamic from "next/dynamic";
import { useFieldArray, useForm } from "react-hook-form";
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
import { createProject } from "@/actions/project/createProject";
import { Plus, Trash2 } from "lucide-react";


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

    features: z.array(
        z.object({
            value: z.string().min(2, "Feature value is required"),
        })).min(2, "At least two feature is required"),

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


export default function AddProjectForm() {
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const [techInput, setTechInput] = useState("");

    const form = useForm<z.infer<typeof projectZodSchema>>({
        resolver: zodResolver(projectZodSchema),
        defaultValues: {
            title: "",
            description: "",
            features: [
                { value: "Features 1" },
                { value: "Features 2" },
            ],
            thumbnail: "",
            githubLink: "",
            liveSite: "",
            technologies: [],
        },
    });

    const { fields: includedFields, append: appendFeatures, remove: removeFeatures
    } = useFieldArray({
        control: form.control, name: "features",
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleTechBlur = (field: any) => {
        const normalizedTags = techInput
            .toString()
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);
        field.onChange(normalizedTags);
    };

    const onSubmit = async (values: z.infer<typeof projectZodSchema>) => {
        const formData = new FormData();

        formData.append("title", values.title);
        formData.append("description", values.description);
        values?.features?.forEach((feature) => formData.append("features", feature.value));
        formData.append("githubLink", values.githubLink);
        formData.append("liveSite", values.liveSite);
        formData.append("file", image as File);
        values?.technologies?.forEach((tag) => formData.append("technologies", tag));


        const toastId = toast.loading("Processing....");
        try {
            const response = await createProject(formData);

            if (response.success) {
                toast.success(response.message, { id: toastId });
                router.push("/dashboard/all-projects");
                form.reset();
                setImage(null);
            } else {
                toast.error(response.message, { id: toastId });
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Error caught in catch:", err);
            const message =
                err?.data?.message || err?.response?.data?.message || err?.message || "Something went wrong";
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

                    <div className="pt-6 sm:pt-1.5">
                        <div className="flex justify-between">
                            <FormLabel>Project Features</FormLabel>
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => appendFeatures({ value: "" })}>
                                <Plus />
                            </Button>
                        </div>

                        <div className="space-y-1.5">
                            {includedFields.map((item, index) => (
                                <div className="flex gap-2" key={item.id}>
                                    <FormField
                                        control={form.control}
                                        name={`features.${index}.value`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        onClick={() => removeFeatures(index)}
                                        variant="destructive"
                                        className="!bg-red-700"
                                        size="icon"
                                        type="button"
                                        disabled={includedFields.length === 2}
                                    >
                                        <Trash2 />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        {form.formState.errors.features?.message && (
                            <p className="text-sm font-medium text-red-600 mt-1">
                                {form.formState.errors.features.message as string}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-6">
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
                                            className="w-full"
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

                    <SingleImageUploader onChange={setImage}></SingleImageUploader>

                    {/* Technologies */}
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
                                        onBlur={() => handleTechBlur(field)}
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
