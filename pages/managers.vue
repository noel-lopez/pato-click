<script setup>
const { managers } = useAppConfig()
</script>

<template>
  <div>
    <h1>Managers</h1>
    <ul>
      <li v-for="manager in managers" :key="manager.name">
        {{ manager.name }}
      </li>
    </ul>
  </div>
</template>
