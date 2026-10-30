---
title: "RAFA 930 — Consolidated Design System (Luro + Visionnaire + Desktop.fm)"
theme: "dark"
canvas: "#10020a"
card: "#1e0313"
accent: "#ff0068"
typography: "Inter / Graphik style with progressive negative tracking"
---

# RAFA 930 — Visual Design System (Consolidated)

## Rationale
This design system fuses **Luro** as the primary spatial and atmospheric base (Obsidian Void `#10020a` canvas, Dark Mulberry `#1e0313` cards, and hot pink plasma glow `#ff0068`), **Visionnaire** for the editorial marquee bar and dense photography grid layout, and **Desktop.fm** for the strict discipline of a single dominant primary CTA in the hero. Wope's violet/glass aesthetics are strictly discarded.

---

## Tailwind v4 `@theme` & CSS Variables

```css
@theme {
  --color-canvas: #10020a;
  --color-card: #1e0313;
  --color-surface-product: #f2f2f2;
  --color-plasma: #ff0068;
  --color-crimson-glow: rgba(255, 0, 104, 0.54);
  --color-frost: #ffffff;
  --color-muted: #a1a1b5;
  
  --radius-cards: 24px;
  --radius-images: 24px;
  --radius-pill: 180px;
}
```

---

## Do's and Don'ts

### Do
- Use `#ff0068` exclusively as stroke, icon ring, or glow shadow. Never as a large surface fill.
- Apply Luro's multi-stop pink plasma glow shadow stack (`0 0 33px 0 rgba(255,0,104,0.54), 0 0 99px -21px rgba(255,0,104,0.4)`) on discography and photography cards.
- Keep typography strictly in Inter/Graphik style with progressive negative tracking on headings (`-0.012em` to `-0.046em`) and positive tracking on small utility metadata labels.
- Include the Visionnaire-inspired top marquee announcement bar.
- Maintain Desktop.fm discipline: exactly ONE dominant primary CTA pill in the hero.

### Don't
- Do not use Wope's violet or glassmorphism aesthetics.
- Do not use pure white (#ffffff) as page background; canvas is `#10020a`.
- Do not add or remove any required sections (Hero, Discography, Collaborations, Services, Contact).
