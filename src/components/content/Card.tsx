import clsx from "clsx";

import { Media } from "@/components/content/Media";
import { TextBlock } from "@/components/content/TextBlock";
import { resolveMedia } from "@/data/resolveMedia";
import type { ContentItem } from "@/types/content";

export type CardProps = {
  item: ContentItem;
  className?: string;
};

export function Card({ item, className }: CardProps) {
  const mediaRef = Array.isArray(item.media) ? item.media[0] : item.media;
  const media = resolveMedia(mediaRef);

  return (
    <article className={clsx("card", className)}>
      {media ? <Media media={media} className="card__media" /> : null}
      <TextBlock content={item} titleAs="h3" className="card__body" />
    </article>
  );
}
