"use client";

import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 relative">
      <Button variant="outline" onClick={() => router.back()} className="absolute top-6 left-6">
        <ChevronLeft className="size-4" />
      </Button>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
