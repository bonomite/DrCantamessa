<script setup>
const story = await useStoryblok('home', { version: 'draft' })
const globalMenuData = useMenuData()
//const config = useRuntimeConfig()
// const { data: surgeries } = await useFetch(
//   `https://api-us.storyblok.com/v2/cdn/stories/?starts_with=surgery&token=${config.STORYBLOK_API_KEY_PREVIEW}&version=published`
// )

// console.log('surgeries  = ', surgeries.value)

//console.log('globalMenuData  = ', globalMenuData.value)
</script>

<template>
  <div>
    <StoryblokComponent :blok="story.content" />
    <section>
      <div class="content">
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
