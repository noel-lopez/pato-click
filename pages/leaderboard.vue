<script setup>
const client = useSupabaseClient()
const { data: leaderboard } = await useAsyncData('leaderboard', async () => {
  const { data } = await client.from('leaderboard').select('name, points')
  return data
})
</script>

<template>
  <div>
    <h1>Leaderboard</h1>
    <ul>
      <li v-for="player in leaderboard" :key="player.name">
        {{ player.name }}: {{ player.points }}
      </li>
    </ul>
  </div>
</template>
