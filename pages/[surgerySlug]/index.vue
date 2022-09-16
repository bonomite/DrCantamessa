<script setup>
const story = await useStoryblok('surgery', { version: 'draft' })
//console.log('surgery story = ', story.value.content)

// const date = new Date(story.value.first_published_at).toDateString()
const title = story.value.content.title
const info = computed(() => renderRichText(story.value.content.info))
const poster = story.value.content.poster
</script>

<template>
  <section class="surgery-index">
    <nuxt-link to="/">home</nuxt-link>
    <sb-image :src="poster" options="400x0" />
    <sb-image :src="poster" />
    <div class="content">
      <h1>{{ title }}</h1>
      <div v-html="info" />

      <StoryblokComponent :blok="story.content" />
    </div>
  </section>
</template>

<style lang="scss">
.surgery-index {
  .poster {
    width: 100%;
    height: auto;
  }
}
</style>
