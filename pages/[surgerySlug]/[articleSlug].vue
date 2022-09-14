<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'

const config = useRuntimeConfig()
const route = useRoute()

const article = {}

onMounted(() => {})

onUnmounted(() => {})
</script>

<template>
  <div>
    <Head>
      <Link rel="canonical" v-if="article" :href="article.url" />
    </Head>
    <section v-if="article">
      <div class="content">Surgery Here</div>
    </section>
  </div>
</template>

<style lang="scss">
.page.surgery {
}
</style>
