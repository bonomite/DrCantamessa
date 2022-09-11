<script setup>
const story = await useStoryblok('home', { version: 'draft' })
</script>

<template>
  <section>
    <div class="content">
      <StoryblokComponent :blok="story.content" />
    </div>
  </section>
</template>

<style lang="scss">
.comp-name {
}
</style>
