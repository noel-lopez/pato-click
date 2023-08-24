<script setup lang="ts">
const items = [
  {
    label: 'Jugar',
    href: '/',
    icon: 'i-mingcute-game-2-line',
  },
  {
    label: 'Managers',
    href: '/managers',
    icon: 'i-mingcute-briefcase-line',
  },
  {
    label: 'Mejoras',
    href: '/upgrades',
    icon: 'i-mingcute-pig-money-line',
  },
  {
    label: 'Estadísticas',
    href: '/stats',
    icon: 'i-mingcute-chart-line-line',
  },
  // {
  //   label: 'Configuración',
  //   href: '/settings',
  //   icon: 'i-mingcute-settings-3-line',
  // },
  {
    label: 'Acerca de',
    href: '/about',
    icon: 'i-mingcute-information-line',
  },
]
</script>

<template>
  <div class="flex-1">
    <ul class="flex flex-col divide-y dark:divide-neutral-600">
      <li v-for="link in items" :key="link.href">
        <nuxt-link :to="link.href" class="flex items-center gap-3 px-8 py-3 text-2xl text-md font-headings">
          <UnoIcon v-if="link.icon" :class="link.icon" />
          {{ link.label }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<style>
.router-link-active {
  background-image: linear-gradient(to top, #f6e05e55 0%, transparent 60%);
  color: #463e10;
}

.dark .router-link-active {
  color: #efe8bb;
}
</style>
