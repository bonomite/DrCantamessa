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
    default: true,
  },
  limit: {
    type: String,
    default: '2',
  },
})

const first = ref(0)
const totalRecords = ref(null)

// remove the initial "/"
const folderName = props.to.replace(/^\/|\/$/g, '')
//console.log('folderName = ', folderName)
const loadedArticles = ref([])

const {
  data: articles,
  pending,
  error,
  refresh,
} = await useFetch(
  `${config.STORYBLOK_API_URL}/stories?starts_with=${folderName}&is_startpage=0&token=${config.STORYBLOK_API_KEY_PREVIEW}&version=published`,
  { key: `articles-${folderName}` }
)
console.log('articles.value = ', articles.value.stories.length)
totalRecords.value = Number(articles.value.stories.length)

const loadMore = async (event = { page: 0 }) => {
  //console.log('MORE = ', event)
  const {
    data: moreArticles,
    morePending,
    error,
    refresh,
  } = await useFetch(
    `${
      config.STORYBLOK_API_URL
    }/stories?starts_with=${folderName}&is_startpage=0${
      props.limit ? `&per_page=${props.limit}` : ''
    }&page=${event.page + 1}&token=${
      config.STORYBLOK_API_KEY_PREVIEW
    }&version=published`,
    { key: `articles-${folderName}-${event.page + 1}` }
  )

  loadedArticles.value = moreArticles.value
}
loadMore()

//console.log('articles = ', articles.value)
const showFolderContent = computed(() => {
  return loadedArticles.value.stories[0]?.parent_id
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
      <div class="grid grid-nogutter">
        <template
          v-for="(article, index) in loadedArticles.stories"
          :key="`preview-${article.name}`"
        >
          <!-- featured article -->
          <div v-if="index === 0 && first === 0">
            <div class="col-12">
              <ArticleCard :article="article" featured />
            </div>
          </div>
          <!-- articles -->
          <div
            v-else
            class="col-12 lg:col-10 lg:col-offset-1 xl:col-8 xl:col-offset-2"
          >
            <ArticleCard :article="article" />
          </div>
        </template>
      </div>

      <Paginator
        v-model:first="first"
        :rows="1"
        :totalRecords="totalRecords / Number(props.limit)"
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        @page="loadMore($event)"
      >
        <!--         <template #start>
          <Button type="button" icon="pi pi-refresh" @click="reset()" />
        </template>
        <template #end>
          <Button type="button" icon="pi pi-search" />
        </template> -->
      </Paginator>
    </div>
  </div>
</template>

<style lang="scss">
.article-listing {
}
</style>
