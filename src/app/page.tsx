'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Zap,
  Shield,
  Bell,
  Activity,
  ArrowRight,
  Github,
  Radio,
  BarChart3,
  Lock,
  Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const features = [
  {
    icon: Bell,
    title: 'Instant Alerts',
    description: 'Email and webhook notifications the moment your APIs go down. Zero delay.',
    gradient: 'from-indigo-500/20 to-violet-500/20',
    iconColor: 'text-indigo-400',
  },
  {
    icon: Zap,
    title: 'Sub-Second Checks',
    description: 'Health checks every 30 seconds. Know immediately when something breaks.',
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400',
  },
  {
    icon: Shield,
    title: '99.9% Uptime SLA',
    description: 'Built on edge infrastructure. Your monitoring never sleeps.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    icon: BarChart3,
    title: 'Deep Analytics',
    description: 'Response time trends, uptime history, and performance insights at a glance.',
    gradient: 'from-sky-500/20 to-cyan-500/20',
    iconColor: 'text-sky-400',
  },
  {
    icon: Lock,
    title: 'Encrypted Storage',
    description: 'API keys encrypted at rest. Your credentials stay safe with AES-256.',
    gradient: 'from-rose-500/20 to-pink-500/20',
    iconColor: 'text-rose-400',
  },
  {
    icon: Globe,
    title: 'Multi-Region',
    description: 'Check from multiple regions worldwide. Catch localized outages instantly.',
    gradient: 'from-violet-500/20 to-purple-500/20',
    iconColor: 'text-violet-400',
  },
]

const integrations = [
  'Google Maps', 'Stripe', 'Razorpay', 'Twilio', 'SendGrid', 'AWS', 'Firebase', 'Supabase',
]

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 dot-grid pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-500/[0.07] rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-50 border-b border-white/[0.06]"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
              <Zap className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-base font-semibold text-white tracking-tight">
              API Sentinel
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="https://github.com/openclaw/apisentinel"
              target="_blank"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              GitHub
            </Link>
            <Link href="/dashboard">
              <Button size="sm">Get Started</Button>
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass glass-border text-xs font-medium text-slate-300 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Monitoring 10,000+ endpoints worldwide
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
          >
            <span className="gradient-text">Don&apos;t lose money</span>
            <br />
            <span className="text-white">when your APIs go down</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Real-time monitoring for every API you depend on.
            Get instant alerts before your users even notice.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-4"
          >
            <Link href="/dashboard">
              <Button size="lg" className="group">
                Start Monitoring
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <a
              href="https://github.com/openclaw/apisentinel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="lg">
                <Github className="w-4 h-4" />
                View Source
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Integration Ribbon */}
      <section className="relative z-10 border-y border-white/[0.04] py-6 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <span className="text-xs text-slate-600 uppercase tracking-widest font-medium">
              Works with
            </span>
            {integrations.map((name) => (
              <span
                key={name}
                className="text-sm text-slate-500 font-medium"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Everything you need to stay online
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            A complete monitoring toolkit designed for developers who ship fast
            and can&apos;t afford downtime.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((feature) => (
            <GlassCard
              key={feature.title}
              variants={fadeUp}
              hover
              className="group"
            >
              <div className="p-6">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5`}
                >
                  <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </section>

      {/* Dashboard Preview */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="p-1 glow-md">
            <div className="rounded-xl bg-slate-950/80 p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs text-slate-600">API Sentinel — Dashboard</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Endpoints', value: '12', color: 'text-white' },
                  { label: 'Uptime', value: '99.8%', color: 'text-emerald-400' },
                  { label: 'Avg Response', value: '142ms', color: 'text-amber-400' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/[0.03] rounded-lg p-4 border border-white/[0.04]"
                  >
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                      {stat.label}
                    </p>
                    <p className={`text-xl font-semibold ${stat.color}`}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
              {['Google Maps Platform', 'Stripe API', 'Razorpay API'].map((name) => (
                <div
                  key={name}
                  className="flex items-center justify-between bg-white/[0.02] rounded-lg px-4 py-3 border border-white/[0.04]"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <span className="absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-sm text-slate-300">{name}</span>
                  </div>
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Operational
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_70%)]" />
          <div className="relative px-12 py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Ready to protect your APIs?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-md mx-auto">
              Start monitoring in minutes. First 3 endpoints free, no credit card required.
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-100 shadow-xl"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-slate-500">
              API Sentinel
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Built for developers who can&apos;t afford downtime.
          </p>
        </div>
      </footer>
    </div>
  )
}
