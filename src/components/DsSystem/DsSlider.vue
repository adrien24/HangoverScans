<template>
  <div class="slider">
    <Skeleton
      v-if="!isLoaded"
      height="28rem"
      class="slider_skeleton"
      style="width: 95%; height: 600px; text-align: center"
    />
    <div
      v-show="pages !== null && isLoaded"
      class="slider_reader"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <div
        class="slides_reader_container"
        :style="{ transform: `translateX(-${activeIndex * 100}%)` }"
      >
        <div v-for="(page, index) in controller.imagesScans" :key="page.url" class="slide">
          <img
            :src="
              page.url.includes('lelmanga') || page.url.includes('anime-sama.fr')
                ? `https://hangoverscans.fr/compressImage.php?imgurl=${page.url}`
                : page.url
            "
            class="page-image"
            :alt="`${scans} page ${index}`"
            @load="onImageLoaded"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, watch } from 'vue'
import Skeleton from 'primevue/skeleton'
import type { ScansController } from '../Modules/Scans/Controllers/scans.controller'

const { controller, scans, id } = defineProps<{
  controller: ScansController
  scans: string
  id: string
}>()

const activeIndex = ref(0) // ou injecté d'ailleurs

// Émettre l'événement
const emit = defineEmits(['last-slide-reached'])

watch(activeIndex, (newIndex) => {
  if (newIndex === controller.imagesScans.length - 1) {
    emit('last-slide-reached')
  }
})

const pages = ref<number | null>(null)

/** Zoom navigateur (pinch) */
const isPageZoomed = ref(false)
const isLoaded = ref(false)

/** Chargement image */
const onImageLoaded = () => {
  isLoaded.value = true
}

/** Touch / swipe */
let touchStartX = 0
let touchStartY = 0
let isPinching = false
let isVerticalScroll = false
const swipeThreshold = 50 // px à dépasser pour valider le swipe horizontal

onMounted(async () => {
  await controller.setup()
  pages.value = controller.setPagesScans(scans, parseInt(id))
  activeIndex.value = 0

  const initImagesIndex = JSON.parse(localStorage.getItem(`scans-${scans}`)!)

  if (initImagesIndex) {
    const foundFirstPage = initImagesIndex.find(
      (item: { chapter: number; pages: number; finished: string }) => item.chapter === parseInt(id),
    )
    activeIndex.value = foundFirstPage.pages
  }
  window.addEventListener('keydown', handleKeydown)

  // Détection du zoom via VisualViewport si dispo
  if (window.visualViewport) {
    const updateZoomState = () => {
      isPageZoomed.value = (window.visualViewport?.scale ?? 1) > 1
    }
    updateZoomState()
    window.visualViewport.addEventListener('resize', updateZoomState)
    window.visualViewport.addEventListener('scroll', updateZoomState)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (window.visualViewport) {
    window.visualViewport.removeEventListener('resize', () => {})
    window.visualViewport.removeEventListener('scroll', () => {})
  }
})

/** Navigation clavier */
const handleKeydown = (e: KeyboardEvent) => {
  // Si la page est zoomée, on ignore les flèches
  if (isPageZoomed.value) return
  if (e.key === 'ArrowRight') nextSlide()
  if (e.key === 'ArrowLeft') prevSlide()
}

/** Navigation slider */
const nextSlide = () => {
  if (activeIndex.value < controller.imagesScans.length - 1) {
    activeIndex.value++
    handleSlide()
  }
}

const prevSlide = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--
    handleSlide()
  }
}

/** Changement de slide -> mise à jour historique */
const handleSlide = () => {
  const finished = controller.imagesScans.length - 1 === activeIndex.value ? 'read' : 'reading'
  controller.updateHistoryPages(scans, parseInt(id), activeIndex.value, finished)
}

/** Gestes tactiles */
const onTouchStart = (e: TouchEvent) => {
  // Si zoom actif, on ne prépare aucun swipe
  if (isPageZoomed.value) return

  // S'il y a plusieurs points de contact, c'est un pinch → on bloque le swipe
  isPinching = e.touches.length > 1
  isVerticalScroll = false

  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}

const onTouchMove = (e: TouchEvent) => {
  if (isPageZoomed.value || isPinching) return
  const x = e.touches[0].clientX
  const y = e.touches[0].clientY
  const diffX = Math.abs(x - touchStartX)
  const diffY = Math.abs(y - touchStartY)

  // Si le mouvement vertical domine, on laisse scroller
  if (diffY > diffX && diffY > 10) {
    isVerticalScroll = true
  }
}

const onTouchEnd = (e: TouchEvent) => {
  // Si zoom actif, pinch, ou scroll vertical → ne pas swiper
  if (isPageZoomed.value || isPinching || isVerticalScroll) {
    isPinching = false
    isVerticalScroll = false
    return
  }

  const diffX = e.changedTouches[0].clientX - touchStartX
  const absX = Math.abs(diffX)

  if (absX > swipeThreshold) {
    if (diffX > 0) prevSlide()
    else nextSlide()
  }
}
</script>
<style lang="scss" scoped>
.slider {
  height: 100dvh;
  position: relative;
  background-color: black;
}

.slider_skeleton {
  transform: translate(2.5%, 23%);
}
.slider_reader {
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 32%;
  transition: all 0.5s ease;
  /* IMPORTANT :
     Ne pas utiliser touch-action: none; pour que le pinch-zoom natif fonctionne.
     Laisse le navigateur gérer le zoom et le scroll vertical. */
}

.slides_reader_container {
  display: flex;
  transition: transform 0.4s ease;
  width: 100%;
}

.slide {
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-image {
  width: 95%;
  transition: transform 0.3s ease;
  margin-left: 2.5%;
}
</style>
