import { CircleAlert } from 'lucide-react'
import './StatusMessage.css'

export default function StatusMessage({ type, message, onRetry }) {
  if (type === 'loading') {
    return (
      <div className="status glass" role="status">
        <span className="status-spinner" />
        <p>Fetching the latest forecast...</p>
      </div>
    )
  }

  return (
    <div className="status glass" role="alert">
      <CircleAlert size={32} />
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="status-retry" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}