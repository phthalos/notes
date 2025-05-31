"use client";

import { TextareaForm } from "@/components/form/textarea-form";
import AppCard from "@/components/card/app-card";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { TooltipList } from "@/components/custom/tooltip-list";
import Details from "@/components/details/details";
import Contents from "@/components/details/contents";
import { useMemos } from "@/hooks/use-memos";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import formatToKSTString from "@/utils/date";

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

    const [selected, setSelected] = useState<number | undefined>(0);
    const selectedMemo = memos.find((memo) => memo.id === selected);

    const [panelOpen, setPanelOpen] = useState(false);

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
                        <div
                            key={memo.id}
                            onClick={() => {
                                setSelected(memo.id);
                                setPanelOpen(true);
                            }}
                        >
                            <AppCard
                                id={memo.id}
                                title={memo.title}
                                content={memo.content}
                                created_at={formatToKSTString(memo.created_at)}
                                updated_at={memo.updated_at}
                            />
                        </div>
                    ))}
                </ScrollArea>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel
                className={`transition-all duration-1000 ease-in-out overflow-hidden 
                    ${panelOpen ? "max-w-full" : "max-w-0"}
                    `}
            >
                {selectedMemo && (
                    <>
                        <TooltipList
                            id={selectedMemo.id}
                            deleteMemo={deleteMemo}
                            startEdit={startEdit}
                            cancelEdit={cancelEdit}
                            setPanelOpen={setPanelOpen}
                            memo={selectedMemo}
                        />
                        <Details title={selectedMemo.title} created_at={formatToKSTString(selectedMemo.created_at)} />
                        <ScrollArea className="flex w-full h-screen -mt-48 pt-48">
                            <Contents content={selectedMemo.content} />
                        </ScrollArea>
                    </>
                )}
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
