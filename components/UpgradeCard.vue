<script setup lang="ts">
import type { UpgradeConfig } from '../index.d.ts'
import { useStore } from '~/store/main'

const props = defineProps<UpgradeConfig & { id: UpgradeId }>()
const staticData = useAppConfig()
type UpgradeId = keyof typeof staticData.upgrades
const store = useStore()
const isBlocked = computed(() => !store.isPurchaseable(props.cost))
const { numberToString } = useFormat()
</script>

<template>
  <div class="flex m-1 bg-emerald-50 dark:bg-emerald-950 transition-colors hover:bg-white dark:hover:bg-emerald-900 items-center relative isolate border-white dark:border-emerald-300 border-2 py-1 shadow-[0_0_0_2px_#000] rounded-sm">
    <div class="absolute w-full h-full -z-1 bg-mask-hero-heavy-rain bg-gradient-to-r from-emerald-300 dark:from-emerald-900 via-transparent to-transparent" />
    <nuxt-img class="absolute mr-12 -translate-x-3 z-1" :alt="name" width="150" :src="props.item === 'ALL' ? '/upgrades/upgrade_all.png' : `/items/${staticData.items[props.item].img}`" />
    <div class="flex flex-col flex-1 ml-40">
      <h2 class="text-3xl italic font-bold text-emerald-700 dark:text-emerald-300">
        {{ name }}
      </h2>
      <p class="text-xl text-emerald-600 dark:text-emerald-400">
        <pato-coin /> {{ numberToString(props.cost) }}
      </p>
      <h3 class="text-lg">
        {{ description }} x{{ effect }}
      </h3>
    </div>
    <button
      class="relative px-3 py-4 text-2xl font-bold text-white transition-transform translate-x-4 border-4 rotate-5 translate-y--8 hover:scale-110 bg-emerald-400 border-emerald-600"
      :class="{ grayscale: isBlocked }" @click="store.purchaseUpgrade(props.id)"
    >
      Comprar!
      <div class="absolute top-0 left-0 w-full h-full -z-1 bg-mask-hero-endless-clouds bg-emerald-300" />
    </button>
  </div>
</template>
