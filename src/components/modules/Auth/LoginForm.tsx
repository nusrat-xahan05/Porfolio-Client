"use client";

import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function LoginForm() {
    const router = useRouter();

    const form = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: FieldValues) => {
        const toastId = toast.loading("Processing....");

        try {
            const response = await signIn("credentials", {
                ...values,
                redirect: false
            });

            if (response?.error) {
                toast.success(response?.error, {id: toastId});
            } else {
                toast.success("Logged In Successfull", {id: toastId});
                router.push("/dashboard");
            }
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-[#07102A]">
            <div className="space-y-6 w-full max-w-md p-8 rounded-lg shadow-md bg-[#FFCFCC]">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 w-full max-w-md"
                    >
                        <div>
                            <h2 className="text-3xl font-extrabold text-center text-[#07102A] mb-2">
                                Welcome Back
                            </h2>
                            <p className="text-center text-sm text-[#07102A]/70">
                                Log in to access your dashboard
                            </p>
                        </div>

                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            rules={{
                                required: "Email is Required"
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password */}
                        <FormField
                            control={form.control}
                            name="password"
                            rules={{
                                required: "Password is Required"
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter your password"
                                            {...field}
                                            value={field.value || ""}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full mt-2 bg-[#07102A] hover:bg-[#FD705C]">
                            Login
                        </Button>
                    </form>
                </Form>
                <p className="text-center text-sm text-gray-700 mt-4">
                    Only the Portfolio Owner Can LogIn
                </p>
            </div>
        </div>
    );
}