'use client';

import { motion } from 'framer-motion';

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    title: 'Tap & Connect',
    description: 'Customer holds their phone near your card. No app, no download, no friction. Your contact saves instantly.',
    color: '#00e5a0',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
    title: 'Book Instantly',
    description: 'One tap to schedule. We set up Calendly, Booksy, or Square Appointments and link it to your card.',
    color: '#00b8ff',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: '5-Star Reviews',
    description: 'NFC stand at checkout drives Google reviews on autopilot. More reviews = higher ranking = more customers.',
    color: '#ffd600',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    title: 'Google Ranking',
    description: 'Full Google Business Profile optimization. We handle photos, categories, citations, and review responses.',
    color: '#b388ff',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Custom Tap Page',
    description: 'Mobile-optimized landing page with your brand, photos, services, booking link, and review button. Updates anytime.',
    color: '#ff6ec7',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: 'Monthly Reports',
    description: 'See your review growth, ranking changes, and booking stats. One report, every month. Proof the system works.',
    color: '#ff8c42',
  },
];

const flowSteps = [
  { label: 'NFC Card', sub: 'Physical trigger', color: '#00e5a0' },
  { label: 'Tap Page', sub: 'Digital identity', color: '#00b8ff' },
  { label: 'Booking', sub: 'Convert to appointment', color: '#ff8c42' },
  { label: 'Review', sub: 'Build social proof', color: '#ffd600' },
  { label: 'Ranking', sub: 'Get found on Google', color: '#b388ff' },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Features() {
  return (
    <section id="features" className="relative py-28 sm:py-36 overflow-hidden">
      {/* RGB section glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(0,255,136,0.05),transparent_60%)] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(0,170,255,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[15%] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(255,51,102,0.03),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/[0.08] border border-accent/20 text-accent text-xs font-semibold tracking-[0.15em] uppercase mb-6">
            How It Works
          </span>
          <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] mb-5">
            The complete <span className="gradient-text">client connection</span> system
          </h2>
          <p className="text-dim text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Every piece feeds the next. The card drives people to the tap page. The tap page drives bookings and reviews. The reviews drive Google ranking.
            <span className="text-accent font-semibold"> It&apos;s a flywheel.</span>
          </p>
        </motion.div>

        {/* Flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="flex flex-wrap justify-center items-center gap-3 mb-20"
        >
          {flowSteps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3">
              <div
                className="card-premium px-5 py-3 rounded-xl text-center min-w-[120px]"
                style={{
                  borderColor: `${step.color}20`,
                  background: `linear-gradient(180deg, ${step.color}0a, ${step.color}04)`,
                }}
              >
                <p className="text-sm font-semibold text-txt">{step.label}</p>
                <p className="text-[10px] text-dim mt-0.5">{step.sub}</p>
              </div>
              {i < flowSteps.length - 1 && (
                <svg className="w-4 h-4 text-accent/40 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              )}
            </div>
          ))}
        </motion.div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="group card-premium rounded-2xl p-7 hover:translate-y-[-2px]"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}08)`,
                  color: feature.color,
                  boxShadow: `0 0 0 1px ${feature.color}20`,
                }}
              >
                {feature.icon}
              </div>
              <h3 className="font-[family-name:var(--font-syne)] font-bold text-base mb-2 text-txt">
                {feature.title}
              </h3>
              <p className="text-dim text-sm leading-[1.7]">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
