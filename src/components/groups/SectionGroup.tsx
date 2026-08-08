import { useReducedMotion } from "motion/react";

import { resolveBlock } from "@/data/resolve";
import { Section } from "@/components/section/Section";
import type { SectionGroup as SectionGroupData } from "@/types/content";

export function SectionGroup({ group }: { group: SectionGroupData }) {
  const reduceMotion = useReducedMotion();
  const requestedLayout = group.layout ?? "flow";
  const layout = reduceMotion && requestedLayout !== "flow" ? "flow" : requestedLayout;
  const isPanel = layout === "scroll-panel";

  return (
    <div
      className="sectionGroup"
      data-layout={layout}
      data-panel-mode={isPanel ? group.panel?.mode ?? "scene" : undefined}
      data-panel-size={isPanel ? group.panel?.size ?? "md" : undefined}
      data-panel-align={isPanel ? group.panel?.align ?? "center" : undefined}
      data-panel-surface={isPanel ? group.panel?.surface ?? "solid" : undefined}
      data-motion={reduceMotion ? "none" : group.motion?.level ?? "none"}
      data-preset={reduceMotion ? undefined : group.motion?.preset}
    >
      {group.blocks.map(({ ref }) => {
        const block = resolveBlock(ref);
        return block ? <Section key={ref} block={block} /> : null;
      })}
    </div>
  );
}
