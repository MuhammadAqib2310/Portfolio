# Design Document: M Aqib Portfolio Website

## Overview

This document describes the technical design for M Aqib's personal portfolio website — a single-page application (SPA) built with vanilla HTML, CSS, and JavaScript. No frameworks, build tools, or backend are required. The site ships as three files (`index.html`, `style.css`, `script.js`) plus an `assets/` directory, making it trivially deployable to any static host (GitHub Pages, Netlify, direct file open).

The design goals are:

- **Correctness**: All interactive behaviors (scroll, theme toggle, form validation, skill-bar animation) work reliably across modern browsers.
- **Accessibility**: WCAG 2.1 AA compliance; Lighthouse Accessibility ≥ 90.
- **Performance**: No external JavaScript dependencies; minimal CSS; Lighthouse Performance ≥ 85.
- **Maintainability**: A single source of truth for colors (CSS custom properties), a single JS module (`script.js`) organized into clearly named functions, and semantic HTML that reads as documentation.

---

## Architecture

### File Structure

```
portfolio/
├── index.html          # All markup; single <main> with six <section> elements
├── style.css           # All styles; CSS custom properties for theming
├── script.js           # All interactivity; ES2020, no transpilation
└── assets/
    ├── cv.pdf          # CV download (optional — button disabled if absent)
    └── avatar.jpg      # Profile photo (optional — initials placeholder if absent)
```

### Rendering Model

The site is **document-order SPA**: all content is present in the DOM on first load; sections are navigated via anchor links with `scroll-behavior: smooth`. There is no client-side routing, no virtual DOM, and no JavaScript required to render content — JS only enhances behavior. This ensures the page is fully functional with JS disabled (except for animated features).

### Browser Support

All features use Baseline 2020 APIs (Intersection Observer v2, CSS custom properties, `localStorage`, CSS Grid/Flexbox). IE is explicitly out of scope.

### Dependency Graph

```
index.html
  └── <link rel="stylesheet" href="style.css">
  └── <script defer src="script.js">
       ├── ThemeManager         (reads/writes localStorage + prefers-color-scheme)
       ├── NavigationManager    (hamburger toggle, active-link tracking)
       ├── ScrollManager        (smooth-scroll for CTA buttons)
       ├── SkillBarAnimator     (IntersectionObserver on #skills section)
       ├── ContactFormValidator (client-side validation + success state)
       └── HeroAnimator         (CSS class toggled on DOMContentLoaded)
```

---

## Components and Interfaces

### 1. Navigation (`<header>` / `<nav>`)

**Markup outline:**
```html
<header id="site-header">
  <nav aria-label="Main navigation">
    <a href="#hero" class="nav-brand">M Aqib</a>
    <ul class="nav-links" role="list">
      <li><a href="#about">About</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#education">Education</a></li>
      <li><a href="#experience">Experience</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <button class="theme-toggle" aria-label="Toggle dark mode" aria-pressed="false">
      <!-- sun/moon SVG icon swapped via CSS/JS -->
    </button>
    <button class="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">
      <!-- three-line SVG icon -->
    </button>
  </nav>
</header>
```

**Behavior (NavigationManager):**
- `hamburger` click → toggles `aria-expanded`, adds `.is-open` to `.nav-links` which expands via CSS max-height transition.
- Click outside `.nav-links` while open → closes overlay.
- `window.scroll` → `IntersectionObserver` reports which `<section>` crosses 50% threshold → corresponding `<a>` in nav receives `.active` class.

**CSS:**
- `position: fixed; top: 0; width: 100%; z-index: 1000`.
- At `≤ 768px`: `.nav-links` hidden by default; `.hamburger` visible.
- `.nav-links.is-open` → full-width dropdown overlay.

---

### 2. Hero Section (`<section id="hero">`)

