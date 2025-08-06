<template>
  <Teleport to="body" v-if="controller.showHeader">
    <div class="scan_header">
      <DsBackButton class="scan_header_button" @click="backToChapter()" />
      <h3 class="scan_header_title">Chapitre {{ id }}</h3>
      <div class="scan_header_menu">
        <DsMenu
          :items="controller.menuItems"
          @itemsMenuClicked="controller.menuItemsClicked($event, scans)"
        />
      </div>
    </div>
  </Teleport>
  <DsSlider
    v-if="!controller.isSlider"
    @click="controller.toggleHeader()"
    :controller
    :scans
    :id
    @last-slide-reached="controller.nextChapterAvailable(id, allChapters)"
  />
  <div class="scan_one_column" v-else @click="controller.toggleHeader()">
    <div class="scan_one_column_container">
      <div class="scan_one_column_content">
        <div class="scan_one_column_image">
          <img
            v-for="(page, index) in controller.imagesScans"
            :key="index"
            :src="
              page.url.includes('lelmanga') || page.url.includes('anime-sama.fr')
                ? `https://hangoverscans.fr/compressImage.php?imgurl=${page.url}&noresize=1`
                : page.url
            "
            class="page-image"
            :alt="`${scans} page ${index}`"
          />
        </div>
      </div>
    </div>
  </div>
  <Teleport to="body" v-if="controller.showHeader">
    <DsButton title="Chapitre suivant" @click="nextChapter()" class="scan_header_button-bottom" />
  </Teleport>
</template>

<script setup lang="ts">
import { getAllChapters } from '@/components/Modules/Chapters/services/chapters.services'
import {
  ScansController,
  type allChaptersResponse,
} from '@/components/Modules/Scans/Controllers/scans.controller'
import { getAllScans } from '@/components/Modules/Scans/services/scans.services'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const id = route.params.id as string
const scans = route.params.scans as string
const allChapters = ref<Array<allChaptersResponse>>([])

const controller = reactive(new ScansController(() => getAllScans(id, scans)))

onMounted(async () => {
  allChapters.value = await getAllChapters(scans)
  await controller.setup()

  controller.isSlider = localStorage.getItem(`scans-orientation-${scans}`) === 'notSlider'
})

const nextChapter = () => {
  if (localStorage.getItem(`scans-orientation-${scans}`) === 'notSlider')
    controller.updateHistoryPages(scans, parseInt(id), controller.imagesScans.length, 'read')

  const nextChapter = parseInt(id) + 1

  if (nextChapter > allChapters.value.length) {
    return
  }
  router.push({
    name: 'EreaderPage',
    params: {
      id: nextChapter,
      scans,
    },
  })
  window.location.reload()
}

const backToChapter = () => {
  router.push({
    path: `/${scans}`,
  })
}
</script>

<style lang="scss">
.scan_header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px 0 15px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.scan_header_menu {
  width: 52px;
  display: flex;
  justify-content: flex-end;
}

.scan_header_button {
  width: 70px;
  &-bottom {
    width: fit-content;
    position: absolute;
    bottom: 3%;
    right: 0;
    transform: translateX(-10%);
    z-index: 10;
  }
}

.scan_one_column_image {
  position: absolute;
  top: 0;
  z-index: 10;
  img {
    max-width: 100%;
  }
}
</style>
