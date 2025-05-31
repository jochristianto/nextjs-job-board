"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const SocialButtons = () => {
  return (
    <>
      <Button asChild size="sm" variant="outline">
        <a
          href="https://github.com/jochristianto/nextjs-job-board/blob/main/README.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          README
        </a>
      </Button>
      <Button asChild size="sm" variant="outline">
        <a
          href="https://github.com/jochristianto/nextjs-job-board"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon className="size-4" />
        </a>
      </Button>
      <Button asChild size="sm" variant="outline">
        <a
          href="https://www.linkedin.com/in/jochristianto"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinIcon className="size-4" />
        </a>
      </Button>
    </>
  );
};

export function AuthButton() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  return user ? (
    <div className="flex items-center gap-2 text-sm">
      <Button asChild size="sm" variant="outline">
        <Link href="/protected">Manage Jobs</Link>
      </Button>
      <SocialButtons />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant="outline">
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant="default">
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
      <SocialButtons />
    </div>
  );
}
