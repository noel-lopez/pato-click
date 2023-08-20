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
  <div class="-skew-0 flex m-1 bg-emerald-50 transition-colors hover:bg-white items-center relative isolate border-white border-2 py-1 shadow-[0_0_0_2px_#000] rounded-sm">
    <div class="-z-1 bg-mask-hero-heavy-rain bg-gradient-to-r from-emerald-300 via-transparent to-transparent absolute h-full w-full" />
    <nuxt-img class="z-1 absolute -translate-x-3 mr-12" :alt="name" width="150" :src="props.item === 'ALL' ? '/upgrades/upgrade_all.png' : `/items/${staticData.items[props.item].img}`" />
    <div class="flex flex-1 flex-col ml-40">
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
      class="px-3 py-4 rotate-5 translate-y--8 hover:scale-110 transition-transform text-2xl translate-x-4 border-4  bg-emerald-400 text-white relative font-bold border-emerald-600"
      :class="{ grayscale: isBlocked }" @click="store.purchaseUpgrade(props.id)"
    >
      Comprar!
      <div class="-z-1 bg-mask-hero-endless-clouds bg-emerald-300 top-0 left-0 absolute h-full w-full" />
    </button>
  </div>
</template>
