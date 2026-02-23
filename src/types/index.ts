export interface Endpoint {
  id: string
  name: string
  endpointUrl: string
  methods: string[]
  interval: number
  alertEmail: string
  alertWebhook: string | null
  threshold: number
  lastChecked: string
  lastResponse: string
  lastStatus: 'up' | 'down' | 'degraded'
  createdAt: string
  updatedAt: string
}

export interface EndpointStats {
  total: number
  up: number
  down: number
  uptimePercent: number
  lastChecked: string | null
  avgResponseTime: number
}

export interface EndpointsResponse {
  endpoints: Endpoint[]
  stats: EndpointStats
}

export interface CreateEndpointPayload {
  name: string
  endpointUrl: string
  apiKey?: string
  alertEmail: string
  interval?: number
  threshold?: number
  methods?: string[]
}

export interface UptimeLog {
  id: string
  endpointId: string
  isUp: boolean
  responseTime: number
  status: string
  errorMessage?: string
  checkedAt: string
}