**Markup outline:**
```html
<section id="hero" aria-label="Introduction">
  <div class="hero-content">
    <h1 class="hero-name">M Aqib</h1>
    <p class="hero-title">Computer Science Student & Web Developer</p>
    <p class="hero-tagline">Building fast, accessible web experiences with HTML, CSS, Python &amp; SEO.</p>
    <div class="hero-cta">
      <a href="#experience" class="btn btn-primary">View My Work</a>
      <a href="#contact"    class="btn btn-secondary">Contact Me</a>
    </div>
  </div>
</section>
```

**Behavior (HeroAnimator):**
- On `DOMContentLoaded`: `.hero-content` receives class `.animate-in` which triggers CSS `@keyframes fadeInUp` on `h1` and `p.hero-title` (staggered: 0ms, 200ms delay).
- CTA buttons are `<a>` elements; JS `ScrollManager` intercepts click, calls `element.scrollIntoView({ behavior: 'smooth' })`.

**CSS:**
- `min-height: 100vh; display: flex; align-items: center; justify-content: center`.
- `h1` font-size: `clamp(2rem, 5vw, 4rem)` (≥ 32px at 320px, ≥ 48px at 1024px).

---

### 3. About Section (`<section id="about">`)

**Markup outline:**
```html
<section id="about" aria-labelledby="about-heading">
  <h2 id="about-heading">About Me</h2>
  <div class="about-grid">
    <div class="about-avatar">
      <img src="assets/avatar.jpg" alt="M Aqib profile photo" width="160" height="160"
           onerror="this.replaceWith(document.getElementById('avatar-placeholder').content.cloneNode(true))">
      <template id="avatar-placeholder">
        <div class="avatar-initials" aria-label="M Aqib initials placeholder">MA</div>
      </template>
    </div>
    <div class="about-content">
      <p><!-- bio text --></p>
      <ul class="about-details">
        <li><span class="detail-label">Location:</span> <span>Multan</span></li>
        <li><span class="detail-label">Email:</span>
            <a href="mailto:aqibm8123@gmail.com">aqibm8123@gmail.com</a></li>
        <li><span class="detail-label">Phone:</span>
            <a href="tel:+923375013984">+923375013984</a></li>
      </ul>
      <a href="assets/cv.pdf" download class="btn btn-primary" id="cv-download">
        Download CV
      </a>
    </div>
  </div>
</section>
```

**Behavior:**
- JS `AboutManager` checks `fetch('assets/cv.pdf', { method: 'HEAD' })` on load; if response is not ok, sets `#cv-download` to `disabled` state with text "CV Unavailable" and `aria-disabled="true"`.
- Avatar `onerror` gracefully falls back to the `<template>` placeholder.

**CSS:**
- `.about-grid`: `display: grid; grid-template-columns: auto 1fr; gap: 2rem` at `> 768px`.
- At `≤ 768px`: `grid-template-columns: 1fr` (stacked).
- `.avatar-initials`: `width: 160px; height: 160px; border-radius: 50%; display: flex; align-items: center; justify-content: center`.

---

### 4. Skills Section (`<section id="skills">`)

**Markup outline:**
```html
<section id="skills" aria-labelledby="skills-heading">
  <h2 id="skills-heading">Skills</h2>
  <div class="skills-grid">
    <div class="skills-category">
      <h3>Technical Skills</h3>
      <ul class="skill-bars" role="list">
        <li>
          <div class="skill-label">
            <span>Web Development</span>
            <span class="skill-percent">80%</span>
          </div>
          <div class="skill-track" role="progressbar"
               aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"
               aria-label="Web Development proficiency 80%">
            <div class="skill-fill" data-width="80"></div>
          </div>
        </li>
        <!-- SEO 75%, Python 60%, MS Office 70% -->
      </ul>
    </div>
    <div class="skills-category">
      <h3>Professional Skills</h3>
      <ul class="skill-badges" role="list">
        <li class="badge">Problem Solving</li>
        <li class="badge">Analytical Thinking</li>
        <!-- ... remaining 6 badges -->
      </ul>
    </div>
  </div>
</section>
```

