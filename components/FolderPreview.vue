<script setup>
//import { ref, computed, onMounted } from 'vue'

const config = useRuntimeConfig()
const props = defineProps({
  to: {
    type: String,
    default: null,
  },
  noHeader: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: String,
    default: "100",
  },
})

// remove the initial "/"
const folderName = props.to.replace(/^\/|\/$/g, "")
console.log("folderName = ", folderName)

const { data: articles, pending, error, refresh } = await useFetch(
  `${config.public.STORYBLOK_API_URL}/stories?starts_with=${folderName}&is_startpage=0${
    props.limit ? `&per_page=${props.limit}` : ""
  } &token=${config.public.STORYBLOK_API_KEY_PREVIEW}&version=published`,
  { key: `articles-${folderName}` }
)

//console.log('articles = ', articles.value)
const showFolderContent = computed(() => {
  return articles.value.stories[0]?.parent_id
})
</script>

<template>
  <div class="folder-preview mb-8" v-if="showFolderContent">
    <div v-if="pending">LOADING...</div>
    <div v-else>
      <div v-if="!noHeader" class="flex justify-content-between align-items-end">
        <nuxt-link :to="`/${folderName}`" class="no-underline">
          <p class="uppercase text-2xl" style="line-height: 0.75rem">
            {{ folderName }}
          </p>
        </nuxt-link>
        <nuxt-link :to="`/${folderName}`">
          <Button class="p-button-sm">See all</Button>
        </nuxt-link>
      </div>
      <Divider v-if="!noHeader" class="block mb-5" />
      <div class="grid">
        <template
          class=""
          v-for="(article, index) in articles.stories"
          :key="`preview-${article.name}`"
        >
          <div class="col-12 md:col-4">
            <div class="article-card flex flex-column relative">
              <nuxt-link :to="article.full_slug">
                <sb-image :src="article.content.poster" size="443x222" />
              </nuxt-link>
              <nuxt-link class="overlay-title" :to="article.full_slug">
                <h4 class="title">{{ article.name }}</h4>
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
      .title {
        @include media("<xl") {
          font-size: 1.25em;
        }
      }
    }
  }
}
</style>
