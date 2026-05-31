import { z } from "zod";

export const articleInputSchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  sourceUrl: z
    .string()
    .trim()
    .transform((value) => (value.length === 0 ? null : value))
    .pipe(z.string().url("Source URL must be a valid URL.").nullable()),
  sourceBody: z.string().trim().min(1, "Source body is required."),
});

export type ArticleInput = z.infer<typeof articleInputSchema>;
