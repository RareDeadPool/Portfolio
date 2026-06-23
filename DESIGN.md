---
name: Desktop Portfolio OS
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1b1b1d'
  surface-container: '#1f1f21'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e4e2e4'
  on-surface-variant: '#c7c6ca'
  inverse-surface: '#e4e2e4'
  inverse-on-surface: '#303032'
  outline: '#919094'
  outline-variant: '#46464a'
  surface-tint: '#c8c6c7'
  primary: '#c8c6c7'
  on-primary: '#313031'
  primary-container: '#0f0f10'
  on-primary-container: '#7d7b7c'
  inverse-primary: '#5f5e5f'
  secondary: '#aac7ff'
  on-secondary: '#002f65'
  secondary-container: '#0066cc'
  on-secondary-container: '#dfe8ff'
  tertiary: '#cac6c2'
  on-tertiary: '#32302e'
  tertiary-container: '#100f0d'
  on-tertiary-container: '#7e7b78'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e3'
  primary-fixed-dim: '#c8c6c7'
  on-primary-fixed: '#1c1b1c'
  on-primary-fixed-variant: '#474647'
  secondary-fixed: '#d7e3ff'
  secondary-fixed-dim: '#aac7ff'
  on-secondary-fixed: '#001b3e'
  on-secondary-fixed-variant: '#00458e'
  tertiary-fixed: '#e6e2de'
  tertiary-fixed-dim: '#cac6c2'
  on-tertiary-fixed: '#1d1b19'
  on-tertiary-fixed-variant: '#484644'
  background: '#131315'
  on-background: '#e4e2e4'
  surface-variant: '#353437'
  project-cityscan: '#2DD4BF'
  project-dataviz: '#A855F7'
  project-baatcheet: '#22D3EE'
  project-shivner: '#FB923C'
  sticky-note: '#FDE047'
  glass-border: rgba(255, 255, 255, 0.1)
  glass-bg: rgba(15, 15, 16, 0.7)
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  window-title:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.5'
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  window-gap: 1.5rem
  desktop-margin: 2rem
  container-padding: 1rem
  stack-tight: 0.5rem
  stack-loose: 2rem
---

## Brand & Style

This design system mimics the high-fidelity experience of a premium desktop operating system, specifically optimized for a developer portfolio. The brand personality is professional, technically proficient, and meticulously crafted. It leverages **Glassmorphism** and **Minimalism** to create a sense of depth and organization.

The UI should evoke the feeling of a "Digital Workspace" rather than a traditional website. Key stylistic drivers include:
- **Depth through Layering:** Using translucent surfaces and background blurs to distinguish between active windows and the desktop environment.
- **Precision:** Sharp attention to detail in shadows, borders, and micro-interactions.
- **Tactile Feedback:** Elements should feel "clickable" and physically present within a 3D-simulated space.

## Colors

The palette is centered around a "Deep Charcoal" ecosystem. The base surface uses `#0f0f10`, providing a high-contrast foundation for vibrant accents. 

- **Primary Surfaces:** Deep charcoal and true blacks create the desktop background and window frames.
- **Accents:** Each project is assigned a specific vibrant hue (Teal, Purple, Cyan, Orange) to help users mentally categorize different work samples.
- **System Accents:** A classic macOS-inspired blue is used for primary actions and system-level indicators.
- **Glass Effects:** Use the `glass-bg` with a backdrop-filter (blur: 20px) to achieve the signature frosted-glass appearance.

## Typography

The typography system balances the Swiss-style cleanliness of **Inter** with the technical precision of **JetBrains Mono**. 

- **Inter:** Used for all interface elements, body copy, and headings. It provides a neutral, high-legibility foundation that mirrors modern OS environments.
- **JetBrains Mono:** Reserved for "Terminal" windows, search inputs, and code snippets to reinforce the developer-centric narrative.
- **Scalability:** Large display headers should scale down significantly on mobile to maintain the "windowed" layout feel without breaking the container edges.

## Layout & Spacing

This design system uses a **Fluid Window Model**. Content is contained within draggable-style "windows" that sit on a desktop canvas.

- **Grid:** A 12-column underlying grid ensures alignment, but components (windows) may overlap or stack depth-wise.
- **Margins:** A consistent `desktop-margin` of 32px (2rem) keeps content away from the edges of the viewport.
- **Responsive Behavior:** On desktop, windows can be side-by-side. On mobile, the system transitions to a vertical "stack" of windows, mimicking a mobile OS task switcher, with reduced margins and increased vertical spacing.

## Elevation & Depth

Depth is the primary communicator of hierarchy in this system. 

1.  **Desktop Layer (Level 0):** The base wallpaper or deep charcoal surface.
2.  **Inactive Windows (Level 1):** Subtle backdrop blur (10px), low-opacity glass effect, and a soft 1px border.
3.  **Active Window (Level 2):** Intense backdrop blur (25px), brighter `glass-border`, and a heavy ambient shadow (30px blur, 0.4 opacity).
4.  **Modals/Popovers (Level 3):** The highest elevation, utilizing a slight tint from the primary blue accent to indicate immediate focus.

Shadows are never pure black; they are tinted with the surface color to ensure they feel like "ambient occlusion" rather than a drop shadow.

## Shapes

The shape language is "Rounded-Modern." 

- **Windows:** Use `rounded-xl` (1.5rem / 24px) to mimic modern hardware and software aesthetics.
- **Buttons & Inputs:** Use `rounded-lg` (1rem / 16px) for a soft, approachable feel.
- **Folders:** Feature a distinct "tab" shape on the top left, maintaining the 0.5rem base roundedness on the tab's outer corners.
- **Search Bars:** Should be pill-shaped (rounded-full) to distinguish them from functional windows.

## Components

### Windows & Folders
The core component. Every project or section is a "Window." It must include a title bar with three decorative circles (red, yellow, green) on the left. The background is the `glass-bg` with a subtle white inner glow (1px).

### Buttons
- **Primary:** Solid `secondary_color_hex` (Blue) with white text. 
- **Ghost:** `glass-border` with a hover state that increases background opacity.
- **Project Specific:** Buttons within a project window should use that project's named accent color (e.g., Teal for CityScan).

### Terminal Element
A dark-grey box with JetBrains Mono text. It should feature a blinking cursor and a subtle scan-line texture overlay at low opacity.

### Sticky Notes
Utilize the `sticky-note` color (#FDE047). These should have a slight rotation (-2 to 2 degrees) and a specific "paper-like" shadow that is tighter than the window shadows.

### Inputs
Search inputs should use a semi-transparent background, JetBrains Mono font, and a magnifying glass icon. On focus, the border should glow with the system blue.

### List Items
Hovering over a list item (like a project list) should trigger a "selection" highlight that uses a semi-transparent version of the system blue with rounded corners.