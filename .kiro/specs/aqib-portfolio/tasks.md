# Implementation Plan: M Aqib Portfolio Website

## Overview

Build a single-page portfolio website using vanilla HTML, CSS, and JavaScript. The implementation creates three core files (`index.html`, `style.css`, `script.js`), an `assets/` directory, and a Vitest + fast-check test suite. Tasks are ordered so each step builds on the previous, ending with full integration.

---

## Tasks

- [x] 1. Set up project structure, configuration, and base HTML shell
  - [x] 1.1 Create `package.json` with Vitest and fast-check dependencies
    - Add `vitest`, `@vitest/coverage-v8`, `fast-check`, and `jsdom` as dev dependencies
    - Add `test` and `test:run` npm scripts (`vitest` and `vitest run`)
    - _Requirements: 10.1, 10.2_
  - [x] 1.2 Create `vitest.config.js` with jsdom environment
    - Set `environment: 'jsdom'` and configure test file glob `tests/**/*.test.js`
    - _Requirements: 10.1_
  - [x] 1.3 Create `index.html` base shell with document metadata
    - Add `<!DOCTYPE html>`, `<html lang="en">`, `<head>` with charset, viewport, `<title>M Aqib | Computer Science Student & Web Developer</title>`, and `<meta name="description">` containing Aqib's name and profession
    - Link `style.css` and defer-load `script.js`
    - Add `<header>`, `<main>`, `<footer>` semantic landmark elements as empty scaffolding
    - _Requirements: 10.6, 10.7_
  - [x] 1.4 Create `style.css` with CSS custom properties (design tokens)
    - Define all `:root` light-mode tokens: `--color-bg`, `--color-bg-subtle`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-accent`, `--color-accent-subtle`, `--color-border`
    - Define `[data-theme="dark"]` overrides for all color tokens
    - Define typography tokens (`--font-sans`, `--font-size-base` using `clamp`), spacing tokens, motion tokens, and shadow tokens
    - Add CSS reset, `box-sizing: border-box`, and base `body` styles referencing tokens
    - _Requirements: 9.2, 9.5, 8.2_
  - [x] 1.5 Create `script.js` as an ES module skeleton with module stubs and top-level error handling
    - Export stub functions/classes for: `ThemeManager`, `NavigationManager`, `ScrollManager`, `SkillBarAnimator`, `ContactFormValidator`, `HeroAnimator`, `AboutManager`
    - Wrap each module initialization in `try/catch` that logs to `console.error`
    - Call all initializers on `DOMContentLoaded`
    - _Requirements: 10.1_
  - [x] 1.6 Create `assets/` directory placeholder (`.gitkeep` or `README.md`)
    - Document that `cv.pdf` and `avatar.jpg` are placed here
    - _Requirements: 3.2, 3.4_

- [x] 2. Implement Navigation (`<header>` / `<nav>`)
  - [x] 2.1 Add navigation markup to `index.html` `<header>`
    - Implement `<nav aria-label="Main navigation">` with brand link, `<ul class="nav-links">` containing six section anchor links, theme-toggle `<button>`, and hamburger `<button>`
    - Set correct `aria-label`, `aria-expanded="false"`, `aria-controls`, and `role="list"` attributes
    - _Requirements: 1.1, 1.2, 1.4, 1.7, 9.1_
  - [x] 2.2 Add navigation CSS
    - `position: fixed; top: 0; width: 100%; z-index: 1000` for the header
    - Horizontal flex layout for links at `> 768px`; hide `.hamburger` at `> 768px`
    - At `≤ 768px`: hide `.nav-links` by default; show `.hamburger`; `.nav-links.is-open` → full-width dropdown overlay with max-height CSS transition
    - `.nav-links a.active` → distinct accent color / underline style
    - Focus ring styles (minimum 2px outline, 3:1 contrast) on all interactive nav elements
    - Touch target min 44×44px for hamburger and theme-toggle on narrow viewports
    - _Requirements: 1.2, 1.4, 1.7, 8.4, 8.5, 10.5_
  - [x] 2.3 Implement `NavigationManager` in `script.js`
    - Hamburger click: toggle `aria-expanded`, toggle `.is-open` on `.nav-links`
    - Click outside open overlay: close overlay, reset `aria-expanded`
    - `IntersectionObserver` with `threshold: 0.5` on each `<section>`: apply `.active` to matching nav link, remove from others
    - _Requirements: 1.3, 1.5, 1.6_
  - [ ]* 2.4 Write property test for nav toggle (Property 1)
    - **Property 1: Nav toggle inverts open/closed state**
    - **Validates: Requirements 1.5**
    - Use `fc.boolean()` to generate arbitrary initial states; assert `aria-expanded` and `.is-open` are always inverted after toggle
    - `// Feature: aqib-portfolio, Property 1: Nav toggle inverts open/closed state`
    - _Test file: `tests/navigation.test.js`_
  - [ ]* 2.5 Write property test for active nav link (Property 2)
    - **Property 2: Active nav link matches current section**
    - **Validates: Requirements 1.6**
    - Use `fc.constantFrom(...sectionIds)` to simulate any section becoming active; assert exactly one `.active` link matches the section ID and no other link holds `.active`
    - `// Feature: aqib-portfolio, Property 2: Active nav link matches current section`
    - _Test file: `tests/navigation.test.js`_

