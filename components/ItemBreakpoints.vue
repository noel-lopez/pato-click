<script setup lang="ts">
import type { ItemKey } from '../index.d.ts'
import { useMoneyMaths } from '~/composables/useMoneyMaths'
import { useStore } from '~/store/main'

interface Props {
  itemKey: ItemKey
  close: () => void
}
const props = defineProps<Props>()
const state = useStore()

const { totalBreakpointsMultiplier, nextBreakpointsList } = useMoneyMaths()
const itemLevel = computed(() => state.itemLevel(props.itemKey as ItemKey))
const multiplier = computed(() => totalBreakpointsMultiplier(itemLevel.value))
const nextBreakpoints = computed(() => nextBreakpointsList(itemLevel.value, 4))

function formatBreakpointEffect(effect: number) {
  return Intl.NumberFormat('es-ES', { maximumFractionDigits: 3 }).format(effect)
}
</script>

<template>
  <div class="relative">
    <button class="text-xl w-5 h-5 flex items-center justify-center absolute -top-5 -right-5 rounded-full bg-yellow-400 border border-yellow-500 text-yellow-600" @click="close">
      x
    </button>
    <h1 class="text-lg">
      Mejora actual: <span class="font-bold">x{{ multiplier }}</span>
    </h1>
    <h2 class="text-lg">
      Proximas mejoras:
    </h2>
    <ul>
      <li v-for="breakpoint in nextBreakpoints" :key="breakpoint.level">
        <p><span class="font-bold">lvl {{ breakpoint.level }}</span> -> x{{ formatBreakpointEffect(breakpoint.effect) }}</p>
      </li>
    </ul>
  </div>
</template>
