<script setup lang="ts">
import type { ManagerConfig } from '../index.d.ts'

const props = defineProps<ManagerConfig>()
const randomBoolean = () => Math.random() < 0.5
const isBlocked = randomBoolean()
const { numberToString } = useFormat()
</script>

<template>
  <div class="-skew-0 flex m-1 bg-betterblue-50 transition-colors hover:bg-white items-center relative isolate border-white border-2 py-1 shadow-[0_0_0_2px_#000] rounded-sm">
    <div class="-z-1 bg-mask-hero-random-shapes bg-gradient-to-r from-betterblue-200 via-transparent to-transparent absolute h-full w-full" />
    <nuxt-img class="z-1 scale-150 translate-y--5 translate-x-3 mr-9" :src="`https://api.dicebear.com/6.x/open-peeps/svg?seed=${name}`" :alt="name" width="96" />
    <div class="flex-1">
      <h2 class="uppercase font-bold italic text-3xl text-betterblue-700">
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
