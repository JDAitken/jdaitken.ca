// Theme + chatbot placeholders kept modular for future API wiring.
(() => {
  const THEME_KEY = 'jd-theme';
  const root = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');
  const toggleLabel = document.querySelector('[data-theme-toggle-label]');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const nav = document.querySelector('[data-nav]');
  const navLinks = document.querySelector('[data-nav-links]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const mobileBreakpoint = window.matchMedia('(max-width: 820px)');

  const storage = {
    get: () => {
      try {
        return localStorage.getItem(THEME_KEY);
      } catch (err) {
        console.warn('Theme storage unavailable', err);
        return null;
      }
    },
    set: (value) => {
      try {
        localStorage.setItem(THEME_KEY, value);
      } catch (err) {
        console.warn('Theme persistence failed', err);
      }
    }
  };

  const isValidTheme = (theme) => theme === 'light' || theme === 'dark';

  const applyToggleState = (theme) => {
    if (!toggle) return;
    toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    const icon = toggle.querySelector('.theme-toggle__icon');
    if (icon) {
      icon.textContent = theme === 'dark' ? '☾' : '☀';
    }
    if (toggleLabel) {
      toggleLabel.textContent = theme === 'dark' ? 'Dark' : 'Light';
    }
  };

  const applyTheme = (theme, { persist = true } = {}) => {
    if (!isValidTheme(theme)) return;
    root.dataset.theme = theme;
    applyToggleState(theme);
    if (persist) {
      storage.set(theme);
    }
  };

  const getStoredTheme = () => {
    const saved = storage.get();
    return isValidTheme(saved) ? saved : null;
  };

  const getPreferredTheme = () => {
    const saved = getStoredTheme();
    if (saved) return saved;
    return prefersDark.matches ? 'dark' : 'light';
  };

  const handleSystemChange = (event) => {
    // Only follow system if the user hasn't chosen a theme.
    if (getStoredTheme()) return;
    applyTheme(event.matches ? 'dark' : 'light', { persist: false });
  };

  const initTheme = () => {
    applyTheme(getPreferredTheme(), { persist: false });
    if (typeof prefersDark.addEventListener === 'function') {
      prefersDark.addEventListener('change', handleSystemChange);
    } else if (typeof prefersDark.addListener === 'function') {
      prefersDark.addListener(handleSystemChange);
    }
    toggle?.addEventListener('click', () => {
      const current = root.dataset.theme === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  };

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
    initTheme();
    Navigation.bind();
    Chatbot.init();
  });
})();
