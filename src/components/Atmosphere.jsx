import './Atmosphere.css'

const EFFECTS = {
  rain: { count: 70, kind: 'drop' },
  storm: { count: 100, kind: 'drop' },
  snow: { count: 60, kind: 'flake' },
  'clear-night': { count: 50, kind: 'star' },
}

function particleStyle(kind, index) {
  const left = (index * 37) % 100
  const delay = ((index * 29) % 50) / 10
  const size = 2 + ((index * 7) % 5)
  const speed = 0.7 + ((index * 17) % 10) / 25

  if (kind === 'drop') {
    return {
      left: `${left}%`,
      height: `${10 + size * 4}px`,
      animationDuration: `${speed}s`,
      animationDelay: `-${delay}s`,
    }
  }

  if (kind === 'flake') {
    return {
      left: `${left}%`,
      width: `${size + 1}px`,
      height: `${size + 1}px`,
      animationDuration: `${5 + speed * 6}s`,
      animationDelay: `-${delay * 2}s`,
    }
  }

  return {
    left: `${left}%`,
    top: `${(index * 53) % 100}%`,
    width: `${size / 2 + 1}px`,
    height: `${size / 2 + 1}px`,
    animationDuration: `${2 + speed * 2}s`,
    animationDelay: `-${delay}s`,
  }
}

export default function Atmosphere({ theme }) {
  const effect = EFFECTS[theme]
  if (!effect) return null

  return (
    <div className="atmosphere" aria-hidden="true">
      {theme === 'storm' && <div className="lightning" />}
      {Array.from({ length: effect.count }, (_, index) => (
        <span key={index} className={effect.kind} style={particleStyle(effect.kind, index)} />
      ))}
    </div>
  )
}