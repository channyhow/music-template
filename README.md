# Chow Template

Opinionated reusable React starter for premium business websites: architecture, hospitality, wellness, restaurants, creative portfolios, associations and lightweight commerce.

> **Maximum reuse. Minimum choice. No conflicting sources of truth. Sustainable by default.**

## Core rules

- Mobile-first; progressively enhance with `min-width` queries.
- One universal `Section` primitive. Do not create a special Hero component.
- Style, layout, content, source and motion stay separate.
- Component SCSS owns anatomy. Layout SCSS owns placement/responsiveness.
- Sass tokens own fixed values; CSS custom properties own contextual/inherited values.
- Repeated meaningful styling behaviour used around three times should be reviewed for extraction into a mixin.
- A repeated value alone does not justify a mixin if a token already solves it.
- No responsive styling props.
- No provider logic inside visual components.
- Normalize external data at the edge; stay semantic inside the app.
- Variants change visual language, never component structure.
- Motion supports hierarchy, chronology, relationship or depth; never movement for its own sake.
- Reduced motion is a global policy.
- Public placeholder content only; never invent client legal details.

## Styling decision tree

1. Fixed reusable design value? → token.
2. Reusable styling behaviour? → mixin.
3. Needs to change through parent context? → CSS custom property.
4. Reusable structural treatment? → utility.
5. Specific to component anatomy? → component SCSS.

Before adding a prop ask:

1. Can CSS decide it?
2. Can layout decide it?
3. Can the active variant decide it?
4. Can a token/default decide it?
5. Is it genuinely unique behaviour?

Only then add the prop.

## Visual vocabulary

### Variant

- `classic` | neutral, quiet, balanced, restrained geometry/motion.
- `editorial` | sharper composition, typography/rules/asymmetry, directional motion.
- `organic` | softer geometry, larger radius, organic masks/shapes and fluid movement.

### Tone

- `default`
- `inverse`
- `accent`

### Reusable components

- `Section`
- `SectionGroup`
- `TextBlock`
- `Media`
- `Card`
- `Grid`
- `Split`
- `Gallery`
- `Carousel`
- `ContentSwitcher`
- `Accordion`
- `Timeline`
- `ScrollScene`
- `ScrollPanel`
- `ScrollProgress`
- `Loader`
- `Schedule`
- `Embed`
- `Form`
- `Actions`
- `Header / BurgerButton / Drawer`

Industry-specific experiences should normally be compositions rather than new components. Examples: reviews = `Card + Carousel`, products = `Card + Grid/Carousel`, menu = `ContentSwitcher + Grid/Card`, map/calendar/social = `Embed`, contact/newsletter/reservation = shared `Form` schemas.

## Data architecture

```txt
src/data/
├── site.json
├── forms.json
├── links.json
├── schedule.json
├── globalBlocks.json
├── collections.json
├── media.json
├── pages.json
├── system.json
├── businessContexts.json
└── branding.json
```

Roles:

- `site.json` | business identity, theme, experience switches, integrations.
- `forms.json` | semantic form schemas such as contact and reservation.
- `links.json` | centralized semantic URLs (`social.instagram`, `booking.studio`, etc.).
- `schedule.json` | business-aware metadata for normalized calendar events.
- `globalBlocks.json` | reusable compositions, preferably referencing shared data rather than duplicating it.
- `collections.json` | repeated business content.
- `media.json` | normalized media registry.
- `pages.json` | page composition.
- `system.json` | `/system` visual inventory/demo content.
- `businessContexts.json` | conversion hierarchies by business type.
- `branding.json` | view-only client branding/moodboard direction.

External provider data belongs under `integrations/` and is normalized into stable domain data before reaching visual components. Pure generic helpers belong in `utils/`; business-specific transforms belong in a feature/domain folder.

## Forms

Form copy/configuration lives in `forms.json` and one shared `Form` renderer owns accessible markup/states/styling. Contact and reservation should never fork into separate visual systems.

The renderer can support contact, booking, newsletter, quote request, event registration or waitlist through schema rather than new React components.

## Schedule / calendar

Google Calendar is a source, not the UI architecture.

```txt
Google Calendar / static / Notion / Firebase
  → integration / adapter
  → normalized CalendarEvent
  → schedule enrichment
  → image / label / person / location / booking link
  → Schedule
  → existing Card / Grid / Media vocabulary
```

