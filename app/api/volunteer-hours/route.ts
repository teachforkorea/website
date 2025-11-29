import { NextResponse } from "next/server";

type VolunteerLog = {
  id: number;
  name: string;
  date: string; // YYYY-MM-DD
  hours: number;
};

// 환경변수가 없을 때 사용할 예시 데이터 (현재 /hours 페이지와 동일)
const FALLBACK_LOGS: VolunteerLog[] = [
  { id: 1, name: "김지원", date: "2025-03-05", hours: 2 },
  { id: 2, name: "김지원", date: "2025-03-12", hours: 2 },
  { id: 3, name: "김지원", date: "2025-04-02", hours: 3 },
  { id: 4, name: "이민수", date: "2025-03-07", hours: 2 },
  { id: 5, name: "이민수", date: "2025-03-21", hours: 2 },
  { id: 6, name: "이민수", date: "2025-04-11", hours: 3 },
  { id: 7, name: "박서현", date: "2025-03-09", hours: 1.5 },
  { id: 8, name: "박서현", date: "2025-03-23", hours: 2 },
  { id: 9, name: "박서현", date: "2025-04-06", hours: 2.5 },
  { id: 10, name: "정우진", date: "2025-03-15", hours: 3 },
  { id: 11, name: "정우진", date: "2025-04-03", hours: 2 },
];

// 시트: A열=이름, B열=날짜(YYYY-MM-DD), C열=시간(숫자) 라고 가정
function parseFromSheet(values: string[][]): VolunteerLog[] {
  const logs: VolunteerLog[] = [];

  values.forEach((row, index) => {
    const [name, date, hoursStr] = row;
    const hours = Number(hoursStr);
    if (!name || !date || Number.isNaN(hours)) return;

    logs.push({
      id: index + 1,
      name,
      date,
      hours,
    });
  });

  return logs;
}

export async function GET() {
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const range = process.env.GOOGLE_SHEETS_RANGE || "Sheet1!A2:C";

  // 환경변수가 없으면 예시 데이터 반환
  if (!apiKey || !spreadsheetId) {
    return NextResponse.json(
      { source: "fallback", logs: FALLBACK_LOGS },
      { status: 200 },
    );
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
    range,
  )}?key=${apiKey}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error("Google Sheets API error", await res.text());
      return NextResponse.json(
        { source: "fallback", logs: FALLBACK_LOGS },
        { status: 200 },
      );
    }

    const data = (await res.json()) as { values?: string[][] };
    const values = data.values ?? [];
    const logs = parseFromSheet(values);

    if (logs.length === 0) {
      return NextResponse.json(
        { source: "empty", logs: [] as VolunteerLog[] },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { source: "sheets", logs },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to fetch from Google Sheets", error);
    return NextResponse.json(
      { source: "fallback", logs: FALLBACK_LOGS },
      { status: 200 },
    );
  }
}


