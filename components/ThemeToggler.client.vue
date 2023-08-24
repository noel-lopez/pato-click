<script setup>
const enabled = ref(false)

const colorMode = useColorMode()
const colorIcon = computed(() => {
  const preference = colorMode.value
  if (preference === 'light')
    return 'i-ph-sun-bold'
  else
    return 'i-ph-moon-bold'
})
function darktoggle() {
  const preference = colorMode.value
  if (preference === 'dark')
    colorMode.preference = 'light'
  else if (preference === 'light')
    colorMode.preference = 'dark'
}
</script>

<template>
  <ColorScheme
    placeholder="..."
    tag="div"
  >
    <button class="bg-neutral-300 dark:bg-neutral-950 p-2 rounded-lg border border-neutral-600 bg-gradient-to-t from-neutral-100 via-white to-white dark:from-yellow-100/10 dark:to-neutral-950 dark:via-neutral-950">
      <UnoIcon
        class="text-current grow-0 h-6 w-6 cursor-pointer"
        :class="colorIcon"
        @click="darktoggle"
      />
    </button>
  </ColorScheme>
</template>
