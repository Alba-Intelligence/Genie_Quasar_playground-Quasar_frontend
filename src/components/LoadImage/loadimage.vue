<template v-slot:default="{ pending, error, data }">
    <div v-if="pending">Loading ...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>{{ data }}</div>
</template>


<script lang="ts">

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Url } from 'url'

/**
 * Load an image url
 */
async function loadjson(src: string): Promise<unknown> {
    const config: AxiosRequestConfig = { url: src, method: 'GET', responseType: 'json' }
    const response = await axios.request(config)
    return response.data
}
/**
 * Loads the image as a blob and createObjectURL().
 * Set the img tag's src to the object url.
 * Once the image is loaded, revoke the object url (avoid memory leak).
 * Notice that the page can still show the image, but the src blob is no longer valid.
 */
export default {
    props: {
        url: {
            type: String,

            // Defined in src/boot/axios.ts
            // Boot files are executed before everything else and are recommended to setup Axios
            // However in a dev environment, the API is proxied. See quasar.conf.js for details.
            // See the Axios example in: https://quasar.dev/quasar-cli/boot-files
            default: '/genie_api',
        },
        params: {
            type: Object,
            default: () => ({})
        }
    },

    data() {
        return {
            data: null,
            pending: false as boolean,
            error: false as boolean,
        }
    },

    watch: {
        url() {
            this.requestData();
        },
        params: {
            handler() {
                this.requestData();
            },
            deep: true
        }
    },

    onMounted() {
        this.requestData();
    },

    methods: {
        async requestData() {
            this.pending = true
            try {
                const { data } = await axios.get(this.url, { params: this.params })
                this.data = data;
                this.error = false
            } catch (err) {
                this.data = null
                this.error = true

            }
            this.pending = false
        },
    },

    render(): CreateComponentPublicInstance {
        return this.$slots.default({
            pending: this.pending,
            error: this.error,
            data: this.data
        })
    }
}

    // loaded() {
    //     if (this.jsonUrl) URL.revokeObjectURL(this.jsonUrl)
    // },

    // watch: {
    //     src: {
    //         immediate: true,
    //         handler(src: string) {
    //             if (!src) return
    //             loadjson(src).then(result => {
    //                 this.jsonUrl = URL.createObjectURL(result)
    //             })
    //         },
    //     },

</script>

<style scoped>
</style>