Keep date formatting/comparison in generic `utils/dates.ts`; event matching, booking-link selection and enrichment belong to the Schedule feature.

## Experience & scrolling

The experience layer is optional and combinable. Do not create page templates around effects.

### Implemented vocabulary

- `reveal` | viewport entrance hierarchy.
- `scene` | continuous scroll-linked section movement.
- `ScrollScene: parallax` | subtle depth between scroll and content/media.
- `ScrollScene: drift` | decorative shapes move at different speeds while content remains stable.
- `ScrollScene: draw` | line/rule/progress treatment reveals with scroll.
- `Timeline` | chronology/checklist with a progressing scroll rail.
- `ScrollPanel` | optional panel storytelling without changing semantic section markup.
- `ScrollProgress` | `false | top | rail`.
- `footerReveal` | existing footer sits behind the final page canvas and is uncovered at the bottom; reduced-motion falls back to normal flow.

Current experience switches live in `site.json`, e.g.:

```json
{
  "experience": {
    "scrollProgress": "rail",
    "sectionReveal": true,
    "parallax": true,
    "footerReveal": true
  }
}
```

### High-value capabilities to add/complete

- **Background media** | page/section image or video via the normal Media registry; small semantic API only: media, overlay, position and `static | fixed | parallax` behaviour.
- **Sticky storytelling** | one semantic region remains stable while related content progresses.
- **Media/text sequence** | sticky media changes as text chapters become active.
- **Gallery lightbox** | a Gallery capability, not a second gallery architecture.
- **Chapter/anchor navigation** | native anchors/headings for long projects and case studies.
- **Marquee/ticker** | collaborators, press, dates or announcements; never critical content only.
- **Before/after** | dedicated comparison interaction when the business genuinely needs it.
- **Sticky CTA** | optional booking/ticket/purchase/enquiry action, especially mobile.
- **Media reveal presets** | named ScrollScene treatments such as curtain/clip/scale; no arbitrary animation-prop explosion.

Possible combinations:

```txt
ScrollPanel off + Parallax on + FooterReveal on
ScrollPanel on + Parallax off + FooterReveal off
Rail progress + Timeline + normal footer
Sticky media + draw preset + footer reveal
```

Do not enable every effect simultaneously. One primary motion idea per composition is usually enough.

See [`docs/EXPERIENCE_SYSTEM.md`](docs/EXPERIENCE_SYSTEM.md) for the full experience rules.

## Background image/video direction

Background media should reuse `Media` and `media.json`; do not create `backgroundImage`, `backgroundVideo`, `videoBackground`, etc. as parallel systems.

Target contract:

```json
{
  "background": {
    "media": "studio-01",
    "overlay": "soft",
    "position": "center",
    "behavior": "static"
  }
}
```

Decorative backgrounds are `aria-hidden`. Meaningful media stays semantic content. Background video must be muted, inline, non-essential, poster-backed, conservative in preload and static under reduced motion.

## Development / presentation routes

- `/` | starter site.
- `/liens` | branded links page.
- `/system` | internal design-system, responsive and conversion test lab. Every reusable component should be inspectable here.
- `/branding` | client-facing, view-only branding/moodboard presentation.
- `/mentions-legales` | placeholder legal page.

`/system` and `/branding` should normally be excluded from production indexing; `/branding` may also be removed/hidden after client sign-off.

## `/branding` workflow

`/branding` is intentionally not a configurator. It gives the client one curated proposed direction rather than asking them to design the site themselves.

The page is driven by `src/data/branding.json` and should cover:

1. direction/rationale;
2. keywords/personality;
3. color palette with semantic roles;
4. heading/body typography pairing;
5. image/art-direction references;
6. geometry, masks, surfaces, frame/glass/organic language;
7. motion/interaction tone;
8. practical application to hierarchy, composition, interaction and conversion;
9. clear status that the moodboard is a proposal awaiting validation.

Replace moodboard content per client; keep the React page stable.

## Conversion / business composition

The same primitives should adapt to different businesses instead of creating industry components. `/system` includes a `ContentSwitcher` reference for Restaurant, Architect, Musician, Artist, Developer/Studio, Association and Green/Ethical Commerce.

