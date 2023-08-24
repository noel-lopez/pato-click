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
  <button>
    <UnoIcon
      class="text-current grow-0 h-16 w-16 cursor-pointer"
      :class="colorIcon"
      @click="darktoggle"
    /></button>
  </ColorScheme>
</template>
