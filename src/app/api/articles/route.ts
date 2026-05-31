import { NextResponse } from "next/server";

import { createArticle, listArticles } from "@/features/articles/data";
import { articleInputSchema } from "@/features/articles/validation";
import { requireAdminApi } from "@/lib/admin-auth";

export async function GET() {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  try {
    return NextResponse.json({ articles: await listArticles() });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to load articles." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const parsed = articleInputSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid article input.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    const article = await createArticle(parsed.data);
    return NextResponse.json({ article }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to create article." },
      { status: 500 },
    );
  }
}
