import siteData from "@/data/site.json";

const arrowSuffix = /\s*↗\uFE0F?$/;

function ArrowUpRightIcon() {
  return <svg width="1em" height="1em" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 12 12 4M6 4h6v6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function FloatingAction() {
  const config = siteData.ui.floatingAction;
  if (!config.enabled) return null;

  const hasArrow = arrowSuffix.test(config.label);
  const label = config.label.replace(arrowSuffix, "").trim();

  return (
    <aside className="floatingAction" aria-label={config.ariaLabel}>
      <details className="floatingAction__details">
        <summary className="floatingAction__trigger"><span>{label}</span>{hasArrow ? <ArrowUpRightIcon /> : null}</summary>
        <nav className="floatingAction__menu" aria-label={config.ariaLabel}>
          {config.items.map((item) => (
            <a key={`${item.label}-${item.href}`} className="floatingAction__link" href={item.href}>{item.label}</a>
          ))}
        </nav>
      </details>
    </aside>
  );
}
