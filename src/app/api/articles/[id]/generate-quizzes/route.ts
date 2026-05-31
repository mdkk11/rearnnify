import { NextResponse } from "next/server";

import {
  getArticleDetail,
  replaceQuizzes,
  setQuizStatus,
} from "@/features/articles/data";
import { requireAdminApi } from "@/lib/admin-auth";
import { generateQuizzesFromArticle } from "@/lib/ai/generate";

type GenerateRouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(_request: Request, context: GenerateRouteContext) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  await setQuizStatus(id, "generating");

  try {
    const article = await getArticleDetail(id);

    if (!article) {
      await setQuizStatus(id, "failed");
      return NextResponse.json({ message: "Article not found." }, { status: 404 });
    }

    const generated = await generateQuizzesFromArticle(article);
    await replaceQuizzes(id, generated);
    return NextResponse.json(generated);
  } catch (error) {
    await setQuizStatus(id, "failed");
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to generate quizzes.",
      },
      { status: 500 },
    );
  }
}
