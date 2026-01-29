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

  document.addEventListener('DOMContentLoaded', () => {
    Navigation.bind();
    Chatbot.init();
    const planInput = document.querySelector('[data-plan-input]');
    if (planInput) {
      const params = new URLSearchParams(window.location.search);
      const plan = params.get('plan');
      if (plan) {
        planInput.value = plan;
      }
    }
  });
})();
