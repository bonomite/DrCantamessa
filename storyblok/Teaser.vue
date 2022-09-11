<script setup>
defineProps({ blok: Object })
</script>
<template>
  <div v-editable="blok" class="py-4 text-center">
    {{ blok.headline }}
  </div>
</template>
