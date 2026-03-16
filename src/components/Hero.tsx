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

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center hero-glow overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* RGB glow orbs */}
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,51,102,0.08),transparent_60%)] pointer-events-none" />
      <div className="absolute top-[20%] right-[5%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,170,255,0.08),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(0,255,136,0.05),transparent_60%)] pointer-events-none" />
      <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(179,136,255,0.05),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-12 sm:pb-20 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/[0.08] border border-accent/25 text-accent text-xs font-semibold tracking-[0.15em] uppercase backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Now serving Riverside &amp; the IE
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-[family-name:var(--font-syne)] font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.03em] leading-[0.95]"
            >
              <span className="text-txt/90">One tap.</span>
              <br />
              <span className="gradient-text-rgb">Infinite reach.</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-dim text-lg md:text-xl max-w-xl leading-[1.7]"
            >
              Smart tap cards that instantly share your contact, boost your Google reviews, and turn every handshake into a client.
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
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-btn text-bg font-semibold text-base"
              >
                Book a Free Call
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/[0.08] bg-white/[0.02] text-txt font-semibold text-base hover:border-accent/20 hover:bg-accent/[0.04] transition-all duration-300"
              >
                See It In Action
              </a>
            </motion.div>

            {/* Value props */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-5 sm:gap-8 pt-10 border-t border-white/5"
            >
              <div>
                <p className="font-[family-name:var(--font-syne)] font-extrabold text-2xl sm:text-3xl gradient-text-rgb">48hr</p>
                <p className="text-dim text-xs mt-0.5">Setup time</p>
              </div>
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              <div>
                <p className="font-[family-name:var(--font-syne)] font-extrabold text-2xl sm:text-3xl text-txt">No apps</p>
                <p className="text-dim text-xs mt-0.5">needed</p>
              </div>
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              <div>
                <p className="font-[family-name:var(--font-syne)] font-extrabold text-2xl sm:text-3xl text-txt">10 sec</p>
                <p className="text-dim text-xs mt-0.5">To leave a review</p>
              </div>
            </motion.div>
          </div>

          {/* Right: 3D Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
          >
            <Card3D />
          </motion.div>
        </div>
      </div>

      {/* Bottom RGB divider line */}
      <div className="absolute bottom-0 left-0 right-0 rgb-line" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-dim text-xs tracking-[0.15em] uppercase">Scroll</span>
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
