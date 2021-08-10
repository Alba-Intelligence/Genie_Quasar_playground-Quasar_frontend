// Fetch random raster from REST API

import { http } from './http'

export type RandomRaster = {
    image: string
}

export const fetchRandomRaster = async (): Promise<RandomRaster> => {
    const { data } = await http.get<RandomRaster>('/RandomRaster')
    return data
}



