import { useCallback, useState } from 'react'
import { getUserPosition } from '../services/geolocation'
import { reverseGeocode } from '../services/weatherApi'

export function useGeolocation() {
  const [isLocating, setIsLocating] = useState(false)
  const [error, setError] = useState('')

  const locate = useCallback(async () => {
    setIsLocating(true)
    setError('')

    try {
      const { latitude, longitude } = await getUserPosition()
      const place = await reverseGeocode(latitude, longitude)

      return {
        id: `geo-${latitude.toFixed(2)},${longitude.toFixed(2)}`,
        ...place,
        latitude,
        longitude,
      }
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setIsLocating(false)
    }
  }, [])

  return { locate, isLocating, error }
}