- [x] 3. Implement Hero Section
  - [x] 3.1 Add Hero section markup to `index.html`
    - `<section id="hero" aria-label="Introduction">` wrapping `.hero-content` with `<h1 class="hero-name">M Aqib</h1>`, `<p class="hero-title">Computer Science Student & Web Developer</p>`, `<p class="hero-tagline">` (≤ 20 words), and two CTA anchor buttons (`href="#experience"` and `href="#contact"`)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  - [x] 3.2 Add Hero section CSS
    - `min-height: 100vh; display: flex; align-items: center; justify-content: center`
    - `h1` font-size: `clamp(2rem, 5vw, 4rem)` (≥ 32px at 320px, ≥ 48px at 1024px)
    - `.btn-primary` and `.btn-secondary` base styles with min 44×44px touch targets
    - `.hero-content` initial opacity 0; `.animate-in` triggers `@keyframes fadeInUp` on `h1` and `.hero-title` with 0ms / 200ms stagger
    - _Requirements: 2.1, 2.6, 2.7, 8.4_
  - [x] 3.3 Implement `HeroAnimator` and `ScrollManager` in `script.js`
    - `HeroAnimator`: on `DOMContentLoaded`, add `.animate-in` to `.hero-content`
    - `ScrollManager`: intercept clicks on CTA `<a>` buttons, call `element.scrollIntoView({ behavior: 'smooth' })`, also wire all footer nav links and any other in-page anchors
    - _Requirements: 1.3, 2.4, 2.5, 2.7_

- [x] 4. Implement About Section
  - [x] 4.1 Add About section markup to `index.html`
    - `<section id="about" aria-labelledby="about-heading">` with `<h2 id="about-heading">About Me</h2>`
    - `.about-grid` containing `.about-avatar` (with `<img>` having `alt="M Aqib profile photo"`, `onerror` handler, and `<template id="avatar-placeholder">` with `.avatar-initials` showing "MA") and `.about-content` (bio paragraph, `.about-details` list with Location/Email/Phone labeled items, CV download `<a id="cv-download">`)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 10.3_
  - [x] 4.2 Add About section CSS
    - `.about-grid`: `display: grid; grid-template-columns: auto 1fr; gap: 2rem` at `> 768px`; `grid-template-columns: 1fr` at `≤ 768px`
    - `.avatar-initials`: `width: 160px; height: 160px; border-radius: 50%; display: flex; align-items: center; justify-content: center`
    - `.btn[aria-disabled="true"]`: muted color, `pointer-events: none`, `cursor: not-allowed`
    - _Requirements: 3.2, 3.4, 3.5, 3.6_
  - [x] 4.3 Implement `AboutManager` in `script.js`
    - On `DOMContentLoaded`: `fetch('assets/cv.pdf', { method: 'HEAD' })` — on non-ok response or network error, set `#cv-download` `aria-disabled="true"`, change text to "CV Unavailable"
    - _Requirements: 3.4_

