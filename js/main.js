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
  });
})();
