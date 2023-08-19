<script setup>
import { useStore } from '~/store/main'

const { items } = useAppConfig()

const state = useStore()
</script>

<template>
  <div>
    <h1 class="font-headings font-bold text-5xl my-8 text-yellow-950">
      ${{ state.cash }}
    </h1>
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
      <li v-for="item in items" :key="item.name">
        <ItemCard v-bind="item" />
      </li>
    </ul>
  </div>
</template>
