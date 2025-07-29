<script setup lang="ts">
import UpdateBanner from '@/components/DsSystem/DsUpdateBanner.vue'
</script>

<template>
  <RouterView />
  <UpdateBanner />
</template>

<style lang="scss">
#app {
  position: relative;
  background-color: #09172b;
  min-height: 100dvh;
  overflow-x: hidden;
}

#app::before {
  content: '';
  position: absolute;
  top: -50px;
  left: 0;
  width: 100%;
  height: 350px; /* 50px au-dessus + 100px visibles */
  background: linear-gradient(180deg, #142f54 0%, transparent 100%);
  z-index: 0; /* s'assure que ça reste derrière le contenu */
  pointer-events: none;
}
</style>
