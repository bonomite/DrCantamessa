<script setup>
const props = defineProps({ blok: Object })
//console.log('props', props)

/* const launchGallery = (index) => {
  console.log('launch and show = ', index)
}
const responsiveOptions = [
  {
    breakpoint: '1024px',
    numVisible: 5,
  },
  {
    breakpoint: '768px',
    numVisible: 3,
  },
  {
    breakpoint: '560px',
    numVisible: 1,
  },
]

const images = ref([]) */

/* onBeforeMount(() => {
  props.blok.images.forEach((image) => {
    //console.log('image = ', image)
    images.value.push({
      itemImageSrc: image.filename,
      thumbnailImageSrc: image.filename,
      alt: image.alt,
      title: image.title,
    })
  })
  console.log('images = ', images.value)
}) */

// const images = [
//   {
//     itemImageSrc: 'demo/images/galleria/galleria1.jpg',
//     thumbnailImageSrc: 'demo/images/galleria/galleria1s.jpg',
//     alt: 'Description for Image 1',
//     title: 'Title 1',
//   },
//   {
//     itemImageSrc: 'demo/images/galleria/galleria2.jpg',
//     thumbnailImageSrc: 'demo/images/galleria/galleria2s.jpg',
//     alt: 'Description for Image 2',
//     title: 'Title 2',
//   },
// ]
</script>
<template>
  <div v-if="blok" v-editable="blok" class="blok gallery-blok mb-3">
    <div class="grid">
      <div
        v-for="(item, index) in props.blok.images"
        :key="item.id"
        class="col-6 md:col-4 lg:col-3 xxl:col-2"
      >
        <sb-image :src="item" size="351x233" @click="launchGallery(index)" />
      </div>
    </div>
    <!--     <ClientOnly>
      <Galleria v-if="images.length" :value="images">
        <template #item="slotProps">
          <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" />
        </template>
      </Galleria>
    </ClientOnly> -->
    <!-- <Galleria
      v-if="images.length"
      :value="images"
      :responsiveOptions="responsiveOptions"
      :numVisible="5"
    >
      <template #item="slotProps">
        <img
          :src="slotProps.item.itemImageSrc"
          :alt="slotProps.item.alt"
          style="width: 100%"
        />
      </template>
      <template #thumbnail="slotProps">
        <img
          :src="slotProps.item.thumbnailImageSrc"
          :alt="slotProps.item.alt"
        />
      </template>
    </Galleria> -->
  </div>
</template>
