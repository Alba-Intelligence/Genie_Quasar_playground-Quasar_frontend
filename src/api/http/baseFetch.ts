import axios from 'axios'

export default {
    data() {
        return {
            image: []
        }
    },

    methods: {
        loadUsers() {
            axios.get('/genie_api/randomimage')
                .then(function (response) {
                    this.image = response.data;
                }.bind(this));
        }
    }
}

// Type specific loaders.
// TODO: Consider using the Babylon loaders for assets used by Babylon???
// Or use Axios everywhere?
async function loadImage(api_asset_route: string) {
    const API_URL = '/genie_api'
    return axios.get(API_URL + api_asset_route, { responseType: 'arraybuffer' });
}

async function loadJSON(api_asset_route: string) {
    const API_URL = '/genie_api'
    return axios.get(API_URL + api_asset_route, { responseType: 'json' });
}


// export default async (url: RequestInfo, method: string, options = {}) => {

//     const formattedMethod: string = method.toUpperCase()
//     let httpRequest: Promise<Response>


//     if (formattedMethod === 'GET') {
//         const httpRequestPromise = (
//             url: RequestInfo): Promise<Response> => {
//             return new Promise<Response>(() => {
//                 fetch(url, {
//                     cache: 'reload',
//                     ...options,
//                 })
//             })}
//         httpRequest = httpRequestPromise(url)
//     } else {
//         const httpRequestPromise = (
//             url: RequestInfo, method:string): Promise<Response> => {
//             return new Promise<Response>(() => {
//                 fetch(url, {
//                     cache: 'reload',
//                     method: method,
//                     ...options,
//                 })
//             })}
//         httpRequest = httpRequestPromise(url, formattedMethod)
//     }

//     const data = httpRequest
//     return (type: string) => {
//         switch (type.toLocaleLowerCase()) {
//             case 'json':
//                 return data.json()
//             case 'blob':
//                 return data.blob()
//             case 'text':
//                 return data.text()
//             case 'formdata':
//                 return data.formData()
//             default:
//                 return data.arrayBuffer()
//         }
//     }
// }