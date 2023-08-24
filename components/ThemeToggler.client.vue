<script setup>
const colorMode = useColorMode()
</script>

<template>
  <div class="flex flex-col text-4xl">
    <button v-if="$colorMode.value === 'light'" @click="$colorMode.value = 'dark'">
      <UnoIcon class="i-carbon-moon" />
    </button>
    <button v-else @click="$colorMode.value = 'light'">
      <UnoIcon class="i-carbon-sun" />
    </button>
  </div>
</template>
