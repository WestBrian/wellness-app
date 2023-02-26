import type { NextApiRequest, NextApiResponse } from 'next'
import type { ForecastResponse } from '../../src/types/weather'
import { customFetch } from '../../src/utils/customFetch'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = 'https://api.weatherapi.com/v1/forecast.json?'
  const params = new URLSearchParams({
    key: process.env.WEATHERAPI_KEY as string,
    q: `${req.query.lat},${req.query.lon}`,
    days: '1',
    aqi: 'no',
    alerts: 'no',
  })
  const data = await customFetch<ForecastResponse>(`${url}${params.toString()}`)
  res.status(200).json(data)
}
