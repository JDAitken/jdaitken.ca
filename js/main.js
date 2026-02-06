// Chatbot placeholders kept modular for future API wiring.
(() => {
  const nav = document.querySelector('[data-nav]');
  const navLinks = document.querySelector('[data-nav-links]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const menuOverlay = document.querySelector('.menu-overlay');
  const menuPanel = document.querySelector('[data-menu-panel]');
  const menuCloseBtn = document.querySelector('.menu-closeBtn');
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
    let lastFocused = null;
    let previousOverflow = '';

    const getFocusable = () => {
      if (!menuOverlay) return [];
      return Array.from(
        menuOverlay.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      );
    };

    const setMenuState = (open) => {
      if (!nav || !menuOverlay) return;
      nav.setAttribute('data-nav-open', open ? 'true' : 'false');
      menuOverlay.classList.toggle('is-open', open);
      menuOverlay.setAttribute('aria-hidden', open ? 'false' : 'true');
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
    const openMenu = () => setMenuState(true);
    const toggleMenu = () => {
      const open = nav?.getAttribute('data-nav-open') === 'true';
      setMenuState(!open);
    };

    const handleKeydown = (event) => {
      if (!menuOverlay || menuOverlay.getAttribute('aria-hidden') === 'true') return;
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
      if (!nav || !navToggle || !menuOverlay) return;
      setMenuState(false);
      navToggle.addEventListener('click', () => {
        if (!isMobile()) return;
        toggleMenu();
      });
      menuCloseBtn?.addEventListener('click', () => closeMenu());
      menuOverlay.addEventListener('click', (event) => {
        if (event.target === menuOverlay) {
          closeMenu();
        }
      });
      menuPanel?.addEventListener('click', (event) => {
        event.stopPropagation();
      });
      menuOverlay.querySelectorAll('.menuLink').forEach((link) => {
        link.addEventListener('click', () => {
          if (isMobile()) closeMenu();
        });
      });
      document.addEventListener('keydown', handleKeydown);
      mobileBreakpoint.addEventListener?.('change', () => {
        if (!isMobile()) {
          closeMenu();
        }
      });
    };

    const setActiveLink = () => {
      if (!nav) return;
      const normalize = (path) => {
        const withoutIndex = path.replace(/\/index\.html$/, '');
        const trimmed = withoutIndex.replace(/\/$/, '');
        return trimmed.length ? trimmed : '/';
      };
      const currentPath = normalize(window.location.pathname);
      nav.querySelectorAll('a').forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) return;
        if (href.startsWith('http') || href.startsWith('mailto')) return;
        if (link.classList.contains('logo')) return;
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
      const status = form?.querySelector('[data-form-status]');
      if (!form) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      const defaultBtnText = submitBtn ? submitBtn.textContent : 'Submit';
      const fieldInputs = Array.from(form.querySelectorAll('[data-field]'));
      const phoneInput = form.querySelector('[data-field="phone"]');
      const emailInput = form.querySelector('[data-field="email"]');
      const websiteInput = form.querySelector('[data-field="website"]');

      const normalizeUrl = (value) => {
        const v = (value || '').trim();
        if (!v) return '';
        if (/^https?:\/\//i.test(v)) return v;
        return `https://${v}`;
      };

      const getErrorEl = (input) => {
        if (!input?.id) return null;
        return form.querySelector(`#${input.id}-error`);
      };

      const setError = (input, message, type = 'field') => {
        const field = input?.closest('.form-field');
        const errorEl = getErrorEl(input);
        if (errorEl) {
          errorEl.textContent = message;
          errorEl.dataset.errorType = type;
        }
        field?.classList.add('has-error');
        input?.setAttribute('aria-invalid', 'true');
      };

      const clearError = (input, type = null) => {
        const field = input?.closest('.form-field');
        const errorEl = getErrorEl(input);
        if (errorEl) {
          if (type && errorEl.dataset.errorType !== type) return;
          errorEl.textContent = '';
          delete errorEl.dataset.errorType;
        }
        field?.classList.remove('has-error');
        input?.removeAttribute('aria-invalid');
      };

      const validateRequired = (input, message) => {
        const value = input?.value?.trim() || '';
        if (!value) {
          setError(input, message, 'required');
          return false;
        }
        clearError(input, 'required');
        return true;
      };

      const validateEmail = (input) => {
        const value = input?.value?.trim() || '';
        if (!value) return true;
        if (input.validity?.typeMismatch) {
          setError(input, 'Enter a valid email address.', 'format');
          return false;
        }
        clearError(input, 'format');
        return true;
      };

      const validateUrl = (input) => {
        const value = input?.value?.trim() || '';
        if (!value) return true;
        if (input.validity?.typeMismatch) {
          setError(input, 'Enter a valid URL (include https://).', 'format');
          return false;
        }
        clearError(input, 'format');
        return true;
      };

      const validateContactMethod = () => {
        if (!phoneInput || !emailInput) return true;
        const phoneValue = phoneInput.value.trim();
        const emailValue = emailInput.value.trim();
        if (!phoneValue && !emailValue) {
          setError(phoneInput, 'Add a phone number or email.', 'contact');
          setError(emailInput, 'Add a phone number or email.', 'contact');
          return false;
        }
        clearError(phoneInput, 'contact');
        clearError(emailInput, 'contact');
        return true;
      };

      const validateField = (input) => {
        if (!input) return true;
        const field = input.getAttribute('data-field');
        if (input.hasAttribute('required')) {
          const ok = validateRequired(input, 'This field is required.');
          if (!ok) return false;
        }
        if (field === 'email') return validateEmail(input);
        if (field === 'website') return validateUrl(input);
        return true;
      };

      if (status) {
        const params = new URLSearchParams(window.location.search);
        if (params.get('error') === '1') {
          status.textContent = 'Something went wrong. Please try again or email jd@jdaitken.ca directly.';
          status.classList.add('is-visible', 'is-error');
        }
      }

      fieldInputs.forEach((input) => {
        input.addEventListener('blur', () => {
          validateField(input);
          if (input === phoneInput || input === emailInput) {
            validateContactMethod();
          }
        });
      });

      form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (status) {
          status.textContent = '';
          status.classList.remove('is-visible', 'is-error');
        }

        if (websiteInput) {
          websiteInput.value = normalizeUrl(websiteInput.value);
        }

        let isValid = true;
        fieldInputs.forEach((input) => {
          if (!validateField(input)) {
            isValid = false;
          }
        });
        if (!validateContactMethod()) {
          isValid = false;
        }

        if (!isValid) {
          const firstInvalid = form.querySelector('.has-error .form-input, .has-error .form-textarea');
          firstInvalid?.focus();
          return;
        }

        if (submitBtn) {
          submitBtn.textContent = 'Sending…';
          submitBtn.disabled = true;
        }

        try {
          const action = form.getAttribute('action');
          const method = (form.getAttribute('method') || 'POST').toUpperCase();
          const response = await fetch(action, {
            method,
            body: new FormData(form),
            headers: { Accept: 'application/json' }
          });

          if (!response.ok) {
            throw new Error('Form submission failed.');
          }

          const confirmation = document.createElement('div');
          confirmation.className = 'form-confirmation';
          confirmation.innerHTML = `
            <h3>Request received — I’ll email you shortly.</h3>
            <p>Thanks for the details. I’ll review your site and reply with quick wins and next steps.</p>
            <a class="btn btn--secondary btn--sm" href="/pricing">See Plans & Pricing</a>
          `;
          form.replaceWith(confirmation);
        } catch (error) {
          if (status) {
            status.textContent = 'Something went wrong. Please try again or email jd@jdaitken.ca directly.';
            status.classList.add('is-visible', 'is-error');
          }
          if (submitBtn) {
            submitBtn.textContent = defaultBtnText;
            submitBtn.disabled = false;
          }
        }
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
