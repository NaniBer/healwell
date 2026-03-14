// Telegram WebApp Service
export const telegramService = {
  getInstance() {
    return window.Telegram?.WebApp;
  },

  init() {
    const tg = this.getInstance();
    if (!tg) {
      console.warn('Telegram WebApp not found - running in browser mode');
      return null;
    }

    // Initialize the app
    tg.ready();
    tg.expand();

    // Set theme
    document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#ffffff');
    document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#000000');
    document.documentElement.style.setProperty('--tg-theme-hint-color', tg.themeParams.hint_color || '#999999');
    document.documentElement.style.setProperty('--tg-theme-link-color', tg.themeParams.link_color || '#2481cc');
    document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#2481cc');
    document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color || '#ffffff');

    return tg;
  },

  getUser() {
    const tg = this.getInstance();
    return tg?.initDataUnsafe?.user || null;
  },

  sendData(data) {
    const tg = this.getInstance();
    if (tg) {
      tg.sendData(JSON.stringify(data));
    }
  },

  closeApp() {
    const tg = this.getInstance();
    if (tg) {
      tg.close();
    }
  },

  showNotification(message) {
    const tg = this.getInstance();
    if (tg) {
      if (tg.showPopup) {
        tg.showPopup({ message });
      } else {
        alert(message);
      }
    }
  },

  onThemeChange(callback) {
    const tg = this.getInstance();
    if (tg) {
      tg.onEvent('themeChanged', callback);
    }
  },

  onViewportChange(callback) {
    const tg = this.getInstance();
    if (tg) {
      tg.onEvent('viewportChanged', callback);
    }
  },
};
