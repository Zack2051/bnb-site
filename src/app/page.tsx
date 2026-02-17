"use client";

import Link from "next/link";
import { useEffect, useState } from "react";


const images = [
  "/p25.JPG",
  "/p26.JPG",
  "/p27.JPG",
  "/p28.JPG",
  "/p29.JPG",
];

const NAV_ITEMS = [
  { href: "/rooms", title: "房型", desc: "房型照片、可住人數、設備" },
  { href: "/services", title: "服務", desc: "訂房方式、接待與協助" },
  { href: "/location", title: "交通", desc: "地址、停車、地圖導航" },
  { href: "/rules", title: "注意事項", desc: "入住退房、取消規則" },
  { href: "/amenities", title: "附近景點", desc: "老街、瀑布、步道" },
];

export default function HomePage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[560px] overflow-hidden md:h-[70vh] md:min-h-[520px]">
        {/* 背景輪播 */}
        {images.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}

        {/* 遮罩 */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_60%)]" />

        {/* 前景內容 */}
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-between px-4 py-6 text-white sm:px-6 sm:py-8 md:px-6 md:py-10">
          {/* Top bar */}
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 font-semibold backdrop-blur">
                住
              </div>
              <div className="leading-tight">
                <div className="text-lg font-semibold tracking-wide">
                  隨意空間（小沈的家）
                </div>
              </div>
            </div>

            <nav className="hidden gap-5 text-sm text-white/90 md:flex">
              {NAV_ITEMS.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="hover:text-white transition"
                >
                  {it.title}
                </Link>
              ))}
            </nav>
          </header>

          {/* Center copy */}
          <div className="max-w-2xl">
            <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
              把日子放慢，
              <br />
              住進風景裡。
            </h1>

            <p className="mt-4 text-base text-white/85 md:text-lg">
              遠離嘈雜十分，住進寧靜菁桐。適合家庭、情侶與想好好休息的你。
              <br />
              入住／退房時間與訂房方式請見下方資訊。
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/rooms"
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
              >
                看房型
              </Link>
              <Link
                href="/location"
                className="rounded-2xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/15 transition"
              >
                看交通
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 text-xs text-white/85">
              {["乾淨舒適", "安靜好睡", "友善接待", "停車資訊清楚"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/25 bg-white/10 px-3 py-1 backdrop-blur"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nav cards */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-xl font-semibold">快速導覽</h2>
        <p className="mt-2 text-sm text-neutral-600">
          點選下方項目查看房型、交通與入住資訊。
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NAV_ITEMS.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="group rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-lg font-semibold">{it.title}</div>
                  <div className="mt-1 text-sm text-neutral-600">
                    {it.desc}
                  </div>
                </div>
                <div className="rounded-2xl border border-neutral-200 px-3 py-2 text-xs text-neutral-700 group-hover:border-neutral-300">
                  查看 →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-12 border-t pt-6 text-center text-sm text-neutral-500">
          <div>
            © {new Date().getFullYear()} 隨意空間（小沈的家）
          </div>
          <div className="mt-1">
            226 新北市平溪區白石里 12 號
          </div>
        </footer>
      </section>
    </main>
  );
}
