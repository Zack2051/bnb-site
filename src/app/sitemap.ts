export default function sitemap() {
  const baseUrl = "https://bnb-site.vercel.app"; // 改成你的網址

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/rooms`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/location`,
      lastModified: new Date(),
    },
    {url: `${baseUrl}/services`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/rules`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/amenities`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
    },
  ];
}