**Behavior (SkillBarAnimator):**
```
IntersectionObserver({ threshold: 0.5 }) on #skills section
  → when intersecting: forEach .skill-fill:
      el.style.width = el.dataset.width + '%'
  → observer.unobserve() after first trigger (animate once)
```
- `.skill-fill` CSS transition: `width 800ms ease-in-out`.
- Initial width: `0%` (set in CSS, not inline).

**CSS:**
- `.skills-grid`: `display: grid; grid-template-columns: 1fr 1fr; gap: 2rem` at `> 768px`, `1fr` at `≤ 768px`.
- `.badge`: `display: inline-block; padding: 0.4em 0.9em; border-radius: 2em; background: var(--accent-subtle); border: 1px solid var(--accent)`.

---

### 5. Education Section (`<section id="education">`)

**Markup outline:**
```html
<section id="education" aria-labelledby="education-heading">
  <h2 id="education-heading">Education</h2>
  <ol class="timeline" role="list">
    <li class="timeline-item">
      <div class="timeline-dot" aria-hidden="true"></div>
      <article class="timeline-card">
        <header>
          <div class="timeline-icon" aria-hidden="true">🎓</div>
          <h3>Bachelor of Computer Science</h3>
        </header>
        <p class="timeline-institution">MNSUAM</p>
        <time class="timeline-date" datetime="2022/2026">2022 – 2026</time>
      </article>
    </li>
  </ol>
</section>
```

**CSS (Timeline):**
```css
.timeline {
  position: relative;
  padding-left: 2.5rem;
  list-style: none;
}
.timeline::before {           /* vertical connecting line */
  content: '';
  position: absolute;
  left: 1rem;
  top: 0; bottom: 0;
  width: 2px;
  background: var(--accent);
}
.timeline-dot {
  position: absolute;
  left: calc(1rem - 6px);
  width: 14px; height: 14px;
  border-radius: 50%;
  background: var(--accent);
  border: 2px solid var(--bg);
}
```
- At `≤ 768px`: line stays on left edge; cards are full-width (single column already by design).

---

### 6. Experience Section (`<section id="experience">`)

Structurally identical to the Education section — same `.timeline` CSS class. The card contains an additional `<ul>` for the five bullet-point responsibilities:

```html
<li class="timeline-item">
  <div class="timeline-dot" aria-hidden="true"></div>
  <article class="timeline-card">
    <header>
      <div class="timeline-icon" aria-hidden="true">💼</div>
      <h3>Freelance Web Development &amp; SEO Projects</h3>
    </header>
    <p class="timeline-role">Self-Practice / Academic Projects</p>
    <time class="timeline-date" datetime="2025">2025 – Present</time>
    <ul class="responsibilities">
      <li>Developed and managed basic responsive websites using HTML, CSS, JavaScript, and WordPress</li>
      <!-- four more bullets -->
    </ul>
  </article>
</li>
```

Shares `.timeline`, `.timeline-dot`, `.timeline-card` styles with the Education section for visual consistency.

---

### 7. Contact Section (`<section id="contact">`)

**Markup outline:**
```html
<section id="contact" aria-labelledby="contact-heading">
  <h2 id="contact-heading">Contact</h2>
  <div class="contact-grid">
    <div class="contact-info">
      <p>
        <svg aria-hidden="true"><!-- email icon --></svg>
        <a href="mailto:aqibm8123@gmail.com">aqibm8123@gmail.com</a>
      </p>
      <p>
        <svg aria-hidden="true"><!-- phone icon --></svg>
        <a href="tel:+923375013984">+923375013984</a>
      </p>
      <p>
        <svg aria-hidden="true" focusable="false"><!-- map pin icon (≥16×16) --></svg>
        <span>Multan</span>
      </p>
    </div>
    <form id="contact-form" novalidate aria-label="Contact form">
      <div class="form-group">
        <label for="cf-name">Name <span aria-hidden="true">*</span></label>
        <input id="cf-name" name="name" type="text" required autocomplete="name">
        <span class="field-error" aria-live="polite" id="cf-name-error"></span>
      </div>
      <div class="form-group">
        <label for="cf-email">Email <span aria-hidden="true">*</span></label>
        <input id="cf-email" name="email" type="email" required autocomplete="email">
        <span class="field-error" aria-live="polite" id="cf-email-error"></span>
      </div>
      <div class="form-group">
        <label for="cf-subject">Subject <span aria-hidden="true">*</span></label>
        <input id="cf-subject" name="subject" type="text" required>
        <span class="field-error" aria-live="polite" id="cf-subject-error"></span>
      </div>
      <div class="form-group">
        <label for="cf-message">Message <span aria-hidden="true">*</span></label>
        <textarea id="cf-message" name="message" required minlength="20" rows="5"></textarea>
        <span class="field-error" aria-live="polite" id="cf-message-error"></span>
      </div>
      <button type="submit" id="cf-submit">
        <span class="btn-text">Send Message</span>
        <span class="btn-spinner" aria-hidden="true" hidden></span>
      </button>
      <div id="form-success" role="alert" aria-live="assertive" hidden>
        Thank you! Your message has been received.
      </div>
    </form>
  </div>
</section>
```

