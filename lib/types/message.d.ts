import Vue, { Component } from 'vue'

declare enum MessageTypes {
  'warn',
  'success',
  'error'
}

declare enum AlignTypes {
  'left',
  'center'
}

interface MessageOptions {
  type: MessageTypes;
  duration: number;
  html: string;
  message: string;
  align: AlignTypes;
}

interface CreateMessage {
  (options?: MessageOptions): Component;
}

declare module 'vue/types/vue' {
  interface Vue {
    $_createMessage: CreateMessage
  }
}

export const Message: CreateMessage
