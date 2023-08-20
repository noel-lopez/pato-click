<script setup>
import { useStore } from '~/store/main'

const state = useStore()
</script>

<template>
  <div>
    <h1 class="font-headings font-bold text-5xl flex items-center my-8 text-emerald-950">
      ${{ state.cash }}
    </h1>
    <header class="flex flex-col gap-2 justify-between items-center w-2xl">
      <h2 class="font-headings font-bold text-3xl text-emerald-9/90">
        ¡Para ganar también hay que invertir!
      </h2>
      <p class="text-xl">
        Compra estas mejoras de gran calidad para darle un empujón a tu estanque.
      </p>
    </header>
    <ul class="grid grid-cols-1 gap-12 max-w-[700px] py-8">
      <li v-for="upgrade in state.unpurchasedUpgradesList" :key="upgrade.id">
        <UpgradeCard v-bind="upgrade" />
      </li>
    </ul>
  </div>
</template>
