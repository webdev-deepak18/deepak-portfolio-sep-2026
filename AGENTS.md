# GoComet Senior Brand Designer Portfolio — Project Context

## Overview
This repository contains the tailored, high-impact mini-portfolio website for **Deepak S** (Bangalore, `webdev.deepak18@gmail.com`, `+91 96638 54809`), created specifically for his **GoComet Senior Brand Designer** interview.

## Core Objective
- Deliver an interview-ready portfolio that mirrors GoComet's exact visual design system (tokens, colors, typography, card rhythms).
- Demonstrate that Deepak is an **AI-first / AI-enabled designer** who builds modern B2B SaaS web applications and collateral.
- Include a standout **3D / interactive animation feature** (global supply chain globe with interactive nodes & maritime context) that elevates the portfolio above standard websites.

## Complete Design Architecture & Implementation State

### 1. Home Page & 3D Interactive Hero (`src/pages/HomePage.jsx`)
- **Viewport**: Locked at exact `100vw` by `100vh` without scrollbars (`overflow: hidden`).
- **Header**: Prominent candidate header with Deepak S (`2.1rem`, font weight 800), Target Role pill badge (`Senior Brand Designer @ GoComet`), Bangalore location, Email (`webdev.deepak18@gmail.com`), Phone (`+91 96638 54809`).
- **Ocean Freight Maritime Layer** (`src/components/OceanBackground.jsx`):
  - Undulating SVG/CSS ocean waves & caustics sitting behind the globe to honor GoComet's freight visibility domain.
  - 3 staggered container carrier ships (GoComet Blue, Marine Emerald, MSC Violet/Orange) sailing continuously with stacked colored containers, pointed hull, bridge, and green navigation light, ensuring at least one carrier is visible in the ocean at all times.
- **Three.js WebGL 3D Earth Globe** (`src/components/InteractiveGlobe.jsx`):
  - Dimension & Position: `globeRadius: 8.6`, lowered position `globePositionY: -8.1`, tilt `0.14` rad, camera at `(0, 0, 13.5)`.
  - Shaders & Textures: Soothing matte corporate navy continents (`#0e224e`), smooth GoComet blue oceans (`#061a48` to `#004fe6`), soft Fresnel atmosphere glow (`#00e5ff`, `1.018` radius). Softened NASA specular map with `smoothstep(0.18, 0.40)` to eliminate noise.
  - Logistics Trade Routes: 3 long trans-oceanic 3D spline arcs (Shanghai ⇄ LA, Singapore ⇄ Rotterdam, Santos ⇄ Rotterdam) with miniature 3D cargo ship vessels (scale `0.95`, bridge, containers, mast lights) sailing smoothly at `0.0006` speed.
  - Ray-Sphere Tangency Algorithm: Exact mathematical camera-ray tangency binary search that calculates the precise sub-pixel `(x, y)` horizon coordinate where camera rays graze the outer cyan atmospheric glow rim of the globe. Dynamically recalculates on window resize.
  - Inertia controls: Drag & spin physics with smooth rotational damping.
- **Discipline Beacon Cards & Laser Tethers** (`src/components/GlobeBeacons.jsx`):
  - 3 Discipline Cards:
    1. First card: **Graphic Design** (horizon X: 26%, tether offset: 52px)
    2. Center card: **Website / Landing Pages / AI** (horizon X: 50%, tether offset: 84px, featured AI violet border/glow)
    3. Last card: **Motion and Video** (horizon X: 74%, tether offset: 48px)
  - Card Styling (`src/App.css`): Expanded tiles with `width: 340px`, `min-height: 144px`, generous `padding: 22px 28px`, centered bold title, and unified GoComet Electric Blue (`#0054ff`) pill CTA (`Explore Work ↗`).
  - Laser Tethers: Dual-layer vertical laser line with travelling photon animation (`tether-photon`), descending from the bottom of each card directly into the glowing contact node (`contact-dot` + dual ping rings + halo) seated squarely on the illuminated cyan atmospheric rim of the globe.
  - Micro-animation: `@keyframes float-subtle` (`0px` to `-3px`), keeping cards grounded on the globe.
