"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Guide", "News", "Tutorial", "Announcement", "General"];

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function renderMarkdownPreview(text) {
  if (!text) return { __html: "" };
  let html = text
    .replace(/^(#{1,6})\s+(.*)$/gm, (match, hashes, content) => {
      const level = hashes.length;
      if (level === 1) return `<h1 class="text-3xl font-bold mt-6 mb-2">${content}</h1>`;
      if (level === 2) return `<h2 class="text-2xl font-bold mt-5 mb-2">${content}</h2>`;
      return `<h3 class="text-xl font-bold mt-4 mb-2">${content}</h3>`;
    })
    .replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gm, '<a href="$2" class="text-[var(--gold)] underline" target="_blank">$1</a>');
  return { __html: html };
}

async function uploadToS3(file) {
  const ext = file.name.split(".").pop();
  const key = `posts/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  
  const res = await fetch(`/api/s3upload?file=${encodeURIComponent(key)}&type=${encodeURIComponent(file.type)}`);
  const data = await res.json();

  if (!res.ok || !data.success) {
    alert("S3 Upload Failed: Make sure NEXT_S3_ACCESS_KEY and NEXT_S3_SECRET_KEY are set in your .env.local file! Server said: " + (data.error || "Unknown error"));
    throw new Error(data.error || "No presigned URL");
  }

  const presignedUrl = data.data.presignedUrl;
  const putRes = await fetch(presignedUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type }
  });

  if (!putRes.ok) {
    let awsError = "";
    try { awsError = await putRes.text(); } catch(e) {}
    alert("AWS S3 Rejected the Upload! Status: " + putRes.status + "\n\nError details from AWS:\n" + awsError);
    throw new Error("S3 PUT Failed");
  }

  return presignedUrl.split("?")[0];
}

function BlockEditor({ block, index, onChange, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToS3(file);
      onChange(index, { ...block, value: url });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border border-[var(--border-sub)] rounded-xl p-4 bg-[var(--bg-tertiary)] group">
      <div className="flex items-center gap-2 mb-3">
        {/* Type selector */}
        <select
          value={block.type}
          onChange={(e) => onChange(index, { ...block, type: e.target.value, value: "", caption: "" })}
          className="text-xs border border-[var(--border-sub)] rounded-lg px-2 py-1 bg-[var(--bg-secondary)] text-[var(--text-sec)] focus:outline-none focus:border-[var(--gold)]"
        >
          <option value="text">Paragraph</option>
          <option value="heading">Heading</option>
          <option value="image">Image</option>
          <option value="raw">Large Text Box</option>
        </select>
        <div className="flex gap-1 ml-auto">
          <button onClick={() => onMoveUp(index)} disabled={isFirst} className="w-6 h-6 text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30 text-xs">↑</button>
          <button onClick={() => onMoveDown(index)} disabled={isLast} className="w-6 h-6 text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30 text-xs">↓</button>
          <button onClick={() => onDelete(index)} className="w-6 h-6 text-[var(--c-danger)] hover:opacity-80 text-xs">✕</button>
        </div>
      </div>

      {block.type === "image" ? (
        <div>
          {block.value ? (
            <div className="relative">
              <img src={block.value} alt="" className="w-full max-h-60 object-cover rounded-lg" />
              <button
                onClick={() => onChange(index, { ...block, value: "" })}
                className="absolute top-2 right-2 bg-[var(--bg-tertiary)] rounded-full w-6 h-6 text-[var(--c-danger)] shadow text-xs"
              >✕</button>
            </div>
          ) : (
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-[var(--border-sub)] rounded-xl h-32 flex flex-col items-center justify-center cursor-pointer hover:border-[var(--gold)] transition-colors"
            >
              {uploading ? (
                <span className="text-sm text-[var(--text-muted)]">Uploading...</span>
              ) : (
                <>
                  <span className="text-2xl mb-1">📷</span>
                  <span className="text-xs text-[var(--text-muted)]">Click to upload image</span>
                </>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>
          )}
          <input
            type="text"
            placeholder="Caption (optional)"
            value={block.caption || ""}
            onChange={(e) => onChange(index, { ...block, caption: e.target.value })}
            className="w-full mt-2 border border-[var(--border-sub)] rounded-lg px-3 py-2 text-xs text-[var(--text-sec)] bg-[var(--bg-secondary)] focus:outline-none focus:border-[var(--gold)]"
          />
        </div>
      ) : block.type === "heading" ? (
        <input
          type="text"
          placeholder="Heading text..."
          value={block.value}
          onChange={(e) => onChange(index, { ...block, value: e.target.value })}
          className="w-full border border-[var(--border-sub)] rounded-xl px-4 py-3 text-lg font-bold text-[var(--text-primary)] bg-[var(--bg-secondary)] focus:outline-none focus:border-[var(--gold)]"
        />
      ) : block.type === "raw" ? (
        <div className="w-full">
          <textarea
            placeholder="Paste full length content directly here (Markdown supported)..."
            value={block.value}
            onChange={(e) => onChange(index, { ...block, value: e.target.value })}
            rows={15}
            className="w-full border border-[var(--border-sub)] rounded-xl px-4 py-3 text-sm text-[var(--text-sec)] bg-[var(--bg-secondary)] focus:outline-none focus:border-[var(--gold)] resize-y"
          />
          {block.value && (
            <div className="mt-4 border-t border-[var(--border-sub)] pt-4">
              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase mb-2 block">Live Public Preview</span>
              <div
                className="prose prose-invert max-w-none text-[var(--text-sec)] text-sm leading-relaxed whitespace-pre-wrap bg-[var(--bg-secondary)] border border-[var(--border-sub)] p-4 rounded-xl"
                dangerouslySetInnerHTML={renderMarkdownPreview(block.value)}
              />
            </div>
          )}
        </div>
      ) : (
        <textarea
          placeholder="Write paragraph text..."
          value={block.value}
          onChange={(e) => onChange(index, { ...block, value: e.target.value })}
          rows={4}
          className="w-full border border-[var(--border-sub)] rounded-xl px-4 py-3 text-sm text-[var(--text-sec)] bg-[var(--bg-secondary)] focus:outline-none focus:border-[var(--gold)] resize-y"
        />
      )}
    </div>
  );
}

export default function PostEditor({ initialData = null, postId = null, onCancel = null, onSaved = null }) {
  const router = useRouter();
  const coverRef = useRef(null);

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [category, setCategory] = useState(initialData?.category || "Guide");
  const [customCategory, setCustomCategory] = useState(
    initialData?.category && !CATEGORIES.includes(initialData.category) ? initialData.category : ""
  );
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [coverUploading, setCoverUploading] = useState(false);
  const [status, setStatus] = useState(initialData?.status || "published");
  const [publishedAt, setPublishedAt] = useState(
    initialData?.publishedAt ? initialData.publishedAt.slice(0, 16) : new Date().toISOString().slice(0, 16)
  );
  const [content, setContent] = useState(
    initialData?.content?.length ? initialData.content : [{ type: "text", value: "" }]
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleTitleChange = (val) => {
    setTitle(val);
    if (!initialData) setSlug(slugify(val));
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverUploading(true);
    try {
      const url = await uploadToS3(file);
      setCoverImage(url);
    } finally {
      setCoverUploading(false);
    }
  };

  const addBlock = (type = "text") => {
    setContent((prev) => [...prev, { type, value: "", caption: "" }]);
  };

  const updateBlock = (index, updated) => {
    setContent((prev) => prev.map((b, i) => (i === index ? updated : b)));
  };

  const deleteBlock = (index) => {
    setContent((prev) => prev.filter((_, i) => i !== index));
  };

  const moveBlock = (index, direction) => {
    setContent((prev) => {
      const arr = [...prev];
      const target = index + direction;
      if (target < 0 || target >= arr.length) return arr;
      [arr[index], arr[target]] = [arr[target], arr[index]];
      return arr;
    });
  };

  const handleSave = async () => {
    setError("");
    if (!title.trim() || !slug.trim()) {
      setError("Title and slug are required.");
      return;
    }
    if (content.every((b) => !b.value.trim())) {
      setError("Add at least one content block.");
      return;
    }

    setSaving(true);
    const finalCategory = category === "__custom__" ? customCategory : category;
    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      category: finalCategory,
      excerpt: excerpt.trim(),
      coverImage,
      content: content.filter((b) => b.value.trim() || b.type === "image"),
      status,
      publishedAt: new Date(publishedAt).toISOString(),
    };

    try {
      const url = postId ? `/api/posts/${postId}` : "/api/posts";
      const method = postId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error || "Save failed.");
      } else if (onSaved) {
        onSaved();
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="py-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-2xl font-bold text-[var(--text-primary)] uppercase"
          style={{ fontFamily: "var(--font-disp)", letterSpacing: "0.04em" }}
        >
          {postId ? "Edit Post" : "New Post"}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => (onCancel ? onCancel() : router.push("/dashboard"))}
            className="px-4 py-2 rounded-xl border border-[var(--border-sub)] text-sm text-[var(--text-sec)] hover:bg-[var(--bg-secondary)] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-[var(--gold)] text-[var(--text-inv)] text-sm font-medium hover:bg-[var(--gold-bright)] transition-colors disabled:opacity-60"
          >
            {saving ? "Saving..." : postId ? "Update Post" : "Publish Post"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-[rgba(168,82,82,0.08)] border border-[rgba(168,82,82,0.3)] rounded-xl text-sm text-[var(--c-danger)]">
          {error}
        </div>
      )}

      <div className="space-y-5">
        {/* Title */}
        <div className="bg-[var(--bg-tertiary)] rounded-2xl border border-[var(--border-sub)] p-5">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide block mb-2">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title..."
            className="w-full text-xl font-semibold text-[var(--text-primary)] bg-transparent border-none outline-none placeholder:text-[var(--text-muted)]"
          />
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[var(--border-sub)]">
            <span className="text-xs text-[var(--text-muted)]">Slug:</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              className="flex-1 text-xs font-mono text-[var(--gold)] bg-transparent border-none outline-none"
            />
          </div>
        </div>

        {/* Meta row */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Category */}
          <div className="bg-[var(--bg-tertiary)] rounded-2xl border border-[var(--border-sub)] p-4">
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide block mb-2">Category</label>
            <select
              value={CATEGORIES.includes(category) ? category : "__custom__"}
              onChange={(e) => {
                if (e.target.value === "__custom__") {
                  setCategory("__custom__");
                } else {
                  setCategory(e.target.value);
                  setCustomCategory("");
                }
              }}
              className="w-full border border-[var(--border-sub)] rounded-lg px-3 py-2 text-sm bg-[var(--bg-secondary)] text-[var(--text-sec)] focus:outline-none focus:border-[var(--gold)]"
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              <option value="__custom__">Custom...</option>
            </select>
            {(category === "__custom__" || (!CATEGORIES.includes(category) && category)) && (
              <input
                type="text"
                placeholder="Category name"
                value={customCategory}
                onChange={(e) => { setCustomCategory(e.target.value); setCategory("__custom__"); }}
                className="w-full mt-2 border border-[var(--border-sub)] rounded-lg px-3 py-2 text-sm bg-[var(--bg-secondary)] text-[var(--text-sec)] focus:outline-none focus:border-[var(--gold)]"
              />
            )}
          </div>

          {/* Status */}
          <div className="bg-[var(--bg-tertiary)] rounded-2xl border border-[var(--border-sub)] p-4">
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide block mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-[var(--border-sub)] rounded-lg px-3 py-2 text-sm bg-[var(--bg-secondary)] text-[var(--text-sec)] focus:outline-none focus:border-[var(--gold)]"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Publish date */}
          <div className="bg-[var(--bg-tertiary)] rounded-2xl border border-[var(--border-sub)] p-4">
            <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide block mb-2">Publish Date</label>
            <input
              type="datetime-local"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              className="w-full border border-[var(--border-sub)] rounded-lg px-3 py-2 text-sm bg-[var(--bg-secondary)] text-[var(--text-sec)] focus:outline-none focus:border-[var(--gold)]"
            />
          </div>
        </div>

        {/* Cover image */}
        <div className="bg-[var(--bg-tertiary)] rounded-2xl border border-[var(--border-sub)] p-5">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide block mb-3">Cover Image</label>
          {coverImage ? (
            <div className="relative">
              <img src={coverImage} alt="Cover" className="w-full max-h-60 object-cover rounded-xl" />
              <button
                onClick={() => setCoverImage("")}
                className="absolute top-2 right-2 bg-[var(--bg-tertiary)] rounded-full px-3 py-1 text-[var(--c-danger)] shadow text-xs font-medium"
              >
                Remove
              </button>
            </div>
          ) : (
            <div
              onClick={() => coverRef.current?.click()}
              className="border-2 border-dashed border-[var(--border-sub)] rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer hover:border-[var(--gold)] transition-colors"
            >
              {coverUploading ? (
                <span className="text-sm text-[var(--text-muted)]">Uploading...</span>
              ) : (
                <>
                  <span className="text-3xl mb-2">🖼️</span>
                  <span className="text-sm text-[var(--text-muted)]">Click to upload cover image</span>
                  <span className="text-xs text-[var(--text-muted)] mt-1">JPG, PNG, WebP</span>
                </>
              )}
              <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
            </div>
          )}
        </div>

        {/* Excerpt */}
        <div className="bg-[var(--bg-tertiary)] rounded-2xl border border-[var(--border-sub)] p-5">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide block mb-2">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short description shown in post cards..."
            rows={2}
            className="w-full text-sm text-[var(--text-sec)] bg-transparent border-none outline-none resize-none placeholder:text-[var(--text-muted)]"
          />
        </div>

        {/* Content blocks */}
        <div className="bg-[var(--bg-tertiary)] rounded-2xl border border-[var(--border-sub)] p-5">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide block mb-4">Content</label>
          <div className="space-y-3">
            {content.map((block, i) => (
              <BlockEditor
                key={i}
                block={block}
                index={i}
                onChange={updateBlock}
                onDelete={deleteBlock}
                onMoveUp={(idx) => moveBlock(idx, -1)}
                onMoveDown={(idx) => moveBlock(idx, 1)}
                isFirst={i === 0}
                isLast={i === content.length - 1}
              />
            ))}
          </div>

          {/* Add block buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => addBlock("text")}
              className="flex-1 py-2 border-2 border-dashed border-[var(--border-sub)] rounded-xl text-sm text-[var(--text-muted)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
            >
              + Paragraph
            </button>
            <button
              onClick={() => addBlock("heading")}
              className="flex-1 py-2 border-2 border-dashed border-[var(--border-sub)] rounded-xl text-sm text-[var(--text-muted)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors font-bold"
            >
              + Heading
            </button>
            <button
              onClick={() => addBlock("image")}
              className="flex-1 py-2 border-2 border-dashed border-[var(--border-sub)] rounded-xl text-sm text-[var(--text-muted)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
            >
              + Image
            </button>
            <button
              onClick={() => addBlock("raw")}
              className="flex-1 py-2 border-2 border-dashed border-[var(--border-gold)] rounded-xl text-sm text-[var(--gold)] hover:border-[var(--gold)] hover:bg-[var(--gold-ghost)] transition-colors font-medium"
            >
              + Large Box
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
