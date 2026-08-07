import { useState, type ReactNode } from "react";

import siteData from "@/data/site.json";

export type ContentSwitcherItem = {
  id: string;
  label: string;
  content: ReactNode;
};

export function ContentSwitcher({ items }: { items: ContentSwitcherItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const active = items.find((item) => item.id === activeId) ?? items[0];

  if (!active) return null;

  return (
    <div className="contentSwitcher">
      <div
        className="contentSwitcher__controls"
        role="tablist"
        aria-label={siteData.ui.copy.contentSwitcher.controlsLabel}
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === active.id}
            onClick={() => setActiveId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="contentSwitcher__panel" role="tabpanel" key={active.id}>
        {active.content}
      </div>
    </div>
  );
}
