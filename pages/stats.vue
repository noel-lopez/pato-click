<script setup lang="ts">
import type { AchievementType } from '../index.d.ts'
import { useStore } from '~/store/main'
import { useFormat } from '~/composables/useFormat'

const state = useStore()
const { currencyToString } = useFormat()
const formattedEarnedCash = computed(() => currencyToString(state.earnedCash))
const formattedMoneySpent = computed(() => currencyToString(state.moneySpent))

function getAchievementCategoryTitle(type: AchievementType) {
  switch (type) {
    case 'cash':
      return 'Logros de patomonedas'
    case 'itemLevel':
      return 'Logros de items'
    case 'easteregg':
      return 'Easter eggs'
    case 'rare':
      return 'Logros raros'
  }
}
</script>

<template>
  <div>
    <h1 class="flex items-center my-8 text-5xl font-bold font-headings text-emerald-950">
      <pato-coin />{{ state.cash }}
    </h1>
    <header class="flex flex-col justify-between gap-2 w-2xl">
      <!-- <h2 class="text-3xl font-bold font-headings text-emerald-9/90">
        Recuento de datos
      </h2> -->
      <div class="my-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Stat title="Patomonedas ganadas" :content="formattedEarnedCash" />
        <Stat title="Patomonedas gastadas" :content="formattedMoneySpent" />
        <Stat title="Logros desbloqueados" :content="state.earnedAchievementsCount" />
        <Stat title="Niveles de items" :content="state.itemLevelsCount" />
      </div>
    </header>
    <section v-for="achievementCategory in state.achievementsList" :key="achievementCategory.type" class="my-4">
      <h3 class="text-3xl font-bold font-headings text-emerald-9/90 py-3">
        {{ getAchievementCategoryTitle(achievementCategory.type) }}
      </h3>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Achievement v-for="achievement in achievementCategory.achievements" :key="achievement.id" v-bind="achievement" />
      </div>
    </section>
  </div>
</template>
