"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const volunteerStories = [
  {
    title: "마지못해 오는 공부방이 아닌,\n오고싶은 공부방을 만들기 위해\n오늘도 TFK로 향합니다.",
    content:
      "제가 가르치는 수업, 그리고 멘토링이 쌓이고 쌓여 학생들의 미래를 변화시킬 것이라고 믿습니다.",
    author: "최영훈 · 성북 교사",
  },
  {
    title: '"이해됐니?"라고 물었을 때\n아이들이 이해하고 제게\n"이거 맞죠?" 하고 다시 설명해 줄 때',
    content:
      '모르는 문제를 설명해주고 학생들에게 "이해됐니?"라고 물었을 때 아이들이 이해하고 제게 "이거 맞죠?" 하고 다시 설명해 줄 때, 저는 이전에 느껴보지 못 한 벅찬 감정을 느낄 수 있었습니다.',
    author: "최이선 · 성북 교사",
  },
  {
    title: "'가르칠 자격'을 얻기 위해\n그것들을 실천하다 보니\n공부방에서 가르치는 것보다\n배워가는 게 더 많습니다.",
    content:
      "점점 마음을 열고 대해주는 아이들과, 저보다 더 철이 들어 제 기분을 맞춰주는 아이들이 모두 사랑스럽습니다.",
    author: "정성균 · 서대문 교사",
  },
  {
    title: "멘토링 및 가르침의 기회는\n과외나 아르바이트로도 얻을 수 있겠지만,\n대가를 바라지 않는 순수한 의도의\n교육봉사는 학생에 대한 애착,\n책임감, 보람의 차원이 다릅니다.",
    content:
      "바쁜 대학생활의 틈에서 임기연장까지 하며 학생들을 붙드는 학생교사들이 그 증거입니다.",
    author: "이찬호 · 서대문 교사",
  },
  {
    title: "나라는 사람이 학생들에게\n도움이 되는 존재라는 것을\n느낄 때면 얼마나 가슴 떨리고\n행복한지 모릅니다.",
    content:
      "TFK 활동을 통해 나의 작은 노력이 누군가에게는 소중한 기회이고, 행복이라는 것을 느끼고 있습니다.",
    author: "임윤지 · 관악 교사",
  },
  {
    title: "학생들을 가르치고 이야기도 나누며\n함께 시간을 보내다 보니 지난 시간이\n학생들 뿐만 아니라 나를 위해\n투자했던 시간이었다는 것을 깨달았습니다.",
    content:
      "학생들과 일종의 사제관계를 맺고 가르치는 경험은 스스로 발전할 수 있었던 좋은 경험이었습니다.",
    author: "홍인선 · 관악 교사",
  },
];

