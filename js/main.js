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

    return { bind };
  })();

  const ContactForm = (() => {
    const init = () => {
      const form = document.querySelector('[data-contact-form]');
      const status = document.querySelector('[data-form-status]');
      if (!form || !status) return;

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
          const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
          });

          if (response.ok) {
            status.textContent = 'Thanks! I'll send your free audit within 48 hours.';
            status.classList.remove('is-error');
            status.classList.add('is-visible');
            form.reset();
          } else {
            throw new Error('Form submission failed');
          }
        } catch (error) {
          status.textContent = 'Something went wrong. Please try again or email jd@jdaitken.ca directly.';
          status.classList.add('is-visible', 'is-error');
        } finally {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      });
    };

    return { init };
  })();

  document.addEventListener('DOMContentLoaded', () => {
    Navigation.bind();
    Chatbot.init();
    ContactForm.init();
  });
})();
