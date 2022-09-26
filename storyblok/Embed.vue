<script setup>
defineProps({ blok: Object })
</script>
<template>
  <div v-if="blok" v-editable="blok" class="embed-blok mb-3">
    <EmbedComp :code="blok.embedcode" />
  </div>
</template>
