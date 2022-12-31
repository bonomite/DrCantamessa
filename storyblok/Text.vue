<script setup>
const props = defineProps({ blok: Object })
const richText = computed(() => renderRichText(props.blok.rich_text))
const fullWidth = ref(props.blok.full_width)
</script>
<template>
  <div
    v-if="blok"
    v-editable="blok"
    class="blok text-blok mb-3"
    :class="[{ 'full-width': fullWidth }]"
  >
    <div v-html="richText" />
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
