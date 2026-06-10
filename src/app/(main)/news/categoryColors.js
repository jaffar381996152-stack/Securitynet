const CATEGORY_CLASSES = {
  announcement: "cat-announcement",
  guide: "cat-guide",
  security: "cat-security",
  partnership: "cat-partnership",
  update: "cat-update",
  ai: "cat-ai",
};

export function getCategoryClass(category) {
  if (!category) return "cat-general";
  return CATEGORY_CLASSES[category.toLowerCase()] || "cat-general";
}

export function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getThumbLabel(post) {
  if (post?.thumbLabel?.length) return post.thumbLabel;
  if (post?.category) return [post.category.toUpperCase()];
  return ["NEWS"];
}

export function getReadTime(post) {
  if (post?.readTime) return post.readTime;
  const words = (post?.content || []).reduce((sum, block) => {
    return sum + (block?.value ? String(block.value).split(/\s+/).length : 0);
  }, 0);
  return Math.max(1, Math.round(words / 200));
}
