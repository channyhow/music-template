import type { ReactNode } from "react";
import clsx from "clsx";

export type GridProps = {
  children: ReactNode;
  className?: string;
};

export function Grid({ children, className }: GridProps) {
  return <div className={clsx("grid", className)}>{children}</div>;
}
