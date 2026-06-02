const LOCAL_API_BASE_URL = 'http://localhost:8000'

export const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  return LOCAL_API_BASE_URL
}

export const buildApiUrl = (resource) => `${getApiBaseUrl()}/api/${resource}/`

const collectionKeys = ['data', 'items', 'results', 'rows', 'docs', 'records']

export const normalizeCollection = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  for (const key of collectionKeys) {
    if (Array.isArray(payload[key])) {
      return payload[key]
    }
  }

  return []
}

export const fetchResource = async (resource) => {
  const response = await fetch(buildApiUrl(resource))

  if (!response.ok) {
    throw new Error(`Failed to load ${resource}: ${response.status}`)
  }

  const payload = await response.json()

  return {
    baseUrl: getApiBaseUrl(),
    resource,
    path: `/api/${resource}/`,
    items: normalizeCollection(payload),
    raw: payload,
  }
}