"use client";

import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/components/user-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      {children}
      <Toaster />
    </UserProvider>
  );
}
