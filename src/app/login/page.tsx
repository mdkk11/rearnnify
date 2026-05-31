import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";

export default function LoginPage() {
  return (
    <main className="page-shell centered-page">
      <Surface className="login-panel" spacious>
        <div className="stack">
          <div className="stack-tight">
            <p className="eyebrow">Learnnify admin</p>
            <h1 className="heading-xl">Sign in to continue</h1>
            <p className="body-muted">
              Manage article snapshots and generated learning content from one quiet
              workspace.
            </p>
          </div>
          <Button>
            <LogIn size={16} strokeWidth={1.5} />
            Googleでログイン
          </Button>
        </div>
      </Surface>
    </main>
  );
}
