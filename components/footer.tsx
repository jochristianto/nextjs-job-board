import type { FC } from "react";
import { ThemeSwitcher } from "./theme-switcher";

type FooterProps = {};

const Footer: FC<FooterProps> = () => {
  return (
    <footer className="w-full flex items-center justify-between border-t mx-auto text-center text-md gap-8 px-4 py-3">
      <p>
        Powered by{" "}
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Supabase
        </a>
      </p>
      <ThemeSwitcher />
    </footer>
  );
};

export default Footer;
