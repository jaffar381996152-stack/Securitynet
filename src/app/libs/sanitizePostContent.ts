import sanitizeHtml from "sanitize-html";

// Blog posts store `content` as an array of blocks: { type: "text"|"image"|"heading"|"raw", value }.
// "raw" blocks are rendered via dangerouslySetInnerHTML, so their HTML must be
// stripped of scripts/handlers before being persisted.
const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "figure", "figcaption", "u"]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ["src", "alt", "title", "width", "height"],
    a: ["href", "name", "target", "rel"],
    "*": ["style", "class"],
  },
};

export function sanitizePostContent(content: unknown): unknown {
  if (!Array.isArray(content)) return content;

  return content.map((block) => {
    if (block && typeof block === "object" && (block as any).type === "raw" && typeof (block as any).value === "string") {
      return { ...block, value: sanitizeHtml((block as any).value, SANITIZE_OPTIONS) };
    }
    return block;
  });
}
