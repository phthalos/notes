"use client";

import { TextareaForm } from "@/components/form/textarea-form";
import AppCard from "@/components/card/app-card";
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
        <div>
            <ScrollArea
                className={`p-4 w-1/2 mx-auto transition-all duration-1000  ease-in-out ${
                    panelOpen ? "-translate-x-1/3" : "translate-x-0"
                }`}
            >
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
            <div
                className={`absolute top-0 right-0 h-full w-1/3 bg-background shadow-lg z-50
    transition-transform duration-1000 ease-in-out
    ${panelOpen ? "translate-x-0" : "translate-x-full"}
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
                        <ScrollArea className="flex w-full h-screen -mt-32 pt-32">
                            <Contents content={selectedMemo.content} />
                        </ScrollArea>
                    </>
                )}
            </div>
        </div>
    );
}
