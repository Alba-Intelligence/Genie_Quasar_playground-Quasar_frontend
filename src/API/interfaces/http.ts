
// http.ts
// From https://altrim.io/posts/axios-http-client-using-typescript

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

enum StatusCode {
    Unauthorized = 401,
    Forbidden = 403,
    TooManyRequests = 429,
    InternalServerError = 500,
}

const headers: Readonly<Record<string, string | boolean>> = {
    Accept: 'application/json',
    'Content-Type': 'application/json charset=utf-8',
    'Access-Control-Allow-Credentials': true,
    'X-Requested-With': 'XMLHttpRequest',
}

// We can use the following function to inject the JWT token through an interceptor
// We get the `accessToken` from the localStorage that we set when we authenticate
// const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
//     try {
//         const token = localStorage.getItem('accessToken')

//         if (token != null) {
//             config.headers.Authorization = `Bearer ${token}`
//         }
//         return config
//     } catch (error) {
//         throw new Error(error)
//     }
// }

class Http {
    private instance: AxiosInstance | null = null

    private get http(): AxiosInstance {
        return this.instance != null ? this.instance : this.initHttp()
    }

    initHttp() {
        const http = axios.create({
            baseURL: 'http://127.0.0.1:9009/',
            headers,
            withCredentials: false,
        })

        // http.interceptors.request.use(injectToken, (error) => Promise.reject(error))

        // http.interceptors.response.use(
        //     (response) => response,
        //     (error) => {
        //         const { response } = error
        //         return this.handleError(response)
        //     }
        // )

        this.instance = http
        return http
    }

    request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
        return this.http.request(config)
    }

    get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.http.get<T, R>(url, config)
    }

    post<T = any, R = AxiosResponse<T>>(
        url: string,
        data?: T,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.http.post<T, R>(url, data, config)
    }

    put<T = any, R = AxiosResponse<T>>(
        url: string,
        data?: T,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.http.put<T, R>(url, data, config)
    }

    delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.http.delete<T, R>(url, config)
    }

    // Handle global app errors
    // We can handle generic app errors depending on the status code
    private handleError(error) {
        const { status } = error

        switch (status) {
            case StatusCode.InternalServerError: {
                // Handle InternalServerError
                break
            }
            case StatusCode.Forbidden: {
                // Handle Forbidden
                break
            }
            case StatusCode.Unauthorized: {
                // Handle Unauthorized
                break
            }
            case StatusCode.TooManyRequests: {
                // Handle TooManyRequests
                break
            }
        }

        return Promise.reject(error)
    }
}

export const http = new Http()