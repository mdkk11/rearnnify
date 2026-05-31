import { relations } from "drizzle-orm";
import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const generationStatus = pgEnum("generation_status", [
  "not_generated",
  "generating",
  "generated",
  "failed",
]);

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const articles = pgTable("articles", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: text("title").notNull(),
  sourceUrl: text("source_url"),
  sourceBody: text("source_body").notNull(),
  slideStatus: generationStatus("slide_status").notNull().default("not_generated"),
  quizStatus: generationStatus("quiz_status").notNull().default("not_generated"),
  ...timestamps,
});

export const slides = pgTable("slides", {
  id: varchar("id", { length: 64 }).primaryKey(),
  articleId: varchar("article_id", { length: 64 })
    .notNull()
    .references(() => articles.id, { onDelete: "cascade" }),
  order: integer("order").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  ...timestamps,
});

export const quizzes = pgTable("quizzes", {
  id: varchar("id", { length: 64 }).primaryKey(),
  articleId: varchar("article_id", { length: 64 })
    .notNull()
    .references(() => articles.id, { onDelete: "cascade" }),
  order: integer("order").notNull(),
  question: text("question").notNull(),
  choices: jsonb("choices").$type<string[]>().notNull(),
  correctChoiceIndex: integer("correct_choice_index").notNull(),
  explanation: text("explanation").notNull(),
  ...timestamps,
});

export const articlesRelations = relations(articles, ({ many }) => ({
  slides: many(slides),
  quizzes: many(quizzes),
}));

export const slidesRelations = relations(slides, ({ one }) => ({
  article: one(articles, {
    fields: [slides.articleId],
    references: [articles.id],
  }),
}));

export const quizzesRelations = relations(quizzes, ({ one }) => ({
  article: one(articles, {
    fields: [quizzes.articleId],
    references: [articles.id],
  }),
}));

export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;
export type Slide = typeof slides.$inferSelect;
export type Quiz = typeof quizzes.$inferSelect;
export type GenerationStatus = (typeof generationStatus.enumValues)[number];
