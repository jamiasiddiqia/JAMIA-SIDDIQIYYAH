---
name: Emerald & Gold Academic Narrative
colors:
  surface: '#fbfaee'
  surface-dim: '#dbdbcf'
  surface-bright: '#fbfaee'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f4e8'
  surface-container: '#efeee3'
  surface-container-high: '#e9e9dd'
  surface-container-highest: '#e4e3d7'
  on-surface: '#1b1c15'
  on-surface-variant: '#404944'
  inverse-surface: '#303129'
  inverse-on-surface: '#f2f1e5'
  outline: '#707974'
  outline-variant: '#bfc9c3'
  surface-tint: '#2b6954'
  primary: '#003527'
  on-primary: '#ffffff'
  primary-container: '#064e3b'
  on-primary-container: '#80bea6'
  inverse-primary: '#95d3ba'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#252f3d'
  on-tertiary: '#ffffff'
  tertiary-container: '#3b4554'
  on-tertiary-container: '#a8b2c4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f0d6'
  primary-fixed-dim: '#95d3ba'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#0b513d'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#d9e3f6'
  tertiary-fixed-dim: '#bdc7d9'
  on-tertiary-fixed: '#121c2a'
  on-tertiary-fixed-variant: '#3d4756'
  background: '#fbfaee'
  on-background: '#1b1c15'
  surface-variant: '#e4e3d7'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.5'
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.7'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
  max-width: 1280px
---

## Brand & Style

The design system is centered on the concept of "Illuminated Scholarship." It merges the centuries-old prestige of Islamic academic tradition with the precision of contemporary high-end technology. The goal is to evoke a sense of quiet authority, intellectual depth, and spiritual serenity.

The aesthetic direction is a fusion of **Minimalism** and **Glassmorphism**, elevated by **Tactile** accents. It utilizes the "white space" of modern SaaS platforms but replaces sterile whites with warm, parchment-like tones. The visual narrative is punctuated by geometric precision, drawing inspiration from the mathematical beauty of Islamic tiling and the structural clarity of premium editorial design.

**Target Audience:** Prospective scholars, global donors, and the academic community seeking a synthesis of traditional values and modern excellence.
**Emotional Response:** Reverence, trust, intellectual clarity, and institutional legacy.

## Colors

The palette is designed to feel "organic yet precious." 

- **Primary (Deep Emerald):** Used for primary actions, navigation headers, and moments of spiritual significance. It should be applied with restraint to maintain its "prestige" value.
- **Secondary (Islamic Gold):** Used for highlights, thin borders, and decorative accents. This is not a "yellow," but a metallic-inspired tone that signifies quality and achievement.
- **Background (Warm Ivory):** The primary canvas. This warmth distinguishes the institution from "cold" tech companies, mimicking high-quality archival paper.
- **Accent (Dark Charcoal):** Reserved for high-contrast typography and deep structural elements to ensure readability and grounding.
- **Glassmorphism:** Layers should use a semi-transparent white (#FFFFFF at 60-80% opacity) with a high background-blur (20px+) to create depth without clutter.

## Typography

This design system utilizes a high-contrast typographic pairing to bridge the gap between "Traditional Editorial" and "Functional Modern."

- **Headlines:** Playfair Display provides a classic, authoritative voice. Use "Display" sizes for landing page heros with slightly tighter letter spacing to emphasize the high-contrast serifs.
- **Body:** Inter is the workhorse for all long-form reading, application forms, and data. It ensures that the academic content remains accessible and highly legible across all devices.
- **Localization:** For Arabic (Thuluth/Diwani) and Urdu (Nastaliq) support, ensure line-heights are increased by at least 20% compared to English counterparts to accommodate the verticality of the scripts.
- **Caps:** Use the `label-caps` style for small headers or category tags, paired with the Secondary Gold color for an "Award" or "Certificate" feel.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model for desktop to maintain a controlled, editorial feel, transitioning to a **Fluid Grid** for mobile.

- **Desktop:** 12-column grid with a 1280px max-width. Use wide margins (80px) to allow the "Ivory" background to breathe, creating a gallery-like experience.
- **Spacing Rhythm:** Based on an 8px base unit. Component internal padding should be generous (e.g., 24px or 32px for card containers) to reinforce the luxury positioning.
- **Vertical Rhythm:** Use significant section vertical spacing (120px - 160px) to separate different thematic areas, allowing the "cinematic imagery" to act as a visual palette cleanser between content blocks.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Glassmorphism**, rather than heavy shadows.

1.  **Base Layer:** The `FDFCF0` Ivory background.
2.  **Surface Layer:** Semi-transparent white glass cards with a subtle `1px` border in a very faint Gold or White.
3.  **Floating Elements:** Use "Ambient Shadows"—ultra-soft, wide-spread shadows (e.g., `0 20px 40px rgba(6, 78, 59, 0.05)`) tinted slightly with the Emerald Primary color to give a sense of spiritual lightness.
4.  **Patterns:** Use Islamic geometric patterns (Girih) as a background texture on the Base Layer at 3-5% opacity. These should feel like a watermark on expensive stationery.

## Shapes

The shape language is **Soft (0.25rem - 0.75rem)**. 

While the system is modern, "Pill" shapes are avoided for primary components to maintain academic seriousness. Instead, use sharp or slightly softened corners that mimic the cut of a traditional reed pen (Qalam). 

- **Primary Buttons:** 4px (Soft) corner radius.
- **Cards:** 8px or 12px for a modern container feel.
- **Decorative Elements:** Use 8-pointed stars (Khatim) for bullet points or small dividers, rendered in Secondary Gold.

## Components

- **Buttons:** 
    - *Primary:* Emerald background, white text, 4px radius. On hover, a subtle gold bottom-border (2px) appears.
    - *Secondary:* Ghost style with a 1px Gold border and Gold text.
- **Cards:** Glassmorphic surfaces with a 1px border (`rgba(212, 175, 55, 0.2)`). Use for course listings and faculty profiles.
- **Input Fields:** Minimalist. Underline-only or very light Ivory-tinted backgrounds with Emerald focus states.
- **Arabic Calligraphy Accents:** Use as non-functional decorative motifs (e.g., "Bismillah" or institutional mottos) at the top of major sections, treated as SVG artwork rather than standard text.
- **Dividers:** Use ultra-thin (0.5px) Gold lines with a small geometric diamond or star in the center.
- **Imagery:** Large-scale photography should use a subtle grain overlay and a slight "Warm" filter to match the Ivory background. Incorporate parallax effects to give the feeling of walking through an expansive campus.