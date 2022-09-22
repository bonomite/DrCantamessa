<script setup>
defineProps({ blok: Object })
</script>
<template>
  <div v-editable="blok" class="article-blok">
    <StoryblokComponent
      v-for="blok in blok.body"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>
