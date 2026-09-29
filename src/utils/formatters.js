const COMPASS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']

function toTwelveHour(hour) {
  return { hour: hour % 12 || 12, period: hour >= 12 ? 'PM' : 'AM' }
}

export function formatTemp(celsius, unit) {
  const value = unit === 'imperial' ? (celsius * 9) / 5 + 32 : celsius
  return `${Math.round(value)}°`
}

export function formatWind(kmh, unit) {
  return unit === 'imperial' ? `${Math.round(kmh * 0.621371)} mph` : `${Math.round(kmh)} km/h`
}

export function formatPressure(hpa, unit) {
  return unit === 'imperial' ? `${(hpa * 0.02953).toFixed(2)} inHg` : `${Math.round(hpa)} hPa`
}

export function windDirection(degrees) {
  return COMPASS[Math.round(degrees / 22.5) % 16]
}

export function uvLabel(index) {
  if (index < 3) return 'Low'
  if (index < 6) return 'Moderate'
  if (index < 8) return 'High'
  if (index < 11) return 'Very high'
  return 'Extreme'
}

export function formatHour(iso) {
  const { hour, period } = toTwelveHour(Number(iso.slice(11, 13)))
  return `${hour} ${period}`
}

export function formatClock(iso) {
  const { hour, period } = toTwelveHour(Number(iso.slice(11, 13)))
  return `${hour}:${iso.slice(14, 16)} ${period}`
}

export function formatDay(date, index) {
  if (index === 0) return 'Today'
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short' })
}

export function formatFullDate(iso) {
  return new Date(`${iso.slice(0, 10)}T12:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}