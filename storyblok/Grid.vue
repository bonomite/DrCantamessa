<script setup>
const props = defineProps({ blok: Object })
const items = props.blok.columns.length
console.log('items', items)
const colValue = 12 / items
console.log('colValue', colValue)
const gridClass =
  colValue < 4
    ? `col-12 md:col-6 xxl:col-3`
    : colValue < 6
    ? `col-12 md:col-6 lg:col-4`
    : 'col-12 md:col-6'
</script>
<template>
  <div
    v-if="blok"
    v-editable="blok"
    class="grid feature-blok justify-content-center"
  >
    <StoryblokComponent
      v-for="blok in blok.columns"
      :key="blok._uid"
      :blok="blok"
      class="feature"
      :class="gridClass"
    />
  </div>
</template>

<style lang="scss">
.feature-blok {
}
</style>
