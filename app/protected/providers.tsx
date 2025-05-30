"use client";

import { UserProvider } from "@/components/user-provider";

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}