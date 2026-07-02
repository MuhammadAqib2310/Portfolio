# Requirements Document

## Introduction

This document defines the requirements for a modern, responsive personal portfolio website for M Aqib, a Computer Science student at MNSUAM with expertise in web development, SEO, and Python programming. The website will serve as a professional online presence showcasing Aqib's skills, education, experience, and projects. It targets potential employers, clients, and collaborators who visit the site to evaluate Aqib's technical abilities and professional background.

## Glossary

- **Portfolio_Site**: The complete personal portfolio website for M Aqib
- **Hero_Section**: The top-most visible section of the homepage featuring the subject's name, title, and call-to-action
- **Navigation**: The site-wide menu component allowing visitors to move between sections
- **About_Section**: The section presenting Aqib's personal introduction and professional summary
- **Skills_Section**: The section displaying categorized technical and soft skills
- **Education_Section**: The section listing academic background and qualifications
- **Experience_Section**: The section detailing work history and project experience
- **Contact_Section**: The section providing contact information and a contact form
- **Contact_Form**: The interactive HTML form through which visitors can send messages to Aqib
- **Theme_Toggle**: The UI control that switches between light and dark color modes
- **Responsive_Layout**: A layout that adapts gracefully to screen widths from 320px to 2560px
- **Visitor**: Any person accessing the Portfolio_Site via a web browser
- **Smooth_Scroll**: Animated page scrolling behavior when navigating to in-page sections
- **Skill_Bar**: A visual progress indicator representing proficiency level for a given skill

---

## Requirements

### Requirement 1: Site Structure and Navigation

**User Story:** As a Visitor, I want to navigate the portfolio site easily, so that I can quickly find the information I am looking for.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL contain the following top-level sections in order: Hero, About, Skills, Education, Experience, and Contact.
2. WHILE the viewport width is greater than 768px, THE Navigation SHALL display links to all six sections simultaneously in a horizontal bar.
3. WHEN a Visitor clicks a Navigation link, THE Portfolio_Site SHALL animate a continuous scroll to the target section within 500ms.
4. WHEN the viewport width is 768px or less, THE Navigation SHALL collapse into a hamburger menu icon and hide all section links.
5. WHEN a Visitor taps the hamburger menu icon, THE Navigation SHALL expand to show all section links as a full-width dropdown overlay; WHEN a Visitor taps any section link or taps outside the overlay, THE Navigation SHALL collapse the overlay.
6. WHEN a section occupies the majority of the viewport (more than 50% of the visible height), THE Navigation SHALL apply a visually distinct style (e.g., underline, bold, or accent color) to the corresponding link.
7. THE Navigation SHALL remain fixed at the top of the viewport during scrolling.

---

### Requirement 2: Hero Section

**User Story:** As a Visitor, I want to see a compelling introduction immediately upon landing, so that I can quickly understand who Aqib is and what he offers.

#### Acceptance Criteria

1. THE Hero_Section SHALL display the full name "M Aqib" as the primary heading using a font size of at least 48px on viewports 1024px and wider, and at least 32px on viewports narrower than 1024px.
2. THE Hero_Section SHALL display the title "Computer Science Student & Web Developer" as a subtitle beneath the name.
3. THE Hero_Section SHALL include a tagline of no more than 20 words summarizing Aqib's focus areas: web development, SEO, and Python.
4. THE Hero_Section SHALL include a primary call-to-action button labeled "View My Work" that, WHEN clicked, SHALL animate a continuous scroll to the Experience_Section.
5. THE Hero_Section SHALL include a secondary call-to-action button labeled "Contact Me" that, WHEN clicked, SHALL animate a continuous scroll to the Contact_Section.
6. THE Hero_Section SHALL occupy at least 100vh height on initial page load so that no other section is visible above the fold.
7. WHEN the page finishes loading, THE Hero_Section SHALL display a fade-in transition for the name and subtitle elements with a duration between 400ms and 800ms.

---

### Requirement 3: About Section

**User Story:** As a Visitor, I want to read a professional summary about Aqib, so that I can understand his background, goals, and personality.

#### Acceptance Criteria

1. THE About_Section SHALL display the full "About Me" text: "A motivated and detail-oriented computer science student with a strong interest in web development, SEO, and Python programming. Skilled in problem-solving, analytical thinking, and creating practical projects using modern technologies. Passionate about learning new digital skills and applying them to real-world challenges. Seeking an opportunity to contribute my technical abilities and grow professionally in a dynamic organization."
2. THE About_Section SHALL display a professional avatar image or, when no photo is provided, a circular placeholder of at least 80×80px containing the centered initials "MA".
3. THE About_Section SHALL display each of the following personal details as a labeled item (label + value as distinct text): Location: Multan; Email: aqibm8123@gmail.com; Phone: +923375013984.
4. THE About_Section SHALL include a downloadable CV button that triggers a browser download of a PDF file; IF the PDF file is unavailable, THE About_Section SHALL display the button in a disabled state with a visible "Unavailable" label.
5. WHILE the viewport width is greater than 768px, THE About_Section SHALL display the avatar and text content side by side in a two-column layout.
6. WHEN the viewport width is 768px or less, THE About_Section SHALL stack the avatar and text content vertically in a single column.

