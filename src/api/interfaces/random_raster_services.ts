
// http is an
// Fetch random raster from REST API

import { axiosHttpAPIEndPoint } from './axios_http_API_end_point'

export type RandomRaster = {
    image: string
}

export const fetchRandomRaster = async (): Promise<RandomRaster> => {
    const { data } = await axiosHttpAPIEndPoint.get<RandomRaster>('/RandomRaster')
    return data
}

