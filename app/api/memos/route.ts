import pool from "@/lib/db";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

interface MemoRequestBody {
    id?: number;
    title: string;
    content: string;
}

// GET - 메모 목록 조회
export async function GET() {
    try {
        const [rows] = await pool.execute("SELECT * FROM memos ORDER BY created_at DESC");
        return NextResponse.json(rows);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "memos를 가져오지 못했습니다." }, { status: 500 });
    }
}

// POST - 메모 생성
export async function POST(request: NextRequest) {
    try {
        const { title, content }: MemoRequestBody = await request.json();
        const [result] = (await pool.execute("INSERT INTO memos (title, content) VALUES (?, ?)", [title, content])) as [
            ResultSetHeader,
            FieldPacket[]
        ];

        return NextResponse.json({ id: result.insertId, title, content }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "memo를 생성하지 못했습니다." }, { status: 500 });
    }
}

// PUT - 메모 수정
export async function PUT(request: NextRequest) {
    try {
        const { id, title, content }: MemoRequestBody = await request.json();
        await pool.execute("UPDATE memos SET title = ?, content = ? WHERE id = ?", [title, content, id]);

        return NextResponse.json({ id, title, content });
    } catch (error) {
        console.error(error);

        return NextResponse.json({ error: "memo를 수정하지 못했습니다." }, { status: 500 });
    }
}

// DELETE - 메모 삭제
export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();
        await pool.execute("DELETE FROM memos WHERE id = ?", [id]);
        return NextResponse.json({ message: "memo를 삭제했습니다." });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "memo를 삭제하지 못했습니다." }, { status: 500 });
    }
}
