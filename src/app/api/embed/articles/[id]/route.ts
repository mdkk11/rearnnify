import { NextResponse } from "next/server";

import { getPublicEmbedArticle } from "@/features/articles/data";

type EmbedRouteContext = {
  params: Promise<{ id: string }>;
};

const embedHeaders = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "no-store",
};

function embedJson(body: unknown, init?: ResponseInit) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      ...embedHeaders,
      ...init?.headers,
    },
  });
}

export async function GET(_request: Request, context: EmbedRouteContext) {
  const { id } = await context.params;

  try {
    const article = await getPublicEmbedArticle(id);

    if (!article) {
      return embedJson({ message: "Article not found." }, { status: 404 });
    }

    return embedJson(article);
  } catch (error) {
    return embedJson(
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

export async function OPTIONS() {
  return new Response(null, {
    headers: embedHeaders,
    status: 204,
  });
}