---

### Requirement 4: Skills Section

**User Story:** As a Visitor, I want to see Aqib's skills organized clearly, so that I can quickly assess whether his abilities match my needs.

#### Acceptance Criteria

1. THE Skills_Section SHALL display all twelve skills from Aqib's CV, organized into two categories: "Technical Skills" and "Professional Skills".
2. THE Skills_Section SHALL assign the following skills to the "Technical Skills" category: Web Development (HTML, CSS, JavaScript, WordPress), Search Engine Optimization (SEO), Basic Python Programming, MS Word/Excel/PowerPoint.
3. THE Skills_Section SHALL assign the following skills to the "Professional Skills" category: Problem Solving, Analytical Thinking, Critical Thinking, Teamwork and Collaboration, Communication Skills, Time Management, Fast Learning Ability, Project Management Basics.
4. THE Skills_Section SHALL render each Technical Skill with a Skill_Bar showing the following proficiency percentages: Web Development 80%, SEO 75%, Python 60%, MS Office 70%.
5. WHEN a Visitor scrolls so that the Skills_Section occupies more than 50% of the viewport height, THE Skill_Bar SHALL animate from 0% to the target proficiency width with a transition duration between 600ms and 1000ms.
6. THE Skills_Section SHALL display Professional Skills as styled badge elements with a visible background color and border radius, distinct from body text.
7. WHILE the viewport width is greater than 768px, THE Skills_Section SHALL display the two skill categories side by side in a two-column layout.
8. WHEN the viewport width is 768px or less, THE Skills_Section SHALL display skill categories in a single column layout.

---

### Requirement 5: Education Section

**User Story:** As a Visitor, I want to view Aqib's academic background, so that I can evaluate his qualifications.

#### Acceptance Criteria

1. THE Education_Section SHALL display the degree entry: "Bachelor of Computer Science" at "MNSUAM" for the period "2022 – 2026".
2. THE Education_Section SHALL present education entries in a vertical timeline layout with a visible connecting line of at least 2px width.
3. THE Education_Section SHALL display each education entry with: degree name, institution name, date range, and an institution icon or logo placeholder of at least 32×32px.
4. IF additional education entries are added in the future, THE Education_Section SHALL accommodate them within the same timeline layout without any element overlapping or exceeding the container width.
5. WHEN the viewport width is 768px or less, THE Education_Section SHALL display the timeline in a single-column left-aligned format with the connecting line on the left edge.

---

### Requirement 6: Experience Section

**User Story:** As a Visitor, I want to review Aqib's work and project experience, so that I can assess his practical capabilities.

#### Acceptance Criteria

1. THE Experience_Section SHALL display the experience entry: "Freelance Web Development & SEO Projects" under the role type "Self-Practice / Academic Projects" for the period "2025 – Present".
2. THE Experience_Section SHALL display all five bullet-point responsibilities for the experience entry as an unordered list:
   - Developed and managed basic responsive websites using HTML, CSS, JavaScript, and WordPress
   - Performed SEO keyword research, on-page optimization, and content structuring for better search visibility
   - Improved website performance, page speed, and user experience through optimization techniques
   - Worked on basic Python projects and automation tasks for learning and problem-solving purposes
   - Collaborated on academic and personal projects with strong focus on quality and timely delivery
3. THE Experience_Section SHALL present experience entries in a vertical timeline layout visually consistent with the Education_Section timeline (same line width, color, and dot marker style).
4. IF additional experience entries are added in the future, THE Experience_Section SHALL accommodate them within the same timeline layout without any element overlapping or exceeding the container width.
5. WHEN the viewport width is 768px or less, THE Experience_Section SHALL display entries in a single-column left-aligned format with the connecting line on the left edge.

---

### Requirement 7: Contact Section

**User Story:** As a Visitor, I want to get in touch with Aqib easily, so that I can reach out for opportunities or collaborations.

#### Acceptance Criteria

1. THE Contact_Section SHALL display Aqib's email address (aqibm8123@gmail.com) as a clickable mailto link that opens the default mail client with the address pre-filled.
2. THE Contact_Section SHALL display Aqib's phone number (+923375013984) as a clickable tel link that initiates a call on supported devices.
3. THE Contact_Section SHALL display Aqib's location (Multan) as static text accompanied by a map pin icon of at least 16×16px.
4. THE Contact_Section SHALL include a Contact_Form with the following fields: Name (text input, required), Email (email input, required), Subject (text input, required), and Message (textarea, required, minimum 20 characters).
5. WHEN a Visitor submits the Contact_Form with all required fields populated and a valid email format, THE Contact_Form SHALL display a success confirmation message within the form area and reset all fields to empty.
6. IF a Visitor submits the Contact_Form with one or more required fields empty, or with an invalid email format, or with a Message shorter than 20 characters, THEN THE Contact_Form SHALL display an inline validation error message directly beneath each invalid field describing the specific error.
7. WHEN a Visitor clicks the submit button, THE Contact_Form SHALL disable the submit button and display a loading indicator until the submission process completes or fails.

