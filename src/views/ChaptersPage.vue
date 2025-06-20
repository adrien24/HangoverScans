<template>
  <div class="scanPage">
    <div class="scanPage_style">Shonen</div>
    <h1>One Piece</h1>
    <div class="scanPage_release">22 juillet 1997</div>

    <div class="scanPage_synopsis">
      Luffy, un jeune garçon, rêve de devenir le Roi des Pirates en trouvant le One Piece, le trésor
      ultime rassemblé par Gol D. Roger, le seul pirate à avoir jamais porté le titre de Roi des
      Pirates.
    </div>

    <div class="scanPage_chapters">
      <ChapterRow />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {})
</script>

<style lang="scss" scoped>
.scanPage {
  position: relative;
  z-index: 1;
  padding: 60px 25px;

  &_style {
    font-size: $fs-lg;
    font-style: italic;
    font-weight: 300;
    letter-spacing: 1px;
  }

  &_return {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;

    img {
      width: 30px;
      height: 30px;
    }
  }

  h1 {
    font-family: 'Anton', sans-serif;
    font-weight: 400;
    font-size: $fs-big;
    font-style: normal;
  }

  &_release {
    font-size: $fs-sm;
    font-weight: 300;
    font-style: italic;
    letter-spacing: 1px;
  }

  &_synopsis {
    font-size: $fs-md;
    font-weight: 400;
    font-style: normal;
    letter-spacing: normal;
    margin-top: 20px;
  }

  &_chapters {
    margin-top: 40px;
  }
}
</style>
