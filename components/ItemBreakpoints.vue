<script setup lang="ts">
import type { ItemKey } from '../index.d.ts'
import { useMoneyMaths } from '~/composables/useMoneyMaths'
import { useStore } from '~/store/main'

interface Props {
  itemKey: ItemKey
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
</template>