**Behavior (ContactFormValidator):**
```
form.addEventListener('submit', e => {
  e.preventDefault()
  clearErrors()
  const errors = validate(form)
  if (errors.length) { renderErrors(errors); return }
  disableSubmit(); showSpinner()
  // simulate async (setTimeout 1000ms) then:
  showSuccess(); resetForm(); enableSubmit(); hideSpinner()
})
```

Validation rules:
| Field   | Rule                                              | Error message                                  |
|---------|---------------------------------------------------|------------------------------------------------|
| name    | non-empty after trim                              | "Name is required."                            |
| email   | non-empty + matches `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | "A valid email address is required."           |
| subject | non-empty after trim                              | "Subject is required."                         |
| message | non-empty + length ≥ 20 after trim                | "Message must be at least 20 characters long." |

---

### 8. Footer (`<footer>`)

```html
<footer>
  <nav aria-label="Footer navigation">
    <ul role="list">
      <li><a href="#hero">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#education">Education</a></li>
      <li><a href="#experience">Experience</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
  <div class="footer-social">
    <a href="mailto:aqibm8123@gmail.com" aria-label="Email M Aqib"><!-- email SVG --></a>
    <a href="tel:+923375013984"          aria-label="Call M Aqib"><!-- phone SVG --></a>
    <span class="social-placeholder" aria-label="LinkedIn – Coming Soon" title="Coming Soon"><!-- LI SVG --></span>
    <span class="social-placeholder" aria-label="GitHub – Coming Soon"   title="Coming Soon"><!-- GH SVG --></span>
  </div>
  <p class="footer-copy">© 2025 M Aqib. All rights reserved.</p>
</footer>
```

---

## Data Models

### Theme State

Stored in `localStorage["theme"]` as a string literal: `"light"` | `"dark"`.

```
ThemeState = "light" | "dark"
```

Applied by setting `data-theme="dark"` (or removing it) on `<html>`. CSS selects:
```css
:root               { /* light defaults */ }
[data-theme="dark"] { /* dark overrides  */ }
```

### CSS Custom Properties (Design Tokens)

```css
:root {
  /* Colors */
  --color-bg:          #ffffff;
  --color-bg-subtle:   #f5f5f5;
  --color-surface:     #ffffff;
  --color-text:        #1a1a2e;
  --color-text-muted:  #555566;
  --color-accent:      #4f46e5;          /* indigo-600 */
  --color-accent-subtle: #ede9fe;        /* indigo-100 */
  --color-border:      #e2e8f0;

  /* Typography */
  --font-sans:         'Segoe UI', system-ui, sans-serif;
  --font-size-base:    clamp(0.875rem, 1.5vw, 1.125rem); /* 14px–18px */
  --line-height-base:  1.6;

  /* Spacing */
  --section-padding:   clamp(3rem, 8vw, 6rem);
  --container-max:     1200px;

  /* Motion */
  --transition-fast:   150ms ease;
  --transition-base:   300ms ease;
  --transition-slow:   800ms ease-in-out;

  /* Shadows */
  --shadow-card:       0 2px 8px rgba(0,0,0,0.08);
  --shadow-nav:        0 1px 4px rgba(0,0,0,0.12);
}

