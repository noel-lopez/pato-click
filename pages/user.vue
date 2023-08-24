<script setup lang="ts">
import { useStore } from '~/store/main'

const state = useStore()
const userSkinData = computed(() => state.skinInfo(state.userSkin))
</script>

<template>
  <div>
    <h1 class="my-4 text-5xl font-bold font-headings text-indigo-950 dark:text-indigo-200" style="--stagger:1" data-animate>
      Perfil
    </h1>
    <div class="mb-8 flex gap-8 bg-indigo-100 dark:bg-indigo-100/70 rounded-xl w-[300px]" style="--stagger:2">
      <nuxt-img :src="userSkinData.img" alt="Skin del usuario" width="300" data-animate />
      <div class="flex flex-col gap-6">
        <h1 class="text-3xl light:text-neutral-950">
          {{ userSkinData.name }}
        </h1>
        <h2 class="text-2xl w-xs">
          {{ userSkinData.description }}
        </h2>
      </div>
    </div>
    <div class="flex gap-4" style="--stagger:2" data-animate>
      <div v-for="skin in state.skinsList" :key="skin.id">
        <Skin v-bind="skin" />
      </div>
    </div>
  </div>
</template>
