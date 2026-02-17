// src/app/rooms/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import HeroCarousel from "@/app/components/HeroCarousel";

const images = ["/p6.jpg", "/p7.jpg", "/p8.jpg", "/p9.JPG", "/p10.JPG"];

const NAV_ITEMS = [
  { href: "/rooms", title: "房型", desc: "房型照片、可住人數、設備" },
  { href: "/services", title: "服務", desc: "訂房方式、接待與協助" },
  { href: "/location", title: "交通", desc: "地址、停車、地圖導航" },
  { href: "/rules", title: "注意事項", desc: "入住退房、取消規則" },
  { href: "/amenities", title: "附近景點", desc: "老街、步道、瀑布" },
];

// 產生「不需要任何檔案」的圖片佔位（data URI SVG）
// 之後你要換成真圖：把 room.images 改成 "/rooms/double/1.jpg" 這種即可
function makePlaceholder(label: string) {
  const svg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f5f5f5"/>
          <stop offset="1" stop-color="#e9e9e9"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#g)"/>
      <rect x="60" y="60" width="1080" height="680" rx="48" fill="#ffffff" opacity="0.65"/>
      <text x="600" y="395" font-family="system-ui, -apple-system, Segoe UI, Roboto" font-size="56" fill="#6b7280" text-anchor="middle">
        ${label}
      </text>
      <text x="600" y="460" font-family="system-ui, -apple-system, Segoe UI, Roboto" font-size="26" fill="#9ca3af" text-anchor="middle">
        上傳圖片後替換此佔位
      </text>
    </svg>
  `);
  return `data:image/svg+xml;utf8,${svg}`;
}

type Room = {
  key: "double" | "quad" | "six";
  name: string;
  capacity: string;
  beds: string;
  bathroom: string;
  breakfast: string;
  highlight: string;
  tags: string[];
  images: string[];
  priceFrom: number;
};

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

export default function RoomsPage() {
  const ROOMS: Room[] = useMemo(
    () => [
      {
        key: "double",
        name: "二人房",
        capacity: "2 人",
        beds: "雙人床 × 1",
        bathroom: "獨立衛浴",
        breakfast: "附早餐",
        priceFrom: 2880,
        highlight: "適合情侶與雙人小旅行，安靜好睡。",
        tags: ["適合情侶", "免費Wi-Fi", "有線電視"],
        images: [
          "/p6.jpg",
          "/p7.jpg",
          "/p8.jpg",
        ],
      },
      {
        key: "quad",
        name: "四人房",
        capacity: "4 人",
        beds: "雙人床 × 2",
        bathroom: "獨立衛浴",
        breakfast: "附早餐",
        priceFrom: 4680,
        highlight: "小家庭或朋友出遊，空間更寬敞。",
        tags: ["備有麻將桌", "免費Wi-Fi", "景觀陽台"],
        images: [
          "/p9.JPG",
          "/p11.JPG",
          "/p10.JPG",
        ],
      },
      {
        key: "six",
        name: "六人房",
        capacity: "6 人",
        beds: "雙人床 × 3",
        bathroom: "獨立衛浴",
        breakfast: "附早餐",
        priceFrom: 6680,
        highlight: "多人一起住最剛好，適合家庭與朋友聚會。",
        tags: ["多人入住", "免費Wi-Fi", "卡拉OK設備"],
        images: [
          "/p12.JPG",
          "/p13.JPG",
          "/p14.JPG",
        ],
      },
    ],
    []
  );

  // Lightbox state
  const [lightbox, setLightbox] = useState<{
    open: boolean;
    roomIdx: number;
    imgIdx: number;
  }>({ open: false, roomIdx: 0, imgIdx: 0 });

  const currentRoom = ROOMS[lightbox.roomIdx];
  const currentImg = currentRoom?.images?.[lightbox.imgIdx];

  const openLightbox = (roomIdx: number, imgIdx: number) => {
    setLightbox({ open: true, roomIdx, imgIdx });
  };

  const closeLightbox = () => setLightbox((s) => ({ ...s, open: false }));

  const prevImg = () => {
    setLightbox((s) => {
      const imgs = ROOMS[s.roomIdx].images;
      const next = (s.imgIdx - 1 + imgs.length) % imgs.length;
      return { ...s, imgIdx: next };
    });
  };

  const nextImg = () => {
    setLightbox((s) => {
      const imgs = ROOMS[s.roomIdx].images;
      const next = (s.imgIdx + 1) % imgs.length;
      return { ...s, imgIdx: next };
    });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero (match your homepage vibe) */}
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
                <div className="text-xs text-white/70">Rooms</div>
              </div>
            </div>

            <nav className="hidden gap-5 text-sm text-white/90 md:flex">
              {NAV_ITEMS.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className={`transition hover:text-white ${
                    it.href === "/rooms" ? "text-white" : "text-white/85"
                  }`}
                >
                  {it.title}
                </Link>
              ))}
            </nav>
          </header>

          <div className="mt-10 max-w-3xl">
            <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
              房型一覽
            </h1>

            <p className="mt-4 text-base text-white/85 md:text-lg">
              這頁一次看完三種房型。點擊圖片可放大查看細節。
              <br />
              訂房方式與協助請見「服務」頁。
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>三種房型</Badge>
              <Badge>每房 3 張照片</Badge>
              <Badge>點圖可放大</Badge>
              <Badge>乾淨舒適</Badge>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/services"
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
              >
                訂房方式
              </Link>
              <Link
                href="/rules"
                className="rounded-2xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/15 transition"
              >
                注意事項
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-wrap gap-2">
          <Chip>情侶</Chip>
          <Chip>家庭</Chip>
          <Chip>朋友聚會</Chip>
          <Chip>圖片可放大查看</Chip>
        </div>

        <div className="mt-6 space-y-6">
          {ROOMS.map((room, roomIdx) => (
            <div
              key={room.key}
              className="relative rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-semibold">{room.name}</h2>
                    <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-800">
                      可住 {room.capacity}
                    </span>
                    </div>

                  <p className="mt-2 text-sm text-neutral-600">
                    {room.highlight}
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-neutral-50 p-4">
                      <div className="text-xs text-neutral-500">床型</div>
                      <div className="mt-1 text-sm font-semibold text-neutral-900">
                        {room.beds}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-neutral-50 p-4">
                      <div className="text-xs text-neutral-500">衛浴</div>
                      <div className="mt-1 text-sm font-semibold text-neutral-900">
                        {room.bathroom}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-neutral-50 p-4">
                     <div className="text-xs text-neutral-500">早餐</div>
                     <div className="mt-1 text-sm font-semibold text-neutral-900">
                        {room.breakfast}
                </div>
                </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {room.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href="/services"
                      className="rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition"
                    >
                      詢問 / 訂房 →
                    </Link>
                    <Link
                      href="/rules"
                      className="rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition"
                    >
                      注意事項
                    </Link>
                  </div>
                </div>

                {/* Images (3) */}
                <div className="w-full lg:max-w-[520px]">
                  <div className="grid gap-3 sm:grid-cols-3">
                    {room.images.map((src, imgIdx) => (
                      <button
                        key={imgIdx}
                        type="button"
                        onClick={() => openLightbox(roomIdx, imgIdx)}
                        className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        aria-label={`放大查看 ${room.name} 圖片 ${imgIdx + 1}`}
                      >
                        <div className="relative aspect-[4/3] w-full">
                          <Image
                            src={src}
                            alt={`${room.name} 圖片 ${imgIdx + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 33vw, 200px"
                            priority={roomIdx === 0 && imgIdx === 0}
                          />
                        </div>

                        <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-2">
                          <span className="rounded-full border border-white/30 bg-black/25 px-2 py-1 text-[11px] text-white backdrop-blur opacity-0 transition group-hover:opacity-100">
                            放大查看
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <p className="mt-2 text-xs text-neutral-500">
                  <span className="text-red-500 font-semibold">*</span>
                   本房型均附有吹風機、浴巾等各個人清潔用品。 
                  </p>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border border-neutral-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur lg:absolute lg:bottom-5 lg:right-5 lg:mt-0 lg:text-right">
                <div className="text-xs text-neutral-500">價格</div>
                <div className="mt-0.5 text-lg font-semibold text-neutral-900">
                  NT$ {room.priceFrom.toLocaleString()} /晚
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-12 border-t pt-6 text-center text-sm text-neutral-500">
          <div>© {new Date().getFullYear()} 隨意空間（小沈的家）</div>
          <div className="mt-1">226 新北市平溪區白石里 12 號</div>
        </footer>
      </section>

      {/* Lightbox */}
      {lightbox.open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-neutral-900">
                  {currentRoom?.name}｜圖片 {lightbox.imgIdx + 1}/
                  {currentRoom?.images.length}
                </div>
                <div className="text-xs text-neutral-500">
                  點左右箭頭切換，或按背景關閉
                </div>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="rounded-2xl border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition"
              >
                關閉 ✕
              </button>
            </div>

            <div className="relative aspect-[16/10] w-full bg-neutral-100">
              {currentImg ? (
                <Image
                  src={currentImg}
                  alt={`${currentRoom?.name} 放大圖`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              ) : null}

              {/* Prev/Next */}
              <button
                type="button"
                onClick={prevImg}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-2xl border border-white/30 bg-black/25 px-3 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-black/35 transition"
                aria-label="上一張"
              >
                ←
              </button>
              <button
                type="button"
                onClick={nextImg}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-2xl border border-white/30 bg-black/25 px-3 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-black/35 transition"
                aria-label="下一張"
              >
                →
              </button>
            </div>

            {/* Thumbs */}
            <div className="flex gap-2 overflow-x-auto border-t p-3">
              {currentRoom.images.map((src, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    setLightbox((s) => ({ ...s, imgIdx: idx }))
                  }
                  className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-2xl border transition ${
                    idx === lightbox.imgIdx
                      ? "border-neutral-900"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                  aria-label={`切換到第 ${idx + 1} 張`}
                >
                  <Image
                    src={src}
                    alt="thumb"
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
