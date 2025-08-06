<template>
  <div class="backButton">
    <div class="backButton_up"></div>
    <div class="backButton_down"></div>
  </div>
</template>

<style lang="scss" scoped>
.backButton {
  display: flex;
  flex-direction: column;
  gap: 9.5px;
}

.backButton_up {
  rotate: -38deg;
}

.backButton_down {
  rotate: 38deg;
}

.backButton_up,
.backButton_down {
  width: 20px;
  height: 2px;
  background-color: white;
}
</style>
