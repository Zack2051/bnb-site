// src/app/location/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import HeroCarousel from "@/app/components/HeroCarousel";

const images = ["/p28.JPG", "/p29.JPG", "/p19.jpg", "/p20.jpg", "/p21.jpg"];

const NAV_ITEMS = [
  { href: "/rooms", title: "房型", desc: "房型照片、可住人數、設備" },
  { href: "/services", title: "服務", desc: "訂房方式、接待與協助" },
  { href: "/location", title: "交通", desc: "地址、停車、地圖導航" },
  { href: "/rules", title: "注意事項", desc: "入住退房、取消規則" },
  { href: "/amenities", title: "附近景點", desc: "老街、步道、瀑布" },
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

function SectionTitle({
  title,
  desc,
}: {
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {desc ? <p className="mt-2 text-sm text-neutral-600">{desc}</p> : null}
    </div>
  );
}

function InfoRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-neutral-50 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="text-sm font-semibold text-neutral-900">{k}</div>
      <div className="text-sm leading-6 text-neutral-700 sm:max-w-[72%]">
        {v}
      </div>
    </div>
  );
}

export default function LocationPage() {
  // TODO: 改成你的實際地址（你主頁 footer 已有，先沿用）
  const address = "226 新北市平溪區白石里 12 號";

  // TODO: 把下面換成你 Google Maps 的「分享連結」或 iframe src
  // 你可以在 Google Maps 搜尋地點 -> 分享 -> 嵌入地圖 -> 複製 HTML，取出 src
  const mapEmbedSrc =
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d225.96034904870072!2d121.7208456!3d25.0216645!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x345d571deb9049bd%3A0x37cdfc3126d34789!2z6Zqo5oSP56m66Ze0KOWwj-ayiOeahOWutinlkIjms5XmsJHlrr8!5e0!3m2!1szh-TW!2stw!4v1769502764033!5m2!1szh-TW!2stw"
  const openMapHref = "https://maps.app.goo.gl/tQXJyx6WKE5Z3W8z6";

  const [routeTab, setRouteTab] = useState<"shiding" | "keelung">("shiding");

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
                <div className="text-xs text-white/70">Location</div>
              </div>
            </div>

            <nav className="hidden gap-5 text-sm text-white/90 md:flex">
              {NAV_ITEMS.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className={`transition hover:text-white ${
                    it.href === "/location" ? "text-white" : "text-white/85"
                  }`}
                >
                  {it.title}
                </Link>
              ))}
            </nav>
          </header>

          <div className="mt-10 max-w-3xl">
            <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
              交通資訊
              </h1>

            <p className="mt-4 text-base text-white/85 md:text-lg">
              這裡整理了地址、導航、開車路線與停車資訊。
              <br />
              若抵達時間有變動，歡迎先聯絡，我們可以協助你順利抵達。
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>Google 導航直達</Badge>
              <Badge>提供停車資訊</Badge>
              <Badge>路邊可停</Badge>
              <Badge>停車場可停 10 台</Badge>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={openMapHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
              >
                開啟 Google 導航
              </a>
              <Link
                href="/rooms"
                className="rounded-2xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/15 transition"
              >
                看房型
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-wrap gap-2">
          <Chip>地址一鍵複製</Chip>
          <Chip>兩條開車路線</Chip>
          <Chip>停車場可停 10 台</Chip>
        </div>

        {/* Address + Map */}
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <SectionTitle
              title="地址與導航"
              desc="建議直接使用 Google 地圖導航，路線清楚可達。"
            />

            <div className="space-y-3">
              <InfoRow k="地址" v={address} />

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(address);
                      alert("已複製地址 ✅");
                    } catch {
                      alert("複製失敗，請手動選取複製");
                    }
                  }}
                  className="rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition"
                >
                  複製地址
                </button>

                <a
                  href={openMapHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition"
                >
                  在 Google 地圖開啟 →
                </a>
              </div>

              <div className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700 leading-6">
                若你抵達時間臨時變動，建議先聯絡我們，避免等待或錯過接待時間。
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-2 shadow-sm">
            <div className="overflow-hidden rounded-2xl">
              <iframe
                title="Google Map"
                src={mapEmbedSrc}
                width="100%"
                height="340"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="px-4 pb-4 pt-3 text-xs text-neutral-500">
              若地圖無法顯示，請點「在 Google 地圖開啟」使用外部導航。
            </div>
          </div>
        </div>

        {/* Driving Routes */}
        <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <SectionTitle
            title="開車前往"
            desc="我們提供兩條方向建議：石碇出發、基隆出發。你可以依自己的位置選擇路線。"
          />

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setRouteTab("shiding")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                routeTab === "shiding"
                  ? "bg-neutral-900 text-white"
                  : "border border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50"
              }`}
            >
              從石碇出發
            </button>
            <button
              type="button"
              onClick={() => setRouteTab("keelung")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                routeTab === "keelung"
                  ? "bg-neutral-900 text-white"
                  : "border border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50"
              }`}
            >
              從基隆出發
            </button>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold">
                    {routeTab === "shiding" ? "石碇出發" : "基隆出發"}
                  </div>
                  <div className="mt-1 text-sm text-neutral-600">
                    以下為方向指引（你可依實際路況調整），建議仍以 Google 導航為主。
                  </div>
                </div>
                <div className="rounded-2xl border border-neutral-200 px-3 py-2 text-xs text-neutral-700">
                  路線
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {routeTab === "shiding" ? (
                  <>
                    <InfoRow
                      k="路線摘要"
                      v="自國3木柵/國5石碇下出口→延106縣道(平溪方向)行駛約半小時 → 抵達菁桐"
                    />
                    <InfoRow
                      k="關鍵提醒"
                      v="駛過平菁橋後右轉並直行約400公尺即可抵達目的地。"
                    />
                    <InfoRow
                      k="溫馨提醒"
                      v="山區路段夜晚較暗，請減速慢行，注意會車與行人。"
                    />
                  </>
                ) : (
                  <>
                    <InfoRow
                      k="路線摘要"
                      v="行駛台2丁(貢寮方向)→在十分行駛106縣道(石碇方向)→抵達菁桐 "
                    />
                    <InfoRow
                      k="關鍵提醒"
                      v="在十分轉入106縣道後，沿路直行約15分鐘，在平菁橋無須右轉並直行400公尺即可抵達目的地。"
                    />
                    <InfoRow
                      k="溫馨提醒"
                      v="靠近民宿周邊可路邊停靠與進出，請依現場指示與安全為優先。"
                    />
                  </>
                )}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={openMapHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition"
                >
                  直接用 Google 導航 →
                </a>
                <Link
                  href="/services"
                  className="rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition"
                >
                  需要協助
                </Link>
              </div>
            </div>

            {/* Parking */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold">停車資訊</div>
                  <div className="mt-1 text-sm text-neutral-600">
                    兩種停車方式：路邊停車與停車場（可停 10 輛）。
                  </div>
                </div>
                <div className="rounded-2xl border border-neutral-200 px-3 py-2 text-xs text-neutral-700">
                  Parking
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <InfoRow
                  k="路邊停車"
                  v="民宿周邊可路邊停車，請依照現場標示與交通安全停放，勿影響出入口。"
                />
                <InfoRow
                  k="停車場"
                  v="附近備有停車場，可停約 10 輛車；如遇尖峰時段建議提前抵達或先聯絡我們協助指引。"
                />
                <InfoRow
                  k="提醒"
                  v="夜間進出請減速，停車後請勿大聲喧嘩，一起維護鄰里安寧。"
                />
              </div>

              <div className="mt-5 rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700 leading-6">
                若你會同時多台車抵達，建議先告知車數，我們可協助安排更順暢的停放方式。
              </div>
            </div>
          </div>
        </div>

        {/* Public transport */}
        <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <SectionTitle
            title="大眾運輸"
            desc="可搭乘公車或台鐵抵達附近，再依需求步行前往。"
          />

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold">台鐵</div>
                  <div className="mt-1 text-sm text-neutral-600">
                    建議先查好班次；抵達車站後可轉乘其他交通工具。
                  </div>
                </div>
                <div className="rounded-2xl border border-neutral-200 px-3 py-2 text-xs text-neutral-700">
                  TRA
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <InfoRow k="最近車站" v="平溪線-菁桐站" />
                <InfoRow
                  k="到民宿"
                  v="出老街後，沿著菁桐街步行約10分鐘/如需協助到達請務必通知我們"
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/services"
                  className="rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition"
                >
                  聯絡我們協助 →
                </Link>
                <Link
                  href="/rooms"
                  className="rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition"
                >
                  看房型
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold">公車</div>
                  <div className="mt-1 text-sm text-neutral-600">
                    山區班次可能較少，建議出發前先確認時刻。
                  </div>
                </div>
                <div className="rounded-2xl border border-neutral-200 px-3 py-2 text-xs text-neutral-700">
                  Bus
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <InfoRow k="最近站牌" v="搭乘795至中埔站下車" />
                <InfoRow
                  k="下車後"
                  v="步行約800公尺。"
                />
                <InfoRow
                  k="備註"
                  v="若你不確定路線，歡迎先聯絡，我們可提供更清楚的抵達建議。"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Arrival notes + CTA */}
        <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-lg font-semibold">抵達提醒</div>
              <div className="mt-1 text-sm text-neutral-600">
                晚間路段較暗，請減速慢行；若抵達時間有變動或迷失方向，建議先聯絡我們。
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
                href="/rules"
                className="rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition"
              >
                注意事項
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t pt-6 text-center text-sm text-neutral-500">
          <div>© {new Date().getFullYear()} 隨意空間（小沈的家）</div>
          <div className="mt-1">{address}</div>
        </footer>
      </section>
    </main>
  );
}
