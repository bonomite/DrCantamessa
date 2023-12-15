/**
 * Global state for the menu
 */
export async function getMenuData() {
    const config = useRuntimeConfig()

    const {
        data: linksData,
        pending,
        error,
        refresh,
    } = await useFetch(
        `${config.public.STORYBLOK_API_URL}/links/?token=${config.public.STORYBLOK_API_KEY_PREVIEW}&version=published`
    )

    let menuDataArr = []
    const foldersToSkipArr = ['surgery', 'enrichment', 'articles']
    for (const [key, val] of Object.entries(linksData.value.links)) {
        //console.log('menu val - ', val)
        // temp condition to clear folders from, menu
        if (!foldersToSkipArr.includes(val.slug)) {
            if (val.is_folder || (!val.parent_id && val.real_path !== '/')) {
                console.log('yes')
                menuDataArr.push({
                    label: val.name,
                    to: `/${val.slug}`,
                    //command: () => {
                    //gaEvent('Click Tracking', 'Navigation', value.name)
                    //}
                })
            }
        }
    }

    //console.log('menuDataArr = ', menuDataArr)

    return menuDataArr
}