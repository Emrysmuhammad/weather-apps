import { useEffect, useRef, useState } from 'react'
import { LocateFixed, MapPin, Search, X } from 'lucide-react'
import { searchCities } from '../services/weatherApi'
import { useDebounce } from '../hooks/useDebounce'
import './SearchBar.css'

export default function SearchBar({ onSelect, onLocate, isLocating, error }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [result, setResult] = useState({ query: '', cities: [], failed: false })
  const wrapperRef = useRef(null)

  const trimmed = query.trim()
  const debouncedQuery = useDebounce(trimmed)
  const hasQuery = trimmed.length >= 2
  const isCurrent = result.query === trimmed
  const isSearching = hasQuery && !isCurrent
  const cities = hasQuery && isCurrent ? result.cities : []
  const failed = hasQuery && isCurrent && result.failed

  useEffect(() => {
    if (debouncedQuery.length < 2) return
    let cancelled = false

    searchCities(debouncedQuery)
      .then((found) => {
        if (!cancelled) setResult({ query: debouncedQuery, cities: found, failed: false })
      })
      .catch(() => {
        if (!cancelled) setResult({ query: debouncedQuery, cities: [], failed: true })
      })

    return () => {
      cancelled = true
    }
  }, [debouncedQuery])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const choose = (city) => {
    onSelect(city)
    setQuery('')
    setOpen(false)
    setActiveIndex(-1)
  }

  const handleChange = (event) => {
    setQuery(event.target.value)
    setOpen(true)
    setActiveIndex(-1)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => Math.min(index + 1, cities.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => Math.max(index - 1, 0))
    } else if (event.key === 'Enter') {
      const city = cities[activeIndex] ?? cities[0]
      if (city) choose(city)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div className="search" ref={wrapperRef}>
      <div className="search-row">
        <div className="search-field-wrap">
          <div className="search-field">
            <Search size={20} />
            <input
              type="text"
              value={query}
              placeholder="Search for a city..."
              aria-label="Search for a city"
              role="combobox"
              aria-expanded={open && hasQuery}
              aria-autocomplete="list"
              onChange={handleChange}
              onFocus={() => setOpen(true)}
              onKeyDown={handleKeyDown}
            />
            {query && (
              <button
                type="button"
                className="search-clear"
                aria-label="Clear search"
                onClick={() => {
                  setQuery('')
                  setActiveIndex(-1)
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {open && hasQuery && (
            <ul className="search-results" role="listbox">
              {isSearching && <li className="search-message">Searching...</li>}
              {failed && <li className="search-message">Search is unavailable right now. Please try again.</li>}
              {!isSearching && !failed && cities.length === 0 && (
                <li className="search-message">No cities found for "{trimmed}"</li>
              )}
              {!isSearching &&
                cities.map((city, index) => (
                  <li key={city.id} role="option" aria-selected={index === activeIndex}>
                    <button
                      type="button"
                      className={`search-option${index === activeIndex ? ' active' : ''}`}
                      onClick={() => choose(city)}
                    >
                      <MapPin size={16} />
                      <span className="search-option-name">{city.name}</span>
                      <span className="search-option-meta">
                        {[city.region, city.country].filter(Boolean).join(', ')}
                      </span>
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          className="locate-button"
          onClick={onLocate}
          disabled={isLocating}
          aria-label="Use my current location"
          title="Use my current location"
        >
          {isLocating ? <span className="mini-spinner" /> : <LocateFixed size={20} />}
        </button>
      </div>

      {error && (
        <p className="search-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}