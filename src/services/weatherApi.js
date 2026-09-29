const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'
const REVERSE_GEOCODING_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

async function request(url) {
  let response

  try {
    response = await fetch(url)
  } catch {
    throw new Error('Unable to reach the weather service. Check your internet connection.')
  }

  if (!response.ok) {
    throw new Error('The weather service returned an error. Please try again shortly.')
  }

  return response.json()
}

export async function searchCities(query) {
  const params = new URLSearchParams({ name: query, count: '6', language: 'en', format: 'json' })
  const data = await request(`${GEOCODING_URL}?${params}`)

  return (data.results ?? []).map((place) => ({
    id: String(place.id),
    name: place.name,
    region: place.admin1 ?? '',
    country: place.country ?? '',
    latitude: place.latitude,
    longitude: place.longitude,
  }))
}

export async function reverseGeocode(latitude, longitude) {
  try {
    const params = new URLSearchParams({ latitude, longitude, localityLanguage: 'en' })
    const data = await request(`${REVERSE_GEOCODING_URL}?${params}`)

    return {
      name: data.city || data.locality || 'Current location',
      region: data.principalSubdivision ?? '',
      country: data.countryName ?? '',
    }
  } catch {
    return { name: 'Current location', region: '', country: '' }
  }
}

function normalizeWeather(data) {
  const { current, hourly, daily } = data
  const now = `${current.time.slice(0, 13)}:00`
  const startIndex = Math.max(
    hourly.time.findIndex((time) => time >= now),
    0
  )

  const hours = hourly.time.slice(startIndex, startIndex + 24).map((time, offset) => {
    const index = startIndex + offset
    return {
      time,
      temperature: hourly.temperature_2m[index],
      code: hourly.weather_code[index],
      isDay: hourly.is_day[index] === 1,
      rainChance: hourly.precipitation_probability[index],
    }
  })

  const days = daily.time.map((date, index) => ({
    date,
    code: daily.weather_code[index],
    max: daily.temperature_2m_max[index],
    min: daily.temperature_2m_min[index],
    sunrise: daily.sunrise[index],
    sunset: daily.sunset[index],
    uv: daily.uv_index_max[index],
    rainChance: daily.precipitation_probability_max[index],
  }))

  return {
    updatedAt: current.time,
    current: {
      temperature: current.temperature_2m,
      feelsLike: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      pressure: current.surface_pressure,
      windSpeed: current.wind_speed_10m,
      windDirection: current.wind_direction_10m,
      code: current.weather_code,
      isDay: current.is_day === 1,
    },
    hours,
    days,
  }
}

export async function fetchWeather({ latitude, longitude }) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m',
    hourly: 'temperature_2m,weather_code,is_day,precipitation_probability',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max',
    timezone: 'auto',
    forecast_days: '7',
  })

  const data = await request(`${FORECAST_URL}?${params}`)
  return normalizeWeather(data)
}