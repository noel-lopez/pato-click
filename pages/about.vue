<script setup lang="ts">
const devs = [
  {
    url: 'https://owln.ai/',
    name: 'owlnai',
    imageUrl:
            'https://avatars.githubusercontent.com/u/20427094?s=64&v=4',
  },
  {
    url: 'https://arumxchan.vercel.app/',
    name: 'noel-lopez',
    imageUrl:
            'https://avatars.githubusercontent.com/u/82571330?s=64&v=4',
  },
]
const designers = [
  {
    url: 'https://arumxchan.vercel.app/',
    name: 'arumxchan',
    imageUrl:
            'https://i1.sndcdn.com/artworks-bIQHFduN5IM9tz2B-sfAUCw-t500x500.jpg',
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
          <li v-for="person in devs" :key="person.name">
            <NuxtLink :href="`https://github.com/${person.name}`">
              <div class="flex items-center gap-x-3 bg-white border-2 border-black rounded-xl overflow-hidden pr-3 hover:scale-[.98]">
                <NuxtImg class-name="w-16 h-16" width="64" height="64" :src="person.imageUrl" alt="" />
                <div>
                  <h3 class="text-3xl font-semibold leading-7 font-headings text-yellow-950 comic-text relevance">
                    @{{ person.name }}
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
          <li v-for="person in designers" :key="person.name">
            <NuxtLink :href="`https://github.com/${person.name}`">
              <div class="flex items-center gap-x-4 bg-white border-2 border-black rounded-xl overflow-hidden pr-3 hover:scale-[.98]">
                <NuxtImg class-name="w-16 h-16" width="64" height="64" :src="person.imageUrl" alt="" />
                <div>
                  <h3 class="text-3xl font-semibold leading-7 font-headings text-yellow-950 comic-text relevance">
                    @{{ person.name }}
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