- **Globe Center "About Deepak S" Feature Card** (`src/pages/HomePage.jsx`):
  - Positioned centrally on the 3D globe face (at `left: 50%`, `top: 73%`, directly below the center tether node).
  - Displays candidate portrait (`assets/deepak.jpg`) inside an illuminated cyan ring with a glowing green online status badge.
  - Content: `About Deepak S` (bold title), `✦ AI-First Senior Brand Designer` (clean subtitle), with a unified electric blue `Click Here ↗` CTA navigating to `/#about`.
- **Bottom Ribbon & Resume Modal** (`src/components/Footer.jsx` & `src/pages/HomePage.jsx`):
  - Prominent footer (min-height `74px`, padding `24px 48px`, font size `0.95rem`).
  - "View Resume" links directly to `/Deepak_S_Senior_Visual_Designer.pdf` (placed in `public/` and `assets/`).
  - Integrated LinkedIn icon linking to `https://www.linkedin.com/in/deepak-ui-ux-designer/`.

### 2. Inner Portfolio Showcase Pages
- **About Deepak — The Story & AI Philosophy** (`src/pages/AboutPage.jsx`): Executive profile tailored to GoComet's Senior Brand Designer JD. Features portrait avatar, signature quote box (*"I'm a designer first, but knowing how to code makes my designs better."*), 4 narrative cards (Craft Foundation 2008, HR.com scale, Designer Who Codes, AI-First Creative Execution), 4 value multiplier pillars, LinkedIn career experience timeline (HR.com 9+ yrs & Printo/Wipro 10+ yrs), and core stack matrix.
- **Graphic Design** (`src/pages/GraphicDesignPage.jsx`): Presentations (Sushrut Prospectus `assets/sushrut-prospectus.pdf`), Brochures (Human Experience `assets/HumanExperienceSummit_Brochure.pdf`), Construction Ads (Kites), Infographics (Recruitment Tech, Wellbeing).
- **Websites & AI Workflows** (`src/pages/WebsitesPage.jsx`): HRWest 2027, HR.com Certifications, 17 Oranges Agency, SST Travels CRM, SF Travels, Supplier Query Management SaaS, HR.com Email Builder.
- **Motion & Video** (`src/pages/MotionPage.jsx`): Video showreels, Performance Management (PM) Research Video YouTube embed, HRWest event teaser.

## Key Project References & Assets
- **Design Tokens & Brand Styles**:
  - `branding/tokens.json`: Machine-readable tokens (W3C standard).
  - `branding/branding.css`: Ready-to-import CSS variables (`:root`) and `@font-face` for `proxima-nova`.
  - `branding/brand-tokens.md`: Human-readable design system reference.
- **GoComet Brand Reference**:
  - `branding/go-comet-landing-page-screenshot.jpeg`: Live website screenshot showing hero, stats, and workflow cards.
  - `branding/Gocomet-Senior Brand designer job description.md`: Detailed requirements emphasizing AI-first design.
- **Portfolio Wireframe & Structure**:
  - `branding/GoComet-Portfolio-figma-low-fi-mockup.pdf`: 4-page wireframe (Hero with interactive globe, Graphic Design, Web/AI, Motion).
- **Collateral & Proof Assets**:
  - `public/Deepak_S_Senior_Visual_Designer.pdf` & `assets/Deepak_S_Senior_Visual_Designer.pdf`: Candidate resume.
  - `assets/`: Contains project PDFs (Sushrut Prospectus, brochures, infographics) and project imagery.

## Dedicated Workspace Skill
For full instructions, token details, project links, mathematical formulas, and live progress tracking, refer to:
- [gocomet-portfolio skill](file:///e:/Gocomet-Portfolio/.agents/skills/gocomet-portfolio/SKILL.md)
*(This skill is continuously updated as we implement features, 3D elements, and portfolio sections).*
