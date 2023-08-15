export default defineNuxtConfig({
  modules: [
    '@nuxt/image',
    '@nuxtjs/supabase',
    '@unocss/nuxt',
    '@vueuse/nuxt',
  ],
  css: ['@unocss/reset/tailwind.css'],
  supabase: {
    redirect: false,
  },
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
