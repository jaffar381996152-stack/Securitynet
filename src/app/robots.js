const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://securitynet.ai";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard/",
        "/signin",
        "/register",
        "/forget",
        "/verify",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
