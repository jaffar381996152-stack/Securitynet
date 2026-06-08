import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/app/libs/mongodb";
import { requireAdmin } from "@/app/libs/requireAdmin";
import { sanitizePostContent } from "@/app/libs/sanitizePostContent";
import { isValidPostTitle, isValidPostContent } from "@/app/libs/validators";

// GET /api/posts?category=&page=1&limit=12
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const slug = searchParams.get("slug");

    const col = await getCollection("posts");

    // Single post by slug
    if (slug) {
      const post = await col.findOne({ slug, status: "published" });
      if (!post) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
      return NextResponse.json({ success: true, data: post });
    }

    const filter: any = { status: "published" };
    if (category && category !== "all") filter.category = category;

    const total = await col.countDocuments(filter);
    const posts = await col
      .find(filter, { projection: { content: 0 } })
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    // Get all categories with counts
    const categoryCounts = await col.aggregate([
      { $match: { status: "published" } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]).toArray();

    return NextResponse.json({
      success: true,
      data: posts,
      categories: categoryCounts,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST /api/posts
export async function POST(req: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await req.json();
    const { title, slug, category, coverImage, excerpt, content, status, publishedAt } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ success: false, error: "title, slug and content are required" }, { status: 400 });
    }
    if (!isValidPostTitle(title)) {
      return NextResponse.json({ success: false, error: "Title must be 1-200 characters" }, { status: 400 });
    }
    if (!isValidPostContent(content)) {
      return NextResponse.json(
        { success: false, error: "Content must be a non-empty array of at most 300 blocks, each under 100,000 characters" },
        { status: 400 }
      );
    }

    const col = await getCollection("posts");

    // Check slug uniqueness
    const existing = await col.findOne({ slug });
    if (existing) {
      return NextResponse.json({ success: false, error: "Slug already exists" }, { status: 409 });
    }

    const now = new Date().toISOString();
    const doc = {
      title,
      slug,
      category: category || "General",
      coverImage: coverImage || "",
      excerpt: excerpt || "",
      content: sanitizePostContent(content), // array of blocks: { type: "text"|"image"|"heading"|"raw", value: string }
      status: status || "published",
      publishedAt: publishedAt || now,
      createdAt: now,
      updatedAt: now,
    };

    const result = await col.insertOne(doc);
    return NextResponse.json({ success: true, data: { ...doc, _id: result.insertedId } }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
