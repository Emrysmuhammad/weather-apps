const CODES = {
  0: { label: 'Clear sky', icon: 'clear', theme: 'clear' },
  1: { label: 'Mainly clear', icon: 'clear', theme: 'clear' },
  2: { label: 'Partly cloudy', icon: 'partly', theme: 'cloudy' },
  3: { label: 'Overcast', icon: 'cloud', theme: 'cloudy' },
  45: { label: 'Fog', icon: 'fog', theme: 'fog' },
  48: { label: 'Rime fog', icon: 'fog', theme: 'fog' },
  51: { label: 'Light drizzle', icon: 'drizzle', theme: 'rain' },
  53: { label: 'Moderate drizzle', icon: 'drizzle', theme: 'rain' },
  55: { label: 'Dense drizzle', icon: 'drizzle', theme: 'rain' },
  56: { label: 'Freezing drizzle', icon: 'drizzle', theme: 'rain' },
  57: { label: 'Heavy freezing drizzle', icon: 'drizzle', theme: 'rain' },
  61: { label: 'Light rain', icon: 'rain', theme: 'rain' },
  63: { label: 'Moderate rain', icon: 'rain', theme: 'rain' },
  65: { label: 'Heavy rain', icon: 'rain', theme: 'rain' },
  66: { label: 'Freezing rain', icon: 'rain', theme: 'rain' },
  67: { label: 'Heavy freezing rain', icon: 'rain', theme: 'rain' },
  71: { label: 'Light snowfall', icon: 'snow', theme: 'snow' },
  73: { label: 'Moderate snowfall', icon: 'snow', theme: 'snow' },
  75: { label: 'Heavy snowfall', icon: 'snow', theme: 'snow' },
  77: { label: 'Snow grains', icon: 'snow', theme: 'snow' },
  80: { label: 'Light rain showers', icon: 'rain', theme: 'rain' },
  81: { label: 'Rain showers', icon: 'rain', theme: 'rain' },
  82: { label: 'Violent rain showers', icon: 'rain', theme: 'rain' },
  85: { label: 'Light snow showers', icon: 'snow', theme: 'snow' },
  86: { label: 'Heavy snow showers', icon: 'snow', theme: 'snow' },
  95: { label: 'Thunderstorm', icon: 'storm', theme: 'storm' },
  96: { label: 'Thunderstorm with hail', icon: 'storm', theme: 'storm' },
  99: { label: 'Severe thunderstorm with hail', icon: 'storm', theme: 'storm' },
}

export function describeWeather(code, isDay = true) {
  const entry = CODES[code] ?? { label: 'Unknown', icon: 'cloud', theme: 'cloudy' }
  const theme = entry.theme === 'clear' ? (isDay ? 'clear-day' : 'clear-night') : entry.theme
  return { label: entry.label, icon: entry.icon, theme }
}