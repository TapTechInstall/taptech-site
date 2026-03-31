'use client';

import { motion } from 'framer-motion';

const categories = [
  {
    group: 'Beauty & Personal Care',
    color: '#D4AF37',
    industries: ['Barbershops', 'Salons', 'Nail Techs', 'Med Spas', 'Tattoo Artists', 'Lash & Brow Studios'],
  },
  {
    group: 'Health & Wellness',
    color: '#B8960C',
    industries: ['Dentists', 'Chiropractors', 'Yoga & Pilates Studios', 'Personal Trainers', 'Gyms & Fitness Studios', 'Massage Therapists'],
  },
  {
    group: 'Home Services',
    color: '#C4922A',
    industries: ['Contractors', 'Roofers', 'Electricians', 'Plumbers', 'Cleaning Services', 'Landscapers'],
  },
  {
    group: 'Food & Hospitality',
    color: '#8B7355',
    industries: ['Restaurants', 'Cafes & Coffee Shops', 'Catering', 'Food Trucks', 'Bakeries', 'Event Venues'],
  },
  {
    group: 'Real Estate & Finance',
    color: '#D4AF37',
    industries: ['Realtors', 'Loan Officers', 'Insurance Agents', 'Mortgage Brokers', 'Property Managers', 'Financial Advisors'],
  },
  {
    group: 'Automotive',
    color: '#B8960C',
    industries: ['Auto Detailers', 'Auto Shops', 'Car Sales', 'Tire Shops', 'Body Shops', 'Mobile Mechanics'],
  },
  {
    group: 'Creative & Events',
    color: '#C4922A',
    industries: ['Photographers', 'DJs', 'Videographers', 'Event Planners', 'Florists', 'Wedding Vendors'],
  },
  {
    group: 'Pets & More',
    color: '#8B7355',
    industries: ['Pet Groomers', 'Dog Walkers', 'Tutors & Coaches', 'Music Teachers', 'Dance Studios', 'Martial Arts'],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Industries() {
  return (
    <section id="industries" className="relative py-28 sm:py-36 overflow-hidden">
      {/* Section glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(212,175,55,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute top-[30%] left-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(184,150,12,0.03),transparent_60%)] pointer-events-none" />

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
          <p className="text-dim text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            If you hand out business cards, shake hands, or meet customers face-to-face --
            <span className="text-accent font-semibold"> this is built for you.</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06, ease }}
              className="card-premium rounded-2xl p-6 relative overflow-hidden group hover:translate-y-[-2px]"
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-4 right-4 h-[2px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${cat.color}60, transparent)` }}
              />

              <h3
                className="font-[family-name:var(--font-syne)] font-bold text-xs tracking-[0.15em] uppercase mb-4"
                style={{ color: cat.color }}
              >
                {cat.group}
              </h3>

              <ul className="space-y-2">
                {cat.industries.map((ind) => (
                  <li key={ind} className="flex items-center gap-2 text-sm text-dim">
                    <div
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ background: cat.color, opacity: 0.6 }}
                    />
                    {ind}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
          className="text-center text-dim text-sm mt-10"
        >
          Don&apos;t see your industry? <a href="#contact" className="text-accent hover:underline">We probably work with it. Ask us.</a>
        </motion.p>
      </div>
    </section>
  );
}
