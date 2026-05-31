import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import { auth, isAdminSession } from "@/auth";

export async function requireAdmin() {
  const session = await auth();

  if (!isAdminSession(session)) {
    throw new Error("Unauthorized.");
  }

  return session;
}

export async function requireAdminPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  if (!isAdminSession(session)) {
    redirect("/login?error=unauthorized");
  }

  return session;
}

export async function requireAdminApi() {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Not authenticated." }, { status: 401 });
  }

  if (!isAdminSession(session)) {
    return NextResponse.json({ message: "Forbidden." }, { status: 403 });
  }

  return null;
}
