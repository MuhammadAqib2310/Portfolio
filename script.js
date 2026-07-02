/**
 * script.js — Portfolio interactivity module
 * ES2020, no transpilation required.
 * All modules are wrapped in try/catch so one failing module
 * cannot break others. The page remains functional without JS.
 */

// ---------------------------------------------------------------------------
// ThemeManager
// Reads/writes localStorage + prefers-color-scheme
// ---------------------------------------------------------------------------
export const ThemeManager = {
  init() {
    const html         = document.documentElement;
    const toggleBtn    = document.querySelector('.theme-toggle');

    // The inline script in <head> already set data-theme before the stylesheet
    // loaded (FOUC prevention). On DOMContentLoaded we only need to:
    //   1. Sync aria-pressed on the toggle button to match the current theme.
    //   2. Attach the click handler.

    function getCurrentTheme() {
      return html.getAttribute('data-theme') || 'light';
    }

    function applyTheme(theme) {
      html.setAttribute('data-theme', theme);
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      }
      try {
        localStorage.setItem('theme', theme);
      } catch (e) {
        // localStorage unavailable (e.g. private browsing) — silently ignore
      }
    }

    // Sync aria-pressed to whatever theme the inline script already set
    if (toggleBtn) {
      const currentTheme = getCurrentTheme();
      toggleBtn.setAttribute('aria-pressed', currentTheme === 'dark' ? 'true' : 'false');

      // Toggle handler: invert the current theme
      toggleBtn.addEventListener('click', () => {
        const next = getCurrentTheme() === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    }
  },
};

// ---------------------------------------------------------------------------
// NavigationManager
// Hamburger toggle, active-link tracking via IntersectionObserver
// ---------------------------------------------------------------------------
export const NavigationManager = {
  init() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks  = document.getElementById('nav-links');

    if (!hamburger || !navLinks) return;

    // --- Helpers -----------------------------------------------------------

    function openMenu() {
      navLinks.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close menu');
    }

    function closeMenu() {
      navLinks.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
    }

    function isOpen() {
      return navLinks.classList.contains('is-open');
    }

    // --- Hamburger toggle --------------------------------------------------

    hamburger.addEventListener('click', () => {
      isOpen() ? closeMenu() : openMenu();
    });

    // --- Click outside: close overlay -------------------------------------

    document.addEventListener('click', (e) => {
      if (!isOpen()) return;
      // Close when the click is outside both the nav list and the hamburger
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on nav-link click (tap any section link closes the overlay)
    navLinks.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        closeMenu();
      }
    });

    // --- Active-link tracking via IntersectionObserver --------------------

    const sectionIds = ['hero', 'about', 'skills', 'education', 'experience', 'contact'];
    const navAnchors = Array.from(navLinks.querySelectorAll('a[href]'));

    function setActiveLink(sectionId) {
      navAnchors.forEach((a) => {
        const hash = a.getAttribute('href').replace(/^.*#/, '#');
        if (hash === `#${sectionId}`) {
          a.classList.add('active');
        } else {
          a.classList.remove('active');
        }
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  },
};

// ---------------------------------------------------------------------------
// ScrollManager
// Smooth-scroll for CTA buttons and anchor links
// ---------------------------------------------------------------------------
export const ScrollManager = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const hash = anchor.getAttribute('href');
        // Ignore bare "#" links with no target id
        if (!hash || hash === '#') return;
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  },
};

// ---------------------------------------------------------------------------
// SkillBarAnimator
// IntersectionObserver on #skills section → animates .skill-fill widths
// ---------------------------------------------------------------------------
export const SkillBarAnimator = {
  init() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-fill').forEach((el) => {
              el.style.width = el.dataset.width + '%';
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(skillsSection);
  },
};

