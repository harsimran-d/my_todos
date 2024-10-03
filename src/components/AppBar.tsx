"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AppBar() {
  const session = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  return (
    <div className="flex justify-end px-4">
      {session.status == "authenticated" ? (
        <button
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => router.push(`/auth/signin?callbackUrl=${callbackUrl}`)}
        >
          Sign In
        </button>
      )}
    </div>
  );
}
