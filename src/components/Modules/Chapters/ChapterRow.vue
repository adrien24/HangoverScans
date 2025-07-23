<template>
  <div class="chapter">
    <div class="chapter_header">
      <template v-for="skeleton in 1" :key="skeleton">
        <Skeleton height="2.8rem" class="mb-2" v-if="!controller.isLoaded"></Skeleton>
      </template>
      <DsMultiselect
        v-if="controller.selectedChapters.length > 0"
        :options="controller.selectedChapters"
        id="chapters"
        name="Selectionner le chapitre"
        label="Sélectionner le chapitre"
        @update:modelValue="controller.updateSelectedChapters($event)"
      />
      <h3>Chapitres</h3>
    </div>

    <div class="chaptersRow">
      <template v-for="skeleton in 5" :key="skeleton">
        <Skeleton height="2.8rem" class="mb-2" v-if="!controller.isLoaded"></Skeleton>
      </template>
      <div
        class="chapterRow_chapter chapterRow"
        v-for="chapter in controller.chapitersFiltered.sort((a, b) => b.chapter - a.chapter)"
        :key="chapter.title"
        :id="String(chapter.chapter)"
        @click="goToScans('One Piece', chapter.chapter)"
      >
        <div class="chapterRow_row">
          <p class="chapterRow__number">{{ chapter.chapter }}</p>
          <p class="chapterRow__title">{{ chapter.title }}</p>
        </div>
        <font-awesome-icon
          :icon="['fas', 'check']"
          :class="{
            finished: controller.isChapterFinished(chapter.chapter),
            unread: controller.isChapterUnread(chapter.chapter),
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { ChapterRowController } from './Controllers/chapterRow.controller'
import { getAllChapters } from './services/chapters.services'
import DsMultiselect from '@/components/DsSystem/DsMultiselect.vue'
import Skeleton from 'primevue/skeleton'
import { useRouter } from 'vue-router'
const router = useRouter()

const controller = reactive(new ChapterRowController(() => getAllChapters()))

onMounted(async () => {
  await controller.setup()
})

const goToScans = (title: string, id: number) => {
  router.push({
    path: `/scans/${title}/${id}`,
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
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #0f223b;
    border-radius: 7px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    border: #213170 0.1px solid;
    cursor: pointer;
    gap: 10px;

    &_chapter {
      display: flex;
      &__number {
        font-weight: bold;
        font-size: 1em;
        color: #f0f3fa;
      }

      &__title {
        font-size: 1em;
        color: #f0f3fa;
        white-space: nowrap; // empêche le retour à la ligne
        overflow: hidden; // cache le texte qui dépasse
        text-overflow: ellipsis; // affiche "…" à la fin si le texte est trop long
        max-width: 100%;
      }
    }

    &_row {
      display: flex;
      gap: 15px;
    }
  }
}

.finished {
  color: #00ff0084;
  font-size: 1.2em;
}
.unread {
  display: none;
}
</style>