- [x] 5. Implement Skills Section
  - [x] 5.1 Add Skills section markup to `index.html`
    - `<section id="skills" aria-labelledby="skills-heading">` with `.skills-grid` containing two `.skills-category` divs
    - Technical Skills: four `<li>` items with `.skill-label`, `.skill-track[role="progressbar"]`, and `.skill-fill[data-width="N"]` for Web Development (80), SEO (75), Python (60), MS Office (70)
    - Professional Skills: eight `<li class="badge">` items
    - All proper `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label` on progressbars
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  - [x] 5.2 Add Skills section CSS
    - `.skills-grid`: `display: grid; grid-template-columns: 1fr 1fr; gap: 2rem` at `> 768px`; `1fr` at `≤ 768px`
    - `.skill-fill`: initial `width: 0%; transition: width var(--transition-slow)`
    - `.badge`: `display: inline-block; padding: 0.4em 0.9em; border-radius: 2em; background: var(--color-accent-subtle); border: 1px solid var(--color-accent)`
    - _Requirements: 4.4, 4.5, 4.6, 4.7, 4.8_
  - [x] 5.3 Implement `SkillBarAnimator` in `script.js`
    - `IntersectionObserver({ threshold: 0.5 })` on `#skills`; on intersect: forEach `.skill-fill`, set `el.style.width = el.dataset.width + '%'`; call `observer.unobserve()` after first trigger
    - _Requirements: 4.5_
  - [ ]* 5.4 Write property test for skill bar animation (Property 3)
    - **Property 3: Skill bar width equals declared proficiency**
    - **Validates: Requirements 4.5**
    - Use `fc.integer({ min: 0, max: 100 })` to generate arbitrary `data-width` values; assert `style.width === value + '%'` after animator callback fires
    - `// Feature: aqib-portfolio, Property 3: Skill bar width equals declared proficiency`
    - _Test file: `tests/skillBar.test.js`_

- [x] 6. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Implement Education Section
  - [x] 7.1 Add Education section markup to `index.html`
    - `<section id="education" aria-labelledby="education-heading">` with `<ol class="timeline" role="list">`
    - One `<li class="timeline-item">` containing `.timeline-dot[aria-hidden="true"]`, and `<article class="timeline-card">` with `<header>`, `.timeline-icon` (🎓), `<h3>Bachelor of Computer Science</h3>`, `<p class="timeline-institution">MNSUAM</p>`, `<time class="timeline-date" datetime="2022/2026">2022 – 2026</time>`, and institution icon placeholder of ≥ 32×32px
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  - [x] 7.2 Add timeline CSS (shared between Education and Experience)
    - `.timeline`: `position: relative; padding-left: 2.5rem; list-style: none`
    - `.timeline::before`: vertical connecting line `width: 2px; background: var(--color-accent); position: absolute; left: 1rem; top: 0; bottom: 0`
    - `.timeline-dot`: `position: absolute; left: calc(1rem - 6px); width: 14px; height: 14px; border-radius: 50%; background: var(--color-accent); border: 2px solid var(--color-bg)`
    - `.timeline-card`: card styles with `var(--shadow-card)` and `var(--color-surface)` background
    - At `≤ 768px`: single-column left-aligned, line stays on left edge
    - _Requirements: 5.2, 5.5, 6.3, 6.5_

