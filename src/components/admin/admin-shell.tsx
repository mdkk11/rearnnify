import Link from "next/link";
import type { ReactNode } from "react";
import { BookOpen, LayoutDashboard } from "lucide-react";

import { Surface } from "@/components/ui/surface";

type AdminShellProps = {
  children: ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar" aria-label="Admin navigation">
        <div className="admin-brand">
          <span className="admin-brand-mark" aria-hidden="true">
            <LayoutDashboard size={16} strokeWidth={1.5} />
          </span>
          <div>
            <p className="eyebrow">External service</p>
            <p className="admin-brand-name">Learnnify</p>
          </div>
        </div>
        <nav className="admin-nav">
          <Link className="admin-nav-link admin-nav-link-active" href="/admin/articles">
            <BookOpen size={16} strokeWidth={1.5} />
            Articles
          </Link>
        </nav>
      </aside>
      <main className="admin-main">
        <Surface className="admin-topbar">
          <div>
            <p className="eyebrow">MVP Phase 1</p>
            <p className="admin-topbar-title">Management console</p>
          </div>
        </Surface>
        {children}
      </main>
    </div>
  );
}
