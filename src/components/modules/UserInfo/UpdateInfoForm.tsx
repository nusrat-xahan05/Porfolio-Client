"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { updateInfoByEmail } from "@/actions/userInfo/updateInfoByEmail";



const updateUserInfoZodSchema = z.object({
    name: z.string({
        error: (issue) =>
            issue.input === undefined
                ? "Name is required"
                : "Name must be a string",
    }).min(3, { message: "Name must be at least 3 characters" }),

    techSkills: z.array(
        z.object({
            value: z.string().min(2, "Skills is required"),
        })).min(2, "At least two skills is required")
});


interface UpdateUserInfoFormProps {
    userInfo: {
        name?: string;
        email: string;
        role: string;
        isVerified?: boolean;

        techSkills?: string[];
    };
}


export default function UpdateInfoForm({ userInfo }: UpdateUserInfoFormProps) {
    const router = useRouter();

    const form = useForm<z.infer<typeof updateUserInfoZodSchema>>({
        resolver: zodResolver(updateUserInfoZodSchema),
        defaultValues: {
            name: userInfo.name || "",
            techSkills: userInfo.techSkills?.map((item) => ({ value: item })) || [
                { value: "" },
            ],
            // description: project.description || "",
            // githubLink: project.githubLink || "",
            // liveSite: project.liveSite || "",
            // techSkills: userInfo.techSkills || [],
        },
    });

    const { fields: includedFields, append: appendFeatures, remove: removeFeatures
    } = useFieldArray({
        control: form.control, name: "techSkills",
    });

    const onSubmit = async (values: z.infer<typeof updateUserInfoZodSchema>) => {
        const formData = new FormData();

        formData.append("name", values.name);
        // formData.append("description", values.description);
        // formData.append("githubLink", values.githubLink);
        // formData.append("liveSite", values.liveSite);
        // values?.technologies?.forEach((tag) => formData.append("technologies", tag));
        values?.techSkills?.forEach((item) => formData.append("techSkills", item.value));

        const toastId = toast.loading("Processing....");
        try {
            const response = await updateInfoByEmail(formData);

            if (response.success) {
                toast.success(response.message, { id: toastId });
                router.push("/dashboard/user-info");
            } else {
                toast.error(response.message, { id: toastId });
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Update Info error:", err);
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
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Type Your Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Description */}
                    {/* <div className="mb-14">
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
                    </div> */}

                    <div>
                        <div className="flex justify-between">
                            <FormLabel>Technical Skills</FormLabel>
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => appendFeatures({ value: "" })}
                            >
                                <Plus />
                            </Button>
                        </div>

                        <div className="space-y-1.5">
                            {includedFields.map((item, index) => (
                                <div className="flex gap-2" key={item.id}>
                                    <FormField
                                        control={form.control}
                                        name={`techSkills.${index}.value`}
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
                                        size="icon"
                                        className="!bg-red-700"
                                        type="button"
                                        disabled={includedFields.length <= 2}
                                    >
                                        <Trash2 />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {form.formState.errors.techSkills?.message && (
                            <p className="text-sm font-medium text-red-600 mt-1">
                                {form.formState.errors.techSkills.message as string}
                            </p>
                        )}
                    </div>

                    <div className="mt-6 flex flex-col gap-6">
                        {/* <FormField
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
                        /> */}

                        {/* <FormField
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
                        /> */}
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-center gap-3">
                        <Link href="/dashboard/all-projects">
                            <Button variant="outline" className="flex items-center gap-1 cursor-pointer">
                                <ArrowLeft className="w-4 h-4" /> Cancel
                            </Button>
                        </Link>

                        <Button
                            type="submit"
                            className="bg-[#FD705C] text-white font-medium py-2 rounded-md hover:bg-[#07102A] transition-colors duration-300">Update
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
