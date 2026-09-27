# GoComet Brand Tokens & Design System Reference

This document outlines the core brand tokens, color palettes, semantic variables, and typography definitions for GoComet.

---

## 🎨 Color Palette (Core Tokens)

### 🔵 GoComet Blue (`--color-gc-blue-*`)
| Token | CSS Variable | Hex Code | Preview |
| :--- | :--- | :--- | :--- |
| Blue 50 | `--color-gc-blue-50` | `#eef4ff` | `rgb(238, 244, 255)` |
| Blue 100 | `--color-gc-blue-100` | `#d6e3ff` | `rgb(214, 227, 255)` |
| Blue 200 | `--color-gc-blue-200` | `#a8c4ff` | `rgb(168, 196, 255)` |
| Blue 300 | `--color-gc-blue-300` | `#6aa0ff` | `rgb(106, 160, 255)` |
| Blue 400 | `--color-gc-blue-400` | `#4d8bff` | `rgb(77, 139, 255)` |
| Blue 500 | `--color-gc-blue-500` | `#3376ff` | `rgb(51, 118, 255)` |
| **Blue 600 (Primary)** | `--color-gc-blue-600` | `#0054ff` | `rgb(0, 84, 255)` |
| Blue 700 (Hover) | `--color-gc-blue-700` | `#0043cc` | `rgb(0, 67, 204)` |
| Blue 800 | `--color-gc-blue-800` | `#00349e` | `rgb(0, 52, 158)` |

---

### 🟣 GoComet Violet (`--color-gc-violet-*`)
| Token | CSS Variable | Hex Code | Preview |
| :--- | :--- | :--- | :--- |
| Violet 50 | `--color-gc-violet-50` | `#f7f1ff` | `rgb(247, 241, 255)` |
| Violet 100 | `--color-gc-violet-100` | `#efe3ff` | `rgb(239, 227, 255)` |
| Violet 200 | `--color-gc-violet-200` | `#dcc2ff` | `rgb(220, 194, 255)` |
| Violet 300 | `--color-gc-violet-300` | `#c08cff` | `rgb(192, 140, 255)` |
| Violet 400 | `--color-gc-violet-400` | `#a85bff` | `rgb(168, 91, 255)` |
| **Violet 500 (Accent)** | `--color-gc-violet-500` | `#a033ff` | `rgb(160, 51, 255)` |
| Violet 600 | `--color-gc-violet-600` | `#8a1aff` | `rgb(138, 26, 255)` |
| Violet 700 | `--color-gc-violet-700` | `#7010e0` | `rgb(112, 16, 224)` |

---

### 🌌 GoComet Navy (`--color-gc-navy-*`)
| Token | CSS Variable | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| Navy 50 | `--color-gc-navy-50` | `#f2f5fb` | Ultra subtle tinted bg |
| Navy 100 | `--color-gc-navy-100` | `#e4e9f4` | Subtle borders / dividers |
| Navy 200 | `--color-gc-navy-200` | `#c7d0e4` | Secondary borders |
| Navy 300 | `--color-gc-navy-300` | `#9aa8c9` | Placeholder / Disabled text |
| Navy 400 | `--color-gc-navy-400` | `#6b7db3` | Muted / Tertiary text (`--color-ink-muted`) |
| Navy 500 | `--color-gc-navy-500` | `#3e5599` | Secondary icons & labels |
| Navy 600 | `--color-gc-navy-600` | `#2b4180` | Subtle body text |
| Navy 700 | `--color-gc-navy-700` | `#1e3163` | Soft text (`--color-ink-soft`) |
| Navy 800 | `--color-gc-navy-800` | `#142348` | Dark headings |
| **Navy 900** | `--color-gc-navy-900` | `#0b1631` | Primary text (`--color-ink`) |
| Navy 950 | `--color-gc-navy-950` | `#060d1f` | Deepest dark / Footer / Code bg |

---

### 🟢 Status & Accent Highlights
| Token | CSS Variable | Hex Code | Semantic Role |
| :--- | :--- | :--- | :--- |
| Orange 400 | `--color-gc-orange-400` | `#ff8a3d` | Highlighting / Alerts / Warm accents |
| Green 500 | `--color-gc-green-500` | `#22c55e` | Success / Positive feedback |
| Amber 400 | `--color-gc-amber-400` | `#fc0` (`#ffcc00`) | Warning / Caution feedback |
| Red 500 | `--color-gc-red-500` | `#b22234` | Error / Critical feedback |

---

## 🏛️ Semantic Tokens

Semantic tokens should be used in UI components to ensure consistency and theme adaptability.

### Surfaces & Backgrounds
| Semantic Variable | Mapped Token / Value | Purpose |
| :--- | :--- | :--- |
| `--color-surface` | `#fff` | Cards, modals, elevated surfaces |
| `--color-surface-subtle` | `#f7f9fd` | Hovered rows, nested panels |
| `--color-canvas` | `#edf1fc` | Primary background canvas |
| `--color-canvas-deep` | `#e3e9fa` | Sidebar / sunken background |

