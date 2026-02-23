'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, Loader2 } from 'lucide-react'
import { DashboardHeader } from '@/components/layout/header'
import { EndpointCard } from '@/components/dashboard/endpoint-card'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { useEndpoints } from '@/hooks/use-endpoints'

export default function EndpointsPage() {
  const { endpoints, loading, refresh } = useEndpoints()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'up' | 'down'>('all')

  const filtered = endpoints.filter((ep) => {
    const matchesSearch =
      ep.name.toLowerCase().includes(search.toLowerCase()) ||
      ep.endpointUrl.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || ep.lastStatus === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <>
      <DashboardHeader
        title="Endpoints"
        description="Manage and monitor all your API endpoints"
      />

      <div className="space-y-6">
        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search endpoints..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white/[0.04] border border-white/[0.08] rounded-xl text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-1 glass glass-border rounded-xl p-1">
            {(['all', 'up', 'down'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  statusFilter === s
                    ? 'bg-white/[0.08] text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s === 'all' ? 'All' : s === 'up' ? 'Operational' : 'Down'}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-slate-500 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <p className="text-slate-400 text-sm mb-4">
              {endpoints.length === 0
                ? 'No endpoints yet. Add your first one to get started.'
                : 'No endpoints match your filters.'}
            </p>
            {endpoints.length === 0 && (
              <Button size="sm">
                <Plus className="w-4 h-4" />
                Add Endpoint
              </Button>
            )}
          </GlassCard>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 xl:grid-cols-2 gap-4"
          >
            {filtered.map((endpoint, i) => (
              <EndpointCard key={endpoint.id} endpoint={endpoint} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </>
  )
}