[data-theme="dark"] {
  --color-bg:          #0f0f1a;
  --color-bg-subtle:   #1a1a2e;
  --color-surface:     #1e1e32;
  --color-text:        #e8e8f0;
  --color-text-muted:  #9999bb;
  --color-accent:      #818cf8;          /* indigo-400 */
  --color-accent-subtle: #312e81;        /* indigo-900 */
  --color-border:      #2d2d4e;
}
```

Both palettes maintain a minimum 4.5:1 contrast ratio between `--color-text` and `--color-bg` (WCAG AA).

### Skill Data (in-markup, `data-width` attribute)

| Skill            | data-width |
|------------------|-----------|
| Web Development  | 80        |
| SEO              | 75        |
| Python           | 60        |
| MS Office        | 70        |

### Contact Form State Machine

```
IDLE → SUBMITTING (on submit with valid input)
SUBMITTING → SUCCESS (after simulated async completes)
SUBMITTING → INVALID (on validation failure — re-enters IDLE)
SUCCESS → IDLE (on next user interaction / new form fill)
```

State is reflected in DOM attributes:
- `SUBMITTING`: `button[disabled]`, `.btn-spinner[hidden=false]`
- `SUCCESS`: `#form-success[hidden=false]`, all fields cleared
- `INVALID`: `.field-error` elements populated, `aria-live="polite"` announces errors

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After reviewing all prework classifications, the following properties were identified:

- **1.5** — Nav toggle flips state (PROPERTY)
- **1.6** — Active nav link tracks current section (PROPERTY)
- **4.5** — Skill bar animation sets width from data-width (PROPERTY)
- **7.5** — Valid form submission → success + reset (PROPERTY)
- **7.6** — Invalid form submission → inline errors, no success (PROPERTY)
- **7.7** — Submit button disabled during processing (PROPERTY)
- **9.2** — Theme toggle flips active theme (PROPERTY)
- **9.3** — Theme persists across reload (PROPERTY)
- **9.5** — WCAG contrast ≥ 4.5:1 for all text/bg token pairs (PROPERTY)
- **10.3** — All `<img>` elements have alt attributes (PROPERTY)
- **10.7** — Semantic HTML5 elements used for all content areas (PROPERTY)

**Redundancy analysis:**

- Properties 1.5 and 9.2 are both "toggle flips state" properties. However they test different modules (NavigationManager vs ThemeManager) and different state (open/closed vs light/dark) — no redundancy, keep both.
- Properties 7.5 and 7.6 cover complementary paths (valid vs invalid) of the same form — they are distinct and together constitute a complete partition of input space. Keep both.
- Property 7.7 (button disabled during submit) is implicitly part of 7.5 (valid path) — but it also applies during any submission attempt and is important enough to stand alone as a state machine property. Keep it.
- Properties 9.2 and 9.3 are complementary: 9.2 tests the toggle action; 9.3 tests persistence. Keep both.
- Properties 10.3 and 10.7 test different aspects of DOM structure. No redundancy.

Final property list (11 → 11, no eliminations needed as each property provides unique validation value):

---

### Property 1: Nav toggle inverts open/closed state

*For any* current state of the mobile navigation overlay (open or closed), activating the hamburger button should result in the opposite state: a closed overlay should become open, and an open overlay should become closed.

**Validates: Requirements 1.5**

---

### Property 2: Active nav link matches current section

*For any* section reported as intersecting by the IntersectionObserver, exactly the navigation link corresponding to that section's ID should have the `.active` class applied, and no other navigation link should have `.active`.

**Validates: Requirements 1.6**

---

### Property 3: Skill bar width equals declared proficiency

*For any* collection of `.skill-fill` elements with valid `data-width` attribute values (integers 0–100), after the SkillBarAnimator's IntersectionObserver callback fires, each element's `style.width` should equal `data-width + '%'`.

**Validates: Requirements 4.5**

