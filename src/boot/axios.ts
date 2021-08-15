//
// WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING
//
// The dev server is trying to use an API proxy when running in a Dev environment
// See defining in /quasar.conf.js
// Docs in https://quasar.dev/quasar-cli/api-proxying and https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
//
//

import { boot } from 'quasar/wrappers'
import axios, { AxiosInstance } from 'axios'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}


export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$genieServerAddress = '/genie_api'         // <<<<<<<---------------
  app.config.globalProperties.$genieServerPort = 9009

  app.config.globalProperties.$api = genieProxiedAPI;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})


// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const genieProxiedAPI: AxiosInstance = axios.create({
  baseURL: '/genie_api:9009',                                      // <<<<<<<---------------
  timeout: 10000,                                                    // Timeout (long........) in case Genie is precompiling...
})


export { genieProxiedAPI }
