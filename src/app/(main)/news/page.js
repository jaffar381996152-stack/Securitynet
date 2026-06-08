import NewsClient from "./NewsClient";
import { pageMetadata } from "@/app/libs/seo";

export const metadata = pageMetadata({
  title: "News & Guides",
  description:
    "Stay updated with the latest developments in AI security, blockchain, and smart surveillance technology.",
  path: "/news",
});

export default function NewsPage() {
  return <NewsClient />;
}
