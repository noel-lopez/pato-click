<script setup lang="ts">
import type { UpgradeConfig } from '../index.d.ts'

const props = defineProps<UpgradeConfig>()
const { items } = useAppConfig()
const isBlocked = Math.random() < 0.5
const buttonClass = isBlocked ? 'bg-stone-400 border-stone-8/20 text-stone-6' : 'bg-teal-5 border-teal-8/20 text-white'
const { numberToString } = useFormat()
</script>

<template>
  <div class="flex pr-5 items-center">
    <nuxt-img class="z-1 aspect-square" :alt="name" width="96" :src="props.item === 'ALL' ? 'https://api.dicebear.com/6.x/open-peeps/svg' : `/items/${items[props.item].img}`" />
    <div class="upgradeInfoCard rounded-lg flex flex-col justify-evenly items-center w-lg py-1 bg-white/80 ml[-50px]">
      <h2 class="text-2xl font-bold text-teal-6/80 font-italic">
        {{ name }}
      </h2>
      <h3 class="text-lg">
        {{ description }} x{{ effect }}
      </h3>
      <p class="text-lg font-bold">
        $ {{ numberToString(props.cost) }}
      </p>
    </div>
    <button class="diagonal-button ml[-30px] px-2 py-3 text-2xl font-bold border-4" :class="buttonClass">
      Comprar!
    </button>
  </div>
</template>

<style scoped>
  .upgradeInfoCard {
    clip-path: polygon(0 50%, 10% 0, 100% 0, 100% 100%, 10% 100%, 0 50%);
  }

  .diagonal-button {
    transform: skewX(15deg);
    border-top-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
</style>
