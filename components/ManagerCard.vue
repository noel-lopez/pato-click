<script setup lang="ts">
import type { ManagerConfig } from '../index.d.ts'
import { useStore } from '~/store/main'

const props = defineProps<ManagerConfig & { id: ManagerId }>()
const staticData = useAppConfig()
type ManagerId = keyof typeof staticData.managers
const store = useStore()
const isBlocked = computed(() => !store.isPurchaseable(props.cost))
const { numberToString } = useFormat()
</script>

<template>
  <div class="-skew-0 flex m-1 bg-betterblue-50 transition-colors hover:bg-white items-center relative isolate border-white border-2 py-1 shadow-[0_0_0_2px_#000] rounded-sm">
    <div class="-z-1 bg-mask-hero-random-shapes bg-gradient-to-r from-betterblue-200 via-transparent to-transparent absolute h-full w-full" />
    <nuxt-img class="z-1 absolute translate-y--5 mr-9" :src="`/managers/${props.img}`" :alt="name" width="150" />
    <div class="flex flex-1 flex-col ml-40">
      <h2 class="font-bold italic text-3xl text-betterblue-700">
        {{ name }}
      </h2>
      <p class="text-betterblue-500 text-xl">
        $ {{ numberToString(props.cost) }}
      </p>
      <h3 class="text-lg">
        {{ description }}
      </h3>
    </div>
    <button
      class="px-3 py-4 rotate-5 translate-y--8 hover:scale-110 transition-transform text-2xl translate-x-4 border-4  bg-betterblue-400 text-white relative font-bold border-betterblue-600" :class="{ grayscale: isBlocked }"
      @click="store.purchaseManager(props.id)"
    >
      Contratar!
      <div class="-z-1 bg-mask-hero-endless-clouds bg-betterblue-300 top-0 left-0 absolute h-full w-full" />
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
