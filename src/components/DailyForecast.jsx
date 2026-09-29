import { CalendarDays } from 'lucide-react'
import WeatherIcon from './WeatherIcon'
import { describeWeather } from '../utils/weatherCodes'
import { formatDay, formatTemp } from '../utils/formatters'
import './DailyForecast.css'

export default function DailyForecast({ days, unit }) {
  const weekMin = Math.min(...days.map((day) => day.min))
  const weekMax = Math.max(...days.map((day) => day.max))
  const span = weekMax - weekMin || 1

  return (
    <section className="daily glass" aria-label="7-day forecast">
      <h2 className="panel-title">
        <CalendarDays size={14} />
        7-day forecast
      </h2>
      <ul className="daily-list">
        {days.map((day, index) => {
          const condition = describeWeather(day.code)
          const left = Math.min(((day.min - weekMin) / span) * 100, 92)
          const width = Math.max(((day.max - day.min) / span) * 100, 8)
          const rain = day.rainChance ?? 0

          return (
            <li key={day.date} className="daily-item">
              <span className="daily-day">{formatDay(day.date, index)}</span>
              <span title={condition.label}>
                <WeatherIcon name={condition.icon} size={26} />
              </span>
              <span className="daily-rain">{rain >= 20 ? `${rain}%` : ''}</span>
              <span className="daily-min">{formatTemp(day.min, unit)}</span>
              <div className="daily-track">
                <div className="daily-range" style={{ left: `${left}%`, width: `${width}%` }} />
              </div>
              <span className="daily-max">{formatTemp(day.max, unit)}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}