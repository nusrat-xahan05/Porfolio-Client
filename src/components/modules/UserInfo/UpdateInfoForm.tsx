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



const updateUserInfoZodSchema = z.object({
    name: z.string({
        error: (issue) =>
            issue.input === undefined
                ? "Name is required"
                : "Name must be a string",
    }).min(3, { message: "Name must be at least 3 characters" }),

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
        email: string;
        role: string;
        isVerified?: boolean;

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
            education: userInfo.education || [
                { level: "", institution: "", startDate: "", endDate: "" },
            ],
            techSkills: userInfo.techSkills?.map((item) => ({ value: item })) || [
                { value: "" },
            ],
            // description: project.description || "",
            // githubLink: project.githubLink || "",
            // liveSite: project.liveSite || "",
            // techSkills: userInfo.techSkills || [],
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
        // formData.append("description", values.description);
        // formData.append("githubLink", values.githubLink);
        // formData.append("liveSite", values.liveSite);
        // values?.technologies?.forEach((tag) => formData.append("technologies", tag));
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
                                <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-3 border p-3 rounded-md bg-[rgba(255,207,204,0.2)] relative">
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

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
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
