import { IconInnerShadowTop } from "@tabler/icons-react";
import Link from "next/link";
import type { FC } from "react";

type LogoProps = {};

const Logo: FC<LogoProps> = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <IconInnerShadowTop className="!size-5" />

      <div className="flex items-center gap-0 text-base font-semibold leading-[0]">
        <span>better</span>
        <span className="text-brand">job</span>
        <span>.</span></div>
    </Link>
  );
};

export default Logo;
