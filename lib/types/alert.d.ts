import Vue, { Component } from 'vue'

interface AlertOptions {
  message: string;
  title?: string;
  html?: string;
  center?: string;
  closeVisible?: boolean;
  cancelVisible?: boolean;
  confirmVisible?: boolean;
  cancelText?: string;
  confirmText?: string;
  onclose?: () => void;
  oncancel?: () => void;
  onconfirm?: () => void;
}

interface CreateAlert {
  (options?: AlertOptions): {
    show: () => void;
    hide: () => void;
  };
}

declare module 'vue/types/vue' {
  interface Vue {
    $_createAlert: CreateAlert
  }
}

export const Alert: CreateAlert
