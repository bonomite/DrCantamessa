<script setup>
defineProps({ blok: Object })
</script>
<template>
  <div v-if="blok" v-editable="blok" class="image-blok">
    <sb-image :src="blok.image" />
  </div>
</template>
