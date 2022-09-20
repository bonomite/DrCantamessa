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
        `${config.STORYBLOK_API_URL}/links/?token=${config.STORYBLOK_API_KEY_PREVIEW}&version=published`
    )

    //console.log('menuData = ', linksData.value.links)

    let menuDataArr = []

    for (const [key, value] of Object.entries(linksData.value.links)) {
        //console.log(value)
        if (value.is_folder || (!value.parent_id && value.real_path !== '/')) {
            menuDataArr.push({
                label: value.name,
                to: `${value.slug}`,
                command: () => {
                    gaEvent('Click Tracking', 'Navigation', value.name)
                }
            })
        }
    }

    //console.log('menuDataArr = ', menuDataArr)

    return menuDataArr
}