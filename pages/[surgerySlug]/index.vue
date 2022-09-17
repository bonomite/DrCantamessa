<script setup>
const story = await useStoryblok('surgery', { version: 'draft' })
//console.log('surgery story = ', story.value.content)

// const date = new Date(story.value.first_published_at).toDateString()
const title = story.value.content.title
const info = computed(() => renderRichText(story.value.content.info))
const poster = story.value.content.poster
console.log('story.value', story.value)
</script>

<template>
  <section class="surgery-index">
    <nuxt-link to="/">home</nuxt-link>
    <sb-image :src="poster" size="150x150" class="small" />
    <sb-image :src="poster" />
    <sb-image :src="poster" greyscale />
    <div class="content">
      <h1>{{ title }}</h1>
      <div v-html="info" />

      <StoryblokComponent :blok="story.content" />
    </div>
  </section>
</template>

<style lang="scss">
.surgery-index {
  .sb-image {
    &.small {
      width: 150px;
      height: auto;
    }
  }
}
</style>
