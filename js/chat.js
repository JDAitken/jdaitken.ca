(() => {
  const CHAT_ENABLED = true; // Feature flag: set true to enable UI/API calls.
  const API_URL = '/api/chat.php';

  if (!CHAT_ENABLED) return;

  const root = document.getElementById('chat-widget-root') || document.body;
  const state = {
    open: false,
    loading: false,
    messages: [],
  };

  const el = {
    launch: null,
    widget: null,
    list: null,
    input: null,
    send: null,
    close: null,
  };

  const renderMessages = () => {
    if (!el.list) return;
    el.list.innerHTML = '';
    state.messages.forEach(({ role, text }) => {
      const item = document.createElement('div');
      item.className = `chat-message ${role}`;
      item.textContent = text;
      el.list.appendChild(item);
    });
    el.list.scrollTop = el.list.scrollHeight;
  };

  const setLoading = (isLoading) => {
    state.loading = isLoading;
    if (el.send) el.send.disabled = isLoading;
    if (el.input) el.input.disabled = isLoading;
    if (el.send) el.send.textContent = isLoading ? '...' : 'Send';
  };

  const addMessage = (role, text) => {
    state.messages.push({ role, text });
    renderMessages();
  };

  const sendMessage = async () => {
    if (!el.input) return;
    const text = el.input.value.trim();
    if (!text || state.loading) return;
    addMessage('user', text);
    el.input.value = '';
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const json = await response.json().catch(() => null);
      if (!response.ok || !json || !json.reply) {
        const error = (json && json.error) || 'Something went wrong.';
        addMessage('error', error);
        return;
      }

      addMessage('assistant', json.reply);
    } catch (err) {
      addMessage('error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
      el.input?.focus();
    }
  };

  const toggleWidget = (force) => {
    state.open = typeof force === 'boolean' ? force : !state.open;
    if (el.widget) {
      el.widget.classList.toggle('is-open', state.open);
    }
    if (el.launch) {
      el.launch.setAttribute('aria-pressed', state.open ? 'true' : 'false');
    }
    if (state.open) {
      el.input?.focus();
    }
  };

  const buildUI = () => {
    // Launch button
    const launch = document.createElement('button');
    launch.type = 'button';
    launch.className = 'chat-launch';
    launch.textContent = 'Chat';
    launch.setAttribute('aria-expanded', 'false');
    launch.addEventListener('click', () => toggleWidget());

    // Widget
    const widget = document.createElement('div');
    widget.className = 'chat-widget';
    widget.setAttribute('role', 'dialog');
    widget.setAttribute('aria-label', 'Chat assistant');

    const header = document.createElement('div');
    header.className = 'chat-header';
    header.innerHTML = '<span>Chat</span>';
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'chat-close';
    close.textContent = '×';
    close.addEventListener('click', () => toggleWidget(false));
    header.appendChild(close);

    const list = document.createElement('div');
    list.className = 'chat-body';

    const footer = document.createElement('div');
    footer.className = 'chat-footer';
    const input = document.createElement('input');
    input.className = 'chat-input';
    input.type = 'text';
    input.name = 'chat';
    input.placeholder = 'Ask something...';
    input.autocomplete = 'off';
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });

    const send = document.createElement('button');
    send.type = 'button';
    send.className = 'chat-send';
    send.textContent = 'Send';
    send.addEventListener('click', sendMessage);

    footer.appendChild(input);
    footer.appendChild(send);

    widget.appendChild(header);
    widget.appendChild(list);
    widget.appendChild(footer);

    // Mount
    root.appendChild(launch);
    root.appendChild(widget);

    el.launch = launch;
    el.widget = widget;
    el.list = list;
    el.input = input;
    el.send = send;
    el.close = close;

    renderMessages();
  };

  document.addEventListener('DOMContentLoaded', () => {
    buildUI();
  });
})();
