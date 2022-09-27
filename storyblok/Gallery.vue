<script setup>
const props = defineProps({ blok: Object })
console.log('props', props)
</script>
<template>
  <div v-if="blok" v-editable="blok" class="blok gallery-blok mb-3">
    <div class="grid">
      <div
        v-for="item in props.blok.images"
        :key="item.id"
        class="col-6 md:col-4 lg:col-3 xxl:col-2"
      >
        <sb-image :src="item" size="351x233" preview />
      </div>
    </div>
  </div>
</template>
