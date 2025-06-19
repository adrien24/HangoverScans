<template>
  <div v-if="showBanner" class="update-banner">
    <div class="update-banner__content">
      <div class="update-banner__message">
        <h3>🚀 Nouvelle version disponible</h3>
        <ul class="update-banner__changelog">
          <li>✨ Ajout du marque page</li>
          <li>⚡ Amélioration des performances</li>
        </ul>
      </div>
      <button class="update-banner__button" @click="update">Mettre à jour</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

const { needRefresh, updateServiceWorker } = useRegisterSW()
const showBanner = ref(false)

watchEffect(() => {
  if (needRefresh.value) {
    showBanner.value = true
  }
})

function update() {
  updateServiceWorker()
  window.location.reload()
}
</script>

<style lang="scss" scoped>
.update-banner {
  position: fixed;
  bottom: 3rem;
  left: 1rem;
  right: 1rem;
  margin: auto;
  max-width: 600px;
  background-color: #03226a;
  color: #856404;
  border: 1px solid #02277d;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  &__message {
    flex: 1;
    h3 {
      margin: 0 0 0.5rem;
      font-size: 1rem;
      font-weight: 600;
    }

    .update-banner__changelog {
      list-style: disc;
      padding-left: 1.25rem;
      margin: 0;

      li {
        margin-bottom: 0.25rem;
        font-size: 0.875rem;
      }
    }
  }

  &__button {
    background-color: #0c88cb;
    display: flex;
    justify-content: flex-end;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
    white-space: nowrap;
    margin-top: 0.25rem;
  }
}
</style>
