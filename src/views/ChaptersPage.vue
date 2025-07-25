<template>
  <div class="scanPage">
    <div class="scanPage_header">
      <span class="scanPage_style">Shonen</span>
      <img :src="returnArrow" @click="$router.go(-1)" />
    </div>

    <h1>{{ title }}</h1>
    <span class="scanPage_release">date de parution à venir</span>

    <p class="scanPage_synopsis">Description à venir</p>

    <div class="scanPage_chapters">
      <ChapterRow />
    </div>
  </div>
</template>

<script setup lang="ts">
import RETURN_ARROW from '@/assets/img/icons/return-arrow.svg'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const returnArrow = RETURN_ARROW
const router = useRouter()

const title = router.currentRoute.value.params.scan as string

onMounted(() => {})
</script>

<style lang="scss" scoped>
.scanPage_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
}
.scanPage {
  position: relative;
  z-index: 1;
  padding: 30px 25px;

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
