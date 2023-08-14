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
    class="min-h-screen font-sans text-gray-600 bg-cinder-50 dark:bg-black  dark:text-zinc-400 flex flex-col justify-between custom-inter scroll-smooth antialiased selection:bg-red-300 linear-bg print:!bg-white print:!bg-none print:!text-black"
  >
    <div v-if="loading" class="fixed left-0 top-0 h-0.5 w-full z-50 bg-green-500" />
    <NavigationHeader />
    <NuxtLayout>
      <SeoKit />
      <OgImageStatic component="PageOgImage" />
      <NuxtPage class="mb-auto" />
    </NuxtLayout>
  </div>
</template>

<style>
.custom-inter {
  font-feature-settings: "calt", "ss02", "ss01", "ss03", "cv02", "cv03", "cv04", "cv11";
}
.linear-bg {
  --opacity: 0.35;
  --size: 25px;
    background-size: var(--size) var(--size);
  background-image:
    linear-gradient(to right, hsl(50 0% 85% / var(--opacity)) 1px, transparent 1px),
    linear-gradient(to bottom, hsl(50 0% 85% / var(--opacity)) 1px, transparent 1px);
}
.dark .linear-bg {
  --opacity: 0.50;
  background-image:
    linear-gradient(to right, hsl(50 0% 10% / var(--opacity)) 1px, transparent 1px),
    linear-gradient(to bottom, hsl(50 0% 10% / var(--opacity)) 1px, transparent 1px);
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
