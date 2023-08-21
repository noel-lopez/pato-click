<script setup>
import { useStore } from '~/store/main'

const state = useStore()
</script>

<template>
  <div>
    <h1 class="flex items-center my-8 text-5xl font-bold font-headings text-emerald-950">
      <pato-coin />{{ state.cash }}
    </h1>
    <header class="flex flex-col items-center justify-between gap-2 w-2xl">
      <h2 class="text-3xl font-bold font-headings text-emerald-9/90">
        Consulta tus estadísticas
      </h2>
      <p class="text-xl">

      </p>
    </header>
  </div>
</template>
