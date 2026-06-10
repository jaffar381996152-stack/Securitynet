import NewsClient from "./NewsClient";
import { pageMetadata } from "@/app/libs/seo";

export const metadata = pageMetadata({
  title: "Intelligence Feeds — News & Updates",
  description:
    "Latest news, security research, guides, and announcements from SecurityNet.ai — the AI-powered blockchain security platform.",
  path: "/news",
});

export default function NewsPage() {
  return <NewsClient />;
}
