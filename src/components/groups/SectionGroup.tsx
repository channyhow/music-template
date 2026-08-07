import { useReducedMotion } from "motion/react";

import { resolveBlock } from "@/data/resolve";
import { Section } from "@/components/section/Section";
import type { SectionGroup as SectionGroupData } from "@/types/content";

export function SectionGroup({ group }: { group: SectionGroupData }) {
  const reduceMotion = useReducedMotion();
  const requestedLayout = group.layout ?? "flow";
  const layout = reduceMotion && requestedLayout !== "flow" ? "flow" : requestedLayout;

  return (
    <div
      className="sectionGroup"
      data-layout={layout}
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
