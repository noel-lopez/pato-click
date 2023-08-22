<script setup lang="ts">
import type { AchievementType, AchievementsConfig } from '../index.d.ts'

const props = defineProps<AchievementsConfig & { id: AchievementId; type: AchievementType; isEarned: boolean }>()

const staticData = useAppConfig()
type AchievementId = {
  [T in keyof typeof staticData.achievements]: keyof typeof staticData.achievements[T];
}[keyof typeof staticData.achievements]
</script>

<template>
  <div class="bg-white p2 rounded-lg shadow-md flex gap-4 my-2" :class="{ grayscale: !props.isEarned }">
    <picture class="flex items-center justify-center">
      <nuxt-img v-if="props.type !== 'easteregg' || props.isEarned " :src="$props.img" alt="Logro" width="90" />
      <nuxt-img v-else src="/achievements/locked.png" alt="Logro bloqueado" width="90" />
    </picture>
    <div class="flex flex-col justify-center">
      <h2 class="text-xl font-semibold text-emerald-950">
        <span v-if="props.type !== 'easteregg' || props.isEarned ">{{ props.name }}</span>
        <span v-else>???</span>
      </h2>
      <p class="text-gray-600">
        <span v-if="props.type !== 'easteregg' || props.isEarned ">{{ props.description }}</span>
        <span v-else>???</span>
      </p>
    </div>
  </div>
</template>
