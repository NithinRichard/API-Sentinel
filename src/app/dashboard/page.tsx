'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, RefreshCw, Activity } from 'lucide-react'

interface Endpoint {
  id: string
  name: string
  endpointUrl: string
  methods: string[]
  apiKey: string
  interval: number
  alertEmail: string
  alertWebhook: string | null
  threshold: number
  lastChecked: string
  lastResponse: string
  lastStatus: string
  createdAt: string
  updatedAt: string
}

interface Stats {
  total: number
  up: number
  down: number
  uptimePercent: number
  lastChecked: string | null
}

export default function DashboardPage() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchEndpoints = async () => {
    try {
      const response = await fetch('/api/endpoints')
      const data = await response.json()
      setEndpoints(data.endpoints || [])
      setStats(data.stats || null)
    } catch (error) {
      console.error('Error fetching endpoints:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchEndpoints()
    setRefreshing(false)
  }

  useEffect(() => {
    fetchEndpoints()
  }, [])

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">API Sentinel</span>
            </div>
            <nav className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/api/new"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Endpoint
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="text-sm text-gray-400 mb-1">Endpoints Monitored</div>
              <div className="text-3xl font-bold text-white">{stats?.total || 0}</div>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="text-sm text-gray-400 mb-1">Uptime</div>
              <div className="text-3xl font-bold text-green-400">{stats?.uptimePercent || 0}%</div>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="text-sm text-gray-400 mb-1">Last Checked</div>
              <div className="text-sm text-gray-300">
                {stats?.lastChecked ? new Date(stats.lastChecked).toLocaleTimeString() : 'N/A'}
              </div>
            </div>
          </div>

          {/* Endpoints List */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Monitored APIs</h2>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="text-center text-gray-400 py-12">Loading...</div>
          ) : endpoints.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              No endpoints monitored. <Link href="/api/new" className="text-blue-500 hover:text-blue-400">Add one</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {endpoints.map((endpoint) => (
                <div
                  key={endpoint.id}
                  className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${endpoint.lastStatus === 'up' ? 'bg-green-500' : 'bg-red-500'}`} />
                      <h3 className="text-lg font-semibold text-white">{endpoint.name}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      endpoint.lastStatus === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {endpoint.lastStatus === 'up' ? 'Operational' : 'Down'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="max-w-md truncate">{endpoint.endpointUrl}</div>
                    <div>Last checked: {new Date(endpoint.lastChecked).toLocaleTimeString()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