See [`docs/CONVERSION_PLAYBOOK.md`](docs/CONVERSION_PLAYBOOK.md).

Core UX/conversion principles:

- clarity before novelty;
- one primary action per context;
- proof near the decision;
- progressive disclosure;
- motion must communicate;
- trust is conversion;
- mobile is a first-class composition;
- sustainability by default.

## Media

Store project-owned assets under:

```txt
public/
├── brand/
├── fonts/
└── media/
    ├── images/
    ├── video/
    ├── icons/
    ├── textures/
    └── placeholders/
```

Key rules:

- self-host licensed fonts;
- keep intrinsic width/height and focal point in the media registry;
- use responsive `srcset/sizes` through `Media`;
- prefer AVIF/WebP where appropriate;
- do not upscale small sources;
- size card imagery close to real rendered size;
- prioritize the actual LCP image and lazy-load below-fold media;
- avoid CSS background images for meaningful/LCP content;
- decorative video must have poster + reduced-motion fallback;
- optimize media before micro-optimizing small JS/CSS differences;
- use fewer stronger images rather than decorative payload.

## Frames, borders and effects

Shared structural treatments stay intentionally limited:

- `.frame` | includes standard padding + standard radius.
- `.frame--compact`
- `.border`
- `.borderTop`
- `.borderBottom`
- `effectGlass`
- shared shape mixins/utilities where justified.

Frame the highest meaningful container and avoid nested frames. Border does not imply padding.

## Accessibility / UI quality

- Native semantics first.
- Visible focus states.
- Touch-friendly controls.
- Persistent form labels + error/success/sending states.
- Never rely on color alone.
- DOM/reading order remains meaningful across layouts.
- No fixed heights around variable copy.
- No scroll-jacking.
- Reduced motion preserves all information/functionality.
- Carousels are never the only access to critical content.
- Test narrow screens, zoom, keyboard, touch, reduced motion, long translations and slow/error states.
- Conversion never outranks accessibility, trust or performance.

## Brand assets / favicon

Keep logo/wordmark SVGs under `public/brand/`. Generate the production favicon package with favicon.io and place favicon/manifest assets at `public/` root so standard URLs resolve correctly. Replace manifest name/colors and validate deployed assets before launch.

## New project workflow

1. Choose `classic`, `editorial` or `organic` as the base direction.
2. Prepare `/branding` with proposed palette, type, image and interaction direction; review with client.
3. Add licensed local fonts and final brand SVGs.
4. Replace site/business/contact/legal/SEO placeholders.
5. Replace and optimize media.
6. Choose only the capabilities/experience behaviours that solve real needs.
7. Compose pages from existing/global blocks first.
8. Use the conversion playbook for the client’s business context.
9. Review `/system` across variants, widths and content extremes.
10. Test mobile → wide desktop, zoom, keyboard, reduced motion, forms and representative network conditions.
11. Run `npm run check` and deployment QA.
12. Hide/remove internal presentation routes from indexing/production as appropriate.

## Replace before launch

Review at minimum:

- business identity/contact/address/opening hours;
- logo, colors, fonts, favicon/manifest;
- navigation/social/booking links;
- real services/products/projects/reviews/pricing;
- images, video, alt text, credits/licensing/focal points;
- title/description/canonical/OG/structured data/robots/sitemap;
- form names, notifications, success/error/privacy/spam handling;
- integration IDs and environment secrets;
- legal entity, SIRET/registration, publication director, hosting/privacy/terms where applicable;
- production Netlify project/domain/redirects/cache/404s;
- placeholder/test routes/data and console errors.

Useful placeholder search:

```txt
Nom du studio
example.com
example.netlify.app
bonjour@example.com
Adresse à compléter
00000
Ville
Placeholder
TODO
FIXME
```

Default creation credit:

**Conception, direction artistique et développement : Channy How-Choong · Chow Studio.**

## Do not add casually

- responsive styling props;
- component-specific spacing scales;
- arbitrary visual variants;
- a special Hero component;
- duplicate review/card/gallery/form systems;
- provider imports inside visual components;
- reveal wrappers used only for animation;
- duplicate business/social/legal data;
- one-off breakpoints without a content-driven reason;
- arbitrary scroll speed/rotation props;
- interaction that depends on hover/precision/animation to understand;
- oversized original media;
- autoplay video when a static image communicates the same thing.
