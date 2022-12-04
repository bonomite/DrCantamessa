<script setup>
const props = defineProps({ blok: Object })
const richText = computed(() => renderRichText(props.blok.rich_text))
</script>
<template>
  <div v-if="blok" v-editable="blok" class="blok text-blok mb-3">
    <div class="col-12 md:col-10 lg:col-8 xl:col-6 mx-auto" v-html="richText" />
  </div>
</template>

<style lang="scss">
.text-blok {
  p {
    margin-bottom: 1.5rem;
  }
  img {
    max-width: 100%;
    display: block;
  }
}
</style>
