<script setup lang="ts">
import type { ManagerConfig } from '../index.d.ts'

const props = defineProps<ManagerConfig>()
const randomBoolean = () => Math.random() < 0.5
const isBlocked = randomBoolean()
const buttonClass = isBlocked ? 'bg-stone-400 border-stone-8/20 text-stone-6' : 'bg-cyan-5 border-cyan-8/20 text-white'
const { numberToString } = useFormat()
</script>

<template>
  <div class="flex pr-5 items-center">
    <nuxt-img class="z-1 aspect-square" :src="`https://api.dicebear.com/6.x/open-peeps/svg?seed=${name}`" :alt="name" width="96" />
    <div class="managerInfoCard rounded-lg flex flex-col justify-evenly items-center w-lg bg-white/80 ml[-50px]">
      <h2 class="text-2xl font-bold text-cyan-6/80 font-italic">
        {{ name }}
      </h2>
      <h3 class="text-lg">
        {{ description }}
      </h3>
      <p class="text-lg font-bold">
        $ {{ numberToString(props.cost) }}
      </p>
    </div>
    <button class="diagonal-button ml[-30px] px-2 py-3 text-2xl font-bold border-4" :class="buttonClass">
      Contratar!
    </button>
  </div>
</template>

<style scoped>
  .managerInfoCard {
    clip-path: polygon(0 30%, 10% 0, 100% 0, 100% 100%, 10% 100%, 0 70%);
  }

  .diagonal-button {
    transform: skewX(15deg);
    border-top-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
</style>
