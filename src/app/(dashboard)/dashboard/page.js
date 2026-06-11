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

function PostsList({ posts, loading, onNew, onEdit, onDelete }) {
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-2xl font-bold text-[var(--text-primary)] uppercase"
          style={{ fontFamily: "var(--font-disp)", letterSpacing: "0.04em" }}
        >
          Posts
        </h1>
        <button
          onClick={onNew}
          className="px-4 py-2 rounded-xl bg-[var(--gold)] text-[var(--text-inv)] text-sm font-medium hover:bg-[var(--gold-bright)] transition-colors"
        >
          + New Post
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-[var(--bg-secondary)] rounded-xl animate-pulse" />
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
        <div className="bg-[var(--bg-tertiary)] rounded-2xl border border-[var(--border-sub)] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-secondary)] border-b border-[var(--border-sub)]">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-[var(--text-muted)]">Title</th>
                <th className="text-left px-5 py-3 font-semibold text-[var(--text-muted)] hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3 font-semibold text-[var(--text-muted)] hidden md:table-cell">Status</th>
                <th className="text-left px-5 py-3 font-semibold text-[var(--text-muted)] hidden lg:table-cell">Date</th>
                <th className="text-right px-5 py-3 font-semibold text-[var(--text-muted)]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-sub)]">
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-[var(--bg-secondary)] transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-[var(--text-primary)] line-clamp-1">{post.title}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5 font-mono">{post.slug}</p>
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

  return (
    <div>
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
