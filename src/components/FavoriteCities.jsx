import { Star, X } from 'lucide-react'
import './FavoriteCities.css'

export default function FavoriteCities({ location, favorites, onToggle, onSelect, onRemove }) {
  if (!location && favorites.length === 0) return null

  const isSaved = location ? favorites.some((city) => city.id === location.id) : false

  return (
    <section className="favorites" aria-label="Saved cities">
      {location && (
        <button
          type="button"
          className={`favorite-toggle${isSaved ? ' saved' : ''}`}
          onClick={() => onToggle(location)}
          aria-pressed={isSaved}
        >
          <Star size={16} fill={isSaved ? 'currentColor' : 'none'} />
          {isSaved ? 'Saved' : `Save ${location.name}`}
        </button>
      )}

      <ul className="favorite-list">
        {favorites.map((city) => (
          <li key={city.id} className={`favorite-chip${location && city.id === location.id ? ' active' : ''}`}>
            <button type="button" className="favorite-select" onClick={() => onSelect(city)}>
              {city.name}
            </button>
            <button
              type="button"
              className="favorite-remove"
              onClick={() => onRemove(city.id)}
              aria-label={`Remove ${city.name} from saved cities`}
            >
              <X size={14} />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}