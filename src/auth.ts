import NextAuth, { type Session } from "next-auth";
import Google from "next-auth/providers/google";

function getAdminEmail() {
  return process.env.ADMIN_EMAIL?.toLowerCase();
}

export function isAdminSession(session: Session | null) {
  const adminEmail = getAdminEmail();
  const sessionEmail = session?.user?.email?.toLowerCase();

  return Boolean(adminEmail && sessionEmail && sessionEmail === adminEmail);
}

type GoogleProfile = {
  email?: string;
  email_verified?: boolean;
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret:
    process.env.AUTH_SECRET ??
    (process.env.NODE_ENV === "production" ? undefined : "development-only-secret"),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider !== "google") {
        return false;
      }

      const adminEmail = getAdminEmail();
      const googleProfile = profile as GoogleProfile | undefined;
      const profileEmail = googleProfile?.email?.toLowerCase();
      const emailVerified = googleProfile?.email_verified === true;

      return Boolean(adminEmail && profileEmail === adminEmail && emailVerified);
    },
  },
});
