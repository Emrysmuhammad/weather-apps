import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchWeather } from '../services/weatherApi'

const REFRESH_INTERVAL = 10 * 60 * 1000

export function useWeather() {
  const [weather, setWeather] = useState(null)
  const [location, setLocation] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const target = useRef(null)
  const requestId = useRef(0)

  const load = useCallback(async (next, { silent = false } = {}) => {
    const id = ++requestId.current
    target.current = next

    if (!silent) setStatus('loading')

    try {
      const data = await fetchWeather(next)
      if (id !== requestId.current) return
      setWeather(data)
      setLocation(next)
      setError('')
      setStatus('success')
    } catch (err) {
      if (id !== requestId.current || silent) return
      setError(err.message)
      setStatus('error')
    }
  }, [])

  const refresh = useCallback(() => {
    if (target.current) load(target.current)
  }, [load])

  useEffect(() => {
    const timer = setInterval(() => {
      if (target.current) load(target.current, { silent: true })
    }, REFRESH_INTERVAL)

    return () => clearInterval(timer)
  }, [load])

  return { weather, location, status, error, load, refresh }
}