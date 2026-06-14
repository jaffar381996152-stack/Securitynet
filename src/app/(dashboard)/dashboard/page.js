"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PostEditor from "@/components/admin/PostEditor";
import UploadEvent from "./event/components/uploadEvent";

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        fontFamily: "var(--font-disp)",
        fontWeight: 600,
        fontSize: 13,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: active ? "var(--gold)" : "var(--text-sec)",
        background: "transparent",
        border: "none",
        borderBottom: active ? "2px solid var(--gold)" : "2px solid transparent",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      {children}
    </button>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div
      style={{
        position: "relative",
        background: "var(--bg-tertiary)",
        border: "1px solid var(--border-sub)",
        padding: "20px 22px",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: accent ? "linear-gradient(90deg, var(--gold), transparent)" : "transparent" }} />
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ fontFamily: "var(--font-disp)", fontWeight: 800, fontSize: 30, lineHeight: 1, color: accent ? "var(--gold)" : "var(--text-primary)" }}>
        {value}
      </div>
    </div>
  );
}

function PostsList({ posts, loading, onNew, onEdit, onDelete }) {
  return (
    <div className="py-7">
      <div className="flex items-center justify-between mb-5">
        <span
          style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}
        >
          All Articles
        </span>
        <button
          onClick={onNew}
          className="inline-flex items-center gap-2 px-4 h-10 bg-[var(--gold)] text-[var(--text-inv)] text-sm font-semibold hover:bg-[var(--gold-bright)] transition-colors"
          style={{ letterSpacing: "0.04em" }}
        >
          + New Post
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-[var(--bg-tertiary)] animate-pulse" style={{ border: "1px solid var(--border-sub)" }} />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-[var(--text-muted)]">
          No posts yet.{" "}
          <button onClick={onNew} className="text-[var(--gold)] hover:underline">
            Create one
          </button>
        </div>
      ) : (
        <div className="bg-[var(--bg-tertiary)] border border-[var(--border-sub)] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-sub)]">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-[var(--text-muted)] uppercase tracking-wider text-xs">Title</th>
                <th className="text-left px-5 py-3 font-semibold text-[var(--text-muted)] uppercase tracking-wider text-xs hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3 font-semibold text-[var(--text-muted)] uppercase tracking-wider text-xs hidden md:table-cell">Status</th>
                <th className="text-left px-5 py-3 font-semibold text-[var(--text-muted)] uppercase tracking-wider text-xs hidden lg:table-cell">Date</th>
                <th className="text-right px-5 py-3 font-semibold text-[var(--text-muted)] uppercase tracking-wider text-xs">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-sub)]">
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-[var(--bg-secondary)] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 flex-shrink-0 bg-[var(--bg-secondary)] border border-[var(--border-sub)] bg-cover bg-center"
                        style={post.coverImage ? { backgroundImage: `url(${post.coverImage})` } : undefined}
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-[var(--text-primary)] line-clamp-1">{post.title}</p>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5 font-mono line-clamp-1">/{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="px-2 py-0.5 rounded-full bg-[var(--gold-ghost)] text-[var(--gold)] border border-[var(--border-gold)] text-xs font-medium">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                      post.status === "published"
                        ? "bg-[rgba(74,140,111,0.12)] text-[var(--c-success)] border-[rgba(74,140,111,0.3)]"
                        : "bg-[rgba(196,138,58,0.12)] text-[var(--c-warn)] border-[rgba(196,138,58,0.3)]"
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell text-[var(--text-muted)]">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/news/${post.slug}`}
                        target="_blank"
                        className="text-xs text-[var(--text-muted)] hover:text-[var(--gold)]"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => onEdit(post._id)}
                        className="text-xs text-[var(--gold)] hover:underline font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(post._id)}
                        className="text-xs text-[var(--c-danger)] hover:underline font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [tab, setTab] = useState("posts");
  const [view, setView] = useState("list"); // list | new | edit
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = () => {
    setLoading(true);
    fetch("/api/posts?limit=100")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setPosts(data.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    if (!confirm("Delete this post?")) return;
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (res.ok) fetchPosts();
  };

  const startNew = () => {
    setEditId(null);
    setEditData(null);
    setView("new");
  };

  const startEdit = (id) => {
    setEditId(id);
    setEditData(null);
    setEditLoading(true);
    setView("edit");
    fetch(`/api/posts/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setEditData(data.data);
      })
      .finally(() => setEditLoading(false));
  };

  const backToList = () => {
    setView("list");
    setEditId(null);
    setEditData(null);
    fetchPosts();
  };

  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = Math.max(0, posts.length - publishedCount);
  const showOverview = tab === "posts" && view === "list";

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>ADMIN CONSOLE</div>
          <h1 style={{ fontFamily: "var(--font-disp)", fontWeight: 800, fontSize: 30, textTransform: "uppercase", letterSpacing: "0.02em", color: "var(--text-primary)", lineHeight: 1 }}>
            Dashboard
          </h1>
        </div>
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--c-success)", display: "inline-block", animation: "ubPulse 1.8s ease-in-out infinite" }} />
          Secure Session
        </span>
      </div>

      {/* Stats overview (posts list only) */}
      {showOverview && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 28 }}>
          <StatCard label="Total Articles" value={loading ? "—" : posts.length} accent />
          <StatCard label="Published" value={loading ? "—" : publishedCount} />
          <StatCard label="Drafts" value={loading ? "—" : draftCount} />
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, borderBottom: "1px solid var(--border-sub)" }}>
        <TabButton
          active={tab === "posts"}
          onClick={() => {
            setTab("posts");
            setView("list");
          }}
        >
          Posts
        </TabButton>
        <TabButton active={tab === "events"} onClick={() => setTab("events")}>
          Events
        </TabButton>
      </div>

      {tab === "posts" &&
        (view === "list" ? (
          <PostsList posts={posts} loading={loading} onNew={startNew} onEdit={startEdit} onDelete={deletePost} />
        ) : view === "edit" && editLoading ? (
          <div className="py-20 text-center text-[var(--text-muted)]">Loading...</div>
        ) : (
          <PostEditor
            initialData={view === "edit" ? editData : null}
            postId={view === "edit" ? editId : null}
            onCancel={backToList}
            onSaved={backToList}
          />
        ))}

      {tab === "events" && <UploadEvent />}
    </div>
  );
}
