<script setup>
defineProps({ blok: Object })
</script>
<template>
  <div v-editable="blok" class="w-full p-4 text-center">
    <h3 class="font-bold">
      {{ blok.name }}
    </h3>
  </div>
</template>
