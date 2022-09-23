<script setup>
defineProps({ blok: Object })
</script>
<template>
  <div v-if="blok" v-editable="blok" class="grid feature-blok">
    <StoryblokComponent
      v-for="blok in blok.columns"
      :key="blok._uid"
      :blok="blok"
      class="col-12 md:col-6 xl:col-3 feature"
    />
  </div>
</template>

<style lang="scss">
.feature-blok {
}
</style>
