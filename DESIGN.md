---
name: 'Titanium Deck'
description: 'Brushed metal as a quiet design system. Cool grey surfaces with a faint vertical machined gradient, Space Grotesk display, IBM Plex Mono for technical labels, a single warm amber accent that reads like a status LED. Built for hardware companies and infrastructure dashboards.'
tags: [metallic, premium, modern, saas, developer]
colors:
  primary: '#1c1f24'
  secondary: '#6c727a'
  tertiary: '#1c1f24'
  neutral: '#e7e9ec'
  surface: '#f1f2f4'
typography:
  display: 'Space Grotesk'
  body: 'Space Grotesk'
  mono: 'IBM Plex Mono'
  scale:
    hero: '3.5rem / 1.04 / 600 / -0.03em'
    h1: '2.25rem / 1.15 / 600 / -0.025em'
    h2: '1.5rem / 1.3 / 600 / -0.015em'
    body: '0.9375rem / 1.55 / 400 / 0'
radius:
  sm: 3px
  md: 5px
  lg: 8px
  pill: 9999px
shadows:
  card: 'rgba(255,255,255,0.7) 0 1px 0 inset, rgba(28,31,36,0.06) 0 0 0 1px, rgba(28,31,36,0.04) 0 1px 2px'
  button: 'rgba(255,255,255,0.10) 0 1px 0 inset, rgba(0,0,0,0.18) 0 1px 2px'
borders:
  card: '1px solid rgba(28,31,36,0.06)'
  divider: rgba(28,31,36,0.10)
