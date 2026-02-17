"use client";
import { useEffect, useState } from "react";

export default function HeroCarousel({
  images,
  intervalMs = 4000,
  fadeMs = 1000,
  dim = 0.45,
}: {
  images: string[];
  intervalMs?: number;
  fadeMs?: number;
  dim?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images, intervalMs]);

  return (
    <>
      {/* 背景輪播 */}
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === index ? 1 : 0,
            transition: `opacity ${fadeMs}ms ease`,
          }}
        />
      ))}

      {/* 遮罩（確保文字清楚） */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0,0,0,${dim})` }}
      />

      {/* 光暈 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_60%)]" />
    </>
  );
}
