"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "首頁" },
  { href: "/rooms", label: "房型" },
  { href: "/services", label: "服務" },
  { href: "/location", label: "交通" },
  { href: "/rules", label: "注意事項" },
  { href: "/amenities", label: "附近景點" },
  { href: "/booking", label: "訂房" },
];

export default function MobileMenuDrawer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-4 top-4 z-[60] rounded-2xl border border-neutral-200 bg-white/95 px-3 py-2 text-sm font-semibold text-neutral-900 shadow-sm backdrop-blur md:hidden"
        aria-label="開啟選單"
      >
        選單
      </button>

      {open ? (
        <div className="fixed inset-0 z-[70] md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-black/35"
            onClick={() => setOpen(false)}
            aria-label="關閉選單背景"
          />

          <aside className="absolute right-0 top-0 h-full w-[78vw] max-w-sm border-l border-neutral-200 bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-base font-semibold text-neutral-900">頁面導覽</div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-neutral-200 px-3 py-1.5 text-sm font-semibold text-neutral-800"
                aria-label="關閉選單"
              >
                關閉
              </button>
            </div>

            <nav className="grid gap-2">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? "bg-neutral-900 text-white"
                        : "border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      ) : null}
    </>
  );
}
