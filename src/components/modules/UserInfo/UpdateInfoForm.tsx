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
import { IEducation } from "@/types";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";


// Simple URL regex (matches most http/https URLs)
const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
const emailRegex = /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;

const updateUserInfoZodSchema = z.object({
    name: z.string({
        error: (issue) =>
            issue.input === undefined
                ? "Name is required"
                : "Name must be a string",
    }).min(3, { message: "Name must be at least 3 characters" }),

    jobTitle: z.string({
        error: (issue) =>
            issue.input === undefined
                ? "Job Title is required"
                : "Job Title must be a string",
    }).min(3, { message: "Job Title must be at least 3 characters" }),

    description: z
        .string()
        .refine((val) => val.replace(/<(.|\n)*?>/g, "").trim().length > 10, {
            message: "Description must be at least 10 characters",
        }),

    contactEmail: z
        .email({ message: "Invalid Email Address Format" })
        .regex(emailRegex, { message: "Invalid Email Address Format" }
        )
        .transform((val) => val.toLowerCase()),

    githubLink: z
        .string()
        .regex(urlRegex, { message: "GitHub link must be a valid URL" }),

    discordLink: z
        .string()
        .regex(urlRegex, { message: "Discord link must be a valid URL" }),

    linkedinLink: z
        .string()
        .regex(urlRegex, { message: "Linkedin link must be a valid URL" }),

    education: z.array(
        z.object({
            level: z.string().min(1, "Education level is required"),
            institution: z.string().min(1, "Institution name is required"),
            startDate: z.string().min(1, "Start date is required"),
            endDate: z.string().min(1, "End date is required"),
        })
    ).min(1, "At least one education record is required"),

    techSkills: z.array(
        z.object({
            value: z.string().min(2, "Skills is required"),
        })).min(2, "At least two skills is required")
});


interface UpdateUserInfoFormProps {
    userInfo: {
        name?: string;
        jobTitle: string;
        description: string;
        contactEmail: string;
        githubLink: string;
        discordLink: string;
        linkedinLink: string;
        education: IEducation[];
        techSkills?: string[];
    };
}


export default function UpdateInfoForm({ userInfo }: UpdateUserInfoFormProps) {
    const router = useRouter();

    const form = useForm<z.infer<typeof updateUserInfoZodSchema>>({
        resolver: zodResolver(updateUserInfoZodSchema),
        defaultValues: {
            name: userInfo.name || "",
            jobTitle: userInfo.jobTitle || "",
            description: userInfo.description || "",
            contactEmail: userInfo.contactEmail || "",
            githubLink: userInfo.githubLink || "",
            discordLink: userInfo.discordLink || "",
            linkedinLink: userInfo.linkedinLink || "",
            education: userInfo.education || [
                { level: "", institution: "", startDate: "", endDate: "" },
            ],
            techSkills: userInfo.techSkills?.map((item) => ({ value: item })) || [
                { value: "" },
            ],
        },
    });

    const { fields: educationFields, append: appendEducation, remove: removeEducation,
    } = useFieldArray({
        control: form.control, name: "education",
    });

    const { fields: includedFields, append: appendFeatures, remove: removeFeatures
    } = useFieldArray({
        control: form.control, name: "techSkills",
    });

    const onSubmit = async (values: z.infer<typeof updateUserInfoZodSchema>) => {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("jobTitle", values.jobTitle);
        formData.append("description", values.description);
        formData.append("contactEmail", values.contactEmail);
        formData.append("githubLink", values.githubLink);
        formData.append("discordLink", values.discordLink);
        formData.append("linkedinLink", values.linkedinLink);
        values?.education?.forEach((edu, idx) => {
            formData.append(`education[${idx}][level]`, edu.level);
            formData.append(`education[${idx}][institution]`, edu.institution);
            formData.append(`education[${idx}][startDate]`, edu.startDate);
            formData.append(`education[${idx}][endDate]`, edu.endDate);
        });
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Type Your Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Job Title */}
                        <FormField
                            control={form.control}
                            name="jobTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Type Your Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

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
                                            placeholder="Write your about description..."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Education */}
                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-2">
                            <FormLabel>Education</FormLabel>
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                    appendEducation({ level: "", institution: "", startDate: "", endDate: "" })
                                }
                            >
                                <Plus />
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {educationFields.map((item, index) => (
                                <div key={item.id} className="grid grid-cols-1 gap-3 border p-3 rounded-md bg-[rgba(255,207,204,0.2)] relative">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                                        {/* Level */}
                                        <FormField
                                            control={form.control}
                                            name={`education.${index}.level`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Level</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g. BSc in CSE" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Institution */}
                                        <FormField
                                            control={form.control}
                                            name={`education.${index}.institution`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Institution</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g. ABC University" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {/* Start Date */}
                                        <FormField
                                            control={form.control}
                                            name={`education.${index}.startDate`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Start Year</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" placeholder="e.g. 2020" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* End Date */}
                                        <FormField
                                            control={form.control}
                                            name={`education.${index}.endDate`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>End Year</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" placeholder="e.g. 2024" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Remove button */}
                                    <Button
                                        onClick={() => removeEducation(index)}
                                        variant="destructive"
                                        size="icon"
                                        type="button"
                                        className="absolute top-2 right-2 !bg-red-700"
                                        disabled={educationFields.length <= 1}
                                    >
                                        <Trash2 />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {form.formState.errors.education?.message && (
                            <p className="text-sm font-medium text-red-600 mt-1">
                                {form.formState.errors.education.message as string}
                            </p>
                        )}
                    </div>

                    <div className="mt-6 flex flex-col gap-6">
                        <FormField
                            control={form.control}
                            name="githubLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#07102A] font-medium">
                                        Github Profile URL
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="url"
                                            placeholder="e.g. https://github.com/nusrat-xahan05"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="discordLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#07102A] font-medium">
                                        Discord Profile URL
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="url"
                                            placeholder="e.g. https://discord.com/users/my-profile"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="linkedinLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[#07102A] font-medium">
                                        Linkedin Profile URL
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="url"
                                            placeholder="e.g. https://linkedin.com/my-profile"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

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
