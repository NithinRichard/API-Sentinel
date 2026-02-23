'use client'

import { motion } from 'framer-motion'
import { RefreshCw } from 'lucide-react'
import { DashboardHeader } from '@/components/layout/header'
import { StatsGrid } from '@/components/dashboard/stats-grid'
import { EndpointCard } from '@/components/dashboard/endpoint-card'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { UptimeChart } from '@/components/dashboard/uptime-chart'
import { Button } from '@/components/ui/button'
import { useEndpoints } from '@/hooks/use-endpoints'

export default function DashboardPage() {
  const { endpoints, stats, loading, refresh } = useEndpoints()

  return (
    <>
      <DashboardHeader
        title="Dashboard"
        description="Monitor your API endpoints in real time"
      />

      <div className="space-y-6">
        <StatsGrid stats={stats} loading={loading} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Endpoints - 2 columns */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">
                Monitored Endpoints
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={refresh}
                disabled={loading}
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`}
                />
                Refresh
              </Button>
            </div>

            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="glass glass-border rounded-2xl p-5 animate-pulse"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-white/10" />
                      <div className="w-32 h-4 rounded bg-white/[0.06]" />
                    </div>
                    <div className="mt-3 w-48 h-3 rounded bg-white/[0.04]" />
                  </div>
                ))}
              </div>
            ) : endpoints.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass glass-border rounded-2xl p-12 text-center"
              >
                <p className="text-slate-400 text-sm">
                  No endpoints monitored yet.
                </p>
                <Button size="sm" className="mt-4">
                  Add Your First Endpoint
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {endpoints.map((endpoint, i) => (
                  <EndpointCard
                    key={endpoint.id}
                    endpoint={endpoint}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar widgets - 1 column */}
          <div className="space-y-6">
            <UptimeChart />
            <ActivityFeed />
          </div>
        </div>
      </div>
    </>
  )
}
