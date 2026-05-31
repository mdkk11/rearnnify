CREATE TYPE "public"."generation_status" AS ENUM('not_generated', 'generating', 'generated', 'failed');--> statement-breakpoint
CREATE TABLE "articles" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"source_url" text,
	"source_body" text NOT NULL,
	"slide_status" "generation_status" DEFAULT 'not_generated' NOT NULL,
	"quiz_status" "generation_status" DEFAULT 'not_generated' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quizzes" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"article_id" varchar(64) NOT NULL,
	"order" integer NOT NULL,
	"question" text NOT NULL,
	"choices" jsonb NOT NULL,
	"correct_choice_index" integer NOT NULL,
	"explanation" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "slides" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"article_id" varchar(64) NOT NULL,
	"order" integer NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "slides" ADD CONSTRAINT "slides_article_id_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;