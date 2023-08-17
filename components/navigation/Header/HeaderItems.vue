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
    icon: 'i-mingcute-pig-money-line',
  },
  {
    label: 'Estadísticas',
    href: '/stats',
    icon: 'i-mingcute-chart-line-line',
  },
  {
    label: 'Configuración',
    href: '/settings',
    icon: 'i-mingcute-settings-3-line',
  },
  {
    label: 'Acerca de',
    href: '/about',
    icon: 'i-mingcute-information-line',
  },
]
</script>

<template>
  <div class="flex-1">
    <ul class="flex flex-col divide-y">
      <li v-for="link in items" :key="link.href">
        <nuxt-link :to="link.href" class="py-3 px-8 flex gap-3 items-center text-md font-headings text-2xl">
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
</style>
