<script setup lang="ts">
import type { ManagerConfig } from '../index.d.ts'
import { useStore } from '~/store/main'

const props = defineProps<ManagerConfig & { id: ManagerId; isPurchased: boolean }>()
const staticData = useAppConfig()
type ManagerId = keyof typeof staticData.managers
const store = useStore()
const isBlocked = computed(() => !store.isPurchaseable(props.cost))
const { numberToString } = useFormat()
</script>

<template>
  <div class="flex m-1 bg-betterblue-50 dark:bg-betterblue-900 transition-colors hover:bg-white dark:hover:bg-betterblue-800 items-center relative isolate border-white dark:border-betterblue-300 border-2 py-1 shadow-[0_0_0_2px_#000] rounded-sm">
    <div class="absolute w-full h-full -z-1 bg-mask-hero-random-shapes bg-gradient-to-r from-betterblue-200 dark:from-betterblue-800 via-transparent to-transparent" />
    <nuxt-img class="absolute z-1 translate-y--5 mr-9" :src="`/managers/${props.img}`" :alt="name" width="150" />
    <div class="flex flex-col flex-1 ml-40">
      <h2 class="text-3xl italic font-bold text-betterblue-700 dark:text-betterblue-200">
        {{ name }}
      </h2>
      <p class="text-xl text-betterblue-500 dark:text-betterblue-300">
        <pato-coin /> {{ numberToString(props.cost) }}
      </p>
      <h3 class="text-lg">
        {{ description }}
      </h3>
    </div>
    <button
      v-if="!props.isPurchased" class="relative px-3 py-4 text-2xl font-bold text-white transition-transform translate-x-4 border-4 rotate-5 translate-y--8 hover:scale-110 bg-betterblue-400 border-betterblue-600"
      :class="{ grayscale: isBlocked }"
      @click="store.purchaseManager(props.id)"
    >
      Contratar!
      <div class="absolute top-0 left-0 w-full h-full -z-1 bg-mask-hero-endless-clouds bg-betterblue-300" />
    </button>
  </div>
</template>

<style scoped>
  .managerInfoCard {
    clip-path: polygon(0 30%, 0% 0, 100% 0, 100% 100%, 10% 100%, 0 70%);
  }

  .diagonal-button {
    transform: skewX(15deg);
    border-top-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
</style>
