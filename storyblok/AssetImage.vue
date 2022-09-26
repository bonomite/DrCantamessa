<script setup>
defineProps({ blok: Object })
</script>
<template>
  <div v-if="blok" v-editable="blok" class="image-blok mb-3">
    <sb-image :src="blok.image" />
  </div>
</template>
