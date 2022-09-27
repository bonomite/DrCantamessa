import { createToast } from 'mosha-vue-toastify'
// global function for getting and overridding toast notification configuation 
export const toastGlobalConfig = (optionsObj = {}) => {

    return {
        timeout: 6000,
        position: 'bottom-center',
        hideProgressBar: true,
        showIcon: true,
        type: 'default',
        transition: 'slide',
        ...optionsObj
    }
}
const toastConfig = toastGlobalConfig()
const toastConfigDanger = toastGlobalConfig({ type: 'danger' })

export function formatDate(date) {
    return new Date(date).toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

/*basic function that detects if the site is running in a mobile browser*/
export function isMobileBrowser() {
    return (typeof window.orientation !== "undefined")
        || (navigator.userAgent.indexOf('IEMobile') !== -1
        )
};

// global funcrtion for copying to clipboard
export const copyToClipBoard = async (content, msg) => {
    await navigator.clipboard.writeText(content)
        .then(() => {
            createToast(msg ? msg : 'Copied to the clipboard', toastConfig)
        })
        .catch(() => {
            //(err)
            createToast({ title: 'Copy to clipboard failed', description: 'Try again another time' }, toastConfigDanger)
        })
}

// global funcrtion for shareApi and copyToClipboard fallback
// fyi, This feature is available only in secure contexts (HTTPS), etc... testing local will have no result on mobile, using browserstack works for andriod-chrome only... Best to just test it on the DEMO link.
export const shareAPI = async (content, msg) => {
    if (navigator.canShare && isMobileBrowser()) {
        await navigator.share(content)
    } else {
        copyToClipBoard(content.url, msg)
    }
}

// helper function that determins if an element is in the viewport by a certain percentage
// export const isElementXPercentInViewport = function (el, percentVisible) {
//   const
//     rect = el.getBoundingClientRect(),
//     windowHeight = (window.innerHeight || document.documentElement.clientHeight)

//   return !(
//     Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / Number(-rect.height)) * 100)) < percentVisible ||
//     Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
//   )
// }

