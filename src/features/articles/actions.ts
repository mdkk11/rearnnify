"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createArticle,
  deleteArticle,
  getArticleDetail,
  replaceQuizzes,
  replaceSlides,
  setQuizStatus,
  setSlideStatus,
  updateArticle,
} from "@/features/articles/data";
import { articleInputSchema } from "@/features/articles/validation";
import { requireAdmin } from "@/lib/admin-auth";
import {
  generateQuizzesFromArticle,
  generateSlidesFromArticle,
} from "@/lib/ai/generate";

function parseArticleForm(formData: FormData) {
  return articleInputSchema.parse({
    title: formData.get("title"),
    sourceUrl: formData.get("sourceUrl"),
    sourceBody: formData.get("sourceBody"),
  });
}

export async function createArticleAction(formData: FormData) {
  await requireAdmin();
  const article = await createArticle(parseArticleForm(formData));
  revalidatePath("/admin/articles");
  redirect(`/admin/articles/${article.id}`);
}

export async function updateArticleAction(id: string, formData: FormData) {
  await requireAdmin();
  await updateArticle(id, parseArticleForm(formData));
  revalidatePath("/admin/articles");
  revalidatePath(`/admin/articles/${id}`);
  redirect(`/admin/articles/${id}`);
}

export async function deleteArticleAction(id: string) {
  await requireAdmin();
  await deleteArticle(id);
  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}

export async function generateSlidesAction(id: string) {
  await requireAdmin();
  await setSlideStatus(id, "generating");

  try {
    const article = await getArticleDetail(id);

    if (!article) {
      throw new Error("Article not found.");
    }

    const generated = await generateSlidesFromArticle(article);
    await replaceSlides(id, generated);
  } catch (error) {
    await setSlideStatus(id, "failed");
    throw error;
  }

  revalidatePath("/admin/articles");
  revalidatePath(`/admin/articles/${id}`);
}

export async function generateQuizzesAction(id: string) {
  await requireAdmin();
  await setQuizStatus(id, "generating");

  try {
    const article = await getArticleDetail(id);

    if (!article) {
      throw new Error("Article not found.");
    }

    const generated = await generateQuizzesFromArticle(article);
    await replaceQuizzes(id, generated);
  } catch (error) {
    await setQuizStatus(id, "failed");
    throw error;
  }

  revalidatePath("/admin/articles");
  revalidatePath(`/admin/articles/${id}`);
}
