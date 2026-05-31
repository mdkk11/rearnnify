import { Database } from "lucide-react";

import { Surface } from "@/components/ui/surface";

type DbSetupNoticeProps = {
  title?: string;
};

export function DbSetupNotice({
  title = "Database connection required",
}: DbSetupNoticeProps) {
  return (
    <Surface spacious>
      <div className="stack-tight">
        <p className="eyebrow">DATABASE_URL</p>
        <h2 className="heading-lg">{title}</h2>
        <p className="body-muted">
          Set `DATABASE_URL` and run the Drizzle migration before using article
          management.
        </p>
        <p className="inline-code">
          npm run db:generate && npm run db:migrate
        </p>
        <Database size={20} strokeWidth={1.5} aria-hidden="true" />
      </div>
    </Surface>
  );
}
