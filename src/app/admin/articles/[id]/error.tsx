"use client";

import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";

type ArticleErrorProps = {
  error: Error;
  reset: () => void;
};

export default function ArticleError({ error, reset }: ArticleErrorProps) {
  return (
    <Surface spacious>
      <div className="stack">
        <div className="stack-tight">
          <p className="eyebrow">Article error</p>
          <h1 className="heading-lg">The article action failed</h1>
          <p className="body-muted">{error.message}</p>
        </div>
        <div>
          <Button type="button" onClick={reset}>
            <RotateCcw size={16} strokeWidth={1.5} />
            Retry
          </Button>
        </div>
      </div>
    </Surface>
  );
}
