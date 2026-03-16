'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const Card3D = dynamic(() => import('./Card3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
    </div>
  ),
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' as const },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center hero-glow overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-12 sm:pb-16 w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Copy */}
          <div className="space-y-6">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/[0.08] border border-accent/20 text-accent text-xs font-semibold tracking-wider uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Now serving Riverside &amp; the IE
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-[family-name:var(--font-syne)] font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05]"
            >
              One tap.
              <br />
              <span className="gradient-text">Infinite reach.</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-dim text-lg md:text-xl max-w-lg leading-relaxed"
            >
              Smart NFC cards that instantly share your contact, boost your Google reviews, and turn every handshake into a client.
              <span className="text-txt font-medium"> No app needed.</span>
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
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-bg font-semibold text-sm hover:bg-accent/90 transition-all duration-200 hover:scale-105 glow-accent"
              >
                Get Started
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="https://pages.taptechconnect.com/jordan-cuts"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/10 text-txt font-semibold text-sm hover:bg-white/[0.04] transition-all duration-200"
              >
                See a Demo
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 border-t border-white/5"
            >
              <div>
                <p className="font-[family-name:var(--font-syne)] font-extrabold text-xl sm:text-2xl text-txt">275+</p>
                <p className="text-dim text-xs">Leads identified</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="font-[family-name:var(--font-syne)] font-extrabold text-xl sm:text-2xl text-txt">4</p>
                <p className="text-dim text-xs">Cities covered</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="font-[family-name:var(--font-syne)] font-extrabold text-xl sm:text-2xl text-accent">48hr</p>
                <p className="text-dim text-xs">Setup time</p>
              </div>
            </motion.div>
          </div>

          {/* Right: 3D Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card3D />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-dim text-xs tracking-wider uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
