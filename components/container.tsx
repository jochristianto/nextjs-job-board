import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return <div className={cn("w-full max-w-5xl mx-auto", className)}>{children}</div>;
}