---

### Property 4: Valid form submission produces success state

*For any* combination of valid contact form inputs — a non-empty name, a syntactically valid email address, a non-empty subject, and a message of at least 20 characters — submitting the form should result in the success confirmation message becoming visible, all four form fields being cleared to empty, and the submit button being re-enabled.

**Validates: Requirements 7.5**

---

### Property 5: Invalid form submission produces field-specific errors

*For any* form submission where at least one field violates its constraint (empty required field, invalid email format, or message shorter than 20 characters), the form should display an inline error message directly beneath each violating field, the success message should remain hidden, and the form fields should retain their current values.

**Validates: Requirements 7.6**

---

### Property 6: Submit button is disabled during async processing

*For any* valid form submission that enters the processing (SUBMITTING) state, the submit button should have its `disabled` attribute set and the loading spinner should be visible for the entire duration between the submit event and the final success/reset state transition.

**Validates: Requirements 7.7**

---

### Property 7: Theme toggle inverts current theme

*For any* current theme state (`"light"` or `"dark"`), activating the Theme_Toggle control should result in the opposite theme being applied to `<html>` (via `data-theme` attribute) and the new theme being stored in `localStorage["theme"]`.

**Validates: Requirements 9.2**

---

### Property 8: Theme preference round-trip through localStorage

*For any* theme value stored in `localStorage["theme"]` (`"light"` or `"dark"`), when ThemeManager initializes (simulating a page load), the `data-theme` attribute on `<html>` should match the stored value exactly.

**Validates: Requirements 9.3**

---

### Property 9: WCAG contrast ratio for all text/background token pairs

*For any* (text color token, background color token) pair defined in the CSS custom properties for both light mode and dark mode, the WCAG 2.1 relative luminance contrast ratio between those two colors should be greater than or equal to 4.5:1.

**Validates: Requirements 9.5**

---

### Property 10: All informative images have non-empty alt attributes

*For any* `<img>` element in the rendered DOM that is not decorative, the element's `alt` attribute should be present and non-empty; for any `<img>` that is decorative, the `alt` attribute should be present and empty (`alt=""`).

**Validates: Requirements 10.3**

---

### Property 11: Semantic HTML5 elements used for all content areas

