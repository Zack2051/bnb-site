// src/app/amenities/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import HeroCarousel from "@/app/components/HeroCarousel";

const images = ["/p25.JPG", "/p26.JPG", "/p27.JPG", "/p28.JPG", "/p29.JPG"];

const NAV_ITEMS = [
  { href: "/rooms", title: "房型", desc: "房型照片、可住人數、設備" },
  { href: "/services", title: "服務", desc: "訂房方式、接待與協助" },
  { href: "/location", title: "交通", desc: "地址、停車、地圖導航" },
  { href: "/rules", title: "注意事項", desc: "入住退房、取消規則" },
  { href: "/amenities", title: "附近景點", desc: "老街、瀑布、步道" },
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs text-white/85 backdrop-blur">
      {children}
    </span>
  );
}

function ButtonLink({
  href,
  children,
  variant = "dark",
  external = true,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light";
  external?: boolean;
  icon?: React.ReactNode;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition";
  const style =
    variant === "dark"
      ? "bg-neutral-900 text-white hover:bg-neutral-800"
      : "border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50";
  return (
    <a
      href={href}
      className={`${base} ${style}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {icon ? <span className="inline-flex items-center">{icon}</span> : null}
      <span>{children}</span>
    </a>
  );
}

// 產生「不需要任何檔案」的圖片佔位（data URI SVG）
// 之後換真圖：把 image 改成 "/attractions/jingtong/1.jpg" 這種即可
function makePlaceholder(label: string) {
  const svg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#f5f5f5"/>
          <stop offset="1" stop-color="#e9e9e9"/>
        </linearGradient>
      </defs>
      <rect width="1400" height="900" fill="url(#g)"/>
      <rect x="70" y="70" width="1260" height="760" rx="56" fill="#ffffff" opacity="0.70"/>
      <text x="700" y="455" font-family="system-ui, -apple-system, Segoe UI, Roboto" font-size="56" fill="#6b7280" text-anchor="middle">
        ${label}
      </text>
      <text x="700" y="525" font-family="system-ui, -apple-system, Segoe UI, Roboto" font-size="26" fill="#9ca3af" text-anchor="middle">
        上傳照片後替換此佔位
      </text>
    </svg>
  `);
  return `data:image/svg+xml;utf8,${svg}`;
}

type Attraction = {
  id: string;
  name: string;
  intro: string;
  address: string; // 可先「（待補）」；你給我我也可幫你補
  tags: string[];
  image: string; // 先用 placeholder
};

function makeGoogleMapsHref(query: string) {
  const q = encodeURIComponent(query);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export default function AmenitiesAsAttractionsPage() {
  const ATTRACTIONS: Attraction[] = useMemo(
    () => [
      {
        id: "jingtong-oldstreet",
        name: "菁桐老街",
        intro:
          "山城老街氛圍濃厚，日式車站與周邊街景很適合散步、拍照、慢慢逛。",
        address: "新北市平溪區 菁桐老街菁桐街",
        tags: ["拍照", "散步", "老街"],
        image: "/p15.jpg",
      },
      {
        id: "jingtong-japanese",
        name: "日式建築群（菁桐周邊）",
        intro:
          "木造建築與聚落感很迷人，適合喜歡老屋、文化景觀的人，隨走隨拍都好看。",
        address: "新北市平溪區 菁桐日式建築群",
        tags: ["文化", "老屋", "拍照"],
        image: "/p16.jpg",
      },
      {
        id: "shulang-mountain",
        name: "薯榔尖登山步道",
        intro:
          "想流汗運動就選這條！早上出發最舒服，沿途有自然景觀，適合安排半日走走。",
        address: "新北市平溪區 薯榔尖登山步道",
        tags: ["登山", "運動", "自然"],
        image: "/p23.jpg",
      },
      {
        id: "coal-park",
        name: "煤礦紀念公園",
        intro:
          "礦業歷史與遺跡景觀，走一圈就能感受到地方故事；和菁桐老街非常適合順遊。",
        address: "新北市平溪區菁桐里",
        tags: ["歷史", "散步", "親子"],
        image: "/p24.jpg",
      },
      {
        id: "pingxi-oldstreet",
        name: "平溪老街",
        intro:
          "山城老街走走逛逛、吃點小點心很剛好。若想搭平溪線一日遊，這裡是必經點。",
        address: "新北市平溪區平溪街",
        tags: ["老街", "小吃", "散步"],
        image: "/p19.jpg",
      },
      {
        id: "lingjiao-waterfall",
        name: "嶺腳瀑布",
        intro:
          "瀑布景色清涼又療癒，喜歡自然系照片的人很適合來。雨後地面較濕滑，記得慢走。",
        address: "新北市平溪區嶺腳里嶺腳瀑布",
        tags: ["瀑布", "自然", "拍照"],
        image: "/p20.jpg",
      },
      {
        id: "lingjiao-mountain",
        name: "嶺腳寮山",
        intro:
          "偏登山客路線，喜歡安靜走山、想要一點挑戰的人會愛。建議備水與止滑鞋。",
        address: "新北市平溪區嶺腳里 嶺腳寮山",
        tags: ["登山", "挑戰", "安靜"],
        image: "/p21.jpg",
      },

      // ✅ 望古瀑布（已寫進去）
      {
        id: "wanggu-waterfall",
        name: "望古瀑布",
        intro:
          "森林步道氛圍感很強，短程就能看到瀑布，輕鬆又有成就感，是很受歡迎的秘境點。",
        address: "新北市平溪區望古里 望古瀑布",
        tags: ["瀑布", "森林", "輕鬆走"],
        image: "/p22.jpg",
      },
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
                <div className="text-xs text-white/70">Nearby Attractions</div>
              </div>
            </div>

            <nav className="hidden gap-5 text-sm text-white/90 md:flex">
              {NAV_ITEMS.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className={`transition hover:text-white ${
                    it.href === "/amenities" ? "text-white" : "text-white/85"
                  }`}
                >
                  {it.title}
                </Link>
              ))}
            </nav>
          </header>

          <div className="mt-10 max-w-3xl">
            <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
              附近景點
            </h1>

            <p className="mt-4 text-base text-white/85 md:text-lg">
              這頁整理住附近的老街、瀑布與步道可供行程參考。
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>老街散步</Badge>
              <Badge>瀑布森林</Badge>
              <Badge>登山步道</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* List */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="space-y-6">
          {ATTRACTIONS.map((a) => (
            <article
              key={a.id}
              className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <div className="grid gap-5 lg:grid-cols-12 lg:items-start">
                {/* Photo */}
                <div className="lg:col-span-5">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50">
                    <Image
                      src={a.image}
                      alt={`${a.name} 照片`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 520px"
                      priority={a.id === "jingtong-oldstreet"}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-7">
                  <div className="flex flex-col gap-4">
                    <div>
                      <h2 className="text-2xl font-semibold text-neutral-900">
                        {a.name}
                      </h2>
                      <p className="mt-2 text-sm text-neutral-600">{a.intro}</p>
                    </div>

                    <div className="rounded-2xl bg-neutral-50 p-4">
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <MapPin size={16} />
                        <span>地址</span>
                      </div>
                      <div className="mt-1 text-sm font-semibold text-neutral-900">
                        {a.address}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {a.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <ButtonLink
                        href={makeGoogleMapsHref(a.name)}
                        variant="dark"
                        external
                        icon={<ExternalLink size={16} />}
                      >
                        Google 導航
                      </ButtonLink>

                      <Link
                        href="/rooms"
                        className="inline-flex items-center justify-center rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition"
                      >
                        回到房型頁
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <footer className="mt-12 border-t pt-6 text-center text-sm text-neutral-500">
          <div>© {new Date().getFullYear()} 隨意空間（小沈的家）</div>
          <div className="mt-1">226 新北市平溪區白石里 12 號</div>
        </footer>
      </section>
    </main>
  );
}
