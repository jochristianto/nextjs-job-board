import Link from "next/link";
import type { FC } from "react";

type LogoProps = {};

const Logo: FC<LogoProps> = () => {
  return (
    <Link href="/" className="flex items-center gap-0 text-base font-semibold leading-[0]">
      <span>better</span>
      <span className="text-brand">job</span>
      <span>.</span>
    </Link>
  );
};

export default Logo;
