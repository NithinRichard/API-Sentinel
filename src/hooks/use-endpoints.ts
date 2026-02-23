'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Endpoint, EndpointStats, EndpointsResponse } from '@/types'

export function useEndpoints() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([])
  const [stats, setStats] = useState<EndpointStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEndpoints = useCallback(async () => {
    try {
      setError(null)
      const response = await fetch('/api/endpoints')
      if (!response.ok) throw new Error('Failed to fetch endpoints')
      const data: EndpointsResponse = await response.json()
      setEndpoints(data.endpoints ?? [])
      setStats(data.stats ?? null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [])

  const refresh = useCallback(async () => {
    setLoading(true)
    await fetchEndpoints()
  }, [fetchEndpoints])

  useEffect(() => {
    fetchEndpoints()
  }, [fetchEndpoints])

  return { endpoints, stats, loading, error, refresh }
}
