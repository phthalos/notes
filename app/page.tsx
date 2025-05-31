"use client";

import { TextareaForm } from "@/components/form/textarea-form";
import AppCard from "@/components/card/app-card";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { TooltipList } from "@/components/custom/tooltip-list";
import Details from "@/components/details/details";
import Contents from "@/components/details/contents";
import { useMemos } from "@/hooks/use-memos";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
    const { memos, title, content, editingId, createMemo, updateMemo, deleteMemo, startEdit, cancelEdit } = useMemos();

    // react-hook-form에서 사용할 수 있도록 함수 수정
    const handleSubmit = (values: { title: string; content: string }) => {
        if (editingId) {
            // 수정 모드일 때
            updateMemo(values);
        } else {
            // 생성 모드일 때
            createMemo(values);
        }
    };
    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={40} minSize={30} className="flex w-full h-screen -mt-14 pt-14">
                <ScrollArea className="p-4">
                    <TextareaForm
                        title={title}
                        content={content}
                        editingId={editingId}
                        onSubmit={handleSubmit}
                        onCancel={cancelEdit}
                    />
                    {memos.map((memo) => (
                        <AppCard
                            key={memo.id}
                            id={memo.id}
                            title={memo.title}
                            content={memo.content}
                            created_at={memo.created_at}
                            updated_at={memo.updated_at}
                        />
                    ))}
                </ScrollArea>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={60}>
                <TooltipList />
                <Details />
                <ScrollArea className="flex w-full h-screen -mt-48 pt-48">
                    <Contents />
                </ScrollArea>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
