import { Children, useRef, useState, type ReactNode } from "react";

import siteData from "@/data/site.json";

export function Carousel({ children, label }: { children: ReactNode; label?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const count = Children.count(children);
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(count > 1);
  const copy = siteData.ui.copy.carousel;

  const updateControls = () => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanPrevious(track.scrollLeft > 2);
    setCanNext(track.scrollLeft < maxScroll - 2);
  };

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.82, behavior: "smooth" });
  };

  return (
    <div className="carousel" aria-label={label ?? copy.defaultLabel}>
      <div className="carousel__track" ref={trackRef} onScroll={updateControls}>
        {Children.map(children, (child, index) => (
          <div className="carousel__item" aria-label={`${index + 1} ${copy.positionSeparator} ${count}`}>
            {child}
          </div>
        ))}
      </div>
      <div className="carousel__controls" aria-label={copy.navigationLabel}>
        <button type="button" onClick={() => move(-1)} aria-label={copy.previousLabel} disabled={!canPrevious}>←</button>
        <button type="button" onClick={() => move(1)} aria-label={copy.nextLabel} disabled={!canNext}>→</button>
      </div>
    </div>
  );
}
