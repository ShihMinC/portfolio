# Design System Reference

This document serves as a style guide and design reference for the Shih-Min Chen portfolio project, synthesized from the live site ([shihmin.super.site](https://shihmin.super.site/)) and the current local implementation.

## 🎨 Color Palette

| Category | Color Variable | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Background** | `--cream` | `#F7F3EE` | Primary page background |
| **Accent** | `--terracotta` | `#C4622D` | Primary accent, links, active states |
| **Text (Dark)** | `--ink` | `#1C1917` | Headings, primary body text |
| **Text (Muted)** | `--ink-light` | `#6B6560` | Secondary text, subtitles, captions |
| **Secondary BG** | `--cream-dark`| `#EDE7DD` | Hover states, dividers, subtle sections |
| **Warm Highlight**| `--warm-white` | `#FDFAF7` | Dropdowns, cards, overlays |

## Typography

The site uses a sophisticated pairing of Serif and Sans-serif fonts to balance professionalism with character.

- **Serif (Headings):** `Lora` (Google Fonts)
  - Used for primary headlines (h1, h2) and brand name.
  - Weight: `400` or `500`.
  - Style: Often used with *italics* for emphasis or category labels.
- **Sans-serif (Body & UI):** `DM Sans` or `Inter`
  - Used for body text, navigation, and labels.
  - Weight: `300` (light) for body text, `500` (medium) for buttons/labels.
  - Character spacing: `0.08em` to `0.12em` for uppercase labels.

## 📐 Layout & Components

### 1. Navigation (Navbar)
- **Style:** Sticky top with `backdrop-filter: blur(12px)` and semi-transparent `--cream`.
- **Interactions:** Dropdown for "Work" with subtle slide/fade animation.
- **Links:** Hover state transitions from `--ink` to `--terracotta`.

### 3. Project Grid (Case Study List)
- **Layout:** Vertical list (stacked cards).
- **Card Interaction:**
  - On hover: Background shifts to `--cream-dark`, content shifts right (`padding-left: 1.5rem`).
  - Arrow indicator (`→`) appears or becomes more visible.
- **Tags:** Small, uppercase, with a light terracotta background (`rgba(196,98,45,0.08)`).

### 4. Case Study Detail
- **Hero Image:** Full-width or large-scale header image.
- **Info Callout:** Light background box (e.g., `#E1F5FE` for research/info) containing key metadata (Team, Time, Role).
- **Section Headers:** Uses a specific pattern: `*Category:* Title` (e.g., *Context:* A Platform Built for Extensibility).
- **Typography spacing:** Generous `line-height` (1.5 - 1.7) for readability.

## ✨ Visual Polish
- **Grain Overlay:** A subtle SVG noise filter is applied globally to the body to give a premium, tactile feel.
- **Borders/Dividers:** Very subtle, usually `rgba(28,25,23,0.06)` or `0.08`.
- **Border Radius:** Small, refined radius for cards and dropdowns (`2px` to `6px`).

---
*Last Updated: 2026-05-04*
