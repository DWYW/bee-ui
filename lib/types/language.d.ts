import Vue from 'vue'

interface GetLanguage {
  (path: string, languages: Object): string;
}

declare module 'vue/types/vue' {
  interface Vue {
    $_language: GetLanguage
  }
}

export const Language: GetLanguage
