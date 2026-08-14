import { useMemo, useState, type ReactNode } from "react";
import { Accordion } from "@/components/content/Accordion";
import { Card } from "@/components/content/Card";
import { Carousel } from "@/components/content/Carousel";
import { ContentSwitcher } from "@/components/content/ContentSwitcher";
import { Embed, type EmbedProvider } from "@/components/content/Embed";
import { Gallery, type GalleryLayout } from "@/components/content/Gallery";
import { HorizontalScroll } from "@/components/content/HorizontalScroll";
import { Loader } from "@/components/content/Loader";
import { Media } from "@/components/content/Media";
import { TextBlock } from "@/components/content/TextBlock";
import { Timeline } from "@/components/content/Timeline";
import { Form } from "@/components/forms/Form";
import { Grid } from "@/components/layout/Grid";
import { ScrollPanel } from "@/components/layout/ScrollPanel";
import { ScrollScene } from "@/components/layout/ScrollScene";
import { Split } from "@/components/layout/Split";
import { Actions } from "@/components/navigation/Actions";
import businessContextsData from "@/data/businessContexts.json";
import formsData from "@/data/forms.json";
import siteData from "@/data/site.json";
import systemData from "@/data/system.json";
import { resolveMedia } from "@/data/resolveMedia";
import { enrichScheduleEvents } from "@/features/schedule/enrichEvent";
import { Schedule } from "@/features/schedule/Schedule";
import { useUIStore } from "@/state/uiStore";
import type { ContentItem, StyleVariant, Tone } from "@/types/content";
import type { FormSchema } from "@/types/forms";
import type { MediaItem } from "@/types/media";
import type { CalendarEvent } from "@/types/schedule";
import type { SystemComponentName } from "@/types/system";

const previews = systemData.previews;
const variants = systemData.variants as StyleVariant[];
const tones = systemData.tones as Tone[];
const forms = formsData as Record<string, FormSchema>;
const contexts = businessContextsData.contexts;
const inventory: Array<{ title: string; items: SystemComponentName[] }> = [
  { title: "Content", items: ["TextBlock", "Media", "Card", "Gallery", "Carousel", "ContentSwitcher", "Accordion", "HorizontalScroll", "Timeline", "Embed", "Loader"] },
  { title: "Layout", items: ["Grid", "Split", "ScrollScene", "ScrollPanel", "Section", "SectionGroup", "SiteFooter"] },
  { title: "Navigation", items: ["Actions", "Header", "BurgerButton", "Drawer", "FloatingAction", "ScrollProgress"] },
  { title: "Forms & features", items: ["Form", "Schedule"] },
  { title: "Page infrastructure", items: ["PageMeta", "PageRenderer", "RouteLoader", "Seo"] },
];

function Demo({ name, title, purpose, children }: { name: string; title: string; purpose?: string; children: ReactNode }) {
  return <section className="section"><div className="section__inner stack"><TextBlock content={{ eyebrow: name, title }} />{purpose ? <p className="systemPage__purpose">{purpose}</p> : null}{children}</div></section>;
}