buttons:
  primary:
    background: #1c1f24
    color: #f1f2f4
    border: 1px solid rgba(0,0,0,0.4)
    shape: rounded
    padding: 9px 18px
    font: 600 / 0.8125rem
    shadow: rgba(255,255,255,0.10) 0 1px 0 inset, rgba(0,0,0,0.18) 0 1px 2px
  secondary:
    background: linear-gradient(180deg, #f6f7f8, #e2e4e8)
    color: #1c1f24
    border: 1px solid rgba(28,31,36,0.18)
    shape: rounded
    padding: 9px 18px
    font: 600 / 0.8125rem
    shadow: rgba(255,255,255,0.6) 0 1px 0 inset
  outline:
    background: transparent
    color: #1c1f24
    border: 1px solid rgba(28,31,36,0.22)
    shape: rounded
    padding: 9px 18px
    font: 600 / 0.8125rem
  ghost:
    background: transparent
    color: #6c727a
    border: none
    shape: rounded
    padding: 9px 14px
    font: 600 / 0.8125rem
charts:
  variant: 'thin-bars'
  stroke_width: 1.5
  fill_opacity: 0.06
  gridlines: true
  bar_gap: 10px
  highlight: single
  dot_marker: true
fonts_url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap'
dependencies: ['lucide-react']
---

# Titanium Deck

## AI Build Instructions

> **Read this section before writing any code.** The rules below
> are non-negotiable. Every value used in the UI must come from this
> file's frontmatter — never substitute, approximate, or invent new
> colors, fonts, radii, or shadows. If a value is missing, ask the
> user before adding one.

### 1 · Your role

You are building UI for a project that has adopted **Titanium Deck** as its
design system. Treat `DESIGN.md` as the single source of truth.
Your job is to translate the user's product requirements into
components and pages that look like they were designed by the same
person who authored this file.

### 2 · Token compliance

- Pull every color, font family, radius, shadow, and spacing value
  from the frontmatter at the top of this file.
- Use semantic roles (e.g. `primary`, `accent`, `muted`) — never
  hard-code hex values that bypass the system.
- When a token can be expressed as a CSS variable, declare it once
  in your global stylesheet and reference it everywhere downstream.
- The Google Fonts `<link>` is provided in the Typography section.
  Add it to `<head>` before any component renders.

### 3 · Component recipes

Use these recipes verbatim when building the corresponding component.

#### Buttons

Four variants are defined. Pick one — never blend variants or invent a fifth.

- **Primary** — rounded shape, bg `#1c1f24`, text `#f1f2f4`, border `1px solid rgba(0,0,0,0.4)`, padding `9px 18px`, weight `600`, shadow `rgba(255,255,255,0.10) 0 1px 0 inset, rgba(0,0,0,0.18) 0 1px 2px`.
- **Secondary** — rounded shape, bg `linear-gradient(180deg, #f6f7f8, #e2e4e8)`, text `#1c1f24`, border `1px solid rgba(28,31,36,0.18)`, padding `9px 18px`, weight `600`, shadow `rgba(255,255,255,0.6) 0 1px 0 inset`.
- **Outline** — rounded shape, text `#1c1f24`, border `1px solid rgba(28,31,36,0.22)`, padding `9px 18px`, weight `600`.
- **Ghost** — rounded shape, text `#6c727a`, padding `9px 14px`, weight `600`.

Reach for **primary** as the single dominant CTA per screen.
**Secondary** for the supporting action. **Outline** for tertiary
actions in toolbars. **Ghost** for inline links and table actions.

#### Cards

- Background: `#f1f2f4`
- Border: `1px solid rgba(28,31,36,0.06)`
- Shadow: `rgba(255,255,255,0.7) 0 1px 0 inset, rgba(28,31,36,0.06) 0 0 0 1px, rgba(28,31,36,0.04) 0 1px 2px`
- Radius: `radius.lg` (`8px`)
- Internal padding: `20px` for compact cards, `24–28px` for content cards.

#### Tabs

Variant: `boxed`. Each tab is a bordered card. Active tab gets the accent border and a subtle fill.

#### Charts

- Bar/line variant: `thin-bars`
- Highlight strategy: `single` — emphasize a single bar/point per chart.

#### Typography pairings

- **Display (`Space Grotesk`)** — h1, h2, hero headlines, brand wordmarks.
- **Body (`Space Grotesk`)** — paragraphs, labels, button text, form inputs.
- **Mono (`IBM Plex Mono`)** — code, eyebrows, metadata, numerals in tables.

### 4 · Hard constraints

Never do any of the following without explicit instruction from the user:

- Introduce a new color, font, radius, or shadow that isn't declared above.
- Mix this system with another (e.g. don't paste in Material or Bootstrap defaults).
- Use generic gradient defaults (purple→blue, peach→pink) — they break the system's voice.
- Reach for emoji icons. Use a consistent icon library and size icons in line with body type.
- Add motion that exceeds the system's restraint — keep transitions short (≤200ms) and subtle.

### 5 · Before you finish — verify

Run through this checklist for every screen you produce:

- [ ] Every color used appears in the Colors table above.
- [ ] Headlines use the display font; body copy uses the body font.
- [ ] Buttons match one of the declared variants exactly (shape, padding, weight).
- [ ] Border-radius values come from `radius.sm` / `radius.md` / `radius.lg` / `radius.pill`.
- [ ] Cards and dividers use the declared border + shadow tokens.
- [ ] No values were invented; if you needed something missing, you stopped and asked.

---

## 1. Atmosphere

Titanium Deck is brushed metal interpreted as restraint. Surfaces sit on a faint vertical gradient (`#f6f7f8` → `#e2e4e8`) that reads as machined aluminum under fluorescent light. Headlines run in Space Grotesk 600, body in the same. Technical labels — IDs, timestamps, sensor readouts — switch to IBM Plex Mono with uppercase tracking. The single accent is a warm amber `#f0a000` that appears as a tiny dot indicator on active modules, like a status LED on a server rack.

The discipline is in the micro-detail: every button gets a 1px white inset highlight at the top edge to mimic the way light catches machined steel; every card has the same. There are no decorative gradients beyond the surface itself.

**Signature moves**

- Vertical machined gradient on every surface — `linear-gradient(180deg, #f6f7f8, #e2e4e8)` — never a hard fill
- 1px white inset highlight (`rgba(255,255,255,0.7)`) at the top of every card and button — the catch-light is structural
- Amber `#f0a000` used only as a 6px dot status indicator and the chart highlight — never as a fill or text color
- IBM Plex Mono with 0.06em uppercase tracking for every technical label
- Boxed tabs with the same machined gradient — they read as physical buttons

## 2. Palette

### Surfaces

- **Aluminum Light** `linear-gradient(180deg, #f6f7f8, #e2e4e8)` — primary card surface
- **Aluminum Mid** `linear-gradient(180deg, #eaecef, #d6d9de)` — pressed/secondary state
- **Aluminum Dark** `linear-gradient(180deg, #2a2d33, #1c1f24)` — primary CTA, dark sections
- **Page** `#e7e9ec` — cool background, slightly bluer than the cards

### Ink

- **Ink** `#1c1f24` — text, headings, primary CTA fill
- **Ink 60** `#6c727a` — secondary text, mono labels
- **Hairline** `rgba(28,31,36,0.06)` — every card edge

### Accent

- **Amber LED** `#f0a000` — status dot, active chart bar
- **Amber Soft** `rgba(240,160,0,0.16)` — focus ring, hovered tab background

## 3. Typography

| Role           | Font          | Size | Weight | Leading | Tracking         |
| -------------- | ------------- | ---- | ------ | ------- | ---------------- |
| Hero           | Space Grotesk | 56px | 600    | 1.04    | -0.03em          |
| H1             | Space Grotesk | 36px | 600    | 1.15    | -0.025em         |
| H2             | Space Grotesk | 24px | 600    | 1.3     | -0.015em         |
| Body           | Space Grotesk | 15px | 400    | 1.55    | 0                |
| UI             | Space Grotesk | 13px | 500    | 1.4     | 0                |
| Label / Mono   | IBM Plex Mono | 11px | 500    | 1.0     | 0.06em uppercase |
| Sensor Readout | IBM Plex Mono | 24px | 600    | 1.1     | 0 tabular-nums   |

Three weights for sans: 400 / 500 / 600. Mono is uppercase whenever it appears as a label, mixed-case only inside code blocks.

## 4. Buttons

### Primary (Anodized Dark)

```css
background: #1c1f24;
color: #f1f2f4;
padding: 9px 18px;
border-radius: 5px;
border: 1px solid rgba(0, 0, 0, 0.4);
box-shadow:
  rgba(255, 255, 255, 0.1) 0 1px 0 inset,
  rgba(0, 0, 0, 0.18) 0 1px 2px;
```

The 1px inset white highlight is what sells the metal — without it the button reads as flat black.

### Secondary (Aluminum)

```css
background: linear-gradient(180deg, #f6f7f8, #e2e4e8);
color: #1c1f24;
border: 1px solid rgba(28, 31, 36, 0.18);
box-shadow: rgba(255, 255, 255, 0.6) 0 1px 0 inset;
```

### Outline & Ghost

- Outline: transparent, 1px ink hairline at 22%
- Ghost: transparent, no border, ink-secondary text

## 5. Cards

```css
background: linear-gradient(180deg, #f6f7f8, #e2e4e8);
border: 1px solid rgba(28, 31, 36, 0.06);
border-radius: 8px;
box-shadow:
  rgba(255, 255, 255, 0.7) 0 1px 0 inset,
  rgba(28, 31, 36, 0.06) 0 0 0 1px,
  rgba(28, 31, 36, 0.04) 0 1px 2px;
```

The signature is the inset white highlight + a 1px outline shadow — it reads as a physical machined panel, not a flat surface.

Active cards get a 6px amber dot in the top-right corner — the only place amber appears as a fill.

## 6. Charts

Thin precise bars (4px wide, 10px gap) with dashed gridlines at 6% ink. One bar in amber, others in 22% ink. Line charts run at 1.5px ink with a 6% fill, ending in an amber dot marker. Y-axis labels in IBM Plex Mono uppercase 11px. The chart reads as instrument output, not infographic.

## 7. Tabs

Boxed tabs with the aluminum gradient. Active = pressed-in look (gradient flips to `linear-gradient(180deg, #d6d9de, #eaecef)`) with a tiny amber dot at the bottom-right corner. Inactive = standard aluminum surface. Boxed shape (3px radius), tight gap.

## 8. Spacing

- Base 4px
- Scale: `4, 8, 12, 16, 20, 24, 32, 48, 64`
- Section padding: 80px desktop, 40px mobile

## 9. Do's & don'ts

✅ **Do**

- Use the vertical machined gradient on every card and button — flat fills break the metal
- Keep the 1px white inset highlight on every surface — it's the catch-light, not decoration
- Use the amber accent only as a 6px status dot and as the chart highlight — never as text or button fill
- Switch to IBM Plex Mono uppercase 0.06em for every technical label

❌ **Don't**

- Use bright color fills — the entire system is greyscale + one amber dot
- Use sharp 0px corners — the radius is small (3-8px) but never zero, mimicking machined chamfer
- Skip the inset highlight to "simplify" — the surface stops reading as metal
- Use Space Grotesk at 700 — 600 is the maximum, anything heavier looks plastic

---

## Tokens

> Generated from the same source the live preview renders from.
> Treat the values below as the contract — never substitute approximations.

### Colors

| Role      | Value     |
| --------- | --------- |
| primary   | `#1c1f24` |
| secondary | `#6c727a` |
| tertiary  | `#1c1f24` |
| neutral   | `#e7e9ec` |
| surface   | `#f1f2f4` |

### Typography

- **Display:** Space Grotesk
- **Body:** Space Grotesk
- **Mono:** IBM Plex Mono

| Role | size / leading / weight / tracking |
| ---- | ---------------------------------- |
| Hero | 3.5rem / 1.04 / 600 / -0.03em      |
| H1   | 2.25rem / 1.15 / 600 / -0.025em    |
| H2   | 1.5rem / 1.3 / 600 / -0.015em      |
| Body | 0.9375rem / 1.55 / 400 / 0         |

### Radius

- sm: `3px`
- md: `5px`
- lg: `8px`
- pill: `9999px`

### Shadows

- **card:** `rgba(255,255,255,0.7) 0 1px 0 inset, rgba(28,31,36,0.06) 0 0 0 1px, rgba(28,31,36,0.04) 0 1px 2px`
- **button:** `rgba(255,255,255,0.10) 0 1px 0 inset, rgba(0,0,0,0.18) 0 1px 2px`

### Borders

- **card:** `1px solid rgba(28,31,36,0.06)`
- **divider:** `rgba(28,31,36,0.10)`

### Buttons

Four variants, each fully tokenized. The preview renders from these exact values.

#### Primary

| Property   | Value                                                              |
| ---------- | ------------------------------------------------------------------ |
| shape      | `rounded`                                                          |
| background | `#1c1f24`                                                          |
| color      | `#f1f2f4`                                                          |
| border     | `1px solid rgba(0,0,0,0.4)`                                        |
| padding    | `9px 18px`                                                         |
| fontWeight | `600`                                                              |
| fontSize   | `0.8125rem`                                                        |
| shadow     | `rgba(255,255,255,0.10) 0 1px 0 inset, rgba(0,0,0,0.18) 0 1px 2px` |

#### Secondary

| Property   | Value                                       |
| ---------- | ------------------------------------------- |
| shape      | `rounded`                                   |
| background | `linear-gradient(180deg, #f6f7f8, #e2e4e8)` |
| color      | `#1c1f24`                                   |
| border     | `1px solid rgba(28,31,36,0.18)`             |
| padding    | `9px 18px`                                  |
| fontWeight | `600`                                       |
| fontSize   | `0.8125rem`                                 |
| shadow     | `rgba(255,255,255,0.6) 0 1px 0 inset`       |

#### Outline

| Property   | Value                           |
| ---------- | ------------------------------- |
| shape      | `rounded`                       |
| background | `transparent`                   |
| color      | `#1c1f24`                       |
| border     | `1px solid rgba(28,31,36,0.22)` |
| padding    | `9px 18px`                      |
| fontWeight | `600`                           |
| fontSize   | `0.8125rem`                     |

#### Ghost

| Property   | Value         |
| ---------- | ------------- |
| shape      | `rounded`     |
| background | `transparent` |
| color      | `#6c727a`     |
| border     | `none`        |
| padding    | `9px 14px`    |
| fontWeight | `600`         |
| fontSize   | `0.8125rem`   |

### Charts

| Property    | Value       |
| ----------- | ----------- |
| variant     | `thin-bars` |
| strokeWidth | `1.5`       |
| fillOpacity | `0.06`      |
| gridlines   | `true`      |
| barGap      | `10px`      |
| highlight   | `single`    |
| dotMarker   | `true`      |

---

## Pro tokens

> Production-fidelity tokens. States, density, motion, elevation,
> content rules and a measured WCAG contract — derived from the
> resting tokens unless explicitly authored.

### States

#### Button

- **hover** — shadow: `0 0 24px -4px rgba(28, 31, 36, 0.5), 0 8px 24px -8px rgba(0,0,0,0.6)`, filter: `brightness(1.1)`
- **focus** — outline: `1.5px solid #1c1f24`, outline-offset: `3px`
- **active** — transform: `translateY(1px)`, filter: `brightness(0.92)`
- **disabled** — opacity: `0.35`, filter: `saturate(0.4)`
- **loading** — opacity: `0.6`
- **selected** — bg: `#1c1f24`, color: `#0A0A0A`

#### Input

- **hover** — border: `1px solid rgba(28, 31, 36, 0.5)`
- **focus** — border: `1px solid #1c1f24`, shadow: `0 0 0 3px rgba(28, 31, 36, 0.2)`
- **disabled** — opacity: `0.35`
- **error** — border: `1px solid #F87171`, shadow: `0 0 0 3px rgba(248,113,113,0.2)`

#### Card

- **hover** — shadow: `0 16px 40px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(28, 31, 36, 0.18)`, transform: `translateY(-2px)`
- **selected** — border: `1px solid #1c1f24`, shadow: `0 0 0 1px #1c1f24`
- **dragging** — shadow: `0 24px 60px -16px rgba(0,0,0,0.85)`, transform: `scale(1.02)`, opacity: `0.85`

#### Tab

- **hover** — color: `#1c1f24`
- **focus** — outline: `1.5px solid #1c1f24`, outline-offset: `2px`
- **selected** — color: `#1c1f24`, border: `0 0 1.5px 0 solid #1c1f24`

### Density

| Mode        | padding × | row × | body      | radius × | Use for                                      |
| ----------- | --------- | ----- | --------- | -------- | -------------------------------------------- |
| compact     | 0.72      | 0.78  | 0.8125rem | 0.85     | Information-dense — tables, IDEs, dashboards |
| comfortable | 1         | 1     | 0.9375rem | —        | Default — most product UI                    |
| spacious    | 1.35      | 1.3   | 1rem      | 1.15     | Editorial — marketing, long-form, settings   |

### Motion

**Signature — Glide.** Fließende, leicht beschleunigte Übergänge mit Accent-Glow auf hover. Premium-Feeling durch kontrollierte Lichtspiele.

```css
transition: all 280ms cubic-bezier(0.32, 0.72, 0, 1);
```

| Token             | Value                              |
| ----------------- | ---------------------------------- |
| duration.instant  | `100ms`                            |
| duration.fast     | `180ms`                            |
| duration.base     | `280ms`                            |
| duration.slow     | `450ms`                            |
| easing.standard   | `cubic-bezier(0.32, 0.72, 0, 1)`   |
| easing.decelerate | `cubic-bezier(0.0, 0, 0.2, 1)`     |
| easing.accelerate | `cubic-bezier(0.4, 0, 1, 1)`       |
| easing.spring     | `cubic-bezier(0.5, 1.25, 0.55, 1)` |

### Elevation

Five-level scale, system-specific recipe.

| Level  | Shadow                                                                     | Recipe                                 |
| ------ | -------------------------------------------------------------------------- | -------------------------------------- |
| level0 | `none`                                                                     | Flat — Hairline mit Accent-Hauch.      |
| level1 | `0 2px 4px rgba(0,0,0,0.45)`                                               | Subtle drop — list items.              |
| level2 | `0 12px 28px -8px rgba(0,0,0,0.6)`                                         | Popover — vom Canvas gelöst.           |
| level3 | `0 20px 48px -12px rgba(0,0,0,0.7), 0 0 32px -8px rgba(28, 31, 36, 0.25)`  | Sheet — Accent-Halo.                   |
| level4 | `0 40px 96px -16px rgba(0,0,0,0.85), 0 0 64px -12px rgba(28, 31, 36, 0.4)` | Modal — voller Accent-Rim, dramatisch. |

### Content

- **measure:** `66ch` (max line length for body prose)
- **paragraph spacing:** `1.3em`
- **list indent:** `1.5em`
- **list gap:** `0.5em`
- **link:** color `#1c1f24`, underline `hover`
- **blockquote:** border `2px solid #1c1f24`, padding `0.8em 1.2em`
- **code:** background `rgba(28, 31, 36, 0.12)`, color `#1c1f24`

### Accessibility (WCAG 2.1)

**Overall:** AA-Large

| Pair                  | Ratio   | Required | Grade    | Suggested fix           |
| --------------------- | ------- | -------- | -------- | ----------------------- |
| Body text on surface  | 14.75:1 | AA       | AAA      | —                       |
| Body text on canvas   | 13.59:1 | AA       | AAA      | —                       |
| Muted text on surface | 4.33:1  | AA       | AA-Large | `#676d75` → 4.66:1 (AA) |
| Accent on surface     | 14.75:1 | AA-Large | AAA      | —                       |
| Accent on canvas      | 13.59:1 | AA-Large | AAA      | —                       |
