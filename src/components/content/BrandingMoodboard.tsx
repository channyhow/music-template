import brandingData from "@/data/branding.json";
import { Media } from "@/components/content/Media";
import { resolveMedia } from "@/data/resolveMedia";

const PLACEHOLDERS = ["Direction photo", "Application", "Édition", "Signalétique"];
export function BrandingMoodboard() {
  const resolved = brandingData.imagery.media.map((id) => resolveMedia(id)).filter(Boolean).slice(0, 6);
  const slots = Array.from({ length: 8 }, (_, index) => resolved[index] ?? null);
  const keywords = brandingData.concept.keywords.slice(0, 4);
  return <section className="brandingMoodboard" aria-labelledby="branding-moodboard-title">
    <header className="brandingMoodboard__header"><h1 id="branding-moodboard-title">Moodboard</h1><p>{brandingData.intro.eyebrow}</p></header>
    <div className="brandingMoodboard__lead"><p><span>(2026)</span>{brandingData.concept.title}</p><p>{brandingData.intro.text?.[0] ?? "Direction visuelle en construction."}</p></div>
    <div className="brandingMoodboard__grid">
      {slots.map((item, index) => <article className={`brandingMoodboard__tile brandingMoodboard__tile--${index + 1}`} key={item?.id ?? `placeholder-${index}`}><small>{String(index + 1).padStart(2, "0")}.</small>{item ? <Media media={item} /> : <div className="brandingMoodboard__placeholder"><span>{PLACEHOLDERS[index % PLACEHOLDERS.length]}</span><small>Média à venir</small></div>}</article>)}
      <div className="brandingMoodboard__type"><span>{brandingData.typography.heading.label}</span><strong>{brandingData.typography.heading.sample}</strong></div>
      <div className="brandingMoodboard__palette">{brandingData.palette.slice(0, 4).map((color) => <span key={color.name} style={{ background: color.value }} title={`${color.name} ${color.value}`} />)}</div>
      {keywords.map((keyword, index) => <span className={`brandingMoodboard__annotation brandingMoodboard__annotation--${index + 1}`} key={keyword}>{keyword}</span>)}
    </div>
  </section>;
}
