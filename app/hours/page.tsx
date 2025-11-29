"use client";

import { useEffect, useMemo, useState } from "react";

type VolunteerLog = {
  id: number;
  name: string;
  date: string; // YYYY-MM-DD
  hours: number;
};

function parseDate(value: string | undefined) {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export default function VolunteerHoursPage() {
  const [logs, setLogs] = useState<VolunteerLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<"sheets" | "fallback" | "empty" | null>(
    null,
  );
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/volunteer-hours");
        if (!res.ok) {
          throw new Error("데이터를 불러오지 못했습니다.");
        }
        const data = (await res.json()) as {
          source: "sheets" | "fallback" | "empty";
          logs: VolunteerLog[];
        };
        setSource(data.source ?? null);
        setLogs(data.logs || []);
      } catch (e) {
        console.error(e);
        setError("봉사 시간 데이터를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const filteredLogs = useMemo(() => {
    const fromDate = parseDate(from);
    const toDate = parseDate(to);

    return logs.filter((log) => {
      const current = parseDate(log.date);
      if (!current) return false;
      if (fromDate && current < fromDate) return false;
      if (toDate && current > toDate) return false;
      return true;
    });
  }, [from, to, logs]);

  const summaryByVolunteer = useMemo(() => {
    const map = new Map<
      string,
      { name: string; totalHours: number; sessionCount: number }
    >();

    for (const log of filteredLogs) {
      const entry = map.get(log.name) ?? {
        name: log.name,
        totalHours: 0,
        sessionCount: 0,
      };
      entry.totalHours += log.hours;
      entry.sessionCount += 1;
      map.set(log.name, entry);
    }

    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name, "ko"),
    );
  }, [filteredLogs]);

  const totalHoursAll = useMemo(
    () => summaryByVolunteer.reduce((sum, v) => sum + v.totalHours, 0),
    [summaryByVolunteer],
  );

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 md:px-6">
      <main className="mx-auto flex max-w-5xl flex-col gap-8">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow-600">
            Volunteer Hours
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              봉사자별 봉사 시간 조회
            </h1>
            {source && (
              <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-medium text-white md:text-xs">
                {source === "sheets"
                  ? "Google 스프레드시트에서 불러온 데이터"
                  : source === "fallback"
                    ? "예시(임시) 데이터 사용 중"
                    : "데이터가 비어 있습니다"}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            구글 스프레드시트 또는 예시 데이터를 기준으로, 선택한 기간 동안의{" "}
            <span className="font-semibold text-slate-900">
              봉사자별 총 봉사 시간
            </span>
            을 확인할 수 있습니다.
          </p>
        </header>

        <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 md:p-5">
          <h2 className="text-sm font-semibold text-slate-900 md:text-base">
            기간 설정
          </h2>
          <p className="mt-1 text-[11px] text-slate-500 md:text-xs">
            시작일과 종료일을 선택하면, 해당 기간에 진행된 봉사 시간만 집계됩니다.
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-800 md:flex-row md:items-end">
            <div className="flex flex-1 flex-col gap-1">
              <label className="text-xs font-medium text-slate-700">
                시작일
              </label>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none ring-yellow-100 focus:border-yellow-400 focus:ring-2 md:text-sm"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <label className="text-xs font-medium text-slate-700">
                종료일
              </label>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none ring-yellow-100 focus:border-yellow-400 focus:ring-2 md:text-sm"
              />
            </div>
            <div className="flex flex-row gap-2 md:w-48 md:flex-col">
              <button
                type="button"
                onClick={() => {
                  // 최근 30일 예시
                  const today = new Date();
                  const past = new Date();
                  past.setDate(today.getDate() - 30);
                  setFrom(past.toISOString().slice(0, 10));
                  setTo(today.toISOString().slice(0, 10));
                }}
                className="flex-1 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 hover:border-yellow-200 hover:text-yellow-700 md:text-sm"
              >
                최근 30일
              </button>
              <button
                type="button"
                onClick={() => {
                  setFrom("");
                  setTo("");
                }}
                className="flex-1 rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800 md:text-sm"
              >
                전체 기간
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 md:p-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-900 md:text-base">
                봉사자별 합산 시간
              </h2>
              <span className="rounded-full bg-yellow-50 px-3 py-1 text-[11px] font-medium text-yellow-800 ring-1 ring-yellow-100">
                총 {totalHoursAll.toFixed(1)}시간
              </span>
            </div>
            {loading ? (
              <p className="mt-4 text-sm text-slate-500">
                봉사 시간 데이터를 불러오는 중입니다...
              </p>
            ) : error ? (
              <p className="mt-4 text-sm text-red-500">{error}</p>
            ) : summaryByVolunteer.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">
                선택한 기간에 해당하는 봉사 기록이 없습니다.
              </p>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left text-xs text-slate-700 md:text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50 text-[11px] uppercase tracking-[0.12em] text-slate-500 md:text-xs">
                      <th className="px-3 py-2 font-semibold">봉사자</th>
                      <th className="px-3 py-2 font-semibold text-right">
                        총 시간
                      </th>
                      <th className="px-3 py-2 font-semibold text-right">
                        횟수
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {summaryByVolunteer.map((v) => (
                      <tr
                        key={v.name}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="px-3 py-2">{v.name}</td>
                        <td className="px-3 py-2 text-right font-semibold text-slate-900">
                          {v.totalHours.toFixed(1)}시간
                        </td>
                        <td className="px-3 py-2 text-right text-slate-600">
                          {v.sessionCount}회
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-white p-4 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200 md:p-5">
            <h2 className="text-sm font-semibold text-slate-900 md:text-base">
              참고 사항
            </h2>
            <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-slate-600 md:text-sm">
              <li>환경변수가 설정되어 있으면 구글 스프레드시트 데이터를 사용합니다.</li>
              <li>환경변수가 없다면 기본 예시(임시) 데이터를 사용합니다.</li>
              <li>
                필요하다면 봉사자 검색, 기관별 필터, 월별 통계 등도 추가할 수
                있습니다.
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}


