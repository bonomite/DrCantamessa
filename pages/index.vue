<script setup>
const story = await useAsyncStoryblok('home', { version: 'published' })
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
    <section class="home-page">
      <div class="content">
        <StoryblokComponent v-if="story" :blok="story.content" />
        <h1>{{ story.content.title }}</h1>
        <template
          v-for="(folder, index) in globalMenuData"
          :key="`folderPreview-${index}`"
        >
          <FolderPreview :to="folder.to" />
        </template>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.home-page {
}
</style>
