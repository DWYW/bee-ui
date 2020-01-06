import Vue, { Component } from 'vue'

type LoadingTypes = 'main'|'pie'|'undulate'

interface LoadingOptions {
  parent?: Element;
  type?: LoadingTypes;
  block?: boolean;
  text?: String;
}

interface CreateLoading {
  (options?: LoadingOptions): {
    show: () => void;
    hide: () => void;
  };
}

declare module 'vue/types/vue' {
  interface Vue {
    $_createLoading: CreateLoading
  }
}

export const Loading: CreateLoading
