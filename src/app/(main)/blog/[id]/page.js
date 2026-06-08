import BlogDetail from "../components/BlogDetail";
import { articles, getArticleExcerpt } from "../components/articles";
import { pageMetadata } from "@/app/libs/seo";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const article = articles[id];

  if (!article) {
    return pageMetadata({
      title: "Article Not Found",
      description: "The blog post you're looking for doesn't exist or may have been moved.",
      path: `/blog/${id}`,
    });
  }

  return pageMetadata({
    title: article.title,
    description: getArticleExcerpt(article) || "Read the latest from the SecurityNet blog.",
    path: `/blog/${id}`,
  });
}

export default async function Page({ params }) {
  const { id } = await params;
  return <BlogDetail id={id} />;
}
