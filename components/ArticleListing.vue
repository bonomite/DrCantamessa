<script setup>
//import { ref, computed, onMounted } from 'vue'
import breakpoint from 'primevue-designer/src/assets/themes/drcantamessa/viva-light/breakpoints.module.scss'
import { formatDate } from '~/utilities/helpers.js'
const currentBreakpoint = useCurrentBreakpoint()
const config = useRuntimeConfig()
const props = defineProps({
  to: {
    type: String,
    default: null,
  },
  noHeader: {
    type: Boolean,
    default: true,
  },
  limit: {
    type: String,
    default: '100',
  },
})

// remove the initial "/"
const folderName = props.to.replace(/^\/|\/$/g, '')
//console.log('folderName = ', folderName)

const {
  data: articles,
  pending,
  error,
  refresh,
} = await useFetch(
  `${
    config.STORYBLOK_API_URL
  }/stories?starts_with=${folderName}&is_startpage=0${
    props.limit ? `&per_page=${props.limit}` : ''
  } &token=${config.STORYBLOK_API_KEY_PREVIEW}&version=published`,
  { key: `articles-${folderName}` }
)

console.log('articles = ', articles.value)
const showFolderContent = computed(() => {
  return articles.value.stories[0]?.parent_id
})

const getSize = computed(() => {
  let size = '442x248'
  if (
    currentBreakpoint.value &&
    Number(currentBreakpoint.value) < Number(breakpoint.lg)
  ) {
    size = '233x233'
    return size
  } else {
    return size
  }
})
</script>

<template>
  <div class="article-listing mb-8" v-if="showFolderContent">
    <div v-if="pending">LOADING...</div>
    <div v-else>
      <div
        v-if="!noHeader"
        class="flex justify-content-between align-items-end"
      >
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
          <div
            class="col-12 md:col-10 md:col-offset-1 lg:col-8 lg:col-offset-2"
          >
            <div class="article-card flex flex-row relative grid">
              <nuxt-link :to="article.full_slug" class="col-4">
                <sb-image :src="article.content.poster" :size="getSize" />
              </nuxt-link>
              <div class="info col-8 flex flex-column justify-content-between">
                <div>
                  <nuxt-link class="title-link" :to="article.full_slug">
                    <h5 class="title">{{ article.name }}</h5>
                  </nuxt-link>
                  <div
                    class="truncate t2lines"
                    v-html="renderRichText(article.content.description)"
                  ></div>
                </div>
                <div>
                  <p class="date">
                    Published {{ formatDate(article.first_published_at) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.article-listing {
  .article-card {
    .title-link {
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
      .title {
        @include media('<xl') {
          font-size: 1.25em;
        }
      }
    }
    .date {
      font-size: 0.75rem;
    }
  }
}
</style>
