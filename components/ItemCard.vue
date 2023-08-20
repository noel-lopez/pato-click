<script setup lang="ts">
import type { ItemConfig, ItemKey } from '../index.d.ts'
import { useStore } from '~/store/main'

const props = defineProps<ItemConfig & { itemKey: string }>()
const { multipleItemLevelCost } = useMoneyMaths()
const state = useStore()

const itemLevel = state.itemLevel(props.itemKey as ItemKey)
const gain = computed(() => props.revenueBase * (props.rateGrowth ** 1))
const percentage = ref(0) // percentage of the bar
const isAutomatic = ref(false) // if true, the bar will start again when it's complete

const { numberToString } = useFormat()

let interval: ReturnType<typeof setInterval>

function start() {
  if (percentage.value > 0)
    return
  percentage.value = 0

  const startTime = Date.now()

  interval = setInterval(() => {
    const elapsedTime = Date.now() - startTime
    percentage.value = Math.min(elapsedTime / props.time, 1)
    if (percentage.value >= 1) {
      clearInterval(interval)
      percentage.value = 0
      state.addCash(gain.value)

      if (isAutomatic.value)
        start()
    }
  }, 16)
}
</script>

<template>
  <div>
    <div class="flex gap-4 mb-2">
      <nuxt-img :src="`/items/${img}`" :alt="name" width="64" />
      <div>
        <div class="flex  items-center justify-between gap-2">
          <h2 class="text-2xl font-bold text-yellow-950">
            {{ name }}
          </h2>
          <span
            class="bg-yellow-200 text-yellow-900 border border-yellow-300 rounded-full px-3 py-1 font-semibold text-lg"
          >
            lvl
            {{ state.itemLevel(props.itemKey as ItemKey) }}
          </span>
        </div>
        <p class="text-lg">
          {{ description }}
        </p>
      </div>
    </div>
    <div class="flex gap-3">
      <div
        v-if="state.itemLevel(props.itemKey as ItemKey) > 0"
        class="w-full bg-yellow-200 bg-hero-rain-yellow-400 p-2 rounded-xl border-white border-2 shadow-[0_0_0_2px_#a89b49] rounded-sm drop-shadow-[0_4px_0_#cbbf6e]  active:translate-y-1 active:!drop-shadow-none select-none"
        aria-label="Start farming" @click="start"
      >
        <div v-if="!isAutomatic" class="font-medium text-lg h-8 bg-green-300 rounded-lg overflow-hidden relative">
          <div class="h-full bg-yellow-50" :style="{ transform: `translateX(${percentage * 100}%)` }" />
          <span class="absolute top-1 left-1/2 -translate-x-1/2">${{ numberToString(gain) }}</span>
        </div>
        <div v-else class="h-5 bg-green-400 progress-bar-striped rounded-lg overflow-hidden relative">
          <span class="absolute top-0 left-1/2 -translate-x-1/2">{{ numberToString(gain / (time / 1000)) }} /sec</span>
        </div>
      </div>
      <div
        class="inline-block grow bg-amber-300 border-white border-2 py-0 shadow-[0_0_0_2px_#000] rounded-sm text-xl font-headings rounded-xl shadow-[0_4px_0_#cbbf6e] active:translate-y-1 active:!shadow-none select-none min-w-[150px] text-center"
        aria-label="Start farming"
        @click="state.purchaseItemLevel(props.itemKey as ItemKey)"
      >
        <div class="p-3">
          Compra {{ state.howMuch === 0xDEFECA ? 'max' : `&times;${state.howMuch}` }} por {{ numberToString(multipleItemLevelCost(itemLevel || 1, costBase, rateGrowth, state.howMuch)) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.progress-bar-striped {
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
  background-size: 40px 40px;
  animation: progress-bar-stripes 2s linear infinite;
}

@keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }

  to {
    background-position: 0 0;
  }
}
</style>
