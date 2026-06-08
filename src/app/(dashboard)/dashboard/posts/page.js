"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPostsPage() {
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

  useEffect(() => { fetchPosts(); }, []);

  const deletePost = async (id) => {
    if (!confirm("Delete this post?")) return;
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (res.ok) fetchPosts();
  };

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
        <Link
          href="/dashboard/posts/new"
          className="px-4 py-2 rounded-xl bg-[#483AA0] text-white text-sm font-medium hover:bg-[#372d80] transition-colors"
        >
          + New Post
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          No posts yet.{" "}
          <Link href="/dashboard/posts/new" className="text-[#483AA0] hover:underline">
            Create one
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Title</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden md:table-cell">Category</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden md:table-cell">Status</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden lg:table-cell">Date</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900 line-clamp-1">{post.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 font-mono">{post.slug}</p>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="px-2 py-0.5 rounded-full bg-[#483AA0]/10 text-[#483AA0] text-xs font-medium">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      post.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/news/${post.slug}`}
                        target="_blank"
                        className="text-xs text-gray-500 hover:text-[#483AA0]"
                      >
                        View
                      </Link>
                      <Link
                        href={`/dashboard/posts/${post._id}/edit`}
                        className="text-xs text-[#483AA0] hover:underline font-medium"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deletePost(post._id)}
                        className="text-xs text-red-500 hover:underline font-medium"
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
