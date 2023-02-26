import type { ForecastResponse } from '../types/weather'
import { customFetch } from './customFetch'
import { getLocation } from './getLocation'

export const getForecast = async () => {
  const position = await getLocation()
  const params = new URLSearchParams({
    lat: String(position.coords.latitude),
    lon: String(position.coords.longitude),
  })
  return customFetch<ForecastResponse>(`/api/forecast?${params.toString()}`)
}
