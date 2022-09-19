<script setup>
//import { ref, computed, onMounted } from 'vue'

const config = useRuntimeConfig()
const props = defineProps({
  to: {
    type: String,
    default: null,
  },
})

const {
  data: articles,
  pending,
  error,
  refresh,
} = await useFetch(
  `https://api-us.storyblok.com/v2/cdn/stories/?starts_with=${props.to}&token=${config.STORYBLOK_API_KEY_PREVIEW}&version=published`,
  { key: `articles-${props.to}` }
)
</script>

<template>
  <div>
    <div v-if="pending">LOADING!!!!!!!!!!!!!</div>
    <div
      v-else
      class="folder-preview"
      v-for="(article, index) in articles.stories"
    >
      <div
        v-if="!article.is_startpage && article.parent_id > 0"
        :key="`preview-${article.name}`"
      >
        name = {{ article.name }} {{ article.parent_id }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.folder-preview {
}
</style>
