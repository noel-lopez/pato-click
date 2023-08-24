export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@nuxt/image',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  colorMode: {
    classSuffix: '',
    preference: 'light',
  },
  css: ['@unocss/reset/tailwind.css', 'notivue/animations.css'],
  // supabase: {
  //   redirect: false,
  // },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },
  extends: 'nuxt-seo-kit',
  runtimeConfig: {
    lastfmKey: '',
    public: {
      siteUrl: 'https://patoclick.com',
      siteName: 'Patoclick',
      siteDescription:
        'Cuack',
      language: 'es-ES',
    },
  },
  devtools: { enabled: true },
})
