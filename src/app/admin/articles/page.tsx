import { FileText, Plus, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";

export default function ArticlesPage() {
  return (
    <div className="stack">
      <div className="cluster">
        <div className="stack-tight">
          <p className="eyebrow">Articles</p>
          <h1 className="heading-xl">Article snapshots</h1>
          <p className="body-muted">
            Source bodies will be stored here later as AI generation snapshots.
          </p>
        </div>
        <Button variant="secondary">
          <Plus size={16} strokeWidth={1.5} />
          New article
        </Button>
      </div>

      <Surface spacious>
        <div className="empty-state">
          <div className="stack-tight">
            <p className="eyebrow">No records</p>
            <h2 className="heading-lg">No articles yet</h2>
            <p className="body-muted">
              Phase 1 only prepares the management shell. Article creation,
              persistence, and generation controls arrive in the next phases.
            </p>
          </div>

          <div className="empty-state-grid">
            <div className="metric-panel">
              <p className="eyebrow">Articles</p>
              <p className="metric-value">00</p>
            </div>
            <div className="metric-panel">
              <p className="eyebrow">Slides</p>
              <p className="metric-value">00</p>
            </div>
            <div className="metric-panel">
              <p className="eyebrow">Quizzes</p>
              <p className="metric-value">00</p>
            </div>
          </div>

          <div className="cluster">
            <Button variant="outline">
              <FileText size={16} strokeWidth={1.5} />
              Empty table
            </Button>
            <Button variant="ghost">
              <Sparkles size={16} strokeWidth={1.5} />
              Generation not configured
            </Button>
          </div>
        </div>
      </Surface>
    </div>
  );
}
