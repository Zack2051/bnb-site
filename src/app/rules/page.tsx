// src/app/rules/page.tsx
"use client";

import Link from "next/link";
import HeroCarousel from "@/app/components/HeroCarousel";

const images = ["/p22.jpg", "/p29.jpg", "/p28.jpg", "/p25.JPG", "/p26.JPG"];

const NAV_ITEMS = [
  { href: "/rooms", title: "房型", desc: "房型照片、可住人數、設備" },
  { href: "/services", title: "服務", desc: "訂房方式、接待與協助" },
  { href: "/location", title: "交通", desc: "地址、停車、地圖導航" },
  { href: "/rules", title: "注意事項", desc: "入住退房、取消規則" },
  { href: "/amenities", title: "附近景點", desc: "老街、步道、瀑布" },
];

const RULE_SECTIONS = [
  {
    title: "入住與退房",
    items: [
      { k: "入住", v: "16:00 後（可依當日狀況協助提前）" },
      { k: "退房", v: "10:00 前（如需延後請先聯繫）" },
      { k: "報到方式", v: "抵達前請先聯絡，我們會提供入住房號／鑰匙方式" },
    ],
    note: "如遇交通延誤或抵達時間有變動，請提早通知，我們會協助安排。",
  },
  {
    title: "訂房與取消規則",
    items: [
      { k: "訂房確認", v: "以繳清30%訂金或與屋主確認入住為主" },
      { k: "更改日期", v: "請盡早告知，以便協助調整（視房況）" },
      { k: "取消政策", v: "依<個別旅客訂房定型化契約應記載及不得記載事項>辦理" },
    ],
    note: "感謝你的理解與配合，我們會盡力協助你的需求。",
  },
  {
    title: "住宿與空間使用",
    items: [
      { k: "室內禁菸", v: "室內全面禁止吸菸（含電子菸）" },
      { k: "明火與烹煮", v: "房內請勿使用明火或烹煮，避免安全風險" },
      { k: "物品愛惜", v: "公共空間與備品請共同愛惜；如有損壞會依情況酌收費用" },
    ],
    note: "民宿內所提供設施均可使用，請遵守使用規範並保持整潔。",
  },
  {
    title: "安靜時段與鄰里友善",
    items: [
      { k: "安靜時段", v: "22:00 後請降低音量" },
      { k: "戶外音量", v: "夜間戶外聊天請控制音量，避免打擾鄰居" },
      { k: "訪客", v: "若需訪客到訪請先告知（依現場規定）" },
    ],
    note: "山區／鄉間夜晚很安靜，謝謝你一起守護彼此的休息品質。",
  },
  {
    title: "寵物與加人",
    items: [
      { k: "寵物", v: "禁止攜帶" },
      { k: "加床", v: "需提前告知人數與需求，以便準備備品與床位" },
      { k: "加人費率", v: "5~10歲:500/人;10歲以上:1000/人" },
    ],
    note: "我們希望每位住客都能有舒適的住宿體驗，謝謝你的配合。",
  },
  {
    title: "安全與保管",
    items: [
      { k: "貴重物品", v: "請自行妥善保管；離開房間記得鎖門" },
      { k: "停車安全", v: "請依指示停放並留意車內勿留貴重物品" },
      { k: "緊急聯絡", v: "入住期間如有狀況請立即聯繫我們" },
    ],
    note: "我們希望你住得放鬆，也住得安心。",
  },
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-white/85 backdrop-blur">
      {children}
    </span>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700 shadow-sm">
      {children}
    </span>
  );
}

export default function RulesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Top Hero (match your homepage vibe) */}
      <section className="relative min-h-[560px] overflow-hidden md:h-[70vh] md:min-h-[520px]">
        <HeroCarousel images={images} />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-6 text-white sm:px-6 sm:py-8 md:px-6 md:py-10">
          {/* Header */}
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 font-semibold backdrop-blur">
                住
              </div>
              <div className="leading-tight">
                <div className="text-lg font-semibold tracking-wide">
                  隨意空間（小沈的家）
                </div>
                <div className="text-xs text-white/70">Rules & Notes</div>
              </div>
            </div>

            <nav className="hidden gap-5 text-sm text-white/90 md:flex">
              {NAV_ITEMS.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className={`transition hover:text-white ${
                    it.href === "/rules" ? "text-white" : "text-white/85"
                  }`}
                >
                  {it.title}
                </Link>
              ))}
            </nav>
          </header>

          {/* Title */}
          <div className="mt-10 max-w-3xl">
            <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
              注意事項
            </h1>

            <p className="mt-4 text-base text-white/85 md:text-lg">
              這裡整理了入住退房、取消與住宿規範。若你有任何需求，歡迎先聯繫我們，
              我們會盡力協助。
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>入住 16:00 後</Badge>
              <Badge>退房 10:00 前</Badge>
              <Badge>22:00 後安靜</Badge>
              <Badge>室內禁菸</Badge>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/rooms"
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
              >
                看房型
              </Link>
              <Link
                href="/services"
                className="rounded-2xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/15 transition"
              >
                看訂房方式
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-wrap gap-2">
          <Chip>請先閱讀再預訂</Chip>
          <Chip>可協助需求調整（視房況）</Chip>
          <Chip>山區夜晚安靜請配合</Chip>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {RULE_SECTIONS.map((sec) => (
            <div
              key={sec.title}
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">{sec.title}</h2>
                  <p className="mt-1 text-sm text-neutral-600">
                    {sec.note}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {sec.items.map((row) => (
                  <div
                    key={row.k}
                    className="flex flex-col gap-1 rounded-2xl bg-neutral-50 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
                  >
                    <div className="text-sm font-semibold text-neutral-900">
                      {row.k}
                    </div>
                    <div className="text-sm leading-6 text-neutral-700 sm:max-w-[70%]">
                      {row.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Closing callout */}
        <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-lg font-semibold">需要協助？</div>
              <div className="mt-1 text-sm text-neutral-600">
                抵達時間調整、加人、寵物需求或其他特殊狀況，歡迎先與我們聯繫，我們會盡力幫你安排。
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/services"
                className="rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition"
              >
                聯絡方式
              </Link>
              <Link
                href="/location"
                className="rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition"
              >
                看交通
              </Link>
            </div>
          </div>
        </div>

        {/* Footer (match your homepage) */}
        <footer className="mt-12 border-t pt-6 text-center text-sm text-neutral-500">
          <div>© {new Date().getFullYear()} 隨意空間（小沈的家）</div>
          <div className="mt-1">226 新北市平溪區白石里 12 號</div>
        </footer>
      </section>
    </main>
  );
}
