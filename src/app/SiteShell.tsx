import type { ReactNode } from "react";

import { Drawer } from "@/components/navigation/Drawer";
import { Header } from "@/components/navigation/Header";
import { ScrollProgress, type ScrollProgressMode } from "@/components/navigation/ScrollProgress";
import siteData from "@/data/site.json";
import { selectDrawerView, selectOverlayOpen, useUIStore } from "@/state/uiStore";
import type { StyleVariant, Tone } from "@/types/content";

export function SiteShell({ children }: { children: ReactNode }) {
  const drawer = useUIStore(selectDrawerView);
  const overlayOpen = useUIStore(selectOverlayOpen);
  const scrollProgress = siteData.ui.experience.scrollProgress as ScrollProgressMode | false;

  return (
    <div
      className="site"
      data-variant={siteData.theme.variant as StyleVariant}
      data-tone={siteData.theme.tone as Tone}
      data-drawer={drawer ?? "closed"}
      data-overlay={overlayOpen ? "open" : "closed"}
    >
      <ScrollProgress mode={scrollProgress} />
      <Header />
      <main className="site__canvas">{children}</main>
      <Drawer />
    </div>
  );
}
