import Container from "@/components/container";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Text } from "@/components/ui/text";
import type { FC } from "react";

type FooterProps = {};

const Footer: FC<FooterProps> = () => {
  return (
    <footer className="w-full border-t">
      <Container className="p-3 px-5 flex items-center justify-between">
        <div>
          <ThemeSwitcher />
        </div>

        <div className="flex items-center gap-3">
          <Text variant="tinyText" className="uppercase">
            &copy; {new Date().getFullYear()} Better Job. All rights reserved.
          </Text>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
