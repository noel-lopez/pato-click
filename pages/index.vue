<script setup>
import { useStore } from '~/store/main'

const { items } = useAppConfig()

const state = useStore()
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <h1>Index - ${{state.cash}}</h1>
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
      <li v-for="item in items" :key="item.name">
        <ItemCard v-bind="item" />
      </li>
    </ul>
  </div>
</template>
