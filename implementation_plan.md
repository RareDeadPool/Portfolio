# Implementation Plan - Motion Playground (Creative Coding Lab)

This plan replaces the Developer Playground with a high-fidelity **Motion Playground** showcasing advanced frontend interaction, GSAP animation, physics-based UI, and micro-interactions.

## Proposed Changes

### Dependencies & Setup
- Confirm `matter-js` is installed (already installed via terminal command).
- Ensure the project matches Next.js and Tailwind CSS dark glass styling.

### 1. Motion Playground App Layout
#### [MODIFY] [PlaygroundPage.js](file:///c:/Users/Aditya%20Sawant/Desktop/portfolio/src/components/PlaygroundPage.js)
- Completely replace `PlaygroundPage.js` with the new design:
  - Header: Title "Motion Playground", Subtitle "Frontend experiments with motion, physics, and interaction.", and a "Back to Desktop" button (triggering `onClose` prop).
  - Navigation: Horizontal Tab layout switcher for the 3 experiments:
    1. **Magnetic Particles**
    2. **Gravity Cards**
    3. **Kinetic Type Lab**
  - Main area: Dynamic view displaying the currently active experiment.
  - Footer/Note: A premium "What this showcases" card indicating the technical focus of the active experiment.

### 2. Experiment 1: Magnetic Particles
- Canvas: A relative container displaying floating glass skill tags.
- Default: Skills float slowly using gentle, random sinusoidal translations.
- Attraction: On mousemove, skills within a 200px radius smoothly slide towards the cursor using `gsap.quickTo` for 60fps performance.
- Repulsion: Holding the mouse click creates a strong outward force pushing tags away from the cursor.
- Click Ripple: Clicking triggers a radial shockwave that blows particles away dynamically, returning them smoothly over 1.5 seconds.
- Controls: Attract / Repel mode toggles, Reset positions button.

### 3. Experiment 2: Gravity Cards
- Physics Sandbox: Utilizes a Matter.js `Engine`, `World`, `Runner`, and `MouseConstraint` for desktop draggable cards.
- Cards: Draggable glass panels representing core skill layers (Frontend, Mobile, AI, Backend, Design, Deployment, Problem Solving, Hackathons).
- Interactions:
  - Drag & throw: Matter.js handles constraints and natural angular rotation.
  - Boundaries: Canvas borders block cards from falling off.
  - Double-click: Card receives a momentary upward physical force and torque combined with a GSAP scale-pop animation.
- Grid Snap: Clicking "Arrange Grid" halts the Matter.js engine, making bodies static, and utilizes GSAP to smoothly animate each card into an aligned grid layout with `0` rotation.
- Controls: Reset Gravity, Arrange Grid.
- Clean up: Fully destroy and clean up Matter.js engine on unmount or tab switch to avoid leaks.

### 4. Experiment 3: Kinetic Type Lab
- Typography sandbox: Splitting text inputs into individual span characters.
- Animation Modes:
  - **Wave:** Sine-wave vertical movement offset by index.
  - **Explode:** Characters burst outwards in random directions, then animate back elastically.
  - **Magnetic:** Characters translate towards the mouse coordinates.
  - **Elastic:** Cursor hover stretches individual characters vertically (`scaleY`) and snaps back with an elastic bounce.
  - **Glitch:** Random offsets to translation, skew, and opacity simulating digital noise.
- Controls: Input text box, Mode buttons, Reset layout.

### 5. Desktop Widget Integration
#### [MODIFY] [Desktop.js](file:///c:/Users/Aditya%20Sawant/Desktop/portfolio/src/components/Desktop.js)
- Pass `onClose` prop to `<PlaygroundPage onClose={() => closeWindow('playground')} />` so the back button is operational.
- Update the Playground widget in the right sidebar (line 790 onwards):
  - Title: "Motion Playground"
  - Subtitle: "Frontend experiments with motion and physics."
  - Preview log: `> run motion-lab` and `Status: Ready to interact`
  - Action button: Open Playground (triggers `openWindow('playground')`).

## Verification Plan

### Automated Tests
- Build and inspect compilation output: `npm run build`

### Manual Verification
- Test all 3 tabs inside the Motion Playground.
- Verify dragging, double-clicking, and grid alignments.
- Validate Matter.js and GSAP cleanup on unmount to verify zero memory leaks.
