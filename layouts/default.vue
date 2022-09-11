<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
/* import { useSidebarIsOpen } from '~~/composables/states.js' */

const config = useRuntimeConfig()
const route = useRoute()
/* const sidebarOpen = ref(false) */

/* const closeSidebar = () => (sidebarOpen.value = false) */


onMounted(() => {

})

</script>

<template>
  <div class="page" :class="[`${route.name as string}`]">
    <Html lang="en">
      <Head>
        <!-- <Link rel="preconnect" :href="config.API_URL" /> -->
        <Title>Dr Cantamessa: Veterinarian</Title>
        <Meta
          name="description"
          content="Website for Dr. Tracey Cantamessa DVM, Veterinarian"
        />

        <Meta
          name="og:site_name"
          content="Dr. Tracey Cantamessa DVM, Veterinarian"
        />
        <Meta name="og:type" content="website" />
        <Meta
          name="og:url"
          :content="`https://www.drcantamessa.com${route.fullPath}`"
        />
        <Meta
          name="og:title"
          content="Dr. Tracey Cantamessa DVM, Veterinarian"
        />
        <Meta name="og:description" content="Veterinarian services." />
        <Meta
          name="og:image"
          content="https://www.drcantamessa.com/og-image.png"
        />
        <Meta name="og:locale" content="en_US" />
        <Meta name="og:image:width" content="1200" />
        <Meta name="og:image:height" content="430" />
       <!--  <Meta name="fb:app_id" content="151261804904925" /> -->
        <Meta name="twitter:card" content="summary_large_image" />
        <Meta name="twitter:site" content="@drcantamessa" />

        <Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <Link rel="manifest" href="/site.webmanifest"/>
        <Link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ba68c8"/>
        <Meta name="msapplication-TileColor" content="#ba68c8"/>
        <Meta name="theme-color" content="#ffffff"/>

      </Head>
    </Html>

    <!-- Google Tag Manager (noscript) -->
    <!-- <div v-html='`<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${config.GTM_ID}"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`' /> -->
    <!-- End Google Tag Manager (noscript) -->
    <!-- HEADER HERE -->
    <main>
      <slot />
    </main>
    <!-- FOOTER HERE -->
  </div>
</template>

<style lang="scss">

</style>
