'use client';

import { motion } from 'framer-motion';

const tiers = [
  {
    name: 'Starter',
    setup: '$149',
    monthly: '$29/mo',
    description: 'Perfect for solo pros who want a digital card that works.',
    features: [
      '1 custom tap card + digital profile page',
      'Your contact, socials, and bio',
      'Google review link built in',
      'Basic support Mon-Fri',
      'Monthly review count report',
    ],
    color: '#D4AF37',
    popular: false,
  },
  {
    name: 'Growth',
    setup: '$299',
    monthly: '$59/mo',
    description: 'Full system: cards + custom website + Google. Most businesses start here.',
    features: [
      '2 tap cards + custom-built business website',
      'Online booking page (your own URL)',
      'Website edits and updates included',
      'Google Business optimization',
      'Review collection system',
      'Monthly ranking and review report',
    ],
    color: '#B8960C',
    popular: true,
  },
  {
    name: 'Pro',
    setup: '$499',
    monthly: '$99/mo',
    description: 'Everything. The complete client connection machine.',
    features: [
      '5 tap cards + review stand',
      'Full custom website with portfolio and booking',
      'Ongoing website edits, updates, and new pages',
      'Complete Google ranking package',
      'Local SEO citations',
      'Monthly strategy call + report',
    ],
    color: '#8B7355',
    popular: false,
  },
];

const testimonials = [
  {
    quote: 'First week with TapTech, I got 6 new bookings and 4 Google reviews. My clients think it\'s the coolest thing.',
    name: 'Marcus T.',
    role: 'Barber',
    initials: 'MT',
  },
  {
    quote: 'I just tell people to tap. They get my listings, contact, and can schedule a showing right there. Game changer.',
    name: 'Sarah L.',
    role: 'Realtor',
    initials: 'SL',
  },
  {
    quote: 'People at the gym ask about training and I hand them the card. They book a session before they even leave.',
    name: 'Dre K.',
    role: 'Personal Trainer',
    initials: 'DK',
  },
];

const addons = [
  { name: 'Extra tap cards', price: '$20/card' },
  { name: 'Review stand', price: '$40' },
  { name: 'Custom domain', price: '$15/yr' },
  { name: 'QR code package', price: '$35' },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(212,175,55,0.03),transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(184,150,12,0.04),transparent_60%)] pointer-events-none" />

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
            One plan. Cards, website, and Google.
          </h2>
          <p className="text-dim text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            We build it, manage it, and keep it running. One new customer covers the monthly fee.
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
                  ? 'md:scale-[1.04] border-accent/30 shadow-[0_0_40px_rgba(212,175,55,0.08)]'
                  : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full bg-accent text-white text-xs font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(212,175,55,0.25)]">
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
                    ? 'gradient-btn text-white'
                    : 'border border-border text-txt hover:border-accent/25 hover:bg-accent/[0.04]'
                }`}
              >
                Get Your Free Mockup
              </a>
            </motion.div>
          ))}
        </div>

        {/* Testimonials near pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="grid md:grid-cols-3 gap-4 mb-16"
        >
          {testimonials.map((t) => (
            <div key={t.name} className="card-premium rounded-xl p-5 flex gap-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-accent/10 text-accent border border-accent/20"
              >
                {t.initials}
              </div>
              <div>
                <p className="text-dim text-sm leading-[1.7] mb-2">&quot;{t.quote}&quot;</p>
                <p className="text-xs">
                  <span className="text-txt font-medium">{t.name}</span>
                  <span className="text-dim"> -- {t.role}</span>
                </p>
              </div>
            </div>
          ))}
        </motion.div>

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
          <p className="text-center text-dim text-sm mt-6">
            Just need tap cards without a monthly plan?{' '}
            <a href="/shop.html" className="text-accent hover:underline font-medium">Order individual cards in our shop</a>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
