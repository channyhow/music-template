import clsx from "clsx";
import { getLink } from "@/data/linkRegistry";
import type { Action } from "@/types/content";
export type ActionsProps = { links?: Action[]; className?: string };
export function Actions({ links = [], className }: ActionsProps) { if (!links.length) return null; return <div className={clsx("actions", className)}>{links.map((link) => { const href = link.href ?? getLink(link.linkKey); if (!href) return null; const variant = link.variant ?? (link.priority === "primary" ? "primary" : "arrow"); return <a key={`${link.label}-${link.linkKey ?? href}`} className={clsx("actions__link", `actions__link--${variant}`)} href={href} data-intent={link.intent ?? "navigate"} data-priority={link.priority ?? "secondary"}><span>{link.label}</span>{variant === "arrow" ? <span className="actions__arrow" aria-hidden="true">→</span> : null}</a>; })}</div>; }
