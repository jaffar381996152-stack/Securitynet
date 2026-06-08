import NewsDetailClient from "./NewsDetailClient";
import { getCollection } from "@/app/libs/mongodb";
import { pageMetadata } from "@/app/libs/seo";

const FALLBACK_DESCRIPTION =
  "Stay updated with the latest developments in AI security, blockchain, and smart surveillance technology.";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const col = await getCollection("posts");
    const post = await col.findOne(
      { slug, status: "published" },
      { projection: { title: 1, excerpt: 1 } }
    );

    if (post) {
      return pageMetadata({
        title: post.title,
        description: post.excerpt || FALLBACK_DESCRIPTION,
        path: `/news/${slug}`,
      });
    }
  } catch {
    // DB unreachable or slug malformed — fall through to the generic metadata below
    // rather than letting generateMetadata throw and break the page.
  }

  return pageMetadata({
    title: "News & Guides",
    description: FALLBACK_DESCRIPTION,
    path: `/news/${slug}`,
  });
}

export default function NewsDetailPage() {
  return <NewsDetailClient />;
}
