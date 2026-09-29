import { MapPin, RefreshCw } from 'lucide-react'
import WeatherIcon from './WeatherIcon'
import { describeWeather } from '../utils/weatherCodes'
import { formatClock, formatFullDate, formatTemp } from '../utils/formatters'
import './CurrentWeather.css'

export default function CurrentWeather({ weather, location, unit, isRefreshing, onRefresh }) {
  const { current, days, updatedAt } = weather
  const today = days[0]
  const condition = describeWeather(current.code, current.isDay)
  const place = [location.region, location.country].filter(Boolean).join(', ')

  return (
    <section className="current glass" aria-label="Current weather">
      <div className="current-top">
        <div>
          <h1 className="current-city">
            <MapPin size={22} />
            {location.name}
          </h1>
          {place && <p className="current-meta">{place}</p>}
          <p className="current-meta">{formatFullDate(updatedAt)}</p>
        </div>
        <button
          type="button"
          className="refresh-button"
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label="Refresh forecast"
          title="Refresh forecast"
        >
          <RefreshCw size={18} className={isRefreshing ? 'spinning' : ''} />
        </button>
      </div>

      <div className="current-main">
        <WeatherIcon name={condition.icon} isDay={current.isDay} size={96} />
        <div>
          <p className="current-temp">{formatTemp(current.temperature, unit)}</p>
          <p className="current-condition">{condition.label}</p>
        </div>
      </div>

      <p className="current-summary">
        Feels like {formatTemp(current.feelsLike, unit)} · High {formatTemp(today.max, unit)} · Low{' '}
        {formatTemp(today.min, unit)}
      </p>
      <p className="current-updated">Updated at {formatClock(updatedAt)} local time</p>
    </section>
  )
}