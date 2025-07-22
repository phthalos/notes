import pool from "@/lib/db";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

// 객체 타입 정의
interface MemoRequestBody {
    id?: number;
    title: string;
    content: string;
}

// GET - 메모 목록 조회 (비동기 함수)
export async function GET() {
    // execute 메서드를 이용하여 쿼리 전송 시도
    try {
        const [rows] = await pool.execute("SELECT * FROM memos ORDER BY created_at DESC");
        // 성공 시 내용을 rows에 저장, json으로 변환 후 응답으로 반환
        return NextResponse.json(rows);
        // 에러 핸들링
    } catch (error) {
        // 콘솔에 에러 내용 출력
        console.error(error);
        // 응답 내용 대신 에러 메시지, 상태 코드 저장 후 반환
        return NextResponse.json({ error: "memos를 가져오지 못했습니다." }, { status: 500 });
    }
}

// POST - 메모 생성 (비동기 함수)
export async function POST(request: NextRequest) {
    // execute 메서드를 이용하여 쿼리 전송 시도
    try {
        // request에서 title, content 추출
        const { title, content }: MemoRequestBody = await request.json();
        // INSERT 쿼리 실행하고 결과를 ResultSetHeader 타입으로 캐스팅
        const [result] = (await pool.execute("INSERT INTO memos (title, content) VALUES (?, ?)", [title, content])) as [
            ResultSetHeader,
            FieldPacket[]
        ];

        // 성공 시 생성된 메모 정보와 201 상태 코드로 응답 반환
        return NextResponse.json({ id: result.insertId, title, content }, { status: 201 });
        // 에러 핸들링
    } catch (error) {
        // 콘솔에 에러 내용 출력
        console.error(error);
        // 응답 내용 대신 에러 메시지, 상태 코드 저장 후 반환
        return NextResponse.json({ error: "memo를 생성하지 못했습니다." }, { status: 500 });
    }
}

// PUT - 메모 수정 (비동기 함수)
export async function PUT(request: NextRequest) {
    // execute 메서드를 이용하여 쿼리 전송 시도
    try {
        // request에서 id, title, content 추출
        const { id, title, content }: MemoRequestBody = await request.json();
        // UPDATE 쿼리 실행하여 해당 id의 메모 수정
        await pool.execute("UPDATE memos SET title = ?, content = ? WHERE id = ?", [title, content, id]);

        // 성공 시 수정된 메모 정보를 json으로 변환 후 응답으로 반환
        return NextResponse.json({ id, title, content });
        // 에러 핸들링
    } catch (error) {
        // 콘솔에 에러 내용 출력
        console.error(error);

        // 응답 내용 대신 에러 메시지, 상태 코드 저장 후 반환
        return NextResponse.json({ error: "memo를 수정하지 못했습니다." }, { status: 500 });
    }
}

// DELETE - 메모 삭제 (비동기 함수)
export async function DELETE(request: NextRequest) {
    // execute 메서드를 이용하여 쿼리 전송 시도
    try {
        // request에서 id 추출
        const { id } = await request.json();
        // DELETE 쿼리 실행하여 해당 id의 메모 삭제
        await pool.execute("DELETE FROM memos WHERE id = ?", [id]);
        // 성공 시 삭제 완료 메시지를 json으로 변환 후 응답으로 반환
        return NextResponse.json({ message: "memo를 삭제했습니다." });
        // 에러 핸들링
    } catch (error) {
        // 콘솔에 에러 내용 출력
        console.error(error);
        // 응답 내용 대신 에러 메시지, 상태 코드 저장 후 반환
        return NextResponse.json({ error: "memo를 삭제하지 못했습니다." }, { status: 500 });
    }
}
