import { Droplets, Gauge, Sun, Sunrise, Sunset, Thermometer, Umbrella, Wind } from 'lucide-react'
import { formatClock, formatPressure, formatTemp, formatWind, uvLabel, windDirection } from '../utils/formatters'
import './WeatherDetails.css'

export default function WeatherDetails({ current, today, unit }) {
  const uv = today.uv ?? 0

  const details = [
    { icon: Thermometer, label: 'Feels like', value: formatTemp(current.feelsLike, unit) },
    { icon: Droplets, label: 'Humidity', value: `${Math.round(current.humidity)}%` },
    { icon: Wind, label: 'Wind', value: formatWind(current.windSpeed, unit), note: `from ${windDirection(current.windDirection)}` },
    { icon: Gauge, label: 'Pressure', value: formatPressure(current.pressure, unit) },
    { icon: Sun, label: 'UV index', value: Math.round(uv), note: uvLabel(uv) },
    { icon: Umbrella, label: 'Rain chance', value: `${today.rainChance ?? 0}%`, note: 'today' },
    { icon: Sunrise, label: 'Sunrise', value: formatClock(today.sunrise) },
    { icon: Sunset, label: 'Sunset', value: formatClock(today.sunset) },
  ]

  return (
    <section className="details glass" aria-label="Weather details">
      <h2 className="panel-title">
        <Thermometer size={14} />
        Conditions
      </h2>
      <ul className="details-grid">
        {details.map(({ icon: Icon, label, value, note }) => (
          <li key={label} className="detail-tile">
            <span className="detail-label">
              <Icon size={15} />
              {label}
            </span>
            <span className="detail-value">{value}</span>
            {note && <span className="detail-note">{note}</span>}
          </li>
        ))}
      </ul>
    </section>
  )
}