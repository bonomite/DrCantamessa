<script setup>
const props = defineProps({ blok: Object })
const richText = computed(() => renderRichText(props.blok.rich_text))
</script>
<template>
  <div v-if="blok" v-editable="blok" class="blok text-blok mb-3">
    <div v-html="richText" />
  </div>
</template>
