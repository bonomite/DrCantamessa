<script setup>
defineProps({ blok: Object })
</script>
<template>
  <div v-if="blok" v-editable="blok" class="page-blok listing-page">
    <StoryblokComponent
      v-for="blok in blok.body"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>
