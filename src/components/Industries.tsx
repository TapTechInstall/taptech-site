'use client';

import { motion } from 'framer-motion';

const industries = [
  {
    icon: '\u{1F4C8}',
    name: 'Real Estate',
    pitch: 'Open house attendees tap your card and instantly save your contact + see listings.',
    recommended: 'Growth',
    color: '#00b8ff',
  },
  {
    icon: '\u{2702}\u{FE0F}',
    name: 'Barbers & Stylists',
    pitch: 'Tap stand at the station. After every cut: book the next one and leave a review.',
    recommended: 'Growth',
    color: '#00e5a0',
  },
  {
    icon: '\u{1F4AA}',
    name: 'Personal Trainers',
    pitch: 'Hand your card at the gym. They tap, see your transformations, book a session.',
    recommended: 'Starter',
    color: '#ff8c42',
  },
  {
    icon: '\u{1F3A8}',
    name: 'Tattoo Artists',
    pitch: 'Full portfolio loads instantly. No more "check my IG." Request booking right there.',
    recommended: 'Growth',
    color: '#b388ff',
  },
  {
    icon: '\u{1F697}',
    name: 'Car Sales',
    pitch: 'Every person who walks the lot gets your card. When they buy in 2 weeks, you are the call.',
    recommended: 'Starter',
    color: '#ffd600',
  },
  {
    icon: '\u{1F3B5}',
    name: 'DJs & Photographers',
    pitch: 'At every gig, hand out cards. They tap, hear your mixes or see photos, and book.',
    recommended: 'Growth',
    color: '#ff6ec7',
  },
];

export default function Industries() {
  return (
    <section id="industries" className="relative py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-xs font-semibold tracking-[3px] uppercase block mb-4">
            Industries
          </span>
          <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl md:text-4xl tracking-tight mb-4">
            Built for <span className="gradient-text">every local business</span>
          </h2>
          <p className="text-dim text-lg max-w-xl mx-auto">
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
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-bg-card border border-white/[0.04] rounded-2xl p-6 hover:border-white/[0.08] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ind.icon}</span>
                  <h3 className="font-[family-name:var(--font-syne)] font-bold text-base">
                    {ind.name}
                  </h3>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase"
                  style={{
                    background: `${ind.color}12`,
                    color: ind.color,
                    border: `1px solid ${ind.color}25`,
                  }}
                >
                  {ind.recommended}
                </span>
              </div>
              <p className="text-dim text-sm leading-relaxed">{ind.pitch}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
