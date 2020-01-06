import Vue, { Component } from 'vue'

type NotificationTypes = 'warn'|'success'|'error'

interface NotificationOptions {
  message: string;
  type?: NotificationTypes;
  duration?: number;
  title?: string;
}

interface CreateNotification {
  (options?: NotificationOptions): {
    show: () => void;
    hide: () => void;
  };
}

declare module 'vue/types/vue' {
  interface Vue {
    $_createNotification: CreateNotification
  }
}

export const Notification: CreateNotification
