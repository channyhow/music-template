import { Media } from "@/components/content/Media";
import type { MediaItem } from "@/types/media";

export type GalleryLayout = "grid" | "masonry" | "editorial";

export function Gallery({
  items,
  layout = "grid",
}: {
  items: MediaItem[];
  layout?: GalleryLayout;
}) {
  return (
    <div className="gallery" data-layout={layout}>
      {items.map((item) => (
        <div className="gallery__item" key={item.id}>
          <Media media={item} />
        </div>
      ))}
    </div>
  );
}
