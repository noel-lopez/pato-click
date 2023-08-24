<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel, TransitionRoot } from '@headlessui/vue'
import type { ItemConfig, ItemKey } from '../index.d.ts'
import { useStore } from '~/store/main'
import { useMoneyMaths } from '~/composables/useMoneyMaths'

const props = defineProps<ItemConfig & { itemKey: ItemKey }>()
const state = useStore()
const { isFirstItemPurchase } = useMoneyMaths()

const itemLevel = computed(() => state.itemLevel(props.itemKey as ItemKey))
const isAutomatic = computed(() => state.managerIsPurchased(props.itemKey as ItemKey))
const isPerSec = computed(() => isAutomatic.value === true && itemLevel.value >= 100)
const percentage = ref(0) // percentage of the bar

const gain = computed(() => !isPerSec.value ? state.itemRevenue(props.itemKey as ItemKey) : state.itemRevenuePerSecond(props.itemKey as ItemKey))
const progressBarTime = computed(() => !isPerSec.value ? props.time : 1000)
const purchaseQuantity = computed(() => state.itemLevelQuantityToBuy(props.itemKey as ItemKey))
const purchaseCost = computed(() => state.nextItemLevelCost(props.itemKey as ItemKey))
const purchaseBlocked = computed(() => !state.isPurchaseable(purchaseCost.value))

let interval: ReturnType<typeof setInterval>

// Auto start when purchase manager
watch(isAutomatic, (isAuto) => {
  if (isAuto === true && itemLevel.value > 0 && percentage.value === 0)
    start()
}, { immediate: true })
// Auto start when first buy item after purchase manager
watch(itemLevel, (level) => {
  if (isAutomatic.value === true && percentage.value === 0 && isFirstItemPurchase(level, state.buyMode))
    start()
})

const { numberToString } = useFormat()

function start() {
  if (percentage.value > 0)
    return
  percentage.value = 0

  const startTime = Date.now()

  interval = setInterval(() => {
    const elapsedTime = Date.now() - startTime
    percentage.value = Math.min(elapsedTime / progressBarTime.value, 1)
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
    <div class="flex items-center gap-4 mb-2" :class="{ 'grayscale opacity-75 pointer-events-none': itemLevel === 0 }">
      <nuxt-img :src="`/items/${img}`" :alt="name" width="96" />
      <div>
        <div class="flex flex-col-reverse lg:flex-row lg:items-center justify-between gap-2">
          <h2 class="text-2xl font-bold text-yellow-950 dark:text-yellow-200">
            {{ name }}
          </h2>
          <Popover v-slot="{ open, close }" class="relative">
            <PopoverButton class="py-1 pl-3 pr-1 text-lg font-semibold text-yellow-900 bg-yellow-200 border border-yellow-300 rounded-full" :class="{ 'pr-3': itemLevel === 0 }">
              lvl
              {{ itemLevel }}
              <UnoIcon v-if="itemLevel > 0" class="transition-transform i-ic-outline-keyboard-arrow-down" :class="{ '-scale-y-100': open }" />
            </PopoverButton>
            <TransitionRoot
              as="template"
              enter="transition ease-out duration-200"
              enter-from="opacity-0 -translate-y-1"
              enter-to="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leave-from="opacity-100 translate-y-0"
              leave-to="opacity-0 -translate-y-1"
            >
              <PopoverPanel class="absolute z-10 p-3 border-2 border-yellow-300 rounded-lg shadow-lg bg-yellow-50 dark:bg-neutral-900 dark:border-yellow-200 min-w-50">
                <ItemBreakpoints :item-key="props.itemKey" :close="close" />
              </PopoverPanel>
            </TransitionRoot>
          </Popover>
        </div>
        <p class="text-lg">
          {{ description }}
        </p>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <div
        v-if="state.itemLevel(props.itemKey as ItemKey) > 0"
        class="w-full bg-yellow-200 dark:bg-neutral-900 dark:border-neutral-500 light:bg-hero-rain-yellow-400 p-2 rounded-xl border-white border-2 light:shadow-[0_0_0_2px_#a89b49] rounded-sm light:drop-shadow-[0_4px_0_#cbbf6e]  active:translate-y-1 active:!drop-shadow-none select-none"
        aria-label="Start farming" @click="start"
      >
        <div v-if="!isPerSec" class="relative h-8 overflow-hidden text-lg font-medium bg-green-4 dark:bg-green-600 rounded-lg">
          <div class="h-full bg-yellow-50 dark:bg-neutral-800" :style="{ transform: `translateX(${percentage * 100}%)` }" />
          <span class="absolute -translate-x-1/2 top-1 left-1/2"><pato-coin />{{ numberToString(gain) }}</span>
        </div>
        <div v-else class="relative h-8 overflow-hidden text-lg font-medium bg-green-4 dark:bg-green-600 rounded-lg progress-bar-striped">
          <span class="absolute -translate-x-1/2 top-1 left-1/2"><pato-coin />{{ numberToString(gain) }} /sec</span>
        </div>
      </div>
      <button
        class="grow bg-amber-300 dark:bg-neutral-800 dark:border-neutral-500 border-white border-2 py-0 shadow-[0_0_0_2px_#000] rounded-sm text-base font-headings rounded-xl shadow-[0_4px_0_#cbbf6e] active:translate-y-1 active:!shadow-none select-none min-w-[150px] text-center flex justify-around py-2 [&:disabled]:grayscale [&:disabled]:opacity-50 transition-filter font-sans"
        :disabled="purchaseBlocked"
        aria-label="Start farming"
        @click="state.purchaseItemLevel(props.itemKey as ItemKey)"
      >
        <div>
          Compra &times;{{ purchaseQuantity }}
        </div>
        <div>
          <pato-coin />{{ numberToString(purchaseCost) }}
        </div>
      </button>
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
