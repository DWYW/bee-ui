import Vue from 'vue'

interface Languages {
  [key: string]: any
}

interface GetLanguage {
  (path: string, languages: Languages): string;
}

declare module 'vue/types/vue' {
  interface Vue {
    $_language: GetLanguage
  }
}

export const Language: GetLanguage
