<script setup lang="ts">
import { onMounted } from 'vue'
import { useDevToolsBlocker } from '@/useDevToolsBlocker'

const { enable } = useDevToolsBlocker({ redirectUrl: '/bloque' })

onMounted(() => {
  console.log('App mounted')

  enable()
  document.addEventListener('contextmenu', function (e) {
    console.log('Context menu disabled')
  })
})
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
#app {
  background-color: $background;
  min-height: 100vh;
}
</style>
