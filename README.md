# Maloya — music template

Chow Studio fictional case study for a Réunion music project. This is intentionally the most graphic and expressive member of the shared template family.

> **Immersive, graphic, music-first. Enter the world, then find the date, the music and the professional route.**

## Project signature

- **Business goal:** surface listening and the next live date immediately; provide a separate professional booking/press route.
- **Story:** enter → listen → next date → territory/archive → follow / professional booking.
- **Visual density:** highly variable. Dense poster-like moments followed by real visual silence.
- **Composition:** strongest asymmetry in the family; full-width date lists, hard crops, overlap, giant statements and occasional non-critical ticker/marquee.
- **Typography:** Anton + Cutive Mono. Bodoni Moda is an editorial interruption; Unbounded is a rare graphic signal. Never let all four compete.
- **Palette:** Night `#0e0e0e`, Paper `#f6f5f3`, Sun `#fad248`; Ember `#e48f35` and Signal Pink `#f01ab7` behave like occasional print inks.
- **Image direction:** stage, island, archive, posters, flash, landscape. Do not normalize every image into the same card ratio.
- **Geometry:** sharp poster system, almost no radius, rules and color blocks used like printed paper.
- **Motion:** media/mask reveals and occasional scroll-linked typography. The static composition must remain strong under reduced motion.
- **Mobile UX:** listening and next date arrive before experiments; graphic crops may remain bold but never obscure venue/date/action.

## Conversion rules

1. The first screen can behave like an entrance rather than an About page.
2. Music comes before biography.
3. The next concert is a major graphic object, not a small card.
4. Territory, archive and press deepen the story after the immediate music/live actions.
5. Audience and professional journeys remain distinct.

## Editorial voice

Short, concrete and occasionally raw. The visuals can be mysterious; the information cannot.

Dates, places, releases, credits and context should often be allowed to stand on their own. Avoid turning every sentence into mythology about the island, roots, rhythm or “the pulse of Réunion”. Talk about La Réunion and maloya precisely and without folklore.

Primary experiential reference: Khruangbin for immersive artist-world building and the confidence to make the interface feel like an entry into the project. Do not reproduce their visual identity. p5aholic is a secondary reference for interaction confidence, not an excuse to add effects.

See [`docs/CONTENT_STYLE.md`](docs/CONTENT_STYLE.md).

## Shared-system rules

Reuse `Section`, `TextBlock`, `Media`, `Card`, `Grid`, `Split`, `Gallery`, `Carousel`, `ScrollPanel`, `Schedule`, `Form` and `Actions`. Push their composition much harder here rather than creating a parallel music component library.

`src/data/branding.json` defines the story, voice and visual contract exposed at `/branding`. `/system` remains the shared component test lab.

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
