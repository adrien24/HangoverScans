<template>
  <div class="scans" v-if="controller.imagesScans.length > 0">
    <div class="scans_return" v-if="!controller.isReading">
      <img :src="returnArrow" @click="$router.go(-1)" />
    </div>
    <div v-if="!controller.isReading" :class="{ fadeOut: controller.isReading }">
      <div class="scans_title">
        One Piece {{ controller.titleScan !== 'Nom à venir' ? `: ${controller.titleScan}` : '' }}
      </div>
    </div>
    <swiper
      v-if="pages !== null"
      :modules="[Keyboard, Zoom]"
      :keyboard="{ enabled: true }"
      :loop="false"
      :spaceBetween="10"
      :slidesPerView="1"
      :initialSlide="pages"
      :zoom="true"
      class="reader"
      @click="controller.isReading = !controller.isReading"
      :class="{ reading: controller.isReading }"
      @slideChange="handleSlide"
    >
      <swiper-slide v-for="(page, index) in controller.imagesScans" :key="index">
        <div class="swiper-zoom-container">
          <img :src="page" class="page-image" />
        </div>
      </swiper-slide>
    </swiper>
    <div v-if="!controller.isReading" class="scans_pages">
      {{ activeIndex + 1 }} / {{ controller.imagesScans.length }}
    </div>
  </div>
</template>

<script setup lang="ts">
import RETURN_ARROW from '@/assets/img/icons/return-arrow.svg'
import { useRoute } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import { ScansController } from '@/components/Modules/Scans/Controllers/scans.controller'
import { getAllScans } from '@/components/Modules/Scans/services/scans.services'

import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperTypes } from 'swiper/types'
import { Keyboard, Zoom } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/zoom'

const route = useRoute()
const id = route.params.id as string
const scans = route.params.scans as string
const returnArrow = RETURN_ARROW

const activeIndex = ref(0)

const controller = reactive(new ScansController(() => getAllScans(id, scans)))
const pages = ref<number | null>(null)

onMounted(async () => {
  await controller.setup()
  pages.value = controller.setPagesScans('OnePiece', parseInt(id))
})

const handleSlide = (event: SwiperTypes) => {
  activeIndex.value = event.activeIndex
  controller.updateHistoryPages('OnePiece', parseInt(id), activeIndex.value)
  // const chapiterNumber = parseInt(route.params.id as string)
  // controller.updateHistoryPages('OnePiece', chapiterNumber, activeIndex.value)
}
</script>

<style lang="scss">
.scans {
  min-height: 100vh;

  &_title {
    font-size: $fs-xl;
    text-align: center;
    font-weight: 600;
    padding-top: 50px;
    color: white;
    transition: all 0.5s ease;
  }

  &_pages {
    font-size: $fs-lg;
    text-align: center;
    font-weight: 600;
    padding-top: 20px;
    color: white;
    transition: all 0.5s ease;
  }

  &_return {
    display: flex;
    justify-content: flex-end;
    padding-right: 24px;
    padding-top: 24px;

    img {
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
  }
}
.page-image {
  width: 80%;
  transition: all 0.5s ease;
}
.reader {
  margin-top: 10%;
  transition: all 0.5s ease;
}
.swiper-zoom-container {
  touch-action: none;
}

.fadeOut {
  opacity: 0;
  transition: opacity 0.5s ease;
}

.reading {
  height: 100vh;
  width: 100%;
  background-color: black;
  margin: 0;
  transition: all 0.5s ease;

  .page-image {
    width: 95%;
    object-fit: cover;
    transition: all 0.5s ease;
  }
}
</style>
