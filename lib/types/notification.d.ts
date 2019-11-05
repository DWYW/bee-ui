import Vue, { Component } from 'vue'

declare enum NotificationTypes {
  'warn',
  'success',
  'error'
}

interface NotificationOptions {
  type: NotificationTypes;
  duration: number;
  title: string;
  message: string;
}

interface CreateNotification {
  (options?: NotificationOptions): Component;
}

declare module 'vue/types/vue' {
  interface Vue {
    $_createNotification: CreateNotification
  }
}

export const Notification: CreateNotification
