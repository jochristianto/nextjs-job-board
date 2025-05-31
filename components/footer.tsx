import Container from "@/components/container";
import { Text } from "@/components/ui/text";
import type { FC } from "react";

type FooterProps = {};

const Footer: FC<FooterProps> = () => {
  return (
    <footer className="sticky bottom-0 inset-x-0 w-full border-t bg-white">
      <Container className="p-3 px-5 flex flex-row-reverse md:flex-row items-center justify-between">
        <div />

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
