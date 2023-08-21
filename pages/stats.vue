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
        Consulta tus estadísticas
      </h2>
      <p class="text-xl">

      </p>
    </header>
  </div>
</template>
