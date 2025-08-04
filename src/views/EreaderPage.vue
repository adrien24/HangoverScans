<template>
  <Teleport to="body" v-if="showHeader">
    <div class="scan_header">
      <DsBackButton class="scan_header_button" />
      <h3>Chapitre {{ id }}</h3>
      <DsButton title="Suivant" />
    </div>
  </Teleport>
  <DsSlider @click="toggleHeader()" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const id = route.params.id as string
const showHeader = ref(false)

const toggleHeader = () => {
  console.log('showHeader', showHeader.value)

  showHeader.value = !showHeader.value
}
</script>

<style lang="scss">
.scan_header {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
  padding: 0 15px;
  width: 100%;
}

.scan_header_button {
  width: 70px;
}
</style>
