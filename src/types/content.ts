import type { FormSchema } from "@/types/forms";

export type StyleVariant = "classic" | "editorial" | "organic";
export type Tone = "default" | "inverse" | "accent";
export type MotionLevel = "none" | "reveal" | "scene";

export type SectionLayout =
  | "text"
  | "statement"
  | "split"
  | "grid"
  | "list"
  | "gallery"
  | "carousel"
  | "media"
  | "media-overlay";

export type GroupLayout = "flow" | "scroll-panel" | "sticky" | "overlap";
export type PanelSize = "sm" | "md" | "lg";
export type PanelAlign = "left" | "center" | "right";

export type ActionIntent =
  | "navigate"
  | "contact"
  | "call"
  | "directions"
  | "book"
  | "buy"
  | "subscribe"
  | "download"
  | "share";

export type Action = { label: string; href?: string; linkKey?: string; intent?: ActionIntent; priority?: "primary" | "secondary"; };
export type MetaItem = { label: string; value?: string; };
export type MediaRef = string;
export type ContentItem = { id?: string; eyebrow?: string; title?: string; subtitle?: string | string[]; text?: string | string[]; media?: MediaRef | MediaRef[]; links?: Action[]; meta?: MetaItem[]; tags?: string[]; category?: string; group?: string; featured?: boolean; enabled?: boolean; order?: number; };
export type SourceRef = { collection: string; query?: { featured?: boolean; category?: string; group?: string; enabled?: boolean; limit?: number; }; };
export type SectionContent = { header?: ContentItem; items?: ContentItem[]; media?: MediaRef | MediaRef[]; links?: Action[]; form?: string | FormSchema; };
export type SectionBlock = { id: string; type: "Section"; variant?: StyleVariant; tone?: Tone; layout?: SectionLayout; source?: SourceRef; content?: SectionContent; frame?: boolean; motion?: MotionLevel; className?: string; };
export type BlockRef = { ref: string };
export type SectionGroup = { id: string; type: "Group"; layout?: GroupLayout; panel?: { size?: PanelSize; align?: PanelAlign; }; motion?: { level: MotionLevel; preset?: "panel" | "media-reveal" | "sticky-story" | "horizontal-rail"; }; blocks: BlockRef[]; };
export type PageBlock = SectionBlock | SectionGroup | BlockRef;
export type PageSeo = { title: string; description?: string; image?: MediaRef; canonical?: string; robots?: { index?: boolean; follow?: boolean; }; };
export type PageData = { id: string; slug: string; variant?: StyleVariant; seo?: PageSeo; blocks: PageBlock[]; };
