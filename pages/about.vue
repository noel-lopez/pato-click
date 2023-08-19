<script setup lang="ts">
const devs = [
  {
    url: 'https://owln.ai/',
    name: 'owlnai',
    imageUrl: 'https://avatars.githubusercontent.com/u/20427094?s=64&v=4',
  },
  {
    url: 'https://nlpz-portfolio.vercel.app/',
    name: 'noel-lopez',
    imageUrl: 'https://avatars.githubusercontent.com/u/82571330?s=64&v=4',
  },
]
const designers = [
  {
    url: 'https://www.instagram.com/arumxchan/',
    name: 'arumxchan',
    imageUrl: '/contributors/arumxchan.jpg',
  },
]
</script>

<template>
  <section>
    <div class="max-w-2xl">
      <h1 class="font-headings font-bold text-5xl my-4 text-yellow-950">
        Acerca de
      </h1>
      <p class="mt-2 text-2xl leading-8 comic-text relevance">
        Pato-click es un juego idle creado para la Kurojam 2023.
      </p>
    </div>
    <section class="flex-wrap gap-12 mt-6 flex" aria-label="Equipo">
      <section class="border rounded-xl p-4 bg-white ">
        <h2 class="font-bold text-3xl text-yellow-900 border-dashed pb-1 border-b-2 border-current">
          <UnoIcon class="i-mingcute-terminal-box-line" /> Desarrollo y código
        </h2>
        <ul class="flex gap-6 mt-6">
          <li v-for="dev in devs" :key="dev.name">
            <NuxtLink :href="dev.url" target="_blank" rel="noopener noreferrer">
              <div class="flex items-center gap-x-3 bg-white border-2 border-black rounded-xl overflow-hidden pr-3 hover:scale-[1.02]">
                <NuxtImg class-name="w-16 h-16" width="64" height="64" :src="dev.imageUrl" alt="" />
                <div>
                  <h3 class="text-3xl font-semibold leading-7 font-headings text-yellow-950 comic-text relevance">
                    @{{ dev.name }}
                  </h3>
                </div>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </section>
      <section class="border rounded-xl p-4 bg-white">
        <h2 class="font-bold text-3xl text-yellow-900 border-dashed pb-1 border-b-2 border-current">
          <UnoIcon class="i-mingcute-paint-brush-line?mask bg-gradient-to-r from-yellow via-yellow-600 to-yellow" /> Ilustración
        </h2>
        <ul class="flex gap-12 mt-6">
          <li v-for="designer in designers" :key="designer.name">
            <NuxtLink :href="designer.url" target="_blank" rel="noopener noreferrer">
              <div class="flex items-center gap-x-4 bg-white border-2 border-black rounded-xl overflow-hidden pr-3 hover:scale-[1.02]">
                <NuxtImg class-name="w-16 h-16" width="64" height="64" :src="designer.imageUrl" alt="" />
                <div>
                  <h3 class="text-3xl font-semibold leading-7 font-headings text-yellow-950 comic-text relevance">
                    @{{ designer.name }}
                  </h3>
                </div>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </section>
  </section>
</template>
