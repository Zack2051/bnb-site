"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "首頁" },
  { href: "/rooms", label: "房型" },
  { href: "/services", label: "服務" },
  { href: "/location", label: "交通" },
  { href: "/rules", label: "注意" },
  { href: "/amenities", label: "景點" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white/95 backdrop-blur md:hidden">
      <ul className="mx-auto grid max-w-6xl grid-cols-6">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-1 py-3 text-center text-xs font-semibold transition ${
                  active
                    ? "text-neutral-900"
                    : "text-neutral-700 hover:text-neutral-900"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
