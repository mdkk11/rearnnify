import Link from "next/link";
import type { ReactNode } from "react";
import { BookOpen, LayoutDashboard, LogOut } from "lucide-react";

import { signOut } from "@/auth";
import { Surface } from "@/components/ui/surface";
import { Button } from "@/components/ui/button";

type AdminShellProps = {
  children: ReactNode;
  email: string;
};

export function AdminShell({ children, email }: AdminShellProps) {
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
            <p className="eyebrow">MVP Admin</p>
            <p className="admin-topbar-title">Management console</p>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
            className="admin-session"
          >
            <span className="mono-cell">{email}</span>
            <Button variant="ghost" type="submit">
              <LogOut size={16} strokeWidth={1.5} />
              Sign out
            </Button>
          </form>
        </Surface>
        {children}
      </main>
    </div>
  );
}
