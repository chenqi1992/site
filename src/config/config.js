//接口域名地址
let baseURL, protocol = 'https://',
    hostName = '';
if (process.env.NODE_ENV === 'development') {
    hostName = 'devhaogongdiwww.shilongmaoyi.com/'
    // hostName = '119.3.216.22:18100/'
} else if (process.env.NODE_ENV === 'production') {
    if (process.env.VUE_APP_TYPE === "test") {
        // hostName = '119.3.216.22:18100/'
        hostName = 'devhaogongdiwww.shilongmaoyi.com/'
    } else if (process.env.VUE_APP_TYPE === "dev") {
        // hostName = '119.3.216.22:18100/'
        hostName = 'devhaogongdiwww.shilongmaoyi.com/'
    } else if (process.env.VUE_APP_TYPE === 'prod') {
        // hostName = '119.3.216.22:18100/'
        hostName = 'haogongdiwww.shilongmaoyi.com/'
    } else {
        // hostName = '119.3.216.22:18100/'
        hostName = 'devhaogongdiwww.shilongmaoyi.com/'
    }
}
baseURL = protocol + hostName

export default {
    baseURL: baseURL,
    hostName: hostName
}