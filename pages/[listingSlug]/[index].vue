<script setup>
const route = useRoute()
const story = await useAsyncStoryblok(route.fullPath, { version: 'published' })
//console.log('story = ', story)

const title = story.value.content.title
const info = computed(() => renderRichText(story.value.content.info))
const poster = story.value.content.poster
console.log('story.value', story.value.content.poster)
</script>

<template>
  <section class="index-page">
    <sb-image :src="poster" />
    <div class="content">
      <div class="mb-3">
        <div class="col-12">
          <h1 class="mb-2">{{ title }}</h1>
          <div v-html="info" />
        </div>
      </div>
      <StoryblokComponent v-if="story" :blok="story.content" />
      <FolderPreview :to="route.fullPath" noHeader class="mt-6" />
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
