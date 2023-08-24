<script setup lang="ts">
import { useStore } from '~/store/main'

const state = useStore()
const userSkinData = computed(() => state.skinInfo(state.userSkin))
</script>

<template>
  <div>
    <h1 class="my-4 text-5xl font-bold font-headings text-pink-950 dark:text-pink-200">
      Perfil
    </h1>
    <div class="mb-8 flex gap-8 bg-pink-100 dark:bg-pink-100/70 rounded-xl w-[300px]">
      <nuxt-img :src="userSkinData.img" alt="Skin del usuario" width="300" />
      <div class="flex flex-col gap-6">
        <h1 class="text-3xl light:text-neutral-950">
          {{ userSkinData.name }}
        </h1>
        <h2 class="text-2xl w-xs">
          {{ userSkinData.description }}
        </h2>
      </div>
    </div>
    <div class="flex gap-4">
      <div v-for="skin in state.skinsList" :key="skin.id">
        <Skin v-bind="skin" />
      </div>
    </div>
  </div>
</template>
