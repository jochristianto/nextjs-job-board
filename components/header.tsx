import { AuthButton } from "@/components/auth-button";
import Container from "@/components/container";
import { EnvVarWarning } from "@/components/env-var-warning";
import Logo from "@/components/logo";
import { hasEnvVars } from "@/lib/utils";
import type { FC } from "react";

type HeaderProps = {};

const Header: FC<HeaderProps> = () => {
  return (
    <nav className="sticky top-0 inset-x-0 z-10 bg-white w-full flex justify-center border-b border-b-foreground/10 h-16">
      <Container className="p-3 px-5 flex justify-between items-center">
        <div className="flex gap-5 items-center font-semibold">
          <Logo />
        </div>
        {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
      </Container>
    </nav>
  );
};

export default Header;
