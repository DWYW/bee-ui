import Vue from 'vue'

type MessageTypes = 'warn'|'success'|'error'
type AlignTypes = 'left'|'center'

interface MessageOptions {
  message: string;
  type?: MessageTypes;
  duration?: number;
  html?: string;
  align?: AlignTypes;
}

interface CreateMessage {
  (options?: MessageOptions): {
    show: () => void;
    hide: () => void;
  };
}

declare module 'vue/types/vue' {
  interface Vue {
    $_createMessage: CreateMessage
  }
}

export const Message: CreateMessage
