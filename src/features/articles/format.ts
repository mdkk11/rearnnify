import type { GenerationStatus } from "@/db/schema";

export function formatDateTime(value: Date | string) {
  const date = typeof value === "string" ? new Date(value) : value;

  return new Intl.DateTimeFormat("ja-JP", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function formatStatus(status: GenerationStatus) {
  const labels: Record<GenerationStatus, string> = {
    not_generated: "未生成",
    generating: "生成中",
    generated: "生成済み",
    failed: "失敗",
  };

  return labels[status];
}
