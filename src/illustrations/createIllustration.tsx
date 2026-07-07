import type { ReactNode, SVGProps } from "react";
import { cn } from "../utils/cn";

export type IllustrationProps = SVGProps<SVGSVGElement>;

type CreateIllustrationOptions = {
  name: string;
  children: ReactNode;
};

export const createIllustration = ({ name, children }: CreateIllustrationOptions) => {
  const Illustration = ({ className, ...props }: IllustrationProps) => (
    <svg
      width={120}
      height={120}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={name}
      className={cn("shrink-0", className)}
      {...props}
    >
      {children}
    </svg>
  );

  Illustration.displayName = name;
  return Illustration;
};
