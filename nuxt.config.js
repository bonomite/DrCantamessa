import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [['@storyblok/nuxt', {
        accessToken: process.env.STORYBLOK_API_KEY_PREVIEW,
        apiOptions: {
            region: 'us',
            //bridge: true,
            //useApiClient: true
        }
    }]],
    image: {


    },
    build: {
        transpile: [
            'primevue'
        ]
    },
    css: [
        'primevue-designer/src/assets/themes/drcantamessa/viva-light/drcantamessa.min.css',
        'primevue/resources/primevue.min.css',
        'primeicons/primeicons.css',
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    // besure to mirror theses imports in the vitest.config.ts
                    additionalData: `@charset "UTF-8"; @use 'sass:map'; @use 'sass:math'; @use 'sass:string'; @import url('https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Open+Sans:wght@400;600&display=swap'); @import 'primevue-designer/src/assets/themes/drcantamessa/viva-light/breakpoints.scss'; @import 'primevue-designer/src/assets/custom/include-media.scss'; @import 'primevue-designer/src/assets/custom/mixins-functions.scss'; @import "~/assets/scss/global.scss";`,
                },
            },
            // postcss: {
            //     plugins: [
            //         {
            //             postcssPlugin: 'internal:charset-removal',
            //             AtRule: {
            //                 charset: (atRule) => {
            //                     if (atRule.name === 'charset') {
            //                         atRule.remove()
            //                     }
            //                 }
            //             }
            //         }
            //     ]
            // }
        },
    },
    components: true,
    publicRuntimeConfig: {
        STORYBLOK_API_KEY_PREVIEW: process.env['STORYBLOK_API_KEY_PREVIEW'],
        STORYBLOK_API_KEY_PUBLIC: process.env['STORYBLOK_API_KEY_PUBLIC'],
        STORYBLOK_SPACE_ID: process.env['STORYBLOK_SPACE_ID'],
        STORYBLOK_OAUTH_TOKEN: process.env['STORYBLOK_OAUTH_TOKEN'],
    },
})
