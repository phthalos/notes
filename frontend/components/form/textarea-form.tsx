"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type FormTypes = {
    zod: z.infer<typeof FormSchema>;
    bio: string;
};

const FormSchema = z.object({
    bio: z
        .string()
        .min(10, {
            message: "Bio must be at least 10 characters.",
        })
        .max(160, {
            message: "Bio must not be longer than 30 characters.",
        }),
});

export default function TextareaForm() {
    const form = useForm<FormTypes>({
        resolver: zodResolver(FormSchema),
        defautValues: {
            bio: "",
        },
    });

    function onSubmit(data: FormTypes) {
        try {
            console.log(data);

            toast.success("Event has been created", {
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                    </pre>
                ),
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            });
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        } finally {
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }: { field: any }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    id="bio"
                                    // autoComplete=""
                                    placeholder="Tell us a little bit about yourself"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                You can <span>@mention</span> other users and organizations.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* <FormField>
                    ...
                </FormField> */}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