### Typography / Ink Colors
| Semantic Variable | Mapped Token / Value | Purpose |
| :--- | :--- | :--- |
| `--color-ink` | `var(--color-gc-navy-900)` | Primary body copy & titles |
| `--color-ink-soft` | `var(--color-gc-navy-700)` | Subheadings & descriptions |
| `--color-ink-muted` | `var(--color-gc-navy-400)` | Captions, timestamps, disabled items |
| `--color-ink-inverse` | `#fff` | Text on dark/primary backgrounds |

### Borders & Dividers
| Semantic Variable | Mapped Token / Value | Purpose |
| :--- | :--- | :--- |
| `--color-line` | `#e2e8f5` | Standard card & section borders |
| `--color-line-strong` | `#cbd6ec` | Focused states & higher contrast dividers |

### Interactive Actions & States
| Semantic Variable | Mapped Token / Value | Purpose |
| :--- | :--- | :--- |
| `--color-primary` | `var(--color-gc-blue-600)` | Main CTA buttons & active highlights |
| `--color-primary-hover` | `var(--color-gc-blue-700)` | CTA hover / active state |
| `--color-primary-soft` | `var(--color-gc-blue-50)` | Badges, selected item backgrounds |
| `--color-accent` | `var(--color-gc-violet-500)` | Secondary CTA & accent flourishes |
| `--color-accent-soft` | `var(--color-gc-violet-50)` | Accent badge backgrounds |

### Feedback & Status
| Semantic Variable | Mapped Token / Value | Purpose |
| :--- | :--- | :--- |
| `--color-positive` | `var(--color-gc-green-500)` | Success alerts, positive badges |
| `--color-caution` | `var(--color-gc-amber-400)` | Warning banners, pending state |
| `--color-critical` | `var(--color-gc-red-500)` | Danger actions, error notifications |

---

## 🔤 Typography & Font Face

### Font Family
- **Primary Font**: `"proxima-nova", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Weight**: `700` (Bold)
- **Style**: `normal`
- **Font Display**: `swap`

```css
@font-face {
  font-family: "proxima-nova";
  src: url("https://use.typekit.net/af/2555e1/0000000…/30/l?primer=7cdcb44…&fvd=n7&v=3") format("woff2"),
       url("https://use.typekit.net/af/2555e1/0000000…/30/d?primer=7cdcb44…&fvd=n7&v=3") format("woff"),
       url("https://use.typekit.net/af/2555e1/0000000…/30/a?primer=7cdcb44…&fvd=n7&v=3") format("opentype");
  font-display: swap;
  font-style: normal;
  font-weight: 700;
  font-stretch: normal;
}
```

---

## 💻 Ready-to-Use CSS

```css
:root {
  /* GoComet Blue */
  --color-gc-blue-50: #eef4ff;
  --color-gc-blue-100: #d6e3ff;
  --color-gc-blue-200: #a8c4ff;
  --color-gc-blue-300: #6aa0ff;
  --color-gc-blue-400: #4d8bff;
  --color-gc-blue-500: #3376ff;
  --color-gc-blue-600: #0054ff;
  --color-gc-blue-700: #0043cc;
  --color-gc-blue-800: #00349e;

  /* GoComet Violet */
  --color-gc-violet-50: #f7f1ff;
  --color-gc-violet-100: #efe3ff;
  --color-gc-violet-200: #dcc2ff;
  --color-gc-violet-300: #c08cff;
  --color-gc-violet-400: #a85bff;
  --color-gc-violet-500: #a033ff;
  --color-gc-violet-600: #8a1aff;
  --color-gc-violet-700: #7010e0;

  /* GoComet Navy */
  --color-gc-navy-50: #f2f5fb;
  --color-gc-navy-100: #e4e9f4;
  --color-gc-navy-200: #c7d0e4;
  --color-gc-navy-300: #9aa8c9;
  --color-gc-navy-400: #6b7db3;
  --color-gc-navy-500: #3e5599;
  --color-gc-navy-600: #2b4180;
  --color-gc-navy-700: #1e3163;
  --color-gc-navy-800: #142348;
  --color-gc-navy-900: #0b1631;
  --color-gc-navy-950: #060d1f;

  /* Status & Accents */
  --color-gc-orange-400: #ff8a3d;
  --color-gc-green-500: #22c55e;
  --color-gc-amber-400: #fc0;
  --color-gc-red-500: #b22234;

  /* Surfaces & Canvas */
  --color-surface: #fff;
  --color-surface-subtle: #f7f9fd;
  --color-canvas: #edf1fc;
  --color-canvas-deep: #e3e9fa;

  /* Ink / Text */
  --color-ink: var(--color-gc-navy-900);
  --color-ink-soft: var(--color-gc-navy-700);
  --color-ink-muted: var(--color-gc-navy-400);
  --color-ink-inverse: #fff;

  /* Borders */
  --color-line: #e2e8f5;
  --color-line-strong: #cbd6ec;

  /* Semantic Actions */
  --color-primary: var(--color-gc-blue-600);
  --color-primary-hover: var(--color-gc-blue-700);
  --color-primary-soft: var(--color-gc-blue-50);
  --color-accent: var(--color-gc-violet-500);
  --color-accent-soft: var(--color-gc-violet-50);

  /* Semantic Feedback */
  --color-positive: var(--color-gc-green-500);
  --color-caution: var(--color-gc-amber-400);
  --color-critical: var(--color-gc-red-500);

  /* Typography */
  --font-family-primary: "proxima-nova", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
```
