<script setup>
defineProps({ blok: Object })
</script>
<template>
  <div v-editable="blok" class="text-center">
    {{ blok.headline }}
  </div>
</template>
