<script setup lang="ts">
import UpdateBanner from '@/components/DsSystem/DsUpdateBanner.vue'
</script>

<template>
  <!-- updated 2 -->
  <RouterView />
  <UpdateBanner />
</template>

<style lang="scss">
#app {
  background-color: $background;
  min-height: 100vh;
}
</style>
