<script setup lang="ts">
const nuxtApp = useNuxtApp()
const loading = ref(false)
nuxtApp.hook('page:start', () => {
  loading.value = true
})

nuxtApp.hook('page:finish', () => {
  loading.value = false
})
</script>

<template>
  <div
    class="min-h-screen font-sans text-gray-600 dark:text-zinc-400 grid grid-cols-4 custom-inter scroll-smooth antialiased selection:bg-yellow-300 p-4 gap-24 container mx-auto"
  >
    <div v-if="loading" class="fixed left-0 top-0 h-0.5 w-full z-50 bg-green-500" />
    <NavigationHeader />
    <NuxtLayout>
      <div class="mb-auto col-span-3 mx-auto w-full">
        <SeoKit />
        <OgImageStatic component="PageOgImage" />
        <NuxtPage class="" keepalive />
      </div>
    </NuxtLayout>
  </div>
</template>

<style>
html, body {
 background:#fff4e0
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
    transform: translateY(-20px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>
