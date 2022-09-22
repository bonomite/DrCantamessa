<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
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
</script>

<template>
  <div>
    <!--     <Head>
      <Link rel="canonical" v-if="story" :href="story.url" />
    </Head> -->
    ARTICLE SLUG
    <StoryblokComponent :blok="story.content" />
  </div>
</template>

<style lang="scss">
.page.surgery {
}
</style>
