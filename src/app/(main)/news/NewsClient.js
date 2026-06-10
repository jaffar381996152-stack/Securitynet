"use client";
import { useEffect, useState } from "react";
import NewsHero from "./components/NewsHero";
import FeaturedPost from "./components/FeaturedPost";
import PostGrid from "./components/PostGrid";
import Newsletter from "./components/Newsletter";

export default function NewsClient() {
  const [featured, setFeatured] = useState(null);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);

  // Featured post — fetched once, independent of category filter
  useEffect(() => {
    fetch("/api/posts?page=1&limit=1")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setFeatured(data.data[0] || null);
      })
      .catch(() => {});
  }, []);

  // Grid posts — refetch on category change
  useEffect(() => {
    setLoading(true);
    setError(false);
    setPage(1);
    const params = new URLSearchParams({ page: "1", limit: "12" });
    if (activeCategory !== "all") params.set("category", activeCategory);
    fetch(`/api/posts?${params}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setPosts(data.data.filter((p) => p._id !== featured?._id));
          setCategories(data.categories || []);
          setPagination(data.pagination);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, featured]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setLoadingMore(true);
    const params = new URLSearchParams({ page: String(nextPage), limit: "12" });
    if (activeCategory !== "all") params.set("category", activeCategory);
    fetch(`/api/posts?${params}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setPosts((prev) => [...prev, ...data.data.filter((p) => p._id !== featured?._id)]);
          setPagination(data.pagination);
          setPage(nextPage);
        }
      })
      .finally(() => setLoadingMore(false));
  };

  const hasMore = pagination ? page < pagination.pages : false;

  return (
    <>
      <NewsHero
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <FeaturedPost post={featured} />
      <PostGrid
        posts={posts}
        loading={loading}
        error={error}
        hasMore={hasMore}
        loadingMore={loadingMore}
        onLoadMore={handleLoadMore}
      />
      <Newsletter />
    </>
  );
}
