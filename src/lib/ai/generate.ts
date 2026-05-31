import { generateText, Output } from "ai";

import type { Article } from "@/db/schema";
import { getLanguageModel } from "@/lib/ai/model";
import { buildQuizPrompt, buildSlidePrompt } from "@/lib/ai/prompts";
import {
  quizGenerationSchema,
  slideGenerationSchema,
} from "@/lib/ai/schemas";

const system = [
  "You generate structured learning content from Japanese technical articles.",
  "Use only the supplied article title and body as source material.",
  "Avoid unsupported claims and keep the content concise.",
].join(" ");

export async function generateSlidesFromArticle(
  article: Pick<Article, "title" | "sourceBody">,
) {
  const result = await generateText({
    model: getLanguageModel(),
    system,
    prompt: buildSlidePrompt(article),
    output: Output.object({ schema: slideGenerationSchema }),
  });

  return slideGenerationSchema.parse(result.output);
}

export async function generateQuizzesFromArticle(
  article: Pick<Article, "title" | "sourceBody">,
) {
  const result = await generateText({
    model: getLanguageModel(),
    system,
    prompt: buildQuizPrompt(article),
    output: Output.object({ schema: quizGenerationSchema }),
  });

  return quizGenerationSchema.parse(result.output);
}
