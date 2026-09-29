import { Clock, Droplets } from 'lucide-react'
import WeatherIcon from './WeatherIcon'
import { describeWeather } from '../utils/weatherCodes'
import { formatHour, formatTemp } from '../utils/formatters'
import './HourlyForecast.css'

export default function HourlyForecast({ hours, unit }) {
  return (
    <section className="hourly glass" aria-label="Hourly forecast">
      <h2 className="panel-title">
        <Clock size={14} />
        Next 24 hours
      </h2>
      <ul className="hourly-list">
        {hours.map((hour, index) => (
          <li key={hour.time} className="hourly-item">
            <span className="hourly-time">{index === 0 ? 'Now' : formatHour(hour.time)}</span>
            <WeatherIcon name={describeWeather(hour.code, hour.isDay).icon} isDay={hour.isDay} size={28} />
            <span className="hourly-temp">{formatTemp(hour.temperature, unit)}</span>
            <span className="hourly-rain">
              {hour.rainChance >= 20 && (
                <>
                  <Droplets size={12} />
                  {hour.rainChance}%
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}