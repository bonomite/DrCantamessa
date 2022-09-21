<script setup lang="ts">
const route = useRoute()

// const {
//   data: articles,
//   pending,
//   error,
//   refresh,
// } = await useFetch(
//   `${config.STORYBLOK_API_URL}/stories/${route.fullPath}?token=${config.STORYBLOK_API_KEY_PREVIEW}&version=published`
// )

const story = await useStoryblok(route.fullPath, { version: 'published' })

console.log('story = ', story.value)
//console.log('articles = ', articles)
import { onMounted, onUnmounted, computed } from 'vue'

const article = {}

onMounted(() => {})

onUnmounted(() => {})
</script>

<template>
  <div>
    <Head>
      <Link rel="canonical" v-if="article" :href="article.url" />
    </Head>
    <section v-if="article">
      <div class="content">
        <h1 class="page-name">{{ story.name }}</h1>
        <h2 class="page-name">{{ route.fullPath }}</h2>
        <!-- <StoryblokComponent :blok="story.content" /> -->
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.page.surgery {
}
</style>
