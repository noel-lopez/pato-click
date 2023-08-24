<script setup lang="ts">
import type { AchievementType, AchievementsConfig } from '../index.d.ts'

interface AchievementProps extends AchievementsConfig {
  id: AchievementId
  type: AchievementType
  isEarned: boolean
}

const props = defineProps<AchievementProps>()

type AchievementId = {
  [T in keyof typeof staticData.achievements]: keyof typeof staticData.achievements[T];
}[keyof typeof staticData.achievements]
const staticData = useAppConfig()
</script>

<template>
  <div class="flex gap-4 my-2 bg-yellow-300/10 border rounded-lg shadow-md border-neutral-300 dark:border-yellow-200 p2" :class="{ grayscale: !props.isEarned }">
    <picture class="flex items-center justify-center">
      <nuxt-img v-if="props.type !== 'easteregg' || props.isEarned " :src="$props.img" alt="Logro" width="90" />
      <nuxt-img v-else src="/achievements/locked.png" alt="Logro bloqueado" width="90" />
    </picture>
    <div class="flex flex-col justify-center">
      <h2 class="text-xl font-semibold text-yellow-900 dark:text-yellow-200">
        <span v-if="props.type !== 'easteregg' || props.isEarned ">{{ props.name }}</span>
        <span v-else>???</span>
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        <span v-if="props.type !== 'easteregg' || props.isEarned ">{{ props.description }}</span>
        <span v-else>???</span>
      </p>
    </div>
  </div>
</template>
