import './UnitToggle.css'

const OPTIONS = [
  { value: 'metric', label: '°C' },
  { value: 'imperial', label: '°F' },
]

export default function UnitToggle({ unit, onChange }) {
  return (
    <div className="unit-toggle" role="group" aria-label="Temperature unit">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={unit === option.value ? 'active' : ''}
          aria-pressed={unit === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}