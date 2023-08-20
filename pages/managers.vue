<script setup>
import { useStore } from '~/store/main'

const state = useStore()
</script>

<template>
  <div>
    <h1 class="font-headings font-bold text-5xl flex items-center my-8 text-betterblue-950">
      ${{ state.cash }}
    </h1>
    <header class="flex flex-col gap-2 justify-between items-center w-2xl">
      <h2 class="font-headings font-bold text-3xl text-betterblue-500">
        ¡Los managers te harán la vida más fácil!
      </h2>
      <p class="text-xl">
        Contrátalos para que hagan el trabajo de un item por ti. ¡Sólo con un pago único!
      </p>
    </header>
    <ul class="grid grid-cols-1 gap-12 max-w-[700px] py-8">
      <li v-for="manager in state.unpurchasedManagersList" :key="manager.id">
        <ManagerCard v-bind="manager" />
      </li>
    </ul>
  </div>
</template>
