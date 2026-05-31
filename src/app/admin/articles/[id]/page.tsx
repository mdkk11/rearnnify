import Link from "next/link";
import { notFound } from "next/navigation";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { Surface } from "@/components/ui/surface";
import {
  deleteArticleAction,
  generateQuizzesAction,
  generateSlidesAction,
  updateArticleAction,
} from "@/features/articles/actions";
import { ArticleForm } from "@/features/articles/article-form";
import { getArticleDetail } from "@/features/articles/data";
import { DbSetupNotice } from "@/features/articles/db-setup-notice";
import { formatDateTime, formatStatus } from "@/features/articles/format";

export const dynamic = "force-dynamic";

type ArticleDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { id } = await params;
  let article;

  try {
    article = await getArticleDetail(id);
  } catch {
    return (
      <div className="stack">
        <DbSetupNotice title="Cannot load article without a database" />
      </div>
    );
  }

  if (!article) {
    notFound();
  }

  const updateAction = updateArticleAction.bind(null, article.id);
  const deleteAction = deleteArticleAction.bind(null, article.id);
  const generateSlides = generateSlidesAction.bind(null, article.id);
  const generateQuizzes = generateQuizzesAction.bind(null, article.id);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://your-service.com";
  const embedCode = `<div data-learning-widget data-article-id="${article.id}"></div>
<script src="${appUrl}/embed.js"></script>`;

  return (
    <div className="stack">
      <div className="cluster">
        <div className="stack-tight">
          <p className="eyebrow">Article detail</p>
          <h1 className="heading-xl">{article.title}</h1>
          <p className="body-muted">
            Updated {formatDateTime(article.updatedAt)}
          </p>
        </div>
        <Link className="ui-button ui-button-ghost" href="/admin/articles">
          Back to articles
        </Link>
      </div>

      <Surface spacious>
        <div className="empty-state-grid">
          <div className="metric-panel">
            <p className="eyebrow">Slide status</p>
            <p className="metric-value">{formatStatus(article.slideStatus)}</p>
          </div>
          <div className="metric-panel">
            <p className="eyebrow">Quiz status</p>
            <p className="metric-value">{formatStatus(article.quizStatus)}</p>
          </div>
          <div className="metric-panel">
            <p className="eyebrow">Source URL</p>
            <p className="metric-value metric-value-small">
              {article.sourceUrl ?? "None"}
            </p>
          </div>
        </div>
      </Surface>

      <Surface spacious>
        <div className="cluster">
          <div className="stack-tight">
            <p className="eyebrow">Generation</p>
            <h2 className="heading-lg">AI learning content</h2>
            <p className="body-muted">
              Generate saved slide and quiz content from this article snapshot.
            </p>
          </div>
          <div className="button-row">
            <form action={generateSlides}>
              <Button type="submit" disabled={article.slideStatus === "generating"}>
                Generate slides
              </Button>
            </form>
            <form action={generateQuizzes}>
              <Button
                variant="secondary"
                type="submit"
                disabled={article.quizStatus === "generating"}
              >
                Generate quizzes
              </Button>
            </form>
          </div>
        </div>
      </Surface>

      <Surface spacious>
        <div className="stack">
          <div className="stack-tight">
            <p className="eyebrow">Generated slides</p>
            <h2 className="heading-lg">Summary deck</h2>
          </div>
          {article.slides.length === 0 ? (
            <p className="body-muted">No slides generated yet.</p>
          ) : (
            <div className="generated-list">
              {article.slides.map((slide) => (
                <article className="generated-item" key={slide.id}>
                  <p className="eyebrow">Slide {slide.order}</p>
                  <h3>{slide.title}</h3>
                  <p>{slide.content}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </Surface>

      <Surface spacious>
        <div className="stack">
          <div className="cluster">
            <div className="stack-tight">
              <p className="eyebrow">Embed code</p>
              <h2 className="heading-lg">Blog widget</h2>
              <p className="body-muted">
                Paste this snippet into the matching blog article page.
              </p>
            </div>
            <CopyButton value={embedCode} />
          </div>
          <pre className="code-block">{embedCode}</pre>
        </div>
      </Surface>

      <Surface spacious>
        <div className="stack">
          <div className="stack-tight">
            <p className="eyebrow">Generated quizzes</p>
            <h2 className="heading-lg">Knowledge check</h2>
          </div>
          {article.quizzes.length === 0 ? (
            <p className="body-muted">No quizzes generated yet.</p>
          ) : (
            <div className="generated-list">
              {article.quizzes.map((quiz) => (
                <article className="generated-item" key={quiz.id}>
                  <p className="eyebrow">Question {quiz.order}</p>
                  <h3>{quiz.question}</h3>
                  <ol className="choice-list">
                    {quiz.choices.map((choice, index) => (
                      <li key={choice}>
                        {choice}
                        {index === quiz.correctChoiceIndex ? " (Correct)" : ""}
                      </li>
                    ))}
                  </ol>
                  <p>{quiz.explanation}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </Surface>

      <Surface spacious>
        <div className="stack">
          <div className="stack-tight">
            <p className="eyebrow">Edit snapshot</p>
            <h2 className="heading-lg">Article source</h2>
          </div>
          <ArticleForm
            action={updateAction}
            article={article}
            submitLabel="Update article"
          />
        </div>
      </Surface>

      <Surface spacious>
        <div className="cluster">
          <div className="stack-tight">
            <p className="eyebrow">Delete</p>
            <h2 className="heading-lg">Remove this article</h2>
            <p className="body-muted">
              Related slides and quizzes will be removed by the database cascade.
            </p>
          </div>
          <form action={deleteAction}>
            <Button variant="outline" type="submit">
              <Trash2 size={16} strokeWidth={1.5} />
              Delete
            </Button>
          </form>
        </div>
      </Surface>
    </div>
  );
}
