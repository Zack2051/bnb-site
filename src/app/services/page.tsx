// src/app/services/page.tsx
"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Phone, Mail, MessageCircle,MessageCircleMore,Scroll } from "lucide-react";
import HeroCarousel from "@/app/components/HeroCarousel";

const images = ["/p25.JPG", "/p26.JPG", "/p27.JPG", "/p28.JPG", "/p29.JPG"];

const NAV_ITEMS = [
  { href: "/rooms", title: "房型", desc: "房型照片、可住人數、設備" },
  { href: "/services", title: "服務", desc: "訂房方式、接待與協助" },
  { href: "/location", title: "交通", desc: "地址、停車、地圖導航" },
  { href: "/rules", title: "注意事項", desc: "入住退房、取消規則" },
  { href: "/amenities", title: "附近景點", desc: "Wi-Fi、公共空間、備品" },
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

function ButtonLink({
  href,
  children,
  variant = "dark",
  external = false,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light";
  external?: boolean;
  icon?: React.ReactNode;
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition";
  const style =
    variant === "dark"
      ? "bg-neutral-900 text-white hover:bg-neutral-800"
      : "border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50";
  return (
    <a
      href={href}
      className={`${base} ${style} gap-2`}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {icon  ? <span className="inline-flex items-center">{icon}</span> : null}
    <span>{children}</span>
    </a>
  );
}
function ContactTile({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (<div className="rounded-2xl bg-neutral-50 p-4">
      <div className="flex items-center gap-2 text-xs text-neutral-700">
        <span className="inline-flex items-center justify-center">{icon}</span>
        <span>{label}</span>
      </div>
      <div className="mt-1 text-sm font-semibold text-neutral-900 break-all">
        {value}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  // ✅ 先用假資料，之後你再換成真的
  const lineHref = "https://lin.ee/FAKE12345"; // TODO: 換成你的 lin.ee 連結
  const phoneNumber = "0939-368-781"; // TODO: 換成你爸手機（顯示用）
  const phoneHref = "tel:+886939368781"; // TODO: 換成正確 tel（台灣 +886）
  const gmail = "jbhjkllf@gmail.com"; // TODO: 換成你的 Gmail
  const gmailHref = `mailto:${gmail}?subject=${encodeURIComponent(
    "【隨意空間】訂房/詢問"
  )}`;

  // 回饋表單（先放 placeholder）
  const feedbackFormHref = "https://forms.gle/PfvvierMuPK5wUYC8"; // TODO: 換成 Google Form 或 Tally

  const bookingInfoList = useMemo(
    () => [
      "入住日期 / 晚數（例如：2/10 住 2 晚）",
      "房型與人數（二人 / 四人 / 六人；大人/小孩）",
      "是否需要早餐（需要 / 不需要）",
      "預計抵達時間（大概幾點）",
      "交通方式（開車 / 大眾運輸）與停車需求",
      "聯絡人姓名 + 手機",
      "特殊需求（可選：加被/加枕、同行長輩等）",
    ],
    []
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[560px] overflow-hidden md:h-[70vh] md:min-h-[520px]">
        <HeroCarousel images={images} />

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-6 text-white sm:px-6 sm:py-8 md:px-6 md:py-10">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 font-semibold backdrop-blur">
                住
              </div>
              <div className="leading-tight">
                <div className="text-lg font-semibold tracking-wide">
                  隨意空間（小沈的家）
                </div>
                <div className="text-xs text-white/70">Services</div>
              </div>
            </div>

            <nav className="hidden gap-5 text-sm text-white/90 md:flex">
              {NAV_ITEMS.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className={`transition hover:text-white ${
                    it.href === "/services" ? "text-white" : "text-white/85"
                  }`}
                >
                  {it.title}
                </Link>
              ))}
            </nav>
          </header>

          <div className="mt-10 max-w-3xl">
            <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
              服務與聯絡
              <br />
              訂房、回饋、住宿問題一次搞定。
            </h1>

            <p className="mt-4 text-base text-white/85 md:text-lg">
              訂房與住宿問題建議使用 LINE / 電話最即時；若需要文字詳述或附檔，可使用
              Gmail。回饋建議使用表單，方便我們統整與改進。
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>訂房入口</Badge>
              <Badge>回饋入口</Badge>
              <Badge>住宿問題</Badge>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/booking" variant="dark" icon={<Scroll size={16} />}>
                一鍵填寫訂房資料
              </ButtonLink>
              <ButtonLink href={lineHref} variant="dark" external icon={<MessageCircleMore size={16} />}>
                加 LINE 詢問
              </ButtonLink>
              <ButtonLink href={phoneHref} variant="light" icon={<Phone size={16} />}>
                直接撥打電話
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-wrap gap-2">
          <Chip>訂房入口</Chip>
          <Chip>回饋入口</Chip>
          <Chip>住宿問題</Chip>
        </div>

        {/* Cards */}
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {/* ✅ Big Booking Card */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm lg:col-span-2">
            <div className="flex flex-col gap-6">
              <div>
                <div className="text-2xl font-semibold text-neutral-900">
                  立即訂房
                </div>
                <div className="mt-2 text-sm text-neutral-700">
                  建議使用 LINE 最快確認房況；緊急或需要快速回覆可直接電話。
                  若需文字詳述或附檔，也可用 Gmail。
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <ButtonLink href="/booking" variant="dark" icon={<Scroll size={16} />}>
                一鍵填寫訂房資料
                </ButtonLink>
                <ButtonLink href={lineHref} variant="dark" external icon={<MessageCircleMore size={16} />}>
                  用 LINE 訂房
                </ButtonLink>
                <ButtonLink href={phoneHref} variant="light" icon={<Phone size={16} />}>
                  電話訂房
                </ButtonLink>
              </div>

              <div className="rounded-2xl bg-neutral-50 p-5">
                <div className="text-sm font-semibold text-neutral-800">
                  建議提供資訊（越完整回覆越快）
                </div>
                <ul className="mt-3 grid gap-2 text-sm text-neutral-700 sm:grid-cols-2">
                  {bookingInfoList.map((x) => (
                    <li key={x} className="flex gap-2">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 text-xs text-neutral-700">
                  想先看看房型？可到{" "}
                  <Link href="/rooms" className="underline underline-offset-2">
                    房型頁
                  </Link>{" "}
                  選擇二人／四人／六人房。
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/rooms"
                  className="rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition"
                >
                  看房型 →
                </Link>
                <Link
                  href="/rules"
                  className="rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition"
                >
                  注意事項 / 規則
                </Link>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold text-neutral-900">
              住宿問題詢問
            </div>
            <div className="mt-2 text-sm text-neutral-700">
              入住期間有任何問題（設備、路況、停車、加被等）可用 LINE 留言；
              若是緊急狀況，建議直接電話。
            </div>

            <div className="mt-4 grid gap-2">
              <ButtonLink href={lineHref} variant="dark" external icon={<MessageCircleMore size={16} />}>
                用 LINE 詢問
              </ButtonLink>
              <ButtonLink href={phoneHref} variant="light" icon={<Phone size={16} />}>
                緊急直接電話
              </ButtonLink>
            </div>

            <div className="mt-4 rounded-2xl bg-neutral-50 p-4 text-xs text-neutral-700 leading-5">
              小提醒：若你正在路上，建議先告知「目前位置/預計抵達時間」，我們能更快協助。
            </div>
          </div>

          {/* Feedback */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-3">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 lg:max-w-[620px]">
                <div className="text-lg font-semibold text-neutral-900">
                  住宿回饋
                </div>
                <div className="mt-2 text-sm text-neutral-700">
                  建議使用表單回饋，方便我們統整與改善；也可以用 Gmail 或 LINE 留言。
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  <ButtonLink href={feedbackFormHref} variant="dark" external icon={<Scroll size={16} />}>
                    填寫回饋表單
                  </ButtonLink>
                  <ButtonLink href={gmailHref} variant="light" external icon={<Mail size={16} />}>
                    用 Gmail 回饋
                  </ButtonLink>
                  <ButtonLink href={lineHref} variant="light" external icon={<MessageCircleMore size={16} />}>
                    用 LINE 回饋
                  </ButtonLink>
                </div>

                <div className="mt-4 rounded-2xl bg-neutral-50 p-4 text-xs text-neutral-700 leading-5">
                  回饋內容建議包含：入住日期/房型、喜歡的地方、可改進之處（若可附照片更好）。
                </div>
              </div>

              <div className="w-full lg:max-w-[340px] rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
                <div className="text-sm font-semibold text-neutral-900">
                  我們會看見你的建議
                </div>
                <div className="mt-2 text-xs leading-5 text-neutral-700">
                  你的回饋會幫助我們把空間變得更舒服。若你願意被聯絡，可以在表單留下聯絡方式。
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="mt-8">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold text-neutral-900">聯絡資訊</div>
            <div className="mt-2 text-sm text-neutral-700">
              你可以把這些資訊放到 Google 地圖商家資訊與社群頁面，提升信任度與轉換率。
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl bg-neutral-50 p-4">
                <div className="text-xs text-neutral-700">LINE</div>
                <div className="mt-1 text-sm font-semibold text-neutral-900">
                  {lineHref}
                </div>
              </div>
              <div className="rounded-2xl bg-neutral-50 p-4">
                <div className="text-xs text-neutral-700">電話</div>
                <div className="mt-1 text-sm font-semibold text-neutral-900">
                  {phoneNumber}
                </div>
              </div>
              <div className="rounded-2xl bg-neutral-50 p-4">
                <div className="text-xs text-neutral-700">Gmail</div>
                <div className="mt-1 text-sm font-semibold text-neutral-900">
                  {gmail}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <Link
                href="/rules"
                className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-center text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition"
              >
                注意事項 / 取消規則
              </Link>
              <Link
                href="/rooms"
                className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-center text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition"
              >
                回到房型頁
              </Link>
            </div>
          </div>
        </div>

        <footer className="mt-12 border-t pt-6 text-center text-sm text-neutral-700">
          <div>© {new Date().getFullYear()} 隨意空間（小沈的家）</div>
          <div className="mt-1">226 新北市平溪區白石里 12 號</div>
        </footer>
      </section>
    </main>
  );
}