- [x] 8. Implement Experience Section
  - [x] 8.1 Add Experience section markup to `index.html`
    - `<section id="experience" aria-labelledby="experience-heading">` with `<ol class="timeline" role="list">` (reuses timeline CSS)
    - One `<li class="timeline-item">` with `.timeline-dot`, `<article class="timeline-card">` containing `<header>` with 💼 icon and `<h3>Freelance Web Development & SEO Projects</h3>`, `<p class="timeline-role">Self-Practice / Academic Projects</p>`, `<time datetime="2025">2025 – Present</time>`, and `<ul class="responsibilities">` with all five bullet-point items
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 9. Implement Contact Section and Footer
  - [x] 9.1 Add Contact section markup to `index.html`
    - `<section id="contact" aria-labelledby="contact-heading">` with `.contact-grid`
    - `.contact-info` with email `<a href="mailto:...">`, phone `<a href="tel:...">`, and location span with inline SVG map-pin (≥ 16×16px, `aria-hidden="true"`)
    - `<form id="contact-form" novalidate aria-label="Contact form">` with four `.form-group` divs (Name, Email, Subject, Message), each with `<label>`, `<input>`/`<textarea>`, and `<span class="field-error" aria-live="polite">`
    - Submit `<button>` with `.btn-text` and `.btn-spinner[hidden]`; `<div id="form-success" role="alert" aria-live="assertive" hidden>`
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 10.4, 10.7_
  - [x] 9.2 Add Footer markup to `index.html`
    - `<footer>` with `<nav aria-label="Footer navigation">` listing six section anchor links, `.footer-social` with email/phone `<a>` links and two `<span class="social-placeholder">` for LinkedIn/GitHub labeled "Coming Soon", and `<p class="footer-copy">© 2025 M Aqib. All rights reserved.</p>`
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_
  - [x] 9.3 Add Contact section and Footer CSS
    - `.contact-grid`: two-column layout at `> 768px`, single column at `≤ 768px`
    - `.form-group` layout, `input`/`textarea` focus ring styles (2px outline, 3:1 contrast)
    - `.field-error`: red/error-colored text, visible only when non-empty
    - `#form-success`: visible success styling (accent background or border, adequate contrast)
    - Footer flexbox layout, social icon sizing, `.social-placeholder` muted style
    - Min 44×44px touch targets on all form inputs and submit button
    - _Requirements: 7.4, 8.4, 10.5, 11.1_
  - [x] 9.4 Implement `ContactFormValidator` in `script.js`
    - `form.addEventListener('submit', ...)`: prevent default, clear errors, validate all fields
    - Validation rules: name non-empty; email matches `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`; subject non-empty; message trimmed length ≥ 20
    - On failure: render inline error under each invalid field; return early
    - On success: disable submit, show spinner, `setTimeout(1000)` → show `#form-success`, reset form, re-enable submit, hide spinner
    - _Requirements: 7.5, 7.6, 7.7_
  - [ ]* 9.5 Write property test for valid form submission (Property 4)
    - **Property 4: Valid form submission produces success state**
    - **Validates: Requirements 7.5**
    - Use `fc.record({ name: fc.string({minLength:1}), email: fc.emailAddress(), subject: fc.string({minLength:1}), message: fc.string({minLength:20}) })`; assert `#form-success` visible, all fields empty, submit re-enabled after async resolves
    - `// Feature: aqib-portfolio, Property 4: Valid form submission produces success state`
    - _Test file: `tests/contactForm.test.js`_
  - [ ]* 9.6 Write property test for invalid form submission (Property 5)
    - **Property 5: Invalid form submission produces field-specific errors**
    - **Validates: Requirements 7.6**
    - Generate inputs with at least one invalid field (empty name, malformed email, short message); assert `.field-error` populated beneath each violating field, `#form-success` remains hidden, fields retain values
    - `// Feature: aqib-portfolio, Property 5: Invalid form submission produces field-specific errors`
    - _Test file: `tests/contactForm.test.js`_
  - [ ]* 9.7 Write property test for submit button disabled during processing (Property 6)
    - **Property 6: Submit button is disabled during async processing**
    - **Validates: Requirements 7.7**
    - Generate valid input; on submit, synchronously assert submit button has `disabled` attribute and spinner is visible before async timer resolves
    - `// Feature: aqib-portfolio, Property 6: Submit button is disabled during async processing`
    - _Test file: `tests/contactForm.test.js`_

