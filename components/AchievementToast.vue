<script setup lang="ts">
import type { AchievementType } from 'index'
import type { NotivueItem } from 'notivue'

export interface AchievementNotification {
  img: string
  type: AchievementType
}

const props = defineProps<{
  item: NotivueItem<AchievementNotification>
}>()
</script>

<template>
  <div class="font-sans relative bg-white dark:bg-neutral-950 p2 rounded-lg flex gap-4 my-2 border-2 border-black dark:border-gray-4">
    <picture class="flex items-center justify-center">
      <nuxt-img :src="item.props.img" alt="Achievement image" width="64" />
    </picture>
    <div class="flex flex-col justify-center">
      <h1 class="text-xl font-semibold">
        {{ item.title }}
      </h1>
      <p class="text-gray-600 dark:text-gray-300">
        {{ item.message }}
      </p>
    </div>
    <button class="text-xl w-5 h-5 flex items-center justify-center absolute -top-2 -right-2 rounded-full bg-red border border-red-700 text-red-700 dark:bg-neutral-950 dark-border-gray-4 dark:text-gray-2" @click="item.clear">
      x
    </button>
  </div>
</template>
