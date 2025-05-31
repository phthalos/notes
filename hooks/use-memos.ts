"use client";

import { useState, useEffect } from "react";

export interface Memo {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

export function useMemos() {
    const [memos, setMemos] = useState<Memo[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    // 메모 목록 가져오기
    const fetchMemos = async () => {
        try {
            const response = await fetch("/api/memos");
            const data = await response.json();
            setMemos(data);
        } catch (error) {
            console.error("Error fetching memos:", error);
        }
    };

    // 메모 생성
    const createMemo = async (values: { title: string; content: string }) => {
        try {
            const response = await fetch("/api/memos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                fetchMemos();
            }
        } catch (error) {
            console.error("Error creating memo:", error);
        }
    };

    // 메모 수정
    const updateMemo = async (values: { title: string; content: string }) => {
        try {
            const response = await fetch("/api/memos", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: editingId, ...values }),
            });

            if (response.ok) {
                setTitle("");
                setContent("");
                setEditingId(null);
                fetchMemos();
            }
        } catch (error) {
            console.error("Error updating memo:", error);
        }
    };

    // 메모 삭제
    const deleteMemo = async (id: number) => {
        try {
            const response = await fetch("/api/memos", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                fetchMemos();
            }
        } catch (error) {
            console.error("Error deleting memo:", error);
        }
    };

    // 수정 모드 시작
    const startEdit = (memo: Memo) => {
        setEditingId(memo.id);
        setTitle(memo.title);
        setContent(memo.content);
    };

    // 수정 취소
    const cancelEdit = () => {
        setEditingId(null);
        setTitle("");
        setContent("");
    };

    useEffect(() => {
        fetchMemos();
    }, []);

    return {
        memos,
        title,
        content,
        editingId,
        createMemo,
        updateMemo,
        deleteMemo,
        startEdit,
        cancelEdit,
    };
}
