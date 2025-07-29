<template>
  <div class="scans">
    <div class="scans_return">
      <img :src="returnArrow" @click="$router.go(-1)" />
    </div>
    <div>
      <div class="scans_title" v-if="controller.titleScan">
        {{ controller.titleScan !== 'Nom à venir' ? `${scans} : ${controller.titleScan}` : scans }}
      </div>
      <div class="scans_title" v-else>One Piece</div>
    </div>
    <Skeleton
      height="28rem"
      class="scans-skeleton"
      style="width: 80%; text-align: center; aspect-ratio: 2 / 3"
      v-if="!isLoaded"
    ></Skeleton>
    <swiper
      v-if="pages !== null"
      :modules="[Keyboard, Zoom]"
      :keyboard="{ enabled: true }"
      :preloadImages="false"
      :loop="false"
      :spaceBetween="10"
      :slidesPerView="1"
      :initialSlide="pages"
      :zoom="true"
      class="reader"
      @click="goToEreader()"
      @slideChange="handleSlide"
    >
      <swiper-slide v-for="(page, index) in controller.imagesScans" :key="page.url">
        <img
          :src="
            page.url.includes('lelmanga') || page.url.includes('anime-sama.fr')
              ? `https://hangoverscans.fr/compressImage.php?imgurl=${page.url}`
              : page.url
          "
          class="page-image"
          :alt="`OnePiece page ${index}`"
          @load="onImageLoaded"
        />
      </swiper-slide>
    </swiper>
    <div
      v-if="controller.imagesScans && activeIndex >= 0 && controller.imagesScans"
      class="scans_pages"
    >
      {{ activeIndex + 1 }} / {{ controller.imagesScans.length }}
    </div>
  </div>
</template>

<script setup lang="ts">
import RETURN_ARROW from '@/assets/img/icons/return-arrow.svg'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import { ScansController } from '@/components/Modules/Scans/Controllers/scans.controller'
import { getAllScans } from '@/components/Modules/Scans/services/scans.services'
import Skeleton from 'primevue/skeleton'

import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperTypes } from 'swiper/types'
import { Keyboard, Zoom } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/zoom'

const route = useRoute()
const router = useRouter()
const id = route.params.id as string
const scans = route.params.scans as string
const returnArrow = RETURN_ARROW

const activeIndex = ref(0)

const controller = reactive(new ScansController(() => getAllScans(id, scans)))
const pages = ref<number | null>(null)

const isLoaded = ref(false)

onMounted(async () => {
  await controller.setup()
  pages.value = controller.setPagesScans(scans, parseInt(id))
})

const onImageLoaded = () => {
  isLoaded.value = true
}

const handleSlide = (event: SwiperTypes) => {
  activeIndex.value = event.activeIndex
  const finished = controller.imagesScans.length - 1 === activeIndex.value ? 'read' : 'reading'

  controller.updateHistoryPages(scans, parseInt(id), activeIndex.value, finished)
}

const goToEreader = () => {
  router.push({
    path: `/scans/${scans}/${id}/ereader`,
  })
}
</script>

<style lang="scss" scoped>
.scans {
  height: 100dvh;

  position: relative;

  &-skeleton {
    margin: 10% auto 0 auto;
  }

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

.page-image {
  margin-left: 10.5%;
}
</style>
