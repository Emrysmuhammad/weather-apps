# Nimbus — Live Weather App

A responsive weather app built with React. Search any city in the world, or use your current location, to see live conditions, an hourly outlook, and a 7-day forecast. The background and animations change with the weather.

## Features

- Live city search with suggestions and full keyboard navigation
- "Use my location" using the browser Geolocation API
- Current conditions, 24-hour forecast, and 7-day forecast with temperature range bars
- Detail tiles for humidity, wind, pressure, UV index, rain chance, sunrise and sunset
- Celsius / Fahrenheit toggle that converts every value on screen
- Save favorite cities and switch between them in one click
- Remembers your last city, unit and saved cities between visits
- Auto-refreshes every 10 minutes, with a manual refresh button
- Weather-aware themes with rain, snow, lightning and starry-night animations
- Loading and error states with retry, and reduced-motion support

## Tech Stack

- React with Vite
- lucide-react for icons
- Plain CSS with custom properties
- Open-Meteo Forecast and Geocoding APIs (no API key required)
- BigDataCloud client-side reverse geocoding for the location button

## Getting Started

```bash
git clone <repository-url>
cd weather-app
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

To create a production build:

```bash
npm run build
npm run preview
```

## How It Works

- `src/services` talks to the weather, geocoding and browser location APIs and normalizes the responses.
- `src/hooks` holds the app logic: `useWeather` manages loading, errors and auto-refresh, `useGeolocation` powers the location button, `useDebounce` limits search requests, and `useLocalStorage` persists preferences.
- `src/utils` maps WMO weather codes to labels, icons and themes, and formats temperatures, wind, pressure and times.
- `src/components` contains the UI: search, current weather, hourly and daily forecasts, detail tiles, saved cities and the animated background.

Stale responses are ignored, so a slow request for one city can never overwrite the city you selected afterwards.

## Data Sources

Weather data by [Open-Meteo.com](https://open-meteo.com/), used under their free non-commercial terms. Reverse geocoding by [BigDataCloud](https://www.bigdatacloud.com/).

## License

MIT