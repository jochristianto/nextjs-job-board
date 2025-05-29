import Link from "next/link";
import type { FC } from "react";

type LogoProps = {};

const Logo: FC<LogoProps> = () => {
  return (
    <Link href="/" className="flex items-center gap-0 text-base font-normal">
      <span className="lowercase">Job</span>
      <span className="lowercase font-semibold">Board</span>
    </Link>
  );
};

export default Logo;
