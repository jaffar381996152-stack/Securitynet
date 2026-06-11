import { getCollection } from "@/app/libs/mongodb";
import { articles } from "./(main)/blog/components/articles";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://securitynet.ai";

const STATIC_ROUTES = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/presale", changeFrequency: "daily", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/services", changeFrequency: "monthly", priority: 0.6 },
  { path: "/tokenomics", changeFrequency: "monthly", priority: 0.7 },
  { path: "/whitepaper", changeFrequency: "monthly", priority: 0.5 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.6 },
  { path: "/news", changeFrequency: "daily", priority: 0.7 },
  { path: "/contact-us", changeFrequency: "yearly", priority: 0.4 },
];

export default async function sitemap() {
  const now = new Date();

  const entries = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  for (const slug of Object.keys(articles)) {
    entries.push({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    });
  }

  try {
    const col = await getCollection("posts");
    const posts = await col
      .find({ status: "published" }, { projection: { slug: 1, publishedAt: 1 } })
      .toArray();
    for (const post of posts) {
      entries.push({
        url: `${SITE_URL}/news/${post.slug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  } catch {
    // DB unreachable at build/request time — ship the sitemap with static
    // routes rather than failing the whole route over a dynamic add-on.
  }

  return entries;
}
