<script setup>
const { items } = useAppConfig()
</script>

<template>
  <div>
    <h1>Index</h1>
    <ul>
      <li v-for="item in items" :key="item.name">
        <ItemCard />
      </li>
    </ul>
  </div>
</template>
