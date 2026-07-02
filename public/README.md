# assets/

This directory holds static assets referenced by the portfolio site.

## Required files

### `cv.pdf`

Place Aqib's CV as a PDF file here (`assets/cv.pdf`).

- The **Download CV** button in the About section will trigger a direct download of this file.
- If the file is absent (or cannot be fetched), the button will automatically change its label to **"CV Unavailable"** and be placed in a disabled state so visitors are not shown a broken link.

### `avatar.jpg`

Place a profile photo here (`assets/avatar.jpg`).

- The photo is displayed as a circular 160 × 160 px image in the About section.
- If the file is absent or fails to load, the site will automatically show the initials placeholder **"MA"** instead — no broken image icon will appear.

## Notes

- Both files are optional at deploy time; the site degrades gracefully without them.
- Supported photo formats: JPEG (`.jpg` / `.jpeg`), PNG (`.png`), or WebP (`.webp`) — rename the file to `avatar.jpg` regardless of the original format.
- Keep file sizes reasonable for fast page loads: CV PDF ≤ 5 MB, avatar image ≤ 200 KB (optimised).
