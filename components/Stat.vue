<script setup lang="ts">
const props = defineProps<{ title: string; content: string | number }>()
</script>

<template>
  <article class="flex flex-col bg-white p-4 border-neutral-600 border-2 rounded-xl min-w-[300px] dark:bg-teal-300/10 dark:border-teal-200">
    <main class="text-3xl font-bold text-emerald-900 dark:text-emerald-300">
      {{ content }}
    </main>
    <footer>
      <h2 class="text-lg">
        {{ title }}
      </h2>
    </footer>
  </article>
</template>
