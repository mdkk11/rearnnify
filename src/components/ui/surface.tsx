import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SurfaceProps = HTMLAttributes<HTMLDivElement> & {
  spacious?: boolean;
};

export function Surface({ className, spacious = false, ...props }: SurfaceProps) {
  return (
    <div
      className={cn("ui-surface", spacious && "ui-surface-spacious", className)}
      {...props}
    />
  );
}
