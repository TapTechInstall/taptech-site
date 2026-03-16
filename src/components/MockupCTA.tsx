'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export default function MockupCTA() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* RGB glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(0,229,160,0.06),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="card-premium rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
        >
          {/* Gradient border top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/[0.08] border border-accent/20 text-accent text-xs font-semibold tracking-[0.15em] uppercase mb-6">
            Free Offer
          </div>

          <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] mb-5">
            Get a free mockup of
            <br />
            <span className="gradient-text">your tap card</span>
          </h2>

          <p className="text-dim text-lg max-w-xl mx-auto leading-relaxed mb-8">
            Send us your logo or business design and we&apos;ll create a preview of what your card could look like. No commitment required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full gradient-btn text-bg font-semibold text-base"
            >
              Get Your Free Mockup
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="sms:+15105700690?body=Hey%20TapTech%2C%20I%27d%20love%20a%20free%20mockup%20of%20my%20card!"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/[0.08] bg-white/[0.02] text-txt font-semibold text-base hover:border-accent/20 hover:bg-accent/[0.04] transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              Or Text Us
            </a>
          </div>

          <p className="text-dim text-xs mt-6">
            Just send your logo and business name. We&apos;ll do the rest.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
