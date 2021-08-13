// From:
// https://javascript.plainenglish.io/frontend-api-calls-with-typescript-and-axios-68792d1e63c2


import { AxiosResponse } from 'axios'
import genieProxiedAPI from 'boot/axios'

const responseBody = (response: AxiosResponse) => response.data

const requests = {
    get: (url: string) => genieProxiedAPI.get(url).then(responseBody),
    post: (url: string, body: {}) => genieProxiedAPI.post(url, body).then(responseBody),
    put: (url: string, body: {}) => genieProxiedAPI.put(url, body).then(responseBody),
    delete: (url: string) => genieProxiedAPI.delete(url).then(responseBody),
}
