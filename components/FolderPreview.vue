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
  <div class="folder-preview mb-8" v-if="articles.stories.length > 1">
    <div v-if="pending">LOADING!!!!!!!!!!!!!</div>
    <div v-else>
      <div class="flex justify-content-between align-items-end">
        <h3 class="uppercase" style="line-height: 0.75rem">{{ folderName }}</h3>
        <nuxt-link :to="`/${folderName}`">
          <Button class="p-button-sm">See all</Button>
        </nuxt-link>
      </div>
      <Divider class="block mb-5" />
      <div class="grid">
        <template
          class=""
          v-for="(article, index) in articles.stories"
          :key="`preview-${article.name}`"
        >
          <div class="col-4">
            <div class="article-card flex flex-column relative">
              <nuxt-link :to="article.full_slug">
                <sb-image :src="article.content.poster" size="443x222" />
              </nuxt-link>
              <nuxt-link class="overlay-title" :to="article.full_slug">
                <h3>{{ article.name }}</h3>
              </nuxt-link>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.folder-preview {
  .article-card {
    .overlay-title {
      position: absolute;
      bottom: 0;
      padding: 1rem;
      padding-top: 3rem;
      width: 100%;
      background: -moz-linear-gradient(
        top,
        rgba(71, 31, 97, 0) 0%,
        rgba(71, 31, 97, 0.8) 58%,
        rgba(71, 31, 97, 1) 100%
      );
      background: -webkit-linear-gradient(
        top,
        rgba(71, 31, 97, 0) 0%,
        rgba(71, 31, 97, 0.8) 58%,
        rgba(71, 31, 97, 1) 100%
      );
      background: linear-gradient(
        to bottom,
        rgba(71, 31, 97, 0) 0%,
        rgba(71, 31, 97, 0.8) 58%,
        rgba(71, 31, 97, 1) 100%
      );
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00471f61', endColorstr='#471f61',GradientType=0 );
      * {
        color: #ffffff;
      }
    }
  }
}
</style>
