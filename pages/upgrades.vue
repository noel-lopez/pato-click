<script setup>
import { useStore } from '~/store/main'

const { upgrades } = useAppConfig()

const state = useStore()
</script>

<template>
  <div>
    <h1 class="font-headings font-bold text-5xl flex items-center my-8 text-emerald-950">
      ${{ state.cash }}
    </h1>
    <ul class="grid grid-cols-1 gap-12 h-90vh pb-12 overflow-y-auto scrollbar-hide">
      <header class="flex flex-col gap-2 justify-between items-center w-2xl">
        <h2 class="font-headings font-bold text-3xl text-emerald-9/90">
          ¡Para ganar también hay que invertir!
        </h2>
        <p class="text-xl">
          Compra estas mejoras de gran calidad para darle un empujón a tu estanque.
        </p>
      </header>
      <li v-for="upgrade in upgrades" :key="upgrade.name">
        <UpgradeCard v-bind="upgrade" />
      </li>
    </ul>
  </div>
</template>
