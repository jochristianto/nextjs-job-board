import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const DESCRIPTION_DEFAULT_TAG = "p";

const textVariants = cva("", {
  variants: {
    variant: {
      display1: "font-display scroll-m-20 text-6xl tracking-tight lg:text-6xl",
      display2: "font-display scroll-m-20 text-5xl tracking-tight lg:text-5xl",
      display3: "font-display scroll-m-20 text-4xl tracking-tight lg:text-4xl leading-[3.0rem]!",
      display4: "font-display scroll-m-20 text-3xl tracking-normal lg:text-3xl",
      display5: "font-display scroll-m-20 text-2xl tracking-wide lg:text-2xl",
      display6: "font-display scroll-m-20 text-xl tracking-normal lg:text-xl",
      userH3: "scroll-m-20 text-[1.625rem] font-bold tracking-tight font-sans text-[#595959]",
      userBody: "scroll-m-20 text-[1.0625rem] font-normal tracking-tight font-sans text-[#595959]",
      h1: "scroll-m-20 text-4xl font-bold tracking-tight lg:text-4xl font-serif",
      h2: "scroll-m-20 pb-2 text-3xl font-bold tracking-tight first:mt-0 font-serif",
      h3: "scroll-m-20 text-2xl font-bold tracking-tight font-serif",
      h4: "scroll-m-20 text-xl font-bold tracking-tight font-serif",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight font-serif",
      h6: "scroll-m-20 text-base font-semibold tracking-tight font-serif",
      p: "leading-7",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      ul: "my-6 ml-6 list-disc [&>li]:mt-2",
      inlineCode:
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      lead: "text-xl text-muted-foreground font-serif",
      largeText: "text-lg font-semibold",
      smallText: "text-sm leading-snug",
      tinyText: "text-xs",
      xxsText: "text-[.6875rem] leading-4",
      mutedText: "text-base text-muted-foreground",
      body: "text-base font-normal",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean;
  as?: string;
}

const Text = ({
  className,
  variant,
  asChild = false,
  as = DESCRIPTION_DEFAULT_TAG,
  ...props
}: TextProps) => {
  const Comp = asChild ? Slot : as;
  return <Comp className={cn(textVariants({ variant, className }))} {...props} />;
};

Text.displayName = "Text";

export { Text, textVariants };
