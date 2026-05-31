import { NextResponse } from "next/server";

import {
  getArticleDetail,
  replaceSlides,
  setSlideStatus,
} from "@/features/articles/data";
import { requireAdminApi } from "@/lib/admin-auth";
import { generateSlidesFromArticle } from "@/lib/ai/generate";

type GenerateRouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(_request: Request, context: GenerateRouteContext) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  await setSlideStatus(id, "generating");

  try {
    const article = await getArticleDetail(id);

    if (!article) {
      await setSlideStatus(id, "failed");
      return NextResponse.json({ message: "Article not found." }, { status: 404 });
    }

    const generated = await generateSlidesFromArticle(article);
    await replaceSlides(id, generated);
    return NextResponse.json(generated);
  } catch (error) {
    await setSlideStatus(id, "failed");
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to generate slides.",
      },
      { status: 500 },
    );
  }
}
