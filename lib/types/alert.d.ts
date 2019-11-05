import Vue, { Component } from 'vue'

interface AlertOptions {
  title: string;
  message: string;
  html: string;
  center: string;
  closeVisible: boolean;
  cancelVisible: boolean;
  confirmVisible: boolean;
  cancelText: string;
  confirmText: string;
  onclose: () => void;
  oncancel: () => void;
  onconfirm: () => void;
}

interface CreateAlert {
  (options?: AlertOptions): Component;
}

declare module 'vue/types/vue' {
  interface Vue {
    $_createAlert: CreateAlert
  }
}

export const Alert: CreateAlert