// ---------------------------------------------------------------------------
// ContactFormValidator
// Client-side validation + simulated async submission + success state
// ---------------------------------------------------------------------------
export const ContactFormValidator = {
  init() {
    const form       = document.getElementById('contact-form');
    if (!form) return;

    const nameInput    = document.getElementById('cf-name');
    const emailInput   = document.getElementById('cf-email');
    const subjectInput = document.getElementById('cf-subject');
    const messageInput = document.getElementById('cf-message');
    const nameError    = document.getElementById('cf-name-error');
    const emailError   = document.getElementById('cf-email-error');
    const subjectError = document.getElementById('cf-subject-error');
    const messageError = document.getElementById('cf-message-error');
    const submitBtn    = document.getElementById('cf-submit');
    const btnText      = submitBtn && submitBtn.querySelector('.btn-text');
    const btnSpinner   = submitBtn && submitBtn.querySelector('.btn-spinner');
    const formSuccess  = document.getElementById('form-success');

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear all previous errors
      [nameError, emailError, subjectError, messageError].forEach((el) => {
        if (el) el.textContent = '';
      });

      const name    = nameInput    ? nameInput.value.trim()    : '';
      const email   = emailInput   ? emailInput.value.trim()   : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      let hasError = false;

      if (!name) {
        if (nameError) nameError.textContent = 'Name is required.';
        hasError = true;
      }

      if (!EMAIL_RE.test(email)) {
        if (emailError) emailError.textContent = 'Please enter a valid email address.';
        hasError = true;
      }

      if (!subject) {
        if (subjectError) subjectError.textContent = 'Subject is required.';
        hasError = true;
      }

      if (message.length < 20) {
        if (messageError) messageError.textContent = 'Message must be at least 20 characters.';
        hasError = true;
      }

      if (hasError) return;

      // Valid — simulate async submission
      if (submitBtn) submitBtn.disabled = true;
      if (btnSpinner) btnSpinner.removeAttribute('hidden');
      if (btnText)    btnText.textContent = 'Sending...';

      setTimeout(() => {
        if (formSuccess) formSuccess.removeAttribute('hidden');
        form.reset();
        if (submitBtn) submitBtn.disabled = false;
        if (btnSpinner) btnSpinner.setAttribute('hidden', '');
        if (btnText)    btnText.textContent = 'Send Message';
      }, 1000);
    });
  },
};

// ---------------------------------------------------------------------------
// HeroAnimator
// Adds .animate-in class on DOMContentLoaded to trigger CSS keyframes
// ---------------------------------------------------------------------------
export const HeroAnimator = {
  init() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.classList.add('animate-in');
    }
  },
};

// ---------------------------------------------------------------------------
// AboutManager
// Checks cv.pdf availability via HEAD request; disables button if absent
// ---------------------------------------------------------------------------
export const AboutManager = {
  init() {
    const btn = document.getElementById('cv-download');
    if (!btn) return;

    fetch('assets/cv.pdf', { method: 'HEAD' })
      .then((response) => {
        if (!response.ok) {
          btn.setAttribute('aria-disabled', 'true');
          btn.textContent = 'CV Unavailable';
        }
      })
      .catch(() => {
        btn.setAttribute('aria-disabled', 'true');
        btn.textContent = 'CV Unavailable';
      });
  },
};

// ---------------------------------------------------------------------------
// Bootstrap — run all modules on DOMContentLoaded
// Each initializer is isolated in its own try/catch so a failure in one
// module does not prevent the remaining modules from initialising.
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  try { ThemeManager.init(); }         catch (e) { console.error('ThemeManager:', e); }
  try { NavigationManager.init(); }    catch (e) { console.error('NavigationManager:', e); }
  try { ScrollManager.init(); }        catch (e) { console.error('ScrollManager:', e); }
  try { SkillBarAnimator.init(); }     catch (e) { console.error('SkillBarAnimator:', e); }
  try { ContactFormValidator.init(); } catch (e) { console.error('ContactFormValidator:', e); }
  try { HeroAnimator.init(); }         catch (e) { console.error('HeroAnimator:', e); }
  try { AboutManager.init(); }         catch (e) { console.error('AboutManager:', e); }
});
