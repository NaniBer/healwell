/**
 * Telegram WebApp Service
 * Handles Telegram WebApp API integration.
 */

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        BackButton?: {
          show: () => void;
        };
        MainButton?: {
          text?: string;
          color?: string;
        };
        HapticFeedback?: {
          impactOccurred: (type: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
        };
        showAlert?: (message: string) => void;
        showConfirm?: (message: string) => void;
        showNotification?: (message: string) => void;
      };
    };
  }
}

interface TelegramUser {
  id: number;
  first_name: string;
  username?: string;
  language_code: string;
  photo_url?: string;
}

class TelegramService {
  private static instance: TelegramService;

  private constructor() {
    // Private constructor to prevent instantiation
  }

  /**
   * Initialize the Telegram WebApp.
   */
  public static init(): Telegram | null {
    if (!window.Telegram?.WebApp) {
      console.warn('Telegram WebApp not available');
      return null;
    }

    if (!this.instance) {
      this.instance = window.Telegram.WebApp;
      this.instance.ready();
      this.instance.expand();
    }

    return this.instance;
  }

  /**
   * Get the Telegram WebApp instance.
   */
  public static getInstance(): Telegram | null {
    return this.instance;
  }

  /**
   * Get the Telegram user data.
   */
  public static getUser(): TelegramUser | null {
    const tg = this.getInstance();
    if (!tg?.initDataUnsafe?.user) {
      return null;
    }

    return tg.initDataUnsafe.user;
  }

  /**
   * Show a notification (toast-like message).
   */
  public static showNotification(message: string): void {
    const tg = this.getInstance();
    if (tg?.showAlert) {
      tg.showAlert(message);
    }
  }

  /**
   * Expand the app to full screen.
   */
  public static expand(): void {
    const tg = this.getInstance();
    tg?.expand();
  }

  /**
   * Haptic feedback for interactions.
   */
  public static hapticFeedback(type: 'light' | 'medium' | 'heavy' = 'rigid' | 'soft'): void {
    const tg = this.getInstance();
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred(type);
    }
  }
}

export default TelegramService;
