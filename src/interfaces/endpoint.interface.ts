import type { EndpointStatusType } from '@/constants/status.constant'

export interface IEndpoint {
  id: string
  name: string
  endpointUrl: string
  methods: string[]
  interval: number
  alertEmail: string
  alertWebhook: string | null
  threshold: number
  lastChecked: string | Date | null
  lastResponse: string | null
  lastStatus: EndpointStatusType
  createdAt: string | Date
  updatedAt: string | Date
}

export interface IEndpointStats {
  total: number
  up: number
  down: number
  uptimePercent: number
  lastChecked: string | null
  avgResponseTime: number
}

export interface IEndpointsResponse {
  endpoints: IEndpoint[]
  stats: IEndpointStats
}

export interface ICreateEndpointPayload {
  name: string
  endpointUrl: string
  apiKey?: string
  alertEmail: string
  interval?: number
  threshold?: number
  methods?: string[]
}

export interface IUptimeCheckResult {
  endpointId: string
  isUp: boolean
  responseTime: number
  status: string
  errorMessage?: string
}
