import { persistedState } from 'pinia-plugin-persistedstate'
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      cash: 0,
      duckSkin: 'default',
    }
  },
})