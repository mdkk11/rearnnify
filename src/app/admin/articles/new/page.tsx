import Link from "next/link";

import { Surface } from "@/components/ui/surface";
import { createArticleAction } from "@/features/articles/actions";
import { ArticleForm } from "@/features/articles/article-form";

export default function NewArticlePage() {
  return (
    <div className="stack">
      <div className="cluster">
        <div className="stack-tight">
          <p className="eyebrow">New article</p>
          <h1 className="heading-xl">Create snapshot</h1>
          <p className="body-muted">
            Paste the article body as an AI generation snapshot.
          </p>
        </div>
        <Link className="ui-button ui-button-ghost" href="/admin/articles">
          Back to articles
        </Link>
      </div>
      <Surface spacious>
        <ArticleForm action={createArticleAction} submitLabel="Save article" />
      </Surface>
    </div>
  );
}
