<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    fill="white"
    @click="isOpenMenu = !isOpenMenu"
    class="dsMenuIcon"
  >
    <path
      d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z"
    />
  </svg>

  <teleport to="body" v-if="isOpenMenu">
    <div class="dsMenu">
      <ul>
        <li
          v-for="value in items"
          :key="value"
          @click="(emit('itemsMenuClicked', value), (isOpenMenu = !isOpenMenu))"
        >
          {{ value }}
        </li>
      </ul>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isOpenMenu = ref(false)

const { items } = defineProps<{
  items: string[]
}>()

const emit = defineEmits<{
  (e: 'itemsMenuClicked', value: string): void
}>()
</script>

<style lang="scss">
.dsMenuIcon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dsMenu {
  z-index: 10;
  position: fixed;
  top: 60px;
  right: 20px;
  background-color: #333;
  color: white;
  padding: 10px;
  border-radius: 5px;
  max-width: 100%;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 5px 10px;
      cursor: pointer;

      &:hover {
        background-color: #444;
      }
    }
  }
}
</style>
