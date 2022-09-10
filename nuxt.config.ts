import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [['@storyblok/nuxt', { accessToken: 'uGxQ5PnlTEwXpg563G725wtt' }]],
    build: {
        transpile: [
            'primevue'
        ]
    },
    css: [
        'primevue-designer/src/assets/themes/vela/vela-purple-dr-cantamessa/vela-purpa-purple-dr-cantamessa.min.css',
        'primevue/resources/primevue.min.css',
        'primeicons/primeicons.css',

    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    // besure to mirror theses imports in the vitest.config.ts
                    additionalData: `@import url('https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Open+Sans:wght@400;600&display=swap'); @import "~/assets/scss/global.scss";`,
                },
            },
            postcss: {
                plugins: [
                    {
                        postcssPlugin: 'internal:charset-removal',
                        AtRule: {
                            charset: (atRule) => {
                                if (atRule.name === 'charset') {
                                    atRule.remove();
                                }
                            }
                        }
                    }
                ]
            }
        },
    },
    components: true,
})
