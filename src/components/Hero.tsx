'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease },
  }),
};

function PhoneMockup() {
  return (
    <div
      className="rounded-[2.5rem] overflow-hidden border-2 border-[#D4AF37]/20 mx-auto"
      style={{
        boxShadow: '0 0 60px rgba(212,175,55,0.08), 0 25px 60px rgba(0,0,0,0.12)',
        width: 280,
      }}
    >
      {/* Status bar */}
      <div className="bg-[#FAFAFA] px-6 py-2 flex items-center justify-between">
        <span className="text-[9px] text-[#6b6b6b]">9:41</span>
        <div className="w-16 h-4 rounded-full bg-[#1a1a1a]" />
        <div className="flex gap-1">
          <div className="w-3 h-2 rounded-sm bg-[#6b6b6b]/40" />
          <div className="w-1.5 h-2 rounded-sm bg-[#6b6b6b]/40" />
        </div>
      </div>
      {/* Tap page content */}
      <div className="bg-[#FAFAFA] overflow-hidden">
        <div className="bg-gradient-to-b from-[#F5F0E0] to-[#FAFAFA] px-5 pt-7 pb-5 text-center">
          <div className="w-[68px] h-[68px] rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#B8960C]/10 mx-auto mb-3 flex items-center justify-center border border-[#D4AF37]/20">
            <span className="text-2xl font-bold text-[#D4AF37]">MR</span>
          </div>
          <h4 className="font-bold text-[#1a1a1a] text-base">Maria Rodriguez</h4>
          <p className="text-[#6b6b6b] text-xs mt-0.5">Elite Real Estate Agent</p>
        </div>
        <div className="px-4 py-3 space-y-2">
          <div className="w-full py-2.5 rounded-xl bg-[#1a1a1a] text-white text-xs font-bold text-center">
            Save Contact
          </div>
          <div className="w-full py-2.5 rounded-xl bg-white border border-[#e5e5e5] text-[#1a1a1a] text-xs font-medium text-center">
            View Listings
          </div>
          <div className="w-full py-2.5 rounded-xl bg-white border border-[#e5e5e5] text-[#1a1a1a] text-xs font-medium text-center">
            Schedule a Showing
          </div>
          <div className="w-full py-2.5 rounded-xl bg-white border border-[#e5e5e5] text-[#1a1a1a] text-xs font-medium text-center">
            Leave a Review
          </div>
          <div className="flex gap-2 pt-1">
            <div className="flex-1 py-2 rounded-lg bg-[#F5F5F0] border border-[#e5e5e5] text-center">
              <span className="text-[10px] text-[#6b6b6b]">Call</span>
            </div>
            <div className="flex-1 py-2 rounded-lg bg-[#F5F5F0] border border-[#e5e5e5] text-center">
              <span className="text-[10px] text-[#6b6b6b]">Text</span>
            </div>
            <div className="flex-1 py-2 rounded-lg bg-[#F5F5F0] border border-[#e5e5e5] text-center">
              <span className="text-[10px] text-[#6b6b6b]">Email</span>
            </div>
          </div>
        </div>
        <div className="px-4 pb-3 pt-2 border-t border-[#e5e5e5]">
          <div className="flex items-center gap-2">
            <div className="flex text-[#D4AF37]">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="text-[10px] text-[#6b6b6b]">5.0 on Google (47 reviews)</span>
          </div>
        </div>
      </div>
      {/* Home bar */}
      <div className="bg-[#FAFAFA] py-2 flex justify-center">
        <div className="w-24 h-1 rounded-full bg-black/15" />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center hero-glow overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute top-[20%] right-[5%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(184,150,12,0.05),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(232,212,139,0.04),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-12 sm:pb-20 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/[0.08] border border-accent/25 text-accent text-xs font-semibold tracking-[0.15em] uppercase backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Smart Business Cards
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-[family-name:var(--font-syne)] font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.03em] leading-[0.95]"
            >
              <span className="text-txt/90">Your next client is</span>
              <br />
              <span className="gradient-text-rgb">one tap away.</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-dim text-lg md:text-xl max-w-xl leading-[1.7]"
            >
              They tap your card. Your contact saves to their phone, they book an appointment, and leave a 5-star review — all in under 10 seconds.
              <span className="text-accent font-semibold"> No app needed.</span>
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 pt-2"
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-btn text-white font-semibold text-base shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] transition-shadow duration-500"
              >
                <span className="absolute inset-0 rounded-full animate-[heroPulse_3s_ease-in-out_infinite] bg-accent/10" />
                <span className="relative z-10 flex items-center gap-2">
                  Get Your Free Mockup
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
              <a
                href="#demo"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border bg-white/60 text-txt font-semibold text-base hover:border-accent/40 hover:bg-accent/[0.06] hover:shadow-sm transition-all duration-300"
              >
                See Examples
                <svg className="w-4 h-4 text-dim group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" /></svg>
              </a>
            </motion.div>

            <motion.p
              custom={3.5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-dim text-sm"
            >
              Ready in 24 hours. No contracts.
            </motion.p>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-5 sm:gap-8 pt-10 border-t border-border"
            >
              <div>
                <p className="font-[family-name:var(--font-syne)] font-extrabold text-2xl sm:text-3xl gradient-text-rgb">48hr</p>
                <p className="text-dim text-xs mt-0.5">Setup time</p>
              </div>
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-border to-transparent" />
              <div>
                <p className="font-[family-name:var(--font-syne)] font-extrabold text-2xl sm:text-3xl text-txt">2 sec</p>
                <p className="text-dim text-xs mt-0.5">To share your contact</p>
              </div>
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-border to-transparent" />
              <div>
                <p className="font-[family-name:var(--font-syne)] font-extrabold text-2xl sm:text-3xl text-txt">10 sec</p>
                <p className="text-dim text-xs mt-0.5">To leave a review</p>
              </div>
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-border to-transparent" />
              <div>
                <p className="font-[family-name:var(--font-syne)] font-extrabold text-2xl sm:text-3xl text-txt">No apps</p>
                <p className="text-dim text-xs mt-0.5">needed</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Phone mockup showing a real tap page */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 rgb-line" />
    </section>
  );
}
