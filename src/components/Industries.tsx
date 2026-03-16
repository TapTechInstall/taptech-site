'use client';

import { motion } from 'framer-motion';

const industries = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    name: 'Real Estate',
    pitch: 'Open house attendees tap your card and instantly save your contact + see listings.',
    recommended: 'Growth',
    color: '#00b8ff',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="6" cy="6" r="3" />
        <path d="M8.12 8.12L12 12" />
        <path d="M20 4L8.12 15.88" />
        <circle cx="6" cy="18" r="3" />
        <path d="M14.8 14.8L20 20" />
      </svg>
    ),
    name: 'Barbers & Stylists',
    pitch: 'Tap stand at the station. After every cut: book the next one and leave a review.',
    recommended: 'Growth',
    color: '#00e5a0',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    name: 'Personal Trainers',
    pitch: 'Hand your card at the gym. They tap, see your transformations, book a session.',
    recommended: 'Starter',
    color: '#ff8c42',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    name: 'Tattoo Artists',
    pitch: 'Full portfolio loads instantly. No more "check my IG." Request booking right there.',
    recommended: 'Growth',
    color: '#b388ff',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <polygon points="16 8 22 4 22 16 16 12 16 8" />
      </svg>
    ),
    name: 'Car Sales',
    pitch: 'Every person who walks the lot gets your card. When they buy in 2 weeks, you are the call.',
    recommended: 'Starter',
    color: '#ffd600',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    name: 'DJs & Photographers',
    pitch: 'At every gig, hand out cards. They tap, hear your mixes or see photos, and book.',
    recommended: 'Growth',
    color: '#ff6ec7',
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Industries() {
  return (
    <section id="industries" className="relative py-28 sm:py-36 overflow-hidden">
      {/* Section glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] section-glow-blue pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-2/[0.08] border border-accent-2/20 text-accent-2 text-xs font-semibold tracking-[0.15em] uppercase mb-6">
            Industries
          </span>
          <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] mb-5">
            Built for <span className="gradient-text">every local business</span>
          </h2>
          <p className="text-dim text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Different industries, same result: more customers finding you, booking you, and reviewing you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="group card-premium rounded-2xl p-7 hover:translate-y-[-2px] relative overflow-hidden"
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"
                style={{ background: ind.color }}
              />

              <div className="flex items-start justify-between mb-4 pl-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${ind.color}15, ${ind.color}08)`,
                      color: ind.color,
                      boxShadow: `0 0 0 1px ${ind.color}20`,
                    }}
                  >
                    {ind.icon}
                  </div>
                  <h3 className="font-[family-name:var(--font-syne)] font-bold text-base text-txt">
                    {ind.name}
                  </h3>
                </div>
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase shrink-0"
                  style={{
                    background: `${ind.color}10`,
                    color: ind.color,
                    border: `1px solid ${ind.color}20`,
                  }}
                >
                  {ind.recommended}
                </span>
              </div>
              <p className="text-dim text-sm leading-[1.7] pl-3">{ind.pitch}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
