<script setup lang="ts">
import type { AchievementNotification } from 'components/AchievementToast.vue'
import type { NotivueItem } from 'notivue'
import { Notivue } from 'notivue'

const nuxtApp = useNuxtApp()
const loading = ref(false)
nuxtApp.hook('page:start', () => {
  loading.value = true
})

nuxtApp.hook('page:finish', () => {
  loading.value = false
})
useAchievements()
</script>

<template>
  <div class="min-h-screen font-sans antialiased text-gray-600 dark:bg-neutral-950 dark:text-yellow-100 custom-inter scroll-smooth selection:bg-yellow-300">
    <div
      class="container grid grid-cols-4 gap-8 lg:gap-24 p-4 mx-auto"
    >
      <div v-if="loading" class="fixed left-0 top-0 h-0.5 w-full z-50 bg-green-500" />
      <NavigationHeader />
      <NuxtLayout>
        <div class="w-full col-span-3 mx-auto mb-auto">
          <SeoKit />
          <OgImageStatic component="PageOgImage" />
          <NuxtPage class="" keepalive />
        </div>
      </NuxtLayout>
      <ClientOnly>
        <Notivue v-slot="item">
          <AchievementToast :item="item as NotivueItem<AchievementNotification>" />
        </Notivue>
      </ClientOnly>
    </div>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
@keyframes hueRotateAnimation {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

:root.dark {
  color-scheme: dark;
}

.custom-inter {
  font-feature-settings: "calt", "ss02", "ss01", "ss03", "cv02", "cv03", "cv04", "cv11";
}

@keyframes enter {
  0% {
    opacity: 0;
    transform: translateY(10px)
  }

  to {
    opacity: 1;
    transform: none
  }
}

[data-animate] {
  --stagger: 0;
  --delay: 120ms;
  --start: 0ms;
}

@media (prefers-reduced-motion:no-preference) {
  [data-animate] {
    animation: enter .6s both;
    animation-delay: calc(var(--stagger) * var(--delay) + var(--start));
  }
}

[data-animation-controller=false] [data-animate] {
  animation: none;
}

.floating {
  animation: floating 6s ease-in-out infinite;
}

@keyframes floating {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-5px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>
