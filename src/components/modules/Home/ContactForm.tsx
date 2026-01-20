"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ContactForm() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const res = await fetch("https://formspree.io/f/xnqekpvd", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            if (res.ok) {
                toast.success("Message sent successfully!");
                form.reset();
            } else {
                toast.error("Failed to send message");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="pb-10 bg-[#07102A]">
            <div className="max-w-xl mx-auto px-4">
                <h3 className="text-center text-4xl sm:text-5xl xl:text-[56px] xl:leading-[88px] tracking-[-2px] font-bold mb-6 text-white">
                    Get in{" "}
                    <span className="bg-gradient-to-r from-[#FFCFCC] via-[#FD705C] to-[#FF2056] bg-clip-text text-transparent">
                        Touch
                    </span>
                </h3>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 bg-[#0a1433] p-6 rounded-xl border border-white/10"
                >
                    <div>
                        <label className="text-sm text-gray-400">Name</label>
                        <input
                            name="name"
                            required
                            placeholder="Your Name"
                            className="w-full mt-1 rounded-md bg-[#07102A] border border-white/10 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FD705C]"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-400">Email</label>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="Your Email"
                            className="w-full mt-1 rounded-md bg-[#07102A] border border-white/10 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FD705C]"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-400">Message</label>
                        <textarea
                            name="message"
                            rows={4}
                            required
                            placeholder="Your Message"
                            className="w-full mt-1 rounded-md bg-[#07102A] border border-white/10 px-4 py-2 text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-[#FD705C]"
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="w-full rounded-md border border-[#FD705C] text-[#FD705C] py-2 font-medium transition
                        hover:bg-gradient-to-r hover:from-[#FFCFCC] hover:via-[#FD705C] hover:to-[#FF2056] hover:text-black
                        disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
        </section>
    );
}
