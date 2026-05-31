import { randomUUID } from "node:crypto";

import { asc, desc, eq } from "drizzle-orm";

import { getDb } from "@/db/client";
import { articles, quizzes, slides, type GenerationStatus } from "@/db/schema";
import type { ArticleInput } from "@/features/articles/validation";
import type { GeneratedQuizzes, GeneratedSlides } from "@/lib/ai/schemas";

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

export async function setSlideStatus(id: string, status: GenerationStatus) {
  await getDb()
    .update(articles)
    .set({ slideStatus: status, updatedAt: new Date() })
    .where(eq(articles.id, id));
}

export async function setQuizStatus(id: string, status: GenerationStatus) {
  await getDb()
    .update(articles)
    .set({ quizStatus: status, updatedAt: new Date() })
    .where(eq(articles.id, id));
}

export async function replaceSlides(id: string, generated: GeneratedSlides) {
  const db = getDb();

  await db.transaction(async (tx) => {
    await tx.delete(slides).where(eq(slides.articleId, id));
    await tx.insert(slides).values(
      generated.slides.map((slide, index) => ({
        id: `slide_${randomUUID()}`,
        articleId: id,
        order: index + 1,
        title: slide.title,
        content: slide.content,
      })),
    );
    await tx
      .update(articles)
      .set({ slideStatus: "generated", updatedAt: new Date() })
      .where(eq(articles.id, id));
  });
}

export async function replaceQuizzes(id: string, generated: GeneratedQuizzes) {
  const db = getDb();

  await db.transaction(async (tx) => {
    await tx.delete(quizzes).where(eq(quizzes.articleId, id));
    await tx.insert(quizzes).values(
      generated.quizzes.map((quiz, index) => ({
        id: `quiz_${randomUUID()}`,
        articleId: id,
        order: index + 1,
        question: quiz.question,
        choices: quiz.choices,
        correctChoiceIndex: quiz.correctChoiceIndex,
        explanation: quiz.explanation,
      })),
    );
    await tx
      .update(articles)
      .set({ quizStatus: "generated", updatedAt: new Date() })
      .where(eq(articles.id, id));
  });
}
