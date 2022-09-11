<script setup>
defineProps({ blok: Object })
</script>
<template>
  <div v-editable="blok" class="grid feature-blok">
    <StoryblokComponent
      v-for="blok in blok.columns"
      :key="blok._uid"
      :blok="blok"
      class="col feature"
    />
  </div>
</template>

<style lang="scss">
.feature-blok {
  gap: 2rem;
  .feature {
    background: red;
  }
}
</style>
