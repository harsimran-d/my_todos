"use client";

import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </SessionProvider>
  );
}
