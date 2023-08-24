<script setup>
const colorMode = useColorMode()
colorMode.preference = 'light'
</script>

<template>
  <div class="flex flex-col text-4xl">
    <button v-if="colorMode.preference === 'light'" @click="colorMode.preference = 'dark'">
      <UnoIcon class="i-carbon-moon" />
    </button>
    <button v-else @click="colorMode.preference = 'light'">
      <UnoIcon class="i-carbon-sun" />
    </button>
  </div>
</template>
