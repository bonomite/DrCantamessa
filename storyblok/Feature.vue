<script setup>
defineProps({ blok: Object })
</script>
<template>
  <div v-editable="blok">
    <h3 class="font-bold text-center" style="background: tan">
      {{ blok.name }}
    </h3>
  </div>
</template>
