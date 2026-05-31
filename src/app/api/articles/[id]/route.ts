import { NextResponse } from "next/server";

import {
  deleteArticle,
  getArticleDetail,
  updateArticle,
} from "@/features/articles/data";
import { articleInputSchema } from "@/features/articles/validation";

type ArticleRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: ArticleRouteContext) {
  const { id } = await context.params;

  try {
    const article = await getArticleDetail(id);

    if (!article) {
      return NextResponse.json({ message: "Article not found." }, { status: 404 });
    }

    return NextResponse.json({ article });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to load article." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, context: ArticleRouteContext) {
  const { id } = await context.params;
  const parsed = articleInputSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid article input.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    const article = await updateArticle(id, parsed.data);

    if (!article) {
      return NextResponse.json({ message: "Article not found." }, { status: 404 });
    }

    return NextResponse.json({ article });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to update article." },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: ArticleRouteContext) {
  const { id } = await context.params;

  try {
    await deleteArticle(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to delete article." },
      { status: 500 },
    );
  }
}
