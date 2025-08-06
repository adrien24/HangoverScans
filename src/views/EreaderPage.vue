<template>
  <Teleport to="body" v-if="controller.showHeader">
    <div class="scan_header">
      <DsBackButton class="scan_header_button" @click="backToChapter()" />
      <h3 class="scan_header_title">Chapitre {{ id }}</h3>
    </div>
  </Teleport>
  <DsSlider
    @click="controller.toggleHeader()"
    :controller
    :scans
    :id
    @last-slide-reached="controller.nextChapterAvailable(id, allChapters)"
  />
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
})

const nextChapter = () => {
  const nextChapter = parseInt(id) + 1
  console.log(`Next chapter ID: ${nextChapter}, Total chapters: ${allChapters.value.length}`)

  if (nextChapter > allChapters.value.length) {
    console.warn('No more chapters available')
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
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50% 0 15px;
  width: 100%;
}

.scan_header_title {
  transform: translateX(50%);
  width: 100%;
  text-align: center;
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
</style>
