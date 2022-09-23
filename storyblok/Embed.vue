<script setup>
defineProps({ blok: Object })
</script>
<template>
  <div v-if="blok" v-editable="blok" class="embed-blok">
    <EmbedComp :code="blok.embedcode" />
  </div>
</template>
