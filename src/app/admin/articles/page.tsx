import Link from "next/link";
import { FileText, Plus } from "lucide-react";

import { Surface } from "@/components/ui/surface";
import { listArticles } from "@/features/articles/data";
import { DbSetupNotice } from "@/features/articles/db-setup-notice";
import { formatDateTime, formatStatus } from "@/features/articles/format";

export const dynamic = "force-dynamic";

export default function ArticlesPage() {
  return <ArticlesContent />;
}

async function ArticlesContent() {
  let articles;

  try {
    articles = await listArticles();
  } catch {
    return (
      <div className="stack">
        <div className="cluster">
          <div className="stack-tight">
            <p className="eyebrow">Articles</p>
            <h1 className="heading-xl">Article snapshots</h1>
            <p className="body-muted">
              Configure the database before managing article snapshots.
            </p>
          </div>
        </div>
        <DbSetupNotice />
      </div>
    );
  }

  return (
    <div className="stack">
      <div className="cluster">
        <div className="stack-tight">
          <p className="eyebrow">Articles</p>
          <h1 className="heading-xl">Article snapshots</h1>
          <p className="body-muted">
            Source bodies are stored as AI generation snapshots.
          </p>
        </div>
        <Link className="ui-button ui-button-secondary" href="/admin/articles/new">
          <Plus size={16} strokeWidth={1.5} />
          New article
        </Link>
      </div>

      <Surface spacious>
        {articles.length === 0 ? (
          <div className="empty-state">
            <div className="stack-tight">
              <p className="eyebrow">No records</p>
              <h2 className="heading-lg">No articles yet</h2>
              <p className="body-muted">
                Create the first article snapshot to prepare for slide and quiz
                generation in later phases.
              </p>
            </div>
            <Link className="ui-button ui-button-outline" href="/admin/articles/new">
              <FileText size={16} strokeWidth={1.5} />
              Create article
            </Link>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Slide status</th>
                  <th>Quiz status</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id}>
                    <td>
                      <Link
                        className="table-title-link"
                        href={`/admin/articles/${article.id}`}
                      >
                        {article.title}
                      </Link>
                      {article.sourceUrl ? (
                        <p className="table-subtext">{article.sourceUrl}</p>
                      ) : null}
                    </td>
                    <td>
                      <span className="status-pill">
                        {formatStatus(article.slideStatus)}
                      </span>
                    </td>
                    <td>
                      <span className="status-pill">
                        {formatStatus(article.quizStatus)}
                      </span>
                    </td>
                    <td className="mono-cell">{formatDateTime(article.updatedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Surface>
    </div>
  );
}
