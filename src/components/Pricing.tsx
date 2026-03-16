'use client';

import { motion } from 'framer-motion';

const tiers = [
  {
    name: 'Starter',
    setup: '$149',
    monthly: '$29/mo',
    description: 'Perfect for solo pros who want a digital card that works.',
    features: [
      '1 NFC card + custom tap page',
      'Contact, socials & bio',
      'Google review link on page',
      'Basic support Mon-Fri',
      'Monthly review count report',
    ],
    color: '#00e5a0',
    popular: false,
  },
  {
    name: 'Growth',
    setup: '$299',
    monthly: '$59/mo',
    description: 'Full system: cards + booking + Google. Most businesses start here.',
    features: [
      '2 NFC cards + branded tap page',
      'Booking system setup',
      'Google Business optimization',
      'Review collection system',
      'Review response templates',
      'Monthly ranking & review report',
    ],
    color: '#00b8ff',
    popular: true,
  },
  {
    name: 'Pro',
    setup: '$499',
    monthly: '$99/mo',
    description: 'Everything. The complete client connection machine.',
    features: [
      '5 NFC cards + tap stand',
      'Premium tap page + portfolio',
      'Full booking system + service menu',
      'Complete Google ranking package',
      'Local SEO citations',
      'Monthly strategy call + report',
    ],
    color: '#b388ff',
    popular: false,
  },
];

const addons = [
  { name: 'Extra NFC cards', price: '$25 each' },
  { name: 'NFC tap stand', price: '$40' },
  { name: 'Custom domain', price: '$15/yr' },
  { name: 'QR code package', price: '$35' },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-28 overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-xs font-semibold tracking-[3px] uppercase block mb-4">
            Pricing
          </span>
          <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl md:text-4xl tracking-tight mb-4">
            Setup fee + monthly retainer
          </h2>
          <p className="text-dim text-lg max-w-xl mx-auto">
            One new customer from Google covers the monthly fee. The system pays for itself.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative rounded-2xl border p-7 flex flex-col ${
                tier.popular
                  ? 'bg-bg-card border-accent-2/30 scale-[1.02] md:scale-105'
                  : 'bg-bg-card border-white/[0.06]'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent-2 text-bg text-xs font-bold tracking-wider uppercase">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3
                  className="font-[family-name:var(--font-syne)] font-bold text-sm tracking-wider uppercase mb-3"
                  style={{ color: tier.color }}
                >
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-[family-name:var(--font-syne)] font-extrabold text-4xl tracking-tight">
                    {tier.setup}
                  </span>
                  <span className="text-dim text-sm">setup</span>
                </div>
                <p className="font-semibold text-lg" style={{ color: tier.color }}>
                  + {tier.monthly}
                </p>
                <p className="text-dim text-sm mt-2">{tier.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={tier.color}
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-dim">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] ${
                  tier.popular
                    ? 'bg-accent-2 text-bg hover:bg-accent-2/90'
                    : 'border border-white/10 text-txt hover:bg-white/[0.04]'
                }`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="font-[family-name:var(--font-syne)] font-bold text-sm text-center text-dim tracking-wider uppercase mb-4">
            Add-ons
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {addons.map((addon) => (
              <div
                key={addon.name}
                className="bg-bg-card border border-white/[0.04] rounded-xl p-3 text-center"
              >
                <p className="text-xs text-dim mb-1">{addon.name}</p>
                <p className="font-[family-name:var(--font-syne)] font-bold text-sm text-accent">
                  {addon.price}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-dim text-xs mt-6">
            No contracts. Cancel anytime. Monthly retainer covers ongoing management.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
