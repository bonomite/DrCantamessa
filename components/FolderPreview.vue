<script setup>
//import { ref, computed, onMounted } from 'vue'

const config = useRuntimeConfig()
const props = defineProps({
  to: {
    type: String,
    default: null,
  },
})

// remove the initial "/"
const folderName = props.to.replace(/^\/|\/$/g, '')

const {
  data: articles,
  pending,
  error,
  refresh,
} = await useFetch(
  `${config.STORYBLOK_API_URL}/stories?starts_with=${folderName}&is_startpage=0&per_page=3&token=${config.STORYBLOK_API_KEY_PREVIEW}&version=published`,
  { key: `articles-${folderName}` }
)

console.log('articles = ', articles.value)
</script>

<template>
  <div class="folder-preview" v-if="articles.stories.length > 1">
    <div v-if="pending">LOADING!!!!!!!!!!!!!</div>
    <div v-else class="grid">
      <template
        class=""
        v-for="(article, index) in articles.stories"
        :key="`preview-${article.name}`"
      >
        <div class="col-4">
          <div>name = {{ article.name }} {{ article.parent_id }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.folder-preview {
}
</style>
