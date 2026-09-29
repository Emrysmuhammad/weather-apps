import { useEffect, useRef } from 'react'
import { CloudSun } from 'lucide-react'
import SearchBar from './components/SearchBar'
import UnitToggle from './components/UnitToggle'
import CurrentWeather from './components/CurrentWeather'
import HourlyForecast from './components/HourlyForecast'
import StatusMessage from './components/StatusMessage'
import { useWeather } from './hooks/useWeather'
import { useGeolocation } from './hooks/useGeolocation'
import { useLocalStorage } from './hooks/useLocalStorage'
import { describeWeather } from './utils/weatherCodes'
import WeatherDetails from './components/WeatherDetails'
import DailyForecast from './components/DailyForecast'
import FavoriteCities from './components/FavoriteCities'
import Atmosphere from './components/Atmosphere'

const DEFAULT_LOCATION = {
  id: '2643743',
  name: 'London',
  region: 'England',
  country: 'United Kingdom',
  latitude: 51.50853,
  longitude: -0.12574,
}

export default function App() {
  const [savedLocation, setSavedLocation] = useLocalStorage('nimbus-location', DEFAULT_LOCATION)
  const [unit, setUnit] = useLocalStorage('nimbus-unit', 'metric')
  const [favorites, setFavorites] = useLocalStorage('nimbus-favorites', [])
  const { weather, location, status, error, load, refresh } = useWeather()
  const { locate, isLocating, error: locateError } = useGeolocation()
  const startLocation = useRef(savedLocation)

  useEffect(() => {
    load(startLocation.current)
  }, [load])

  useEffect(() => {
    if (location) setSavedLocation(location)
  }, [location, setSavedLocation])

  const handleLocate = async () => {
    const place = await locate()
    if (place) load(place)
  }

  const toggleFavorite = (place) => {
    setFavorites((list) =>
      list.some((city) => city.id === place.id) ? list.filter((city) => city.id !== place.id) : [...list, place]
    )
  }

  const removeFavorite = (id) => {
    setFavorites((list) => list.filter((city) => city.id !== id))
  }

  const current = weather?.current
  const theme = current ? describeWeather(current.code, current.isDay).theme : 'clear-day'
  const showWeather = weather && location && status !== 'error'

  return (
    <div className={`app${current && !current.isDay ? ' is-night' : ''}`} data-theme={theme}>
      <Atmosphere theme={theme} />
      <div className="container">
        <header className="header">
          <div className="brand">
            <CloudSun size={28} />
            <span>Nimbus</span>
          </div>
          <UnitToggle unit={unit} onChange={setUnit} />
        </header>

        <SearchBar onSelect={load} onLocate={handleLocate} isLocating={isLocating} error={locateError} />

        <FavoriteCities
          location={showWeather ? location : null}
          favorites={favorites}
          onToggle={toggleFavorite}
          onSelect={load}
          onRemove={removeFavorite}
        />

        {status === 'loading' && !weather && <StatusMessage type="loading" />}
        {status === 'error' && <StatusMessage type="error" message={error} onRetry={refresh} />}

        {showWeather && (
          <main className={`dashboard${status === 'loading' ? ' is-loading' : ''}`}>
            <div className="span-2">
              <CurrentWeather
                weather={weather}
                location={location}
                unit={unit}
                isRefreshing={status === 'loading'}
                onRefresh={refresh}
              />
            <div className="span-2">
                <HourlyForecast hours={weather.hours} unit={unit} />
            </div>

            <WeatherDetails current={weather.current} today={weather.days[0]} unit={unit} />
            <DailyForecast days={weather.days} unit={unit} />
            </div>
          </main>
        )}

        <footer className="footer">
          Weather data by{' '}
          <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">
            Open-Meteo.com
          </a>
        </footer>
      </div>
    </div>
  )
}