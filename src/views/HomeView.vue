<template>
  <div class="home">
    <div class="home_header">
      <h1>Accueil</h1>
    </div>
    <div class="home_mangas">
      <template v-for="manga in mangas" :key="manga.id">
        <div class="home_img" @click="gotToChapters(manga.title)">
          <img :src="manga.thumbnails" alt="Logo" />
          <p>{{ manga.title }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getMangaSupabase } from './service/getMangas.service'
import { useRouter } from 'vue-router'

const router = useRouter()
const mangas = ref()

onMounted(async () => {
  mangas.value = await getMangaSupabase()
})

const gotToChapters = (title: string) => {
  router.push({
    path: `/${title}`,
  })
}
</script>

<style lang="scss">
.home {
  position: relative;
  z-index: 1;
  padding: 20px;
  gap: 5%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.home_mangas {
  padding-top: 10%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5%;
}

.home_img {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
  object-fit: cover;
  width: 45%;
  align-items: top;

  img {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 15px;
  }

  p {
    font-size: 13px;
  }
}
</style>
