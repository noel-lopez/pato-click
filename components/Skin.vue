<script setup lang="ts">
import type { SkinsConfig } from 'index'
import { useStore } from '~/store/main'

type SkinId = keyof typeof staticData.skins

interface Props extends SkinsConfig {
  id: SkinId
  isEarned: boolean
}

const props = defineProps<Props>()
const staticData = useAppConfig()
const state = useStore()

function equipSkin() {
  state.selectSkin(props.id)
}

const isCurrentSkin = computed(() => state.userSkin === props.id)
</script>

<template>
  <button class="flex justify-center items-center border-2 border-pink-300 rounded-xl" :class="{ 'grayscale': !isEarned, 'bg-pink-100 dark:bg-pink-200/90': isCurrentSkin }" @click="equipSkin">
    <nuxt-img :src="props.img" :alt="props.name" width="120" />
  </button>
</template>
