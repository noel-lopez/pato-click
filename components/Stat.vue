<script setup lang="ts">
const props = defineProps<{ title: string; content: number }>()
const { currencyToString } = useFormat()
const formatedCurrency = computed(() => currencyToString(props.content))
</script>

<template>
  <article class="flex flex-col-reverse bg-white p-4 border-black border-2 rounded-xl">
    <header>
      <h2>{{ title }}</h2>
    </header>
    <main class="text-3xl font-bold text-emerald-900">
      {{ formatedCurrency }}
    </main>
  </article>
</template>
