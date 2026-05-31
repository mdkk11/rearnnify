import Link from "next/link";

import { Surface } from "@/components/ui/surface";

export default function ArticleNotFound() {
  return (
    <Surface spacious>
      <div className="stack-tight">
        <p className="eyebrow">Not found</p>
        <h1 className="heading-lg">Article not found</h1>
        <p className="body-muted">The requested article does not exist.</p>
        <Link className="ui-button ui-button-outline" href="/admin/articles">
          Back to articles
        </Link>
      </div>
    </Surface>
  );
}
