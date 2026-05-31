"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createArticle,
  deleteArticle,
  updateArticle,
} from "@/features/articles/data";
import { articleInputSchema } from "@/features/articles/validation";

function parseArticleForm(formData: FormData) {
  return articleInputSchema.parse({
    title: formData.get("title"),
    sourceUrl: formData.get("sourceUrl"),
    sourceBody: formData.get("sourceBody"),
  });
}

export async function createArticleAction(formData: FormData) {
  const article = await createArticle(parseArticleForm(formData));
  revalidatePath("/admin/articles");
  redirect(`/admin/articles/${article.id}`);
}

export async function updateArticleAction(id: string, formData: FormData) {
  await updateArticle(id, parseArticleForm(formData));
  revalidatePath("/admin/articles");
  revalidatePath(`/admin/articles/${id}`);
  redirect(`/admin/articles/${id}`);
}

export async function deleteArticleAction(id: string) {
  await deleteArticle(id);
  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}
