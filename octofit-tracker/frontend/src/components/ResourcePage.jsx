import { useEffect, useMemo, useState } from 'react'
import { fetchResource } from '../lib/api'

const formatValue = (value) => {
  if (value == null || value === '') {
    return '—'
  }

  if (Array.isArray(value)) {
    return value.join(', ')
  }

  if (value instanceof Date) {
    return value.toLocaleString()
  }

  if (typeof value === 'object') {
    if ('name' in value) {
      return value.name
    }

    if ('title' in value) {
      return value.title
    }

    return JSON.stringify(value)
  }

  return String(value)
}

export default function ResourcePage({
  resource,
  title,
  description,
  emptyMessage,
  fields,
}) {
  const [items, setItems] = useState([])
  const [baseUrl, setBaseUrl] = useState('http://localhost:8000')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fieldList = useMemo(() => fields ?? [], [fields])

  useEffect(() => {
    let active = true

    const load = async () => {
      try {
        setLoading(true)
        const response = await fetchResource(resource)

        if (!active) {
          return
        }

        setItems(response.items)
        setBaseUrl(response.baseUrl)
        setError('')
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : 'Failed to load data')
          setItems([])
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [resource])

  return (
    <section className="resource-page">
      <div className="resource-header">
        <div>
          <p className="resource-label">API resource</p>
          <h2>{title}</h2>
          <p className="resource-copy">{description}</p>
        </div>

        <div className="resource-meta">
          <span>Base URL</span>
          <code>{baseUrl}</code>
        </div>
      </div>

      {loading ? (
        <div className="resource-state">Loading {resource}...</div>
      ) : null}

      {error ? <div className="resource-state error">{error}</div> : null}

      {!loading && !error && items.length === 0 ? (
        <div className="resource-state">{emptyMessage}</div>
      ) : null}

      {!loading && !error && items.length > 0 ? (
        <div className="resource-grid">
          {items.map((item, index) => (
            <article key={item._id ?? `${resource}-${index}`} className="resource-card">
              <div className="resource-card__index">#{index + 1}</div>
              <dl className="resource-details">
                {fieldList.map((field) => {
                  const value = typeof field.value === 'function' ? field.value(item) : item[field.key]

                  return (
                    <div key={field.label} className="resource-detail">
                      <dt>{field.label}</dt>
                      <dd>{formatValue(value)}</dd>
                    </div>
                  )
                })}
              </dl>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}