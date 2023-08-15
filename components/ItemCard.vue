<script setup lang="ts">
const time = ref(60000) // miliseconds to complete 100% of the bar
const gain = ref(100) // money to gain when the bar is complete
const money = ref(0)
const percentage = ref(0) // percentage of the bar
const isAutomatic = ref(true) // if true, the bar will start again when it's complete

const formattedPercentage = computed(() => (percentage.value * 100).toFixed(2))

let interval: ReturnType<typeof setInterval>

function start() {
  if (percentage.value > 0)
    return
  percentage.value = 0

  const startTime = Date.now()

  interval = setInterval(() => {
    const elapsedTime = Date.now() - startTime
    percentage.value = Math.min(elapsedTime / time.value, 1)
    if (percentage.value >= 1) {
      clearInterval(interval)
      percentage.value = 0
      money.value += gain.value

      if (isAutomatic.value)
        start()
    }
  }, 16)
}

function stop() {
  percentage.value = 0
  clearInterval(interval)
}
</script>

<template>
  <div>
    <div class="flex gap-5 mb-6">
      <h2 class="text-lg font-500">
        Money: {{ money }}
      </h2>
      <h3
        class="text-lg font-400"
      >
        Percentage: {{ formattedPercentage }}%
      </h3>
    </div>
    <div class="flex gap-5">
      <button
        class="p-2 mb-6 bg-blue-700 rounded-lg"
        @click="start"
      >
        Start
      </button>
      <button
        class="p-2 mb-6 bg-blue-700 rounded-lg"
        @click="stop"
      >
        Stop
      </button>
      <div class="flex items-center gap-2 mb-6">
        <input id="checkAutomatic" v-model="isAutomatic" type="checkbox" class="w-4 h-4">
        <label for="checkAutomatic" class="text-sm">Automatic</label>
      </div>
    </div>
    <div class="w-80 h-5 bg-green-300 rounded-lg overflow-hidden">
      <div class="h-full bg-gray-400" :style="{ transform: `translateX(${percentage * 320}px)` }" />
    </div>
    <span>{{ time / 1000 }} sec</span>
  </div>
</template>
