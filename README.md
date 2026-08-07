# Maloya — music template

Chow Studio fictional case study for a Réunion music project. This is intentionally the most graphic and expressive member of the shared template family.

> **Poster energy, cultural texture, live urgency. The website should almost make noise.**

## Project signature

- **Business goal:** surface the next live date and listening immediately; provide a separate professional booking/press route.
- **Story:** impact → next date → sound → territory/archive → professional booking.
- **Visual density:** highly variable. Dense poster-like moments followed by abrupt negative space.
- **Composition:** strongest asymmetry in the family; full-width date lists, hard crops, overlap, giant statements and occasional non-critical ticker/marquee.
- **Typography:** Anton + Cutive Mono. Bodoni Moda is an editorial interruption; Unbounded is a rare graphic signal. Never let all four compete.
- **Palette:** Night `#0e0e0e`, Paper `#f6f5f3`, Sun `#fad248`; Ember `#e48f35` and Signal Pink `#f01ab7` behave like occasional print inks.
- **Image direction:** stage, island, archive, posters, flash, landscape. Do not normalize every image into the same card ratio.
- **Geometry:** sharp poster system, almost no radius, rules and color blocks used like printed paper.
- **Motion:** media/mask reveals and occasional scroll-linked typography. The static composition must remain strong under reduced motion.
- **Mobile UX:** next date and Listen arrive before experiments; graphic crops may remain bold but never obscure venue/date/action.

## Conversion rules

1. The first screen behaves like a poster, not an About page.
2. The next concert is a major graphic object, not a small card.
3. Listening links are direct and repeated at useful moments.
4. Territory, archive and press deepen the story after the immediate live/music actions.
5. Public contact, booking and press are distinct professional contexts.

## Shared-system rules

Reuse `Section`, `TextBlock`, `Media`, `Card`, `Grid`, `Split`, `Gallery`, `Carousel`, `ScrollPanel`, `Schedule`, `Form` and `Actions`. Push their composition much harder here rather than creating a parallel music component library.

`src/data/branding.json` defines the visual/storytelling contract exposed at `/branding`. `/system` remains the shared component test lab.

## Source assets

Curated media comes from the sibling `music-improved` repository:

```bash
npm run assets:import
```

Then validate:

```bash
npm run check
npm run dev
```

## Quality bar

- graphic and memorable without becoming illegible;
- next date and listening accessible immediately;
- no essential information only in motion/marquee/carousel;
- high-contrast focus and touch states;
- reduced-motion version still looks deliberately designed;
- media optimized despite immersive treatment;
- unmistakably Réunion/live/graphic rather than generic dark musician portfolio.

**Conception, direction artistique et développement : Channy How-Choong · Chow Studio.**
