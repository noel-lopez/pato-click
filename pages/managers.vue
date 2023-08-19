<script setup>
import { useStore } from '~/store/main'

const { managers } = useAppConfig()

const state = useStore()
</script>

<template>
  <div>
    <h1 class="font-headings font-bold text-5xl flex items-center my-8 text-yellow-950">
      ${{ state.cash }}
    </h1>
    <ul class="grid grid-cols-1 gap-12 h-90vh pb-12 overflow-y-auto scrollbar-hide">
      <header class="flex flex-col gap-2 justify-between items-center w-2xl">
        <h2 class="font-headings font-bold text-3xl text-cyan-8/90">
          ¡Los managers te harán la vida más fácil!
        </h2>
        <p class="text-xl">
          Contrátalos para que hagan el trabajo de un item por ti. ¡Sólo con un pago único!
        </p>
      </header>
      <li v-for="manager in managers" :key="manager.name">
        <ManagerCard v-bind="manager" />
      </li>
    </ul>
  </div>
</template>
