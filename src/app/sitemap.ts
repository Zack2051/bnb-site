import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bnb-site.vercel.app";

  const paths = [
    "/",
    "/rooms",
    "/location",
    "/services",
    "/rules",
    "/amenities",
    "/booking",
  ];

  return paths.map((p) => ({
    url: `${baseUrl}${p}`,
    lastModified: new Date(),
  }));
}
