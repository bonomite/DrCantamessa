<script setup>
defineProps({ blok: Object })
</script>
<template>
  <div v-if="blok" v-editable="blok" class="blok embed-blok mb-3">
    <EmbedComp :code="blok.embedcode" />
  </div>
</template>
