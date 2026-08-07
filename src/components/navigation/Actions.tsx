import clsx from "clsx";

import { getLink } from "@/data/linkRegistry";
import type { Action } from "@/types/content";

export type ActionsProps = {
  links?: Action[];
  className?: string;
};

export function Actions({ links = [], className }: ActionsProps) {
  if (!links.length) return null;

  return (
    <div className={clsx("actions", className)}>
      {links.map((link) => {
        const href = link.href ?? getLink(link.linkKey);
        if (!href) return null;

        return (
          <a
            key={`${link.label}-${link.linkKey ?? href}`}
            className={clsx(
              "actions__link",
              `actions__link--${link.priority ?? "secondary"}`,
            )}
            href={href}
            data-intent={link.intent ?? "navigate"}
          >
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