---

### Requirement 8: Responsive Design

**User Story:** As a Visitor using any device, I want the portfolio to display correctly on my screen, so that I have a good browsing experience regardless of device type.

#### Acceptance Criteria

1. THE Responsive_Layout SHALL render the Portfolio_Site at viewport widths of 320px, 375px, 768px, 1024px, 1280px, and 1920px with no content overflowing its container, no elements overlapping each other, and no clipped text.
2. THE Portfolio_Site SHALL use fluid typography with a minimum body font size of 14px on 320px viewports and a maximum of 18px on viewports wider than 1280px.
3. THE Portfolio_Site SHALL not produce a horizontal scrollbar at any supported viewport width.
4. THE Portfolio_Site SHALL ensure all interactive elements (buttons, links, form inputs) have a minimum touch target size of 44px × 44px on viewports 768px wide and narrower.
5. THE Portfolio_Site SHALL use CSS media queries with breakpoints at 480px, 768px, 1024px, and 1280px to adapt the layout.

---

### Requirement 9: Dark Mode and Theming

**User Story:** As a Visitor, I want to switch between light and dark color schemes, so that I can view the portfolio comfortably in different lighting conditions.

#### Acceptance Criteria

1. WHILE the Portfolio_Site is loaded, THE Navigation SHALL display the Theme_Toggle button at all times regardless of viewport width.
2. WHEN a Visitor activates the Theme_Toggle, THE Portfolio_Site SHALL switch the entire site color scheme between light mode and dark mode within 300ms using a CSS transition applied to background-color and color properties.
3. THE Portfolio_Site SHALL persist the Visitor's theme preference in browser localStorage under the key "theme"; WHEN a Visitor returns to the site, THE Portfolio_Site SHALL read this key and apply the stored theme before rendering visible content.
4. WHEN a Visitor visits the Portfolio_Site for the first time and no localStorage "theme" key is present, THE Portfolio_Site SHALL apply the theme matching the Visitor's OS color scheme via the CSS prefers-color-scheme media query.
5. THE Portfolio_Site SHALL maintain a minimum contrast ratio of 4.5:1 between all body text and their background colors in both light and dark modes, as measured by the WCAG 2.1 contrast formula.

---

### Requirement 10: Performance and Accessibility

**User Story:** As a Visitor, I want the portfolio to load quickly and be accessible, so that I can use it efficiently regardless of my connection speed or accessibility needs.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL achieve a Lighthouse Performance score of 85 or above when audited in Chrome DevTools on a simulated fast 3G connection with CPU throttling 4×.
2. THE Portfolio_Site SHALL achieve a Lighthouse Accessibility score of 90 or above under the same audit conditions.
3. THE Portfolio_Site SHALL include a non-empty descriptive alt attribute on every informative image; decorative images SHALL use an empty alt attribute (alt="").
4. THE Portfolio_Site SHALL ensure all interactive elements are reachable by pressing Tab in a logical DOM order matching the visual reading order, and reachable in reverse order by pressing Shift+Tab.
5. WHEN a keyboard user moves focus to an interactive element, THE Portfolio_Site SHALL display a focus ring with a minimum outline width of 2px and a contrast ratio of at least 3:1 between the ring color and the adjacent background color.
6. THE Portfolio_Site SHALL include a `<meta name="description">` tag containing Aqib's name and profession, and a `<title>` tag in the format "M Aqib | Computer Science Student & Web Developer".
7. THE Portfolio_Site SHALL use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`) to structure content, with no `<div>` used in place of a semantic equivalent.

---

### Requirement 11: Footer

**User Story:** As a Visitor, I want to see consistent branding and social links at the bottom of the page, so that I can find additional ways to connect with Aqib.

#### Acceptance Criteria

1. THE Portfolio_Site SHALL include a `<footer>` element rendered below the Contact_Section and visible on all viewport widths.
2. THE Portfolio_Site footer SHALL display the copyright notice "© 2025 M Aqib. All rights reserved." as static text.
3. THE Portfolio_Site footer SHALL include anchor links to all six main sections (Hero, About, Skills, Education, Experience, Contact) that perform Smooth_Scroll to the respective section when clicked.
4. THE Portfolio_Site footer SHALL display a clickable email icon linking to mailto:aqibm8123@gmail.com, a clickable phone icon linking to tel:+923375013984, and visible but non-interactive placeholder icons for LinkedIn and GitHub each labeled "Coming Soon".
5. WHEN a Visitor clicks the email icon in the footer, THE Portfolio_Site SHALL open the default mail client with aqibm8123@gmail.com pre-filled as the recipient address.
6. WHEN a Visitor clicks the phone icon in the footer, THE Portfolio_Site SHALL initiate a call to +923375013984 on devices that support the tel: protocol.