- [x] 10. Implement Theme System
  - [x] 10.1 Implement `ThemeManager` in `script.js`
    - On `DOMContentLoaded`: read `localStorage["theme"]`; if present apply to `document.documentElement.dataset.theme`; if absent use `window.matchMedia('(prefers-color-scheme: dark)')` result
    - Wrap `localStorage` access in `try/catch`; on error fall back to `prefers-color-scheme`
    - Theme toggle button click: invert current theme, update `data-theme` on `<html>`, persist to `localStorage["theme"]`, toggle `aria-pressed`
    - Theme transition: add `transition: background-color var(--transition-base), color var(--transition-base)` to `:root` CSS for ≤ 300ms switch
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  - [ ]* 10.2 Write property test for theme toggle (Property 7)
    - **Property 7: Theme toggle inverts current theme**
    - **Validates: Requirements 9.2**
    - Use `fc.constantFrom('light', 'dark')` as initial state; assert `data-theme` after toggle equals opposite, and `localStorage["theme"]` equals new theme
    - `// Feature: aqib-portfolio, Property 7: Theme toggle inverts current theme`
    - _Test file: `tests/theme.test.js`_
  - [ ]* 10.3 Write property test for theme persistence (Property 8)
    - **Property 8: Theme preference round-trip through localStorage**
    - **Validates: Requirements 9.3**
    - Use `fc.constantFrom('light', 'dark')` to write to `localStorage["theme"]`; re-run `ThemeManager.init()` and assert `data-theme` matches stored value exactly
    - `// Feature: aqib-portfolio, Property 8: Theme preference round-trip through localStorage`
    - _Test file: `tests/theme.test.js`_
  - [ ]* 10.4 Write property test for WCAG contrast ratios (Property 9)
    - **Property 9: WCAG contrast ratio ≥ 4.5:1 for all text/background token pairs**
    - **Validates: Requirements 9.5**
    - Use `fc.constantFrom(...colorPairs)` where pairs are all (text, bg) design token combinations for light and dark mode; compute WCAG 2.1 relative luminance ratio and assert ≥ 4.5
    - `// Feature: aqib-portfolio, Property 9: WCAG contrast ratio for all text/background token pairs`
    - _Test file: `tests/contrast.test.js`_

- [x] 11. Implement Responsive Layout and Accessibility Polish
  - [x] 11.1 Add responsive CSS media queries to `style.css`
    - Breakpoints at 480px, 768px, 1024px, 1280px
    - Ensure no content overflow, no element overlap, no horizontal scrollbar at 320px, 375px, 768px, 1024px, 1280px, 1920px
    - Fluid typography via `--font-size-base: clamp(0.875rem, 1.5vw, 1.125rem)` (14px–18px)
    - Min 44×44px touch targets enforced for all interactive elements at ≤ 768px
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  - [x] 11.2 Audit and complete semantic HTML5 structure in `index.html`
    - Verify `<header>`, `<nav>`, `<main>`, `<section>` (×6), `<footer>`, `<article>` are present for every structural role
    - Replace any `<div>` used in place of a semantic element
    - Verify all `<img>` elements have descriptive `alt` (or `alt=""` for decorative)
    - Verify Tab order matches visual reading order; add `tabindex` corrections if needed
    - _Requirements: 10.3, 10.4, 10.7_
  - [ ]* 11.3 Write property test for alt attributes (Property 10)
    - **Property 10: All informative images have non-empty alt attributes**
    - **Validates: Requirements 10.3**
    - Parse the full `index.html` DOM in jsdom; use `fc.integer({min:0,max:10})` to inject varying numbers of test images (with and without alt); assert every informative `<img>` has non-empty `alt`, every decorative `<img>` has `alt=""`
    - `// Feature: aqib-portfolio, Property 10: All informative images have non-empty alt attributes`
    - _Test file: `tests/dom.test.js`_
  - [ ]* 11.4 Write property test for semantic HTML5 structure (Property 11)
    - **Property 11: Semantic HTML5 elements used for all content areas**
    - **Validates: Requirements 10.7**
    - Load `index.html` into jsdom; use `fc.constantFrom(...contentAreas)` where content areas are: site header, main nav, main content wrapper, each of six sections by ID, footer, and timeline articles; assert each maps to correct semantic element and no `<div>` fills a semantic role
    - `// Feature: aqib-portfolio, Property 11: Semantic HTML5 elements used for all content areas`
    - _Test file: `tests/dom.test.js`_

