<script setup>
import { useStore } from '~/store/main'

const state = useStore()
</script>

<template>
  <div>
    <h1 class="flex items-center my-8 text-5xl font-bold font-headings text-betterblue-950 dark:text-betterblue-300" style="--stagger:1" data-animate>
      <pato-coin />{{ state.cash }}
    </h1>
    <header class="flex flex-col items-center justify-between gap-2 w-2xl">
      <h2 class="text-3xl font-bold font-headings text-betterblue-500 dark:text-betterblue-300" style="--stagger:2" data-animate>
        ¡Los managers te harán la vida más fácil!
      </h2>
      <p class="text-xl" style="--stagger:3" data-animate>
        Contrátalos para que hagan el trabajo de un item por ti. ¡Sólo con un pago único!
      </p>
    </header>
    <ul class="grid grid-cols-1 gap-12 max-w-[700px] py-8" style="--stagger:4" data-animate>
      <li v-for="manager in state.unpurchasedManagersList" :key="manager.id">
        <ManagerCard v-bind="manager" :is-purchased="false" />
      </li>
    </ul>
    <h3 v-if="state.purchasedManagersList.length > 0" class="mb-2 text-2xl font-bold font-headings text-betterblue-800">
      Managers contratados:
    </h3>
    <ul class="grid grid-cols-1 gap-12 max-w-[700px] py-8">
      <li v-for="manager in state.purchasedManagersList" :key="manager.id">
        <ManagerCard v-bind="manager" :is-purchased="true" />
      </li>
    </ul>
  </div>
</template>
