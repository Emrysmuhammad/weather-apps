import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudMoon, CloudRain, CloudSnow, CloudSun, Moon, Sun } from 'lucide-react'
import './WeatherIcon.css'

const ICONS = {
  clear: { day: Sun, night: Moon },
  partly: { day: CloudSun, night: CloudMoon },
  cloud: { day: Cloud, night: Cloud },
  fog: { day: CloudFog, night: CloudFog },
  drizzle: { day: CloudDrizzle, night: CloudDrizzle },
  rain: { day: CloudRain, night: CloudRain },
  snow: { day: CloudSnow, night: CloudSnow },
  storm: { day: CloudLightning, night: CloudLightning },
}

export default function WeatherIcon({ name, isDay = true, size = 32 }) {
  const Icon = (ICONS[name] ?? ICONS.cloud)[isDay ? 'day' : 'night']
  const classes = `weather-icon weather-icon-${name}${isDay ? '' : ' weather-icon-night'}`

  return <Icon size={size} strokeWidth={1.6} className={classes} aria-hidden="true" />
}