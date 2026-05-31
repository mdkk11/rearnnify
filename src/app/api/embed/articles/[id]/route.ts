import { NextResponse } from "next/server";

import { getPublicEmbedArticle } from "@/features/articles/data";

type EmbedRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: EmbedRouteContext) {
  const { id } = await context.params;

  try {
    const article = await getPublicEmbedArticle(id);

    if (!article) {
      return NextResponse.json({ message: "Article not found." }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to load embedded article.",
      },
      { status: 500 },
    );
  }
}