*For any* major content area defined in the design (site header, primary navigation, main content wrapper, each of the six sections, footer, and timeline articles), the corresponding semantic HTML5 element (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`) should be present in the DOM — not a generic `<div>` — for that structural role.

**Validates: Requirements 10.7**

---

## Error Handling

### CV Download Unavailability

When the CV PDF is not present at `assets/cv.pdf`, the About section's download button is placed in a disabled state:
- `aria-disabled="true"` is set on the `<a>` element (converted to a `<button>` with JS if download cannot be triggered).
- Button text changes to "CV Unavailable".
- A `pointer-events: none` CSS rule prevents accidental interaction.

Detection uses `fetch('assets/cv.pdf', { method: 'HEAD' })`. On failure (network error or non-2xx), the button is disabled. This check runs once on `DOMContentLoaded`.

### Avatar Image Fallback

If `assets/avatar.jpg` fails to load (404 or network error), the `<img>` element's `onerror` handler clones and inserts the `<template id="avatar-placeholder">` node, showing the "MA" initials placeholder. The fallback is CSS-only styled (`border-radius: 50%`, centered flex layout).

### Contact Form — No Backend

The form performs client-side validation only. On successful validation, a `setTimeout(1000)` simulates an async submission. No actual HTTP request is made. The success state is purely cosmetic — the user sees a confirmation message. This is clearly documented in code comments.

### JavaScript Errors

All JS modules are wrapped in a top-level `try/catch` to prevent one failing module from breaking others. Errors are logged to `console.error`. The page remains functional without JS (CSS-only responsive layout, semantic HTML readable, links navigable via anchor hash).

### Theme Initialization

If `localStorage` is unavailable (e.g., private browsing with storage blocked), `ThemeManager` catches the error and falls back to `prefers-color-scheme`. This prevents the page from being stuck in the wrong theme or throwing an uncaught error.

---

## Testing Strategy

### Overview

This is a vanilla JS, no-framework project. The appropriate testing stack is:

- **Unit/Property tests**: [Vitest](https://vitest.dev/) (zero-config, fast, ESM-native) + [fast-check](https://github.com/dubzzz/fast-check) for property-based testing.
- **DOM tests**: [jsdom](https://github.com/jsdom/jsdom) (bundled with Vitest) for testing JavaScript modules that manipulate DOM.
- **Manual / audit tests**: Chrome DevTools Lighthouse for performance and accessibility scores.

### Test File Structure

```
portfolio/
├── tests/
│   ├── theme.test.js          # ThemeManager unit + property tests
│   ├── navigation.test.js     # NavigationManager unit + property tests
│   ├── skillBar.test.js       # SkillBarAnimator property tests
│   ├── contactForm.test.js    # ContactFormValidator property tests
│   ├── contrast.test.js       # WCAG contrast property tests
│   └── dom.test.js            # Semantic HTML + alt attribute property tests
├── vitest.config.js
└── package.json
```

### Unit Tests

Unit tests cover concrete examples and edge cases:
- Navigation renders all six section links.
- Hero section has correct heading text and CTA hrefs.
- About section displays correct bio text, contact details, and labels.
- Skills section assigns each skill to the correct category with the correct `data-width`.
- Education and Experience entries contain all required fields.
- Footer copyright text and all six anchor links.
- Theme: OS dark preference applied on first visit (no localStorage key).
- CV button disabled state when fetch returns 404.
- Avatar fallback renders initials when image onerror fires.
- Contact form: empty name → shows "Name is required." error.
- Contact form: invalid email → shows email error.
- Contact form: message < 20 chars → shows message error.

### Property-Based Tests

Each property test runs a minimum of **100 iterations**. Each test is annotated with a comment referencing the design property it validates:
`// Feature: aqib-portfolio, Property N: <property text>`

| Test | Property | Library |
|------|----------|---------|
| Nav toggle inverts state | Property 1 | fast-check `fc.boolean()` |
| Active link matches section | Property 2 | fast-check `fc.constantFrom(...sectionIds)` |
| Skill bar width = data-width | Property 3 | fast-check `fc.integer({min:0, max:100})` |
| Valid form → success + reset | Property 4 | fast-check `fc.record({name: fc.string({minLength:1}), email: fc.emailAddress(), subject: fc.string({minLength:1}), message: fc.string({minLength:20})})` |
| Invalid form → field errors | Property 5 | fast-check generators producing at least one invalid field |
| Submit disabled during processing | Property 6 | fast-check `fc.record(...)` for valid inputs |
| Theme toggle inverts | Property 7 | fast-check `fc.constantFrom('light', 'dark')` |
| Theme localStorage round-trip | Property 8 | fast-check `fc.constantFrom('light', 'dark')` |
| WCAG contrast ≥ 4.5:1 | Property 9 | fast-check `fc.constantFrom(...colorPairs)` |
| Alt attributes on images | Property 10 | fast-check generates DOM with varying img counts |
| Semantic elements for content areas | Property 11 | fast-check `fc.constantFrom(...contentAreas)` |

### Accessibility Testing

- Automated: `axe-core` assertions run in Vitest/jsdom on the full `index.html` markup.
- Manual: Keyboard Tab-order walkthrough; screen reader spot-check (NVDA or macOS VoiceOver).
- Lighthouse: Target Accessibility score ≥ 90 (logged in audit report).

### Performance Testing

- Lighthouse Performance ≥ 85 measured in Chrome DevTools (Fast 3G, 4× CPU throttle).
- No external JS libraries loaded in production (only in test environment).
- All images include explicit `width`/`height` attributes to avoid CLS.

### Responsive Layout Testing

- Manual cross-device testing at: 320px, 375px, 768px, 1024px, 1280px, 1920px.
- Automated: CSS media query breakpoint assertions using `window.matchMedia` mocks in Vitest.
