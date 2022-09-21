<script setup>
const route = useRoute()
const story = await useStoryblok(route.fullPath, { version: 'published' })
console.log('story = ', story)

const title = story.value.content.title
const info = computed(() => renderRichText(story.value.content.info))
const poster = story.value.content.poster
//console.log('story.value', story.value)
</script>

<template>
  <section class="index-page">
    LISTING SLUG INDEX
    <nuxt-link to="/">home</nuxt-link>
    <!--     <sb-image :src="poster" size="50x150" class="small" />
    <sb-image :src="poster" />
    <sb-image :src="poster" greyscale /> -->
    <div class="content">
      <h1>title = {{ title }}</h1>
      <div v-html="info" />
      <StoryblokComponent :blok="story.content" />
    </div>
  </section>
</template>

<style lang="scss">
.index-page {
  .sb-image {
    &.small {
      width: 50px;
      height: 150px;
    }
  }
}
</style>
