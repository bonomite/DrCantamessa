<script setup>
const story = await useStoryblok('home', { version: 'draft' })
</script>

<template>
  <section>
    <div class="content">
      <nuxt-link to="/surgery">surgery</nuxt-link>
      <StoryblokComponent :blok="story.content" />
    </div>
  </section>
</template>

<style lang="scss">
.comp-name {
}
</style>
