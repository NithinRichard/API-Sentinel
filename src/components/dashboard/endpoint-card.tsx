'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Clock, Globe } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { StatusBadge } from '@/components/ui/status-badge'
import { StatusDot } from '@/components/ui/status-dot'
import { formatRelativeTime } from '@/utils/format'
import type { IEndpoint } from '@/interfaces'

interface EndpointCardProps {
  endpoint: IEndpoint
  index: number
}

export function EndpointCard({ endpoint, index }: EndpointCardProps) {
  const status = endpoint.lastStatus as 'up' | 'down' | 'degraded'

  return (
    <GlassCard
      hover
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group cursor-pointer"
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <StatusDot status={status} />
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-white truncate">
                {endpoint.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Globe className="w-3 h-3 text-slate-500 shrink-0" />
                <span className="text-xs text-slate-500 truncate max-w-[220px]">
                  {endpoint.endpointUrl}
                </span>
              </div>
            </div>
          </div>
          <StatusBadge status={status} />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-slate-500" />
              <span className="text-xs text-slate-400">
                {formatRelativeTime(endpoint.lastChecked)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {endpoint.methods.map((method) => (
                <span
                  key={method}
                  className="px-1.5 py-0.5 text-[10px] font-medium text-slate-400 bg-white/[0.04] rounded"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </GlassCard>
  )
}
