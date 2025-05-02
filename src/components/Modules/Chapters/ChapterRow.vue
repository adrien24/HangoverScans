<template>
  <div class="chapter">
    <div class="chapter_header">
      <DsMultiselect
        v-if="controller.selectedChapters.length > 0"
        :options="controller.selectedChapters"
        id="chapters"
        name="Selectionner le chapitre"
        label="Sélectionner le chapitre"
        :multiple="true"
        @update:modelValue="controller.updateSelectedChapters($event)"
      />
      <h3>Chapitres</h3>
    </div>

    <div class="chaptersRow">
      <div
        class="chapterRow"
        v-for="chapter in controller.chapitersFiltered"
        :key="chapter.id"
        :id="String(chapter.id)"
        @click="goToScans(chapter.id)"
      >
        <div class="chapterRow__number">{{ chapter.id }}</div>
        <div class="chapterRow__title">{{ chapter.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { ChapterRowController } from './Controllers/chapterRow.controller'
import { getAllChapters } from './services/chapters.services'
import DsMultiselect from '@/components/DsSystem/DsMultiselect.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const controller = reactive(new ChapterRowController(() => getAllChapters()))

onMounted(async () => {
  await controller.setup()
})

const goToScans = (chapterId: number) => {
  router.push({
    path: `/scans/OnePiece/${chapterId}`,
  })
}
</script>

<style lang="scss" scoped>
.chaptersRow {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .chapterRow {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 20px;
    background-color: #f0f0f0;
    border-radius: 5px;
    cursor: pointer;
    gap: 10px;

    &__number {
      font-weight: bold;
      font-size: 1em;
      color: #333;
    }

    &__title {
      font-size: 1em;
      color: #333;
      white-space: nowrap; // empêche le retour à la ligne
      overflow: hidden; // cache le texte qui dépasse
      text-overflow: ellipsis; // affiche "…" à la fin si le texte est trop long
      max-width: 100%;
    }
  }
}
</style>
