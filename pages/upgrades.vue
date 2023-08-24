<script setup>
import { useStore } from '~/store/main'

const state = useStore()
</script>

<template>
  <div>
    <h1 class="flex items-center my-8 text-5xl font-bold font-headings text-emerald-950 dark:text-emerald-500" style="--stagger:1" data-animate>
      <pato-coin />{{ state.cash }}
    </h1>
    <header class="flex flex-col items-center justify-between gap-2 w-2xl">
      <h2 class="text-3xl font-bold font-headings text-emerald-900/90 dark:text-emerald-500" style="--stagger:2" data-animate>
        ¡Para ganar también hay que invertir!
      </h2>
      <p class="text-xl" style="--stagger:3" data-animate>
        Compra estas mejoras de gran calidad para darle un empujón a tu estanque.
      </p>
    </header>
    <ul class="grid grid-cols-1 gap-12 max-w-[700px] py-8" style="--stagger:4" data-animate>
      <li v-for="upgrade in state.unpurchasedUpgradesList" :key="upgrade.id">
        <UpgradeCard v-bind="upgrade" />
      </li>
    </ul>
  </div>
</template>
