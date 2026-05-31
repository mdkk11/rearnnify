import { randomUUID } from "node:crypto";

import { asc, desc, eq } from "drizzle-orm";

import { getDb } from "@/db/client";
import { articles, quizzes, slides } from "@/db/schema";
import type { ArticleInput } from "@/features/articles/validation";

export type ArticleSummary = typeof articles.$inferSelect;

export type ArticleDetail = ArticleSummary & {
  slides: Array<typeof slides.$inferSelect>;
  quizzes: Array<typeof quizzes.$inferSelect>;
};

export async function listArticles() {
  return getDb().query.articles.findMany({
    orderBy: [desc(articles.updatedAt)],
  });
}

export async function getArticleDetail(id: string): Promise<ArticleDetail | null> {
  const article = await getDb().query.articles.findFirst({
    where: eq(articles.id, id),
    with: {
      slides: {
        orderBy: [asc(slides.order)],
      },
      quizzes: {
        orderBy: [asc(quizzes.order)],
      },
    },
  });

  return article ?? null;
}

export async function createArticle(input: ArticleInput) {
  const [article] = await getDb()
    .insert(articles)
    .values({
      id: `article_${randomUUID()}`,
      title: input.title,
      sourceUrl: input.sourceUrl,
      sourceBody: input.sourceBody,
    })
    .returning();

  return article;
}

export async function updateArticle(id: string, input: ArticleInput) {
  const [article] = await getDb()
    .update(articles)
    .set({
      title: input.title,
      sourceUrl: input.sourceUrl,
      sourceBody: input.sourceBody,
      updatedAt: new Date(),
    })
    .where(eq(articles.id, id))
    .returning();

  return article ?? null;
}

export async function deleteArticle(id: string) {
  await getDb().delete(articles).where(eq(articles.id, id));
}
