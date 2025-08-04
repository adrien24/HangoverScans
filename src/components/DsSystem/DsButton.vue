<template>
  <div class="dsButton">
    <button class="dsButton_button" @click="$emit('click')" :class="`dsButton_color-${color}`">
      {{ title }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { title, color = 'primary' } = defineProps<{
  title: string
  color?: 'primary' | 'secondary' | 'tertiary'
}>()
</script>

<style lang="css">
.dsButton_color-primary {
  background-color: #141414;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  padding: 7px 20px;
}
</style>
