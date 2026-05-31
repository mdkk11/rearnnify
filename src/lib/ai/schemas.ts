import { z } from "zod";

export const slideGenerationSchema = z.object({
  slides: z.array(
    z.object({
      title: z.string().min(1),
      content: z.string().min(1),
    }),
  ).min(3).max(6),
});

export const quizGenerationSchema = z.object({
  quizzes: z.array(
    z.object({
      question: z.string().min(1),
      choices: z.array(z.string().min(1)).length(4),
      correctChoiceIndex: z.number().int().min(0).max(3),
      explanation: z.string().min(1),
    }),
  ).min(3).max(5),
});

export type GeneratedSlides = z.infer<typeof slideGenerationSchema>;
export type GeneratedQuizzes = z.infer<typeof quizGenerationSchema>;
