(() => {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const mobileMenu = document.querySelector('#mobile-menu');
  const menuPanel = document.querySelector('[data-menu-panel]');
  const menuCloseBtn = document.querySelector('.mobile-menu-close');
  const mobileBreakpoint = window.matchMedia('(max-width: 767px)');

  const Navigation = (() => {
    const isMobile = () => mobileBreakpoint.matches;
    let lastFocused = null;
    let previousOverflow = '';

    const getFocusable = () => {
      if (!mobileMenu) return [];
      return Array.from(
        mobileMenu.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      );
    };

    const setMenuState = (open) => {
      if (!mobileMenu) return;
      mobileMenu.classList.toggle('is-open', open);
      mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
      if (open) {
        lastFocused = document.activeElement;
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => {
          menuCloseBtn?.focus();
        });
      } else {
        document.body.style.overflow = previousOverflow;
        if (lastFocused instanceof HTMLElement) {
          lastFocused.focus();
        }
      }
    };

    const closeMenu = () => setMenuState(false);
    const toggleMenu = () => {
      const open = mobileMenu?.classList.contains('is-open');
      setMenuState(!open);
    };

    const handleKeydown = (event) => {
      if (!mobileMenu || mobileMenu.getAttribute('aria-hidden') === 'true') return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = getFocusable();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const bind = () => {
      if (!navToggle || !mobileMenu) return;
      setMenuState(false);
      navToggle.addEventListener('click', () => {
        toggleMenu();
      });
      menuCloseBtn?.addEventListener('click', () => closeMenu());
      mobileMenu.addEventListener('click', (event) => {
        if (event.target === mobileMenu) {
          closeMenu();
        }
      });
      menuPanel?.addEventListener('click', (event) => {
        event.stopPropagation();
      });
      mobileMenu.querySelectorAll('.mobile-menu-nav a').forEach((link) => {
        link.addEventListener('click', () => closeMenu());
      });
      document.addEventListener('keydown', handleKeydown);
      mobileBreakpoint.addEventListener?.('change', () => {
        if (!isMobile()) {
          closeMenu();
        }
      });
    };

    const setActiveLink = () => {
      const normalize = (path) => {
        const withoutIndex = path.replace(/\/index\.html$/, '');
        const trimmed = withoutIndex.replace(/\/$/, '');
        return trimmed.length ? trimmed : '/';
      };
      const currentPath = normalize(window.location.pathname);
      document.querySelectorAll('.nav-desktop a, .mobile-menu-nav a').forEach((link) => {
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
