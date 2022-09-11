<script setup>
const story = await useStoryblok('home', { version: 'draft' })
</script>
 
<template>
  <StoryblokComponent :blok="story.content" />
</template>

<style lang="scss">
.comp-name{

}
</style>
