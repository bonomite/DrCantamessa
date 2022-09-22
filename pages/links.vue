<script setup>
const story = await useStoryblok('links', { version: 'published' })
const globalMenuData = useMenuData()
//const config = useRuntimeConfig()
// const { data: surgeries } = await useFetch(
//   `https://api-us.storyblok.com/v2/cdn/stories/?starts_with=surgery&token=${config.STORYBLOK_API_KEY_PREVIEW}&version=published`
// )

//console.log('story  = ', story.value)

//console.log('globalMenuData  = ', globalMenuData.value)
</script>

<template>
  <div>
    <section class="links-page">
      <div class="content">
        <h1>{{ story.content.title }}</h1>
        <StoryblokComponent :blok="story.content" />
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.links-page {
}
</style>
