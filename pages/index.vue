<script setup>
import { useStore } from '~/store/main'

const { items } = useAppConfig()

const state = useStore()
</script>

<template>
  <div>
    <div class="flex justify-between  my-8">
      <h1 class="font-headings font-bold text-5xl text-yellow-950">
        ${{ state.cash }}
      </h1>
      <div class="flex gap-3">
        <button v-for="k in 3" :key="k" @click="state.buyMode = (10 ** (k - 1))">
          &times;{{ 10 ** (k - 1) }}
        </button>
        <!-- TODO: fix MAX mode -->
        <!-- <button @click="state.buyMode = 0xDEFECA">
          MAX
        </button> -->
      </div>
    </div>
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12">
      <li v-for="(item, key) in items" :key="item.name">
        <ItemCard v-bind="item" :item-key="key" />
      </li>
    </ul>
  </div>
</template>
