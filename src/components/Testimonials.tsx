'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Marcus T.',
    role: 'Barber',
    location: 'Riverside, CA',
    quote: 'I handed out paper cards for years and maybe got 2 calls. First week with TapTech, I got 6 new bookings and 4 Google reviews. My clients think it\'s the coolest thing.',
    color: '#00e5a0',
    initials: 'MT',
  },
  {
    name: 'Sarah L.',
    role: 'Realtor',
    location: 'Corona, CA',
    quote: 'At open houses I used to scramble for business cards. Now I just tell people to tap. They get my listings, contact, and can schedule a showing right there.',
    color: '#00b8ff',
    initials: 'SL',
  },
  {
    name: 'Dre K.',
    role: 'Personal Trainer',
    location: 'Moreno Valley, CA',
    quote: 'People at the gym ask about training and I just hand them the card. They see my transformations, pricing, and book a session before they even leave.',
    color: '#b388ff',
    initials: 'DK',
  },
];

const trustPoints = [
  { label: 'Works on iPhone & Android', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { label: 'No app download needed', icon: 'M18.36 6.64a9 9 0 11-12.73 0M12 2v10' },
  { label: 'Set up in 48 hours', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Built for local businesses', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Testimonials() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      {/* Glows */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(0,229,160,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(179,136,255,0.04),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/[0.08] border border-accent/20 text-accent text-xs font-semibold tracking-[0.15em] uppercase mb-6">
            Real Results
          </span>
          <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] mb-5">
            Don&apos;t take our word for it
          </h2>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-20">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
              className="card-premium rounded-2xl p-7 relative overflow-hidden"
            >
              {/* Accent top bar */}
              <div
                className="absolute top-0 left-6 right-6 h-[2px] rounded-full"
                style={{ background: `linear-gradient(90deg, transparent, ${t.color}40, transparent)` }}
              />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#ffd600">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              <p className="text-dim text-sm leading-[1.8] mb-6">&quot;{t.quote}&quot;</p>

              <div className="flex items-center gap-3 mt-auto">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: `${t.color}15`,
                    color: t.color,
                    border: `1px solid ${t.color}25`,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-txt">{t.name}</p>
                  <p className="text-xs text-dim">{t.role} -- {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {trustPoints.map((tp) => (
            <div key={tp.label} className="flex items-center gap-3 card-premium rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg bg-accent/[0.08] flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00e5a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={tp.icon} />
                </svg>
              </div>
              <span className="text-xs text-dim leading-snug">{tp.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
