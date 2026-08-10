import clsx from "clsx";
import type { ElementType } from "react";
import type { ContentItem } from "@/types/content";
import { Actions } from "@/components/navigation/Actions";

export type TextBlockProps = { content: ContentItem; as?: "article" | "div"; titleAs?: "h1" | "h2" | "h3" | "h4"; className?: string; };
const toArray = <T,>(value?: T | T[]): T[] => !value ? [] : Array.isArray(value) ? value : [value];

export function TextBlock({ content, as = "div", titleAs = "h2", className }: TextBlockProps) {
  const Root = as as ElementType;
  const Title = titleAs as ElementType;
  const subtitles = toArray(content.subtitle).filter(Boolean);
  const paragraphs = toArray(content.text).filter(Boolean);
  const hasHeader = Boolean(content.eyebrow || content.title || subtitles.length);
  const hasContent = paragraphs.length > 0;
  const hasFooter = Boolean(content.links?.length);
  const hasMeta = Boolean(content.meta?.length);
  if (!hasHeader && !hasContent && !hasFooter && !hasMeta) return null;

  return <Root className={clsx("textBlock", className)}>
    {hasHeader ? <header className="textBlock__header">{content.eyebrow ? <p className="textBlock__eyebrow">{content.eyebrow}</p> : null}{content.title ? <Title className="textBlock__title">{content.title}</Title> : null}{subtitles.length ? <div className="textBlock__subtitle">{subtitles.map((subtitle) => <p key={subtitle}>{subtitle}</p>)}</div> : null}</header> : null}
    {hasContent ? <div className="textBlock__content">{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div> : null}
    {hasFooter ? <footer className="textBlock__footer"><Actions links={content.links} /></footer> : null}
    {hasMeta ? <div className="textBlock__meta">{content.meta?.map((item) => <span key={`${item.label}-${item.value ?? ""}`}>{item.value ? `${item.label}: ${item.value}` : item.label}</span>)}</div> : null}
  </Root>;
}