// Fisher-Yates shuffle 알고리즘
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function Home() {
  const [shuffledStories, setShuffledStories] = useState(volunteerStories);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    // 클라이언트에서만 랜덤하게 섞기
    setShuffledStories(shuffleArray(volunteerStories));
  }, []);

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + 2, shuffledStories.length));
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex">
              <img src="/logo.png" alt="Teach for Korea 로고" className="object-cover object-center w-full w-full"/>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-slate-900 md:text-base">
                Teach for Korea
              </span>
              <span className="hidden text-[11px] text-slate-500 sm:inline md:text-xs">
                교육으로 연결되는 공정한 기회
              </span>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
            <a href="#about" className="hover:text-slate-900">
              소개
            </a>
            <a href="#report2025" className="hover:text-slate-900">
              사업현황
            </a>
            <a href="#programs" className="hover:text-slate-900">
              프로그램
            </a>
            <a href="#volunteer" className="hover:text-slate-900">
              봉사 참여
            </a>
            <a href="#contact" className="hover:text-slate-900">
              문의
            </a>
          </nav>
          <a
            href="https://forms.gle/LtSDLmhQLqr7XZJY6"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-[11px] font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 md:px-6 md:text-sm"
          >
            지원하기
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-24 pt-12 md:px-8 md:pt-20">
        {/* Hero - Apple 스타일의 넓은 여백과 큰 타이포 */}
        <section className="flex flex-col items-center text-center md:items-start md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 md:tracking-[0.25em]">
            Teach for Korea
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-6xl">
            모든 아이에게{" "}
            <span className="text-slate-900 underline decoration-[#FFEE8C] decoration-4 underline-offset-4">
              좋은 교육
            </span>
            을.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-700 md:text-xl">
            교육 격차가 큰 지역의 아이들에게
            <br />
            <span className="font-semibold text-slate-900">
              믿을 만한 어른과 배움의 경험
            </span>
            을 연결하는 비영리 교육 봉사 네트워크.
          </p>
          <div className="mt-7 flex flex-col gap-3 text-sm sm:flex-row">
            <a
              href="https://forms.gle/LtSDLmhQLqr7XZJY6"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#FFEE8C] px-6 py-3 text-xs font-semibold text-slate-800 shadow-sm transition hover:brightness-95 md:px-8 md:text-sm"
            >
              교육 봉사 지원하기
            </a>

          </div>
          <dl className="mt-10 grid w-full gap-6 text-sm text-slate-600 md:max-w-3xl md:grid-cols-3">
            <div className="border-t border-slate-200 pt-4">
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                함께한 학생
              </dt>
              <dd className="mt-2 text-2xl font-semibold text-slate-900">
                300+
              </dd>
            </div>
            <div className="border-t border-slate-200 pt-4">
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                참여 봉사자
              </dt>
              <dd className="mt-2 text-2xl font-semibold text-slate-900">
                연 80명 내외
              </dd>
            </div>
            <div className="border-t border-slate-200 pt-4">
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                주요 지역
              </dt>
              <dd className="mt-2 text-lg font-semibold text-slate-900 md:text-xl">
                서대문, 성북, 관악
                <br className="md:hidden" />
                공부방
              </dd>
            </div>
          </dl>
        </section>

        {/* Volunteer Stories */}
        <section className="mt-12">
          <div className="grid gap-6 md:grid-cols-2">
            {shuffledStories.slice(0, visibleCount).map((story, index) => (
              <div
                key={index}
                className="flex flex-col rounded-[32px] bg-slate-100 px-6 py-8 shadow-sm md:px-8 md:py-10"
              >
                <div className="flex flex-col">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">
                    Volunteer Story
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                    {story.title.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < story.title.split("\n").length - 1 && (
                          <br className="hidden md:block" />
                        )}
                      </span>
                    ))}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
                    {story.content}
                  </p>
                  <p className="mt-5 text-xs font-medium text-slate-600">
                    {story.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {visibleCount < shuffledStories.length && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={showMore}
                className="cursor-pointer inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
              >
                더 보기
              </button>
            </div>
          )}
        </section>

        {/* About */}
        <section id="about" className="mt-24 scroll-mt-24 md:mt-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Teach for Korea는 어떤 단체인가요?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Teach for Korea는{" "}
              <span className="font-semibold text-slate-900">
                "아이의 출신과 환경이 삶의 가능성을 결정하지 않도록"
              </span>{" "}
              하기 위해 설립된 비영리 교육 봉사 단체입니다. 지역 아동센터, 대안학교 등과
              협력해 학습 지원과 멘토링, 진로 탐색 활동을 제공합니다.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-[24px] bg-white px-6 py-7 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900">비전</h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 md:text-sm">
                아이의 출신과 환경에 상관없이, 누구나 존중받으며 배움을 경험할 수 있는
                사회를 만듭니다.
              </p>
            </div>
            <div className="rounded-[24px] bg-white px-6 py-7 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900">미션</h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 md:text-sm">
                교육 봉사자와 지역 기관, 학생을 연결해 지속 가능한 교육 생태계를 만들고,
                모두가 함께 성장하는 경험을 제공합니다.
              </p>
            </div>
            <div className="rounded-[24px] bg-white px-6 py-7 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900">가치</h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 md:text-sm">
                존중, 연대, 성장. 우리는 한 명의 학생, 한 번의 수업이 세상을 바꿀 수
                있다고 믿습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 2025 사업 현황 */}
        <section id="report2025" className="mt-20 scroll-mt-24 md:mt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">2025년 사업 현황</p>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
            한 해동안, 이렇게 함께했습니다
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
            각 지역의 교실에서 아이들과 교사들이 함께 배우고, 먹고, 성장했습니다.
          </p>

          {/* 프로그램 카드 3개 */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white px-6 py-7 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">교과 수업</p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">국·영·수 개별 맞춤 수업</h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 md:text-sm">
                평일 오후 6시–10시, 소수 학생과 대학생 교사를 1:1로 연결해 학생 수준에 맞는 수업을 진행했습니다. 내신 기출 자료와 인터넷 강의 수강권도 무상으로 제공하며, 분기별 성적 우수자에게는 장학금을 지급합니다.
              </p>
            </div>
            <div className="rounded-2xl bg-white px-6 py-7 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">진로 멘토링</p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">대학 탐방 · 기업 현장 체험</h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 md:text-sm">
                서울권 대학 탐방, 은행 직업 체험, 기업 인턴 기회 등 다양한 진로 활동을 함께했습니다. 수시·정시 원서접수비를 지원하고, 자기소개서 첨삭·논술수업·적성고사 풀이 등 입시 전 과정을 직접 도왔습니다.
              </p>
            </div>
            <div className="rounded-2xl bg-white px-6 py-7 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">인성 · 문화 활동</p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">교실 안팎에서 함께 어우러졌습니다</h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600 md:text-sm">
                수업 전 저녁 식사로 교사와 학생이 식구가 되고, 독서골든벨·체육대회·현장 체험학습·크리스마스 행사를 통해 진짜 공동체를 만들었습니다.
              </p>
            </div>
          </div>

          {/* 학생 목소리 */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              "선생님 덕분에 의자에 앉아 공부하는 시간이 길어졌어요.",
              "학교 수업에서 늘 소외 받던 제가, 처음으로 수업시간이 재밌다고 느꼈어요.",
              "제가 선생님으로부터 받은 것보다 더 많이 남들에게 베풀고 싶어요.",
            ].map((quote) => (
              <blockquote
                key={quote}
                className="rounded-2xl bg-[#FFEE8C]/25 px-6 py-5 ring-1 ring-[#FFEE8C]/60"
              >
                <p className="text-sm leading-relaxed text-slate-800">"{quote}"</p>
                <footer className="mt-3 text-[11px] text-slate-500">— 참여 학생</footer>
              </blockquote>
            ))}
          </div>

          {/* 재정 투명성 + 수상/인정 */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white px-6 py-7 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">투명한 재정 운영</p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">기부금, 아이들에게 직접 씁니다</h3>
              <div className="mt-4 flex items-center gap-6">
                <div>
                  <p className="text-2xl font-semibold text-slate-900">87.4%</p>
                  <p className="mt-1 text-xs text-slate-500">직접 사업비</p>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div>
                  <p className="text-2xl font-semibold text-slate-900">12.6%</p>
                  <p className="mt-1 text-xs text-slate-500">운영비</p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-slate-600 md:text-sm">
                행정 직원 없이 전원 무급 자원봉사로 운영하여 관리비를 최소화하고, 기부금의 대부분을 학생 교육에 직접 투입합니다.
              </p>
            </div>
            <div className="rounded-2xl bg-white px-6 py-7 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">수상 · 인정</p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">지역 사회가 먼저 알아봤습니다</h3>
              <ul className="mt-4 space-y-3">
                <li className="flex gap-3 text-xs text-slate-600 md:text-sm">
                  <span className="mt-0.5 shrink-0 text-slate-300">—</span>
                  <span>매년 활동 지역 구청으로부터 대학생 교사 <strong className="text-slate-900">봉사상</strong> 수여</span>
                </li>
                <li className="flex gap-3 text-xs text-slate-600 md:text-sm">
                  <span className="mt-0.5 shrink-0 text-slate-300">—</span>
                  <span><strong className="text-slate-900">서울시 봉사상</strong> 수차례 수상</span>
                </li>
              </ul>
            </div>
          </div>

          {/* AI 교육 예고 배너 */}
          <div className="mt-6 rounded-2xl bg-slate-900 px-6 py-6 md:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">앞으로의 계획</p>
            <p className="mt-2 text-base font-semibold text-white md:text-lg">
              AI 시대, 아이들이 뒤처지지 않도록
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-300 md:text-sm">
              2026년부터 IT 전문가 네트워크와 함께 월별 AI 교육 세션을 진행할 계획입니다.
              변화하는 시대에 우리 아이들도 함께 앞으로 나아갑니다.
            </p>
          </div>
        </section>

        {/* Programs */}
        <section id="programs" className="mt-24 scroll-mt-24 md:mt-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              어떤 프로그램이 있나요?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Teach for Korea의 모든 프로그램은{" "}
              <span className="font-semibold text-slate-900">
                "지금 이 아이들에게 정말 필요한 것"
              </span>
              에서 출발합니다. 학습 보충, 멘토링, 진로 탐색까지 실제 수요를 바탕으로
              설계합니다.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="flex flex-col justify-between rounded-[24px] bg-white px-6 py-7 shadow-sm ring-1 ring-slate-200">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  기초 학습 지원
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-600 md:text-sm">
                  국어·수학·영어 등 기초 과목을 중심으로, 학습 격차가 큰 학생들을 위한
                  맞춤형 보충 수업을 진행합니다.
                </p>
              </div>
              <ul className="mt-4 list-disc space-y-1 pl-4 text-[11px] text-slate-500">
                <li>소규모 그룹 수업</li>
                <li>학생 수준별 맞춤 교안</li>
                <li>학습 습관 형성 코칭</li>
              </ul>
            </div>
            <div className="flex flex-col justify-between rounded-[24px] bg-white px-6 py-7 shadow-sm ring-1 ring-slate-200">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  멘토링 & 진로 탐색
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-600 md:text-sm">
                  대학생·직장인 멘토와 함께 진로 탐색, 학교·전공 선택, 삶의 방향에 대해
                  진솔하게 대화하는 시간을 마련합니다.
                </p>
              </div>
              <ul className="mt-4 list-disc space-y-1 pl-4 text-[11px] text-slate-500">
                <li>1:1 또는 소그룹 멘토링</li>
                <li>전공·직업 이야기 나눔</li>
                <li>프로젝트 기반 진로 탐색</li>
              </ul>
            </div>
            <div className="flex flex-col justify-between rounded-[24px] bg-white px-6 py-7 shadow-sm ring-1 ring-slate-200">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  진로·진학 워크숍
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-600 md:text-sm">
                  입시 제도 안내, 자기소개서 쓰기, 면접 준비 등 실질적인 정보를 제공하는
                  워크숍을 운영합니다.
                </p>
              </div>
              <ul className="mt-4 list-disc space-y-1 pl-4 text-[11px] text-slate-500">
                <li>진학 정보 세션</li>
                <li>실전 중심 글쓰기 코칭</li>
                <li>모의 면접 및 피드백</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Volunteer */}
        <section id="volunteer" className="mt-20 scroll-mt-24 md:mt-24">
          <div className="rounded-3xl bg-slate-50/80 p-5 ring-1 ring-slate-200 md:p-8">
            <div className="max-w-xl">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                교육 봉사자로 함께해 주세요
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-800 md:text-base">
                전공, 직업, 경력보다 중요한 건{" "}
                <span className="font-semibold text-slate-900">
                  아이들 곁에서 꾸준히 함께해 줄 마음
                </span>
                입니다. Teach for Korea는 봉사자가 혼자가 아니도록 교육과 동료 네트워크를
                제공합니다.
              </p>
              <ul className="mt-4 grid gap-2 text-xs text-slate-700 md:grid-cols-2">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  주 1회, 2시간 내외 활동
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  사전 교육 및 정기 피드백 제공
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  활동 확인서 및 추천서 발급 가능
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  교육자 커뮤니티 및 네트워킹
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <a
                href="https://forms.gle/LtSDLmhQLqr7XZJY6"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#FFEE8C] px-8 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:brightness-95"
              >
                교육 봉사 지원하기
              </a>
            </div>
          </div>
        </section>

        {/* Impact */}
        <section id="impact" className="mt-20 scroll-mt-24 md:mt-24">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
            우리가 만든 변화
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
            Teach for Korea는{" "}
            <span className="font-semibold text-slate-900">
              한 명 한 명의 진짜 변화를 가장 중요하게
            </span>
            생각합니다. 동시에, 우리가 함께 만든 발자국을 숫자로도 기록하고 있습니다.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-100">
              <p className="text-xs font-medium text-slate-500">누적 참여 학생</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">300+</p>
              <p className="mt-1 text-[11px] text-slate-500">지난 3년 기준</p>
            </div>
            <div className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-100">
              <p className="text-xs font-medium text-slate-500">참여 봉사자</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">80명</p>
              <p className="mt-1 text-[11px] text-slate-500">
                연간 평균 활동 인원
              </p>
            </div>
            <div className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-100">
              <p className="text-xs font-medium text-slate-500">
                집중 학습 프로그램
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">15개</p>
              <p className="mt-1 text-[11px] text-slate-500">
                파트너 기관과 공동 기획
              </p>
            </div>
            <div className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-100">
              <p className="text-xs font-medium text-slate-500">
                학생 만족도 (자기보고)
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">94%</p>
              <p className="mt-1 text-[11px] text-slate-500">
                "다음에도 참여하고 싶다"
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-20 scroll-mt-24 md:mt-24">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                함께 이야기 나누고 싶다면
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                교육 봉사 참여, 파트너십, 후원, 강연·워크숍 요청 등{" "}
                <span className="font-semibold text-slate-900">
                  "함께 교육의 가능성을 넓히는 일"
                </span>
                이라면 어떤 이야기든 환영합니다.
              </p>
              <dl className="mt-4 space-y-2 text-sm text-slate-700">
                <div className="flex gap-2">
                  <dt className="w-16 text-slate-500">Email</dt>
                  <dd>
                    <a
                      href="mailto:ironymail@gmail.com"
                      className="text-slate-700 underline-offset-2 hover:text-slate-900 hover:underline"
                    >
                      ironymail@gmail.com
                    </a>
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-16 text-slate-500">Instagram</dt>
                  <dd className="text-slate-700">
                    <a href="https://instagram.com/teachforkorea" target="_blank">
                      @teachforkorea
                    </a>
                  </dd>
                </div>
              </dl>

            </div>
          </div>
        </section>
      </main>

      {/* Partner Band */}
      <div className="border-t border-slate-100 bg-slate-50 py-10">
        <div className="mx-auto max-w-6xl px-5 md:px-8 flex flex-col items-center gap-5">
          <p className="text-sm text-slate-500 font-light tracking-wide">하나금융나눔재단과 함께합니다</p>
          <img
            src="/hana-logo.png"
            alt="하나금융나눔재단"
            className="h-9"
          />
        </div>
      </div>

      <footer className="border-t border-slate-200 bg-white/80 py-4 text-center text-[11px] text-slate-500">
        <p>© {new Date().getFullYear()} Teach for Korea. All rights reserved.</p>
      </footer>
    </div>
  );
}
