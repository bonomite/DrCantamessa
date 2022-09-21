<script setup>
const story = await useStoryblok('home', { version: 'published' })
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
    INDEX PAGE
    <StoryblokComponent :blok="story.content" />
    <section>
      <div class="content">
        <h1>{{ story.content.title }}</h1>
        <div v-for="(folder, index) in globalMenuData">
          <FolderPreview :to="folder.to" :key="`folderPreview-${index}`" />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.comp-name {
}
</style>
