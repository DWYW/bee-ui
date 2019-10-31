import Vue from 'vue'

export const BeeComponent: {
  install: {
    (vue: typeof Vue, optioins?: {
      language?: string,
      [index: string]: any
    }): void
  },
  [index: string]: any
}
