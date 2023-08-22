<script setup lang="ts">
const props = defineProps<{ title: string; content: string | number }>()
</script>

<template>
  <article class="flex flex-col-reverse bg-white p-4 border-black border-2 rounded-xl min-w-[300px]">
    <header>
      <h2 class="text-lg">
        {{ title }}
      </h2>
    </header>
    <main class="text-3xl font-bold text-emerald-900">
      {{ content }}
    </main>
  </article>
</template>
