'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  hover?: boolean
  glow?: boolean
}

export function GlassCard({
  className,
  children,
  hover = false,
  glow = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'glass glass-border rounded-2xl',
        hover && 'transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04]',
        glow && 'glow-sm',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
