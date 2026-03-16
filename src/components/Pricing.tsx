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

const ease = [0.22, 1, 0.36, 1] as const;

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-28 sm:py-36 overflow-hidden">
      {/* RGB background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(255,51,102,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(0,170,255,0.05),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(circle,rgba(0,255,136,0.03),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-2/[0.08] border border-accent-2/20 text-accent-2 text-xs font-semibold tracking-[0.15em] uppercase mb-6">
            Pricing
          </span>
          <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] mb-5">
            Setup fee + monthly retainer
          </h2>
          <p className="text-dim text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            One new customer from Google covers the monthly fee.
            <span className="text-accent font-semibold"> The system pays for itself.</span>
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mb-16">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, ease }}
              className={`relative card-premium rounded-2xl p-7 lg:p-8 flex flex-col ${
                tier.popular
                  ? 'md:scale-[1.04] border-accent-2/25 shadow-[0_0_60px_rgba(0,184,255,0.08)]'
                  : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full bg-accent-2 text-bg text-xs font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(0,184,255,0.3)]">
                  Most Popular
                </div>
              )}

              <div className="mb-7">
                <h3
                  className="font-[family-name:var(--font-syne)] font-bold text-xs tracking-[0.2em] uppercase mb-4"
                  style={{ color: tier.color }}
                >
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="font-[family-name:var(--font-syne)] font-extrabold text-4xl sm:text-5xl tracking-tight text-txt">
                    {tier.setup}
                  </span>
                  <span className="text-dim text-sm">setup</span>
                </div>
                <p className="font-semibold text-lg" style={{ color: tier.color }}>
                  + {tier.monthly}
                </p>
                <p className="text-dim text-sm mt-3 leading-relaxed">{tier.description}</p>
              </div>

              <ul className="space-y-3.5 mb-8 flex-1">
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
                    <span className="text-dim leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block text-center py-3.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  tier.popular
                    ? 'gradient-btn text-bg'
                    : 'border border-white/[0.08] text-txt hover:border-accent/20 hover:bg-accent/[0.04]'
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
          transition={{ duration: 0.5, ease }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="font-[family-name:var(--font-syne)] font-bold text-xs text-center text-dim tracking-[0.2em] uppercase mb-5">
            Add-ons
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {addons.map((addon) => (
              <div
                key={addon.name}
                className="card-premium rounded-xl p-4 text-center"
              >
                <p className="text-xs text-dim mb-1.5">{addon.name}</p>
                <p className="font-[family-name:var(--font-syne)] font-bold text-sm text-accent">
                  {addon.price}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-dim text-xs mt-8">
            No contracts. Cancel anytime. Monthly retainer covers ongoing management.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