- [x] 12. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 13. Wire everything together and validate integration
  - [x] 13.1 Cross-verify all six sections are present and in correct DOM order
    - Confirm order in `<main>`: `#hero` → `#about` → `#skills` → `#education` → `#experience` → `#contact`
    - Confirm footer nav links target correct section IDs
    - _Requirements: 1.1, 11.3_
  - [x] 13.2 Verify all JS module initializations are connected in `script.js`
    - Confirm `DOMContentLoaded` handler calls: `ThemeManager.init()`, `NavigationManager.init()`, `ScrollManager.init()`, `SkillBarAnimator.init()`, `ContactFormValidator.init()`, `HeroAnimator.init()`, `AboutManager.init()`
    - Confirm each module's try/catch logs errors without breaking others
    - _Requirements: 1.3, 2.4, 2.5, 4.5, 7.5, 7.7, 9.2, 9.3_
  - [x] 13.3 Run full test suite and resolve any failures
    - Run `npm run test:run`
    - Fix any failing unit or property tests
    - All 11 properties must pass; unit tests for concrete examples must pass
    - _Requirements: all_
  - [ ]* 13.4 Write unit tests for concrete content and behavior examples
    - Navigation: renders all six section links; hamburger visible at ≤ 768px
    - Hero: `<h1>` text is "M Aqib"; CTA hrefs are `#experience` and `#contact`
    - About: bio text matches spec exactly; Location/Email/Phone labels and values present
    - Skills: each of four technical skills has correct `data-width`; eight professional skill badges present
    - Education: degree name, institution, date range all present
    - Experience: role entry present; all five responsibility bullets present
    - Footer: copyright text correct; all six anchor links present
    - Theme: OS dark preference applied when no `localStorage` key
    - Contact form: empty name → "Name is required." error; invalid email → email error; message < 20 chars → message error
    - _Test files: `tests/navigation.test.js`, `tests/skillBar.test.js`, `tests/contactForm.test.js`, `tests/theme.test.js`, `tests/dom.test.js`_

- [x] 14. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for full traceability
- Checkpoints at tasks 6, 12, and 14 ensure incremental validation
- The timeline CSS (task 7.2) is shared between Education and Experience — implement once
- The `assets/` directory files (`cv.pdf`, `avatar.jpg`) are optional; the code handles their absence gracefully
- The contact form uses a simulated async submission (`setTimeout 1000ms`) — no backend required
- All property tests use `fast-check` with a minimum of 100 iterations; each is annotated with `// Feature: aqib-portfolio, Property N: ...`
- Run `npm run test:run` (single-pass) or `npm test` (watch mode) during development

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["1.3", "1.4", "1.5", "1.6"] },
    { "id": 2, "tasks": ["2.1", "3.1", "4.1", "5.1", "7.1", "8.1", "9.1", "9.2"] },
    { "id": 3, "tasks": ["2.2", "3.2", "4.2", "5.2", "7.2", "9.3"] },
    { "id": 4, "tasks": ["2.3", "3.3", "4.3", "5.3", "9.4"] },
    { "id": 5, "tasks": ["10.1", "11.1", "11.2"] },
    { "id": 6, "tasks": ["2.4", "2.5", "5.4", "9.5", "9.6", "9.7", "10.2", "10.3", "10.4", "11.3", "11.4"] },
    { "id": 7, "tasks": ["13.1", "13.2"] },
    { "id": 8, "tasks": ["13.3", "13.4"] }
  ]
}
```
