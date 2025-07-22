"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

// 객체 타입 정의
export interface Memo {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

export function useMemos() {
    // useState를 이용하여 상태 관리
    const [memos, setMemos] = useState<Memo[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    // 메모 목록 가져오기 (비동기 함수)
    const fetchMemos = async () => {
        // fetch API를 이용하여 데이터 요청 시도
        try {
            // GET 요청으로 메모 목록 조회
            const response = await fetch("/api/memos");
            // 응답을 json으로 변환
            const data = await response.json();
            // 성공 시 받은 데이터를 memos 상태에 저장
            setMemos(data);
            // 에러 핸들링
        } catch (error) {
            // 콘솔에 에러 내용 출력
            console.error("Error fetching memos:", error);
            // 사용자에게 에러 토스트 메시지 표시
            toast.error("메모를 가져오지 못했습니다.");
        }
    };

    // 메모 생성 (비동기 함수)
    const createMemo = async (values: { title: string; content: string }) => {
        // fetch API를 이용하여 데이터 요청 시도
        try {
            // POST 요청으로 새 메모 생성
            const response = await fetch("/api/memos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                // 요청 본문에 title, content 포함
                body: JSON.stringify(values),
            });

            // 성공 시 메모 목록 새로고침 및 성공 메시지 표시
            if (response.ok) {
                // 메모 목록 다시 가져오기
                fetchMemos();
                // 사용자에게 성공 토스트 메시지 표시
                toast.success("메모를 작성하였습니다.");
            }
            // 에러 핸들링
        } catch (error) {
            // 콘솔에 에러 내용 출력
            console.error("Error creating memo:", error);
            // 사용자에게 에러 토스트 메시지 표시
            toast.error("메모를 작성하지 못했습니다.");
        }
    };

    // 메모 수정 (비동기 함수)
    const updateMemo = async (values: { title: string; content: string }) => {
        // fetch API를 이용하여 데이터 요청 시도
        try {
            // PUT 요청으로 기존 메모 수정
            const response = await fetch("/api/memos", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                // 요청 본문에 수정할 메모의 id와 새로운 값들 포함
                body: JSON.stringify({ id: editingId, ...values }),
            });

            // 성공 시 편집 상태 초기화 및 메모 목록 새로고침
            if (response.ok) {
                // 입력 필드 초기화
                setTitle("");
                setContent("");
                // 편집 모드 해제
                setEditingId(null);
                // 메모 목록 다시 가져오기
                fetchMemos();
                // 사용자에게 성공 토스트 메시지 표시
                toast.success("메모를 수정하였습니다.");
            }
            // 에러 핸들링
        } catch (error) {
            // 콘솔에 에러 내용 출력
            console.error("Error updating memo:", error);
            // 사용자에게 에러 토스트 메시지 표시
            toast.error("메모를 수정하지 못했습니다.");
        }
    };

    // 메모 삭제 (비동기 함수)
    const deleteMemo = async (id: number) => {
        // fetch API를 이용하여 데이터 요청 시도
        try {
            // DELETE 요청으로 메모 삭제
            const response = await fetch("/api/memos", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                // 요청 본문에 삭제할 메모의 id 포함
                body: JSON.stringify({ id }),
            });

            // 성공 시 메모 목록 새로고침 및 성공 메시지 표시
            if (response.ok) {
                // 메모 목록 다시 가져오기
                fetchMemos();
                // 사용자에게 성공 토스트 메시지 표시
                toast.success("메모를 삭제하였습니다.", {});
            }
            // 에러 핸들링
        } catch (error) {
            // 콘솔에 에러 내용 출력
            console.error("Error deleting memo:", error);
            // 사용자에게 에러 토스트 메시지 표시
            toast.error("메모를 삭제하지 못했습니다.");
        }
    };

    // 수정 모드 시작
    const startEdit = (memo: Memo) => {
        // 편집할 메모의 id 설정
        setEditingId(memo.id);
        // 입력 필드에 현재 메모의 제목과 내용 설정
        setTitle(memo.title);
        setContent(memo.content);
    };

    // 수정 취소
    const cancelEdit = () => {
        // 편집 모드 해제
        setEditingId(null);
        // 입력 필드 초기화
        setTitle("");
        setContent("");
    };

    // 컴포넌트 마운트 시 메모 목록 가져오기
    useEffect(() => {
        // 초기 메모 목록 로드
        fetchMemos();
    }, []);

    // 훅에서 사용할 수 있는 상태와 함수들 반환
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
