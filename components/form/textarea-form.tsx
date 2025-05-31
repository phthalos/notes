"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

// const escapeHtml = (text: string) => {
//     const map: Record<string, string> = {
//         "<": "&lt;",
//         ">": "&gt;",
//         "&": "&amp;",
//         "'": "&#39;",
//         '"': "&quot;",
//         "/": "&#47;",
//     };
//     return text.replace(/[<>&'"\/]/g, (char: string): string => map[char]);
// };

const formSchema = z.object({
    title: z
        .string()
        .min(1, {
            message: "제목을 입력해주세요.",
        })
        .max(255, {
            message: "제목은 255자 이하로 입력해주세요.",
        }),
    content: z.string().optional(),
});
// .transform((v) => {
//     return {
//         title: escapeHtml(v.title),
//         content: escapeHtml(v.content || ""),
//     };
// });

interface TextareaFormProps {
    title?: string;
    content?: string;
    editingId?: number | null;
    onSubmit: (values: { title: string; content: string }) => void;
    onCancel?: () => void;
}

export function TextareaForm({ title = "", content = "", editingId, onSubmit, onCancel }: TextareaFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: title,
            content: content,
        },
    });

    // props가 변경될 때 form 값도 업데이트
    React.useEffect(() => {
        form.reset({
            title: title,
            content: content,
        });
    }, [title, content, form]);

    function handleSubmit(values: z.infer<typeof formSchema>) {
        onSubmit({
            title: values.title,
            content: values.content || "",
        });

        // 수정 모드가 아닐 때만 폼 리셋
        if (!editingId) {
            form.reset({
                title: "",
                content: "",
            });
        }
    }

    function handleCancel() {
        form.reset({
            title: "",
            content: "",
        });
        onCancel?.();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3 mb-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }: { field: ControllerRenderProps<FormData, "title"> }) => (
                        <FormItem>
                            <FormLabel>제목</FormLabel>
                            <FormControl>
                                <Input placeholder="메모 제목을 입력하세요" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }: { field: ControllerRenderProps<FormData, "content"> }) => (
                        <FormItem>
                            <FormLabel>내용</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="메모 내용을 입력하세요"
                                    className="min-h-[120px] resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-2">
                    <Button type="submit">{editingId ? "수정" : "작성"}</Button>
                    {editingId && (
                        <Button type="button" variant="outline" onClick={handleCancel}>
                            취소
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
}
