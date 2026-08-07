import { useRef, type ReactNode } from "react";
import clsx from "clsx";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { Card } from "@/components/content/Card";
import { Media } from "@/components/content/Media";
import { TextBlock } from "@/components/content/TextBlock";
import { Form } from "@/components/forms/Form";
import { Grid } from "@/components/layout/Grid";
import { Split } from "@/components/layout/Split";
import { forms } from "@/data";
import { resolveCollection } from "@/data/resolve";
import { resolveMedia } from "@/data/resolveMedia";
import siteData from "@/data/site.json";
import { motionConfig, revealTransition } from "@/motion/config";
import type { SectionBlock } from "@/types/content";
import type { FormSchema } from "@/types/forms";

export type SectionProps = {
  block: SectionBlock;
};

const formRegistry = forms as Record<string, FormSchema>;

function SceneInner({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["1.5rem", "-1.5rem"]);

  return (
    <motion.div ref={ref} className="section__inner" style={{ y }}>
      {children}
    </motion.div>
  );
}

export function Section({ block }: SectionProps) {
  const reduceMotion = useReducedMotion();

  const items = [
    ...(block.content?.items ?? []),
    ...resolveCollection(block.source),
  ];

  const header = block.content?.header;
  const formRef = block.content?.form;
  const form = typeof formRef === "string" ? formRegistry[formRef] : formRef;
  const layout = block.layout ?? "text";
  const mediaRef = Array.isArray(block.content?.media)
    ? block.content?.media[0]
    : block.content?.media;
  const media = resolveMedia(mediaRef);
  const motionEnabled = siteData.ui.experience.sectionReveal && !reduceMotion;
  const shouldReveal = motionEnabled && block.motion !== "none";
  const shouldTrackScroll = motionEnabled && block.motion === "scene";

  const cards = items.length ? (
    <Grid className="section__body">
      {items.map((item, index) => (
        <Card key={item.id ?? `${item.title ?? "item"}-${index}`} item={item} />
      ))}
    </Grid>
  ) : null;

  const secondary = media ? (
    <Media media={media} sizes="(min-width: 64rem) 50vw, 100vw" />
  ) : form ? (
    <Form schema={form} />
  ) : cards;

  const body = layout === "split" ? (
    <Split
      primary={header ? <TextBlock content={header} /> : null}
      secondary={secondary}
    />
  ) : (
    <>
      {header ? <TextBlock content={header} className="section__header" /> : null}
      {media ? <Media media={media} className="section__media" /> : null}
      {form ? <Form schema={form} /> : null}
      {cards}
    </>
  );

  return (
    <motion.section
      id={block.id}
      className={clsx("section", block.frame && "frame", block.className)}
      data-layout={layout}
      data-variant={block.variant}
      data-tone={block.tone}
      data-motion={block.motion ?? "reveal"}
      initial={shouldReveal ? { opacity: 0, y: "var(--motion-distance)" } : false}
      whileInView={shouldReveal ? { opacity: 1, y: 0 } : undefined}
      viewport={motionConfig.viewport}
      transition={revealTransition}
    >
      {shouldTrackScroll ? (
        <SceneInner>{body}</SceneInner>
      ) : (
        <div className="section__inner">{body}</div>
      )}
    </motion.section>
  );
}
