// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        ['@storyblok/nuxt', {
            accessToken: process.env.STORYBLOK_API_KEY_PREVIEW,
            apiOptions: {
                region: 'us',
                //bridge: true,
                //useApiClient: true
            }
        }],
        '@nuxt/image-edge',
    ],
    image: {
        provider: 'storyblok',
        storyblok: {
            baseURL: 'https://a-us.storyblok.com'
        }
    },
    //, 'vue-social-sharing/nuxt', 'mosha-vue-toastify'],
    //accessToken: process.env.STORYBLOK_API_KEY_PREVIEW,
    // apiOptions: {
    //     region: 'us',
    //     //bridge: true,
    //     //useApiClient: true
    // }
    //buildModules: ['vue-social-sharing'],
    storyblok: {
        accessToken: process.env.STORYBLOK_API_KEY_PREVIEW,
        apiOptions: {
            region: 'us',
            //bridge: true,
            //useApiClient: true
        },
        baseURL: 'https://a-us.storyblok.com'
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
    runtimeConfig: {
        public: {
            BASE_URL: process.env['BASE_URL'],
            STORYBLOK_API_KEY_PREVIEW: process.env['STORYBLOK_API_KEY_PREVIEW'],
            STORYBLOK_API_KEY_PUBLIC: process.env['STORYBLOK_API_KEY_PUBLIC'],
            STORYBLOK_SPACE_ID: process.env['STORYBLOK_SPACE_ID'],
            STORYBLOK_OAUTH_TOKEN: process.env['STORYBLOK_OAUTH_TOKEN'],
            STORYBLOK_API_URL: process.env['STORYBLOK_API_URL'],
            STORYBLOK_API_URL_V1: process.env['STORYBLOK_API_URL_V1'],
        }
    },
})
