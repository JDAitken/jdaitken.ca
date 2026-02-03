// Chatbot placeholders kept modular for future API wiring.
(() => {
  const nav = document.querySelector('[data-nav]');
  const navLinks = document.querySelector('[data-nav-links]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const mobileBreakpoint = window.matchMedia('(max-width: 820px)');

  // Placeholder chatbot module: wire API + UI later.
  const Chatbot = (() => {
    const state = { enabled: false, messages: [] };

    const init = () => {
      // Keep lightweight for now; hook OpenAI-style API here later.
      return state;
    };

    const sendMessage = async (message) => {
      if (!state.enabled) {
        return { status: 'disabled', reply: 'Chatbot coming soon.' };
      }
      state.messages.push({ role: 'user', content: message });
      return { status: 'stubbed', reply: 'Pending API connection.' };
    };

    return { init, sendMessage };
  })();

  const Navigation = (() => {
    const isMobile = () => mobileBreakpoint.matches;

    const setNavState = (open) => {
      if (!nav) return;
      nav.setAttribute('data-nav-open', open ? 'true' : 'false');
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
    };

    const closeNav = () => setNavState(false);
    const toggleNav = () => {
      const open = nav?.getAttribute('data-nav-open') === 'true';
      setNavState(!open);
    };

    const handleClickOutside = (event) => {
      if (!nav || !isMobile()) return;
      if (!nav.contains(event.target)) {
        closeNav();
      }
    };

    const bind = () => {
      if (!nav || !navToggle || !navLinks) return;
      setNavState(false);
      navToggle.addEventListener('click', () => {
        if (!isMobile()) return;
        toggleNav();
      });
      navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          if (isMobile()) closeNav();
        });
      });
      document.addEventListener('click', handleClickOutside);
      mobileBreakpoint.addEventListener?.('change', () => {
        if (!isMobile()) {
          setNavState(false);
        }
      });
    };

    const setActiveLink = () => {
      if (!navLinks) return;
      const normalize = (path) => {
        const withoutIndex = path.replace(/\/index\.html$/, '');
        const trimmed = withoutIndex.replace(/\/$/, '');
        return trimmed.length ? trimmed : '/';
      };
      const currentPath = normalize(window.location.pathname);
      navLinks.querySelectorAll('a').forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) return;
        if (href.startsWith('http') || href.startsWith('mailto')) return;
        const linkPath = normalize(new URL(href, window.location.origin).pathname);
        if (linkPath === currentPath) {
          link.classList.add('active');
        }
      });
    };

    return { bind, setActiveLink };
  })();

  const ContactForm = (() => {
    const init = () => {
      const form = document.querySelector('[data-contact-form]');
      const status = document.querySelector('[data-form-status]');
      if (!form) return;

      if (status) {
        const params = new URLSearchParams(window.location.search);
        if (params.get('error') === '1') {
          status.textContent = 'Something went wrong. Please try again or email jd@jdaitken.ca directly.';
          status.classList.add('is-visible', 'is-error');
        }
      }

      form.addEventListener('submit', () => {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (!submitBtn) return;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
      });
    };

    return { init };
  })();

  document.addEventListener('DOMContentLoaded', () => {
    Navigation.bind();
    Navigation.setActiveLink();
    Chatbot.init();
    ContactForm.init();
    (() => {
      const normalizeUrl = (value) => {
        const v = (value || '').trim();
        if (!v) return '';
        if (/^https?:\/\//i.test(v)) return v;
        return `https://${v}`;
      };

      const storeKey = 'jd_audit_website';
      const heroInput = document.getElementById('hero-website');
      const heroForm = document.querySelector('[data-hero-form]');
      const contactInput = document.getElementById('website');

      if (heroInput) {
        heroInput.addEventListener('blur', () => {
          heroInput.value = normalizeUrl(heroInput.value);
        });
      }

      if (heroForm && heroInput) {
        heroForm.addEventListener('submit', (event) => {
          event.preventDefault();
          const normalized = normalizeUrl(heroInput.value);
          if (normalized) {
            localStorage.setItem(storeKey, normalized);
          }
          const target = normalized
            ? `/contact.html?website=${encodeURIComponent(normalized)}`
            : '/contact.html';
          window.location.href = target;
        });
      }

      if (contactInput) {
        const params = new URLSearchParams(window.location.search);
        const paramValue = params.get('website');
        const storedValue = localStorage.getItem(storeKey);
        const initialValue = paramValue || storedValue;
        if (initialValue) {
          contactInput.value = normalizeUrl(initialValue);
        }

        contactInput.addEventListener('blur', () => {
          contactInput.value = normalizeUrl(contactInput.value);
        });

        const form = contactInput.closest('form');
        if (form) {
          form.addEventListener('submit', () => {
            contactInput.value = normalizeUrl(contactInput.value);
            if (contactInput.value) {
              localStorage.setItem(storeKey, contactInput.value);
            }
          });
        }
      }
    })();
  });
})();
