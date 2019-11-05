import Vue, { Component } from 'vue'

declare enum LoadingTypes {
  'main',
  'pie',
  'undulate'
}

interface LoadingOptions {
  parent: Element;
  type: LoadingTypes;
  block: boolean;
  text: String;
}

interface CreateLoading {
  (options?: LoadingOptions): Component;
}

declare module 'vue/types/vue' {
  interface Vue {
    $_createLoading: CreateLoading
  }
}

export const Loading: CreateLoading
