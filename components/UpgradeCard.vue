<script setup lang="ts">
import type { UpgradeConfig } from '../index.d.ts'

const props = defineProps<UpgradeConfig>()
const { items } = useAppConfig()
const isBlocked = Math.random() < 0.5
const buttonClass = isBlocked ? 'bg-stone-400 border-stone-8/20 text-stone-6' : 'bg-emerald-5 border-emerald-8/20 text-white'
const { numberToString } = useFormat()
</script>

<template>
  <div class="-skew-0 flex m-1 bg-emerald-50 transition-colors hover:bg-white items-center relative isolate border-white border-2 py-1 shadow-[0_0_0_2px_#000] rounded-sm">
    <div class="-z-1 bg-mask-hero-heavy-rain bg-gradient-to-r from-emerald-300 via-transparent to-transparent absolute h-full w-full" />
    <nuxt-img class="z-1 scale-150  translate-x-3 mr-12" :alt="name" width="96" :src="props.item === 'ALL' ? 'https://api.dicebear.com/6.x/open-peeps/svg' : `/items/${items[props.item].img}`" />
    <div class="flex-1">
      <h2 class="uppercase font-bold italic text-3xl text-emerald-700">
        {{ name }}
      </h2>
      <p class="text-emerald-600 text-xl">
        $ {{ numberToString(props.cost) }}
      </p>
      <h3 class="text-lg">
        {{ description }} x{{ effect }}
      </h3>
    </div>
    <button
      class="px-3 py-4 rotate-5 translate-y--8 hover:scale-110 transition-transform text-2xl translate-x-4 border-4  bg-emerald-400 text-white relative font-bold border-emerald-600" :class="{ grayscale: isBlocked }"
    >
      Comprar!
      <div class="-z-1 bg-mask-hero-endless-clouds bg-emerald-300 top-0 left-0 absolute h-full w-full" />
    </button>
  </div>
</template>
