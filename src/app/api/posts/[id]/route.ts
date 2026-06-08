import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/app/libs/mongodb";
import { requireAdmin } from "@/app/libs/requireAdmin";
import { sanitizePostContent } from "@/app/libs/sanitizePostContent";
import { isValidPostTitle, isValidPostContent } from "@/app/libs/validators";

// GET /api/posts/[id]
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const col = await getCollection("posts");
    const post = await col.findOne({ _id: new ObjectId(id) });
    if (!post) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: post });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// PUT /api/posts/[id]
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const col = await getCollection("posts");

    const update = { ...body, updatedAt: new Date().toISOString() };
    delete update._id;

    if (update.title !== undefined && !isValidPostTitle(update.title)) {
      return NextResponse.json({ success: false, error: "Title must be 1-200 characters" }, { status: 400 });
    }
    if (update.content !== undefined) {
      if (!isValidPostContent(update.content)) {
        return NextResponse.json(
          { success: false, error: "Content must be a non-empty array of at most 300 blocks, each under 100,000 characters" },
          { status: 400 }
        );
      }
      update.content = sanitizePostContent(update.content);
    }

    // If slug changed, check uniqueness
    if (body.slug) {
      const existing = await col.findOne({ slug: body.slug, _id: { $ne: new ObjectId(id) } });
      if (existing) return NextResponse.json({ success: false, error: "Slug already exists" }, { status: 409 });
    }

    const result = await col.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: "after" }
    );

    if (!result) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: result });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE /api/posts/[id]
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;
    const col = await getCollection("posts");
    const result = await col.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
