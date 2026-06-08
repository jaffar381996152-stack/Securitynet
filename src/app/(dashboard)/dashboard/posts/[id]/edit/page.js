"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PostEditor from "@/components/admin/PostEditor";

export default function EditPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/posts/${id}`)
      .then((r) => r.json())
      .then((data) => { if (data.success) setPost(data.data); })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="py-8 max-w-3xl mx-auto space-y-4 animate-pulse">
        <div className="h-8 bg-gray-100 rounded w-1/3" />
        <div className="h-40 bg-gray-100 rounded-2xl" />
        <div className="h-40 bg-gray-100 rounded-2xl" />
      </div>
    );
  }

  if (!post) return <div className="py-8 text-center text-gray-400">Post not found.</div>;

  return <PostEditor initialData={post} postId={id} />;
}