export function SystemPage() {
  const [variant, setVariant] = useState<StyleVariant>("editorial");
  const [tone, setTone] = useState<Tone>("default");
  const [galleryLayout, setGalleryLayout] = useState<GalleryLayout>("editorial");
  const [panels, setPanels] = useState(true);
  const openDrawer = useUIStore((state) => state.openDrawer);
  const galleryItems = useMemo<MediaItem[]>(() => previews.gallery.media.flatMap((id, index) => { const media = resolveMedia(id); return media ? [{ ...media, id: `${media.id}-${index}` }] : []; }), []);
  const scheduleEvents = useMemo(() => enrichScheduleEvents(previews.schedule.events as CalendarEvent[]), []);
  const splitMedia = resolveMedia(previews.split.secondaryMedia);
  const horizontalItems = previews.carousel.items.slice(0, 3) as ContentItem[];

  return <div className="page systemPage" data-variant={variant} data-tone={tone}>
    <section className="section borderBottom"><div className="section__inner stack"><TextBlock content={systemData.intro as ContentItem} titleAs="h1" /><div className="cluster">{variants.map((item) => <button key={item} type="button" onClick={() => setVariant(item)} aria-pressed={variant === item}>{item}</button>)}</div><div className="cluster">{tones.map((item) => <button key={item} type="button" onClick={() => setTone(item)} aria-pressed={tone === item}>{item}</button>)}</div><div className="cluster"><button type="button" onClick={() => openDrawer("menu")}>Navigation drawer</button><button type="button" onClick={() => openDrawer("contact")}>Contact drawer</button><button type="button" onClick={() => openDrawer("reservation")}>Reservation drawer</button></div></div></section>
    <section className="section borderBottom"><div className="section__inner stack"><TextBlock content={{ eyebrow: "Inventory", title: "Every shared component, in one place.", text: ["Visual primitives are demonstrated below; shell and routing components are documented without nesting a second application shell."] }} />{inventory.map((group) => <div className="stack" key={group.title}><TextBlock content={{ title: group.title }} titleAs="h2" /><Grid>{group.items.map((item) => <Card key={item} item={{ title: item }} frame />)}</Grid></div>)}</div></section>
    <Demo name="Palette" title="Semantic brand roles."><div className="systemPage__palette"><div className="systemPage__swatch" data-color="primary"><span>Primary</span></div><div className="systemPage__swatch" data-color="secondary"><span>Secondary</span></div><div className="systemPage__swatch" data-color="special"><span>Special</span></div><div className="systemPage__swatch" data-color="accent"><span>Accent</span></div></div></Demo>
    <Demo name="TextBlock" title="Editorial hierarchy." purpose={previews.textBlock.purpose}><TextBlock content={previews.textBlock.content as ContentItem} /></Demo>
    <Demo name="Actions" title="One language for navigation and conversion."><Actions links={[{ label: "Primary action", href: "#forms", intent: "navigate", priority: "primary" }, { label: "Secondary action", href: "#forms", intent: "navigate", priority: "secondary" }]} /></Demo>
    <Demo name="Card + Grid" title="Content units and their layout." purpose={previews.cards.purpose}><Grid>{previews.cards.items.map((item) => <Card key={item.id} item={item as ContentItem} frame />)}</Grid></Demo>
    <Demo name="Split" title="Two related content zones." purpose={previews.split.purpose}><Split primary={<TextBlock content={previews.split.primary as ContentItem} />} secondary={splitMedia ? <Media media={splitMedia} /> : null} /></Demo>
    <Demo name="Gallery" title="Visual composition." purpose={previews.gallery.purpose}><div className="cluster">{(previews.gallery.layouts as GalleryLayout[]).map((layout) => <button key={layout} type="button" onClick={() => setGalleryLayout(layout)} aria-pressed={galleryLayout === layout}>{layout}</button>)}</div><Gallery items={galleryItems} layout={galleryLayout} /></Demo>
    <Demo name="Carousel" title="Native sequential browsing." purpose={previews.carousel.purpose}><Carousel label={previews.carousel.label}>{previews.carousel.items.map((item) => <Card key={item.id} item={item as ContentItem} />)}</Carousel></Demo>
    <section className="section"><div className="section__inner stack"><TextBlock content={{ eyebrow: "HorizontalScroll", title: "Pinned horizontal storytelling." }} /><p className="systemPage__purpose">Arbitrary children, spatial progression, no chronology semantics.</p></div><HorizontalScroll>{horizontalItems.map((item, index) => <Card key={item.id ?? index} item={item} frame />)}</HorizontalScroll></section>
    <Demo name="ContentSwitcher" title="One selection, one changing area." purpose={previews.switcher.purpose}><ContentSwitcher items={previews.switcher.items.map((item) => ({ id: item.id, label: item.label, content: <Card item={item.content as ContentItem} frame /> }))} /></Demo>
    <Demo name="Accordion" title="Progressive disclosure." purpose={previews.accordion.purpose}><Accordion items={previews.accordion.items} /></Demo>
    <Demo name="Timeline" title="Dates, nodes and a continuous axis."><p className="systemPage__purpose">Chronology or ordered process only. Generic horizontal progression belongs to HorizontalScroll.</p><Timeline items={previews.timeline.items as ContentItem[]} /></Demo>
    <Demo name="ScrollScene" title="Motion that explains relationship." purpose={previews.scrollScene.purpose}><ScrollScene preset="drift"><div className="frame padding"><TextBlock content={previews.scrollScene.content as ContentItem} /></div></ScrollScene></Demo>
    <Demo name="ScrollPanel" title="Optional panel storytelling." purpose={previews.scrollPanel.purpose}><button type="button" onClick={() => setPanels((value) => !value)} aria-pressed={panels}>Panels {panels ? "on" : "off"}</button><ScrollPanel enabled={panels}>{previews.scrollPanel.panels.map((panel) => <div className="frame padding" key={panel.id}><TextBlock content={panel as ContentItem} /></div>)}</ScrollPanel></Demo>
    <Demo name="Loader" title="Compact preview; production remains full-screen."><Loader messages={siteData.ui.loader.messages} /></Demo>
    <Demo name="Schedule" title="Calendar data as branded content." purpose={previews.schedule.purpose}><Schedule events={scheduleEvents} /></Demo>
    <Demo name="Embed" title="Optional third-party providers." purpose={previews.embeds.purpose}><Grid>{previews.embeds.items.map((item) => <Embed key={item.title} provider={item.provider as EmbedProvider} src={item.src} title={item.title} />)}</Grid></Demo>
    <section className="section" id="forms"><div className="section__inner stack"><TextBlock content={{ eyebrow: "Form", title: "Contact and booking share one renderer." }} /><ContentSwitcher items={previews.forms.keys.map((key) => ({ id: key, label: key, content: <Form schema={forms[key]} /> }))} /></div></section>
    <section className="section borderTop"><div className="section__inner stack"><TextBlock content={{ eyebrow: "Conversion playbook", title: "Business goal decides the sequence." }} /><ContentSwitcher items={contexts.map((context) => ({ id: context.id, label: context.label, content: <Card frame item={{ eyebrow: "Goal", title: context.goal, text: [context.conversionNote], tags: context.priorityComponents }} /> }))} /></div></section>
  </div>;
}
