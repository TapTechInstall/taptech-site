'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

const demos = [
  {
    title: 'Digital Business Card',
    subtitle: 'Their contact saves instantly',
    color: '#D4AF37',
    content: (
      <div className="flex flex-col h-full">
        <div className="bg-gradient-to-b from-[#F5F0E0] to-[#FAFAFA] px-5 pt-8 pb-6 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#B8960C]/10 mx-auto mb-3 flex items-center justify-center border border-[#D4AF37]/20">
            <span className="text-2xl font-bold text-[#D4AF37]">JR</span>
          </div>
          <h4 className="font-bold text-[#1a1a1a] text-base">Jordan Rivera</h4>
          <p className="text-[#6b6b6b] text-xs mt-0.5">Premium Barber</p>
        </div>
        <div className="flex-1 px-4 py-4 space-y-2.5 bg-[#FAFAFA]">
          <div className="w-full py-2.5 rounded-xl bg-[#1a1a1a] text-white text-xs font-bold text-center">
            Save Contact
          </div>
          <div className="w-full py-2.5 rounded-xl bg-white border border-[#e5e5e5] text-[#1a1a1a] text-xs font-medium text-center">
            Book Appointment
          </div>
          <div className="w-full py-2.5 rounded-xl bg-white border border-[#e5e5e5] text-[#1a1a1a] text-xs font-medium text-center">
            Leave a Review
          </div>
          <div className="flex gap-2 pt-2">
            <div className="flex-1 py-2 rounded-lg bg-[#F5F5F0] border border-[#e5e5e5] text-center">
              <span className="text-[10px] text-[#6b6b6b]">Call</span>
            </div>
            <div className="flex-1 py-2 rounded-lg bg-[#F5F5F0] border border-[#e5e5e5] text-center">
              <span className="text-[10px] text-[#6b6b6b]">Text</span>
            </div>
            <div className="flex-1 py-2 rounded-lg bg-[#F5F5F0] border border-[#e5e5e5] text-center">
              <span className="text-[10px] text-[#6b6b6b]">Instagram</span>
            </div>
          </div>
        </div>
        <div className="px-4 pb-4 pt-2 border-t border-[#e5e5e5] bg-[#FAFAFA]">
          <div className="flex items-center gap-2">
            <div className="flex text-[#D4AF37]">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="text-[10px] text-[#6b6b6b]">5.0 on Google</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Review Collector',
    subtitle: '5-star reviews on autopilot',
    color: '#D4AF37',
    content: (
      <div className="flex flex-col h-full bg-[#FAFAFA]">
        <div className="bg-gradient-to-b from-[#F5F0E0] to-[#FAFAFA] px-5 pt-8 pb-5 text-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#B8960C]/10 mx-auto mb-3 flex items-center justify-center border border-[#D4AF37]/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#D4AF37">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <h4 className="font-bold text-[#1a1a1a] text-base">How was your visit?</h4>
          <p className="text-[#6b6b6b] text-xs mt-1">Jordan&apos;s Barbershop</p>
        </div>
        <div className="px-5 py-5 text-center">
          <div className="flex justify-center gap-3 mb-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#D4AF37">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
            ))}
          </div>
          <p className="text-[#6b6b6b] text-xs mb-5">Tap a star to rate</p>
          <div className="w-full py-3 rounded-xl bg-[#1a1a1a] text-white text-xs font-bold text-center">
            Leave a Google Review
          </div>
          <p className="text-[10px] text-[#6b6b6b] mt-3">Takes less than 10 seconds</p>
        </div>
        <div className="flex-1 px-4 pb-4">
          <p className="text-[10px] text-[#6b6b6b] uppercase tracking-wider mb-2">Recent reviews</p>
          <div className="space-y-2">
            {['Best fade in town!', 'Always on point'].map((r, i) => (
              <div key={i} className="bg-white rounded-lg p-2.5 border border-[#e5e5e5]">
                <div className="flex text-[#D4AF37] mb-1">
                  {[0, 1, 2, 3, 4].map((j) => (
                    <svg key={j} width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-[10px] text-[#1a1a1a]">&quot;{r}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Instant Booking',
    subtitle: 'Clients book in seconds',
    color: '#B8960C',
    content: (
      <div className="flex flex-col h-full bg-[#FAFAFA]">
        <div className="bg-gradient-to-b from-[#F5F0E0] to-[#FAFAFA] px-5 pt-8 pb-5 text-center">
          <h4 className="font-bold text-[#1a1a1a] text-base">Book with Jordan</h4>
          <p className="text-[#6b6b6b] text-xs mt-1">Pick a service below</p>
        </div>
        <div className="flex-1 px-4 py-3 space-y-2">
          {[
            { name: 'Classic Haircut', price: '$35', time: '30 min' },
            { name: 'Fade + Beard', price: '$45', time: '45 min' },
            { name: 'Kids Cut', price: '$25', time: '20 min' },
            { name: 'Hot Towel Shave', price: '$30', time: '25 min' },
          ].map((s) => (
            <div key={s.name} className="flex items-center justify-between bg-white rounded-xl p-3 border border-[#e5e5e5]">
              <div>
                <p className="text-xs font-medium text-[#1a1a1a]">{s.name}</p>
                <p className="text-[10px] text-[#6b6b6b] mt-0.5">{s.time}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-[#D4AF37]">{s.price}</p>
                <span className="text-[9px] text-[#D4AF37]">Book</span>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 pb-4">
          <p className="text-[10px] text-[#6b6b6b] uppercase tracking-wider mb-2">Next available</p>
          <div className="flex gap-2">
            {['10:00', '11:30', '1:00', '2:30'].map((t) => (
              <div key={t} className="flex-1 py-2 rounded-lg bg-white border border-[#e5e5e5] text-center">
                <span className="text-[10px] text-[#1a1a1a]">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

function PhoneFrame({ demo, index }: { demo: typeof demos[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="rounded-[2.5rem] overflow-hidden border-2 mx-auto"
        style={{
          borderColor: `${demo.color}30`,
          boxShadow: `0 0 40px ${demo.color}08, 0 25px 50px rgba(0,0,0,0.1)`,
          width: 260,
        }}
      >
        <div className="bg-[#FAFAFA] px-6 py-2 flex items-center justify-between">
          <span className="text-[9px] text-[#6b6b6b]">9:41</span>
          <div className="w-16 h-4 rounded-full bg-[#1a1a1a]" />
          <div className="flex gap-1">
            <div className="w-3 h-2 rounded-sm bg-[#6b6b6b]/40" />
            <div className="w-1.5 h-2 rounded-sm bg-[#6b6b6b]/40" />
          </div>
        </div>
        <div className="bg-[#FAFAFA] h-[420px] overflow-hidden">
          {demo.content}
        </div>
        <div className="bg-[#FAFAFA] py-2 flex justify-center">
          <div className="w-24 h-1 rounded-full bg-black/15" />
        </div>
      </div>
      <div className="text-center mt-6">
        <p className="font-[family-name:var(--font-syne)] font-bold text-sm text-txt">{demo.title}</p>
        <p className="text-dim text-xs mt-1">{demo.subtitle}</p>
      </div>
    </motion.div>
  );
}

const CARD_WIDTH = 280;
const CARD_GAP = 20;
const CARD_STEP = CARD_WIDTH + CARD_GAP;

export default function DemoCarousel() {
  const x = useMotionValue(0);
  const [active, setActive] = useState(0);

  const maxDrag = -(demos.length - 1) * CARD_STEP;

  const handleDragEnd = (_: unknown, info: { velocity: { x: number }; offset: { x: number } }) => {
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    let targetIndex = active;

    if (Math.abs(velocity) > 300) {
      targetIndex = velocity > 0 ? active - 1 : active + 1;
    } else if (Math.abs(offset) > CARD_WIDTH / 3) {
      targetIndex = offset > 0 ? active - 1 : active + 1;
    }

    targetIndex = Math.max(0, Math.min(demos.length - 1, targetIndex));
    setActive(targetIndex);
    animate(x, -targetIndex * CARD_STEP, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    });
  };

  const goTo = (index: number) => {
    setActive(index);
    animate(x, -index * CARD_STEP, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    });
  };

  return (
    <section id="demo" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(184,150,12,0.03),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/[0.08] border border-accent/20 text-accent text-xs font-semibold tracking-[0.15em] uppercase mb-6">
            See It In Action
          </span>
          <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] mb-5">
            What your customers <span className="gradient-text">actually see</span>
          </h2>
          <p className="text-dim text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            They tap your card and get everything they need to become a paying customer.
            <span className="text-accent font-semibold"> No app. No friction. Just results.</span>
          </p>
        </motion.div>

        {/* Desktop: all 3 phones side by side */}
        <div className="hidden md:flex justify-center items-start gap-8 lg:gap-12">
          {demos.map((demo, i) => (
            <PhoneFrame key={demo.title} demo={demo} index={i} />
          ))}
        </div>

        {/* Mobile: swipeable carousel */}
        <div className="md:hidden relative">
          <div className="flex justify-center">
            <div className="overflow-hidden" style={{ width: CARD_WIDTH, maxWidth: '100%' }}>
              <motion.div
                className="flex cursor-grab active:cursor-grabbing"
                style={{ x, gap: CARD_GAP }}
                drag="x"
                dragConstraints={{ left: maxDrag, right: 0 }}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
              >
                {demos.map((demo) => (
                  <motion.div
                    key={demo.title}
                    className="shrink-0"
                    style={{ width: CARD_WIDTH }}
                  >
                    <div
                      className="rounded-[2.5rem] overflow-hidden border-2 mx-auto"
                      style={{
                        borderColor: `${demo.color}30`,
                        boxShadow: `0 0 40px ${demo.color}08, 0 25px 50px rgba(0,0,0,0.1)`,
                        width: 260,
                      }}
                    >
                      <div className="bg-[#FAFAFA] px-6 py-2 flex items-center justify-between">
                        <span className="text-[9px] text-[#6b6b6b]">9:41</span>
                        <div className="w-16 h-4 rounded-full bg-[#1a1a1a]" />
                        <div className="flex gap-1">
                          <div className="w-3 h-2 rounded-sm bg-[#6b6b6b]/40" />
                          <div className="w-1.5 h-2 rounded-sm bg-[#6b6b6b]/40" />
                        </div>
                      </div>
                      <div className="bg-[#FAFAFA] h-[420px] overflow-hidden">
                        {demo.content}
                      </div>
                      <div className="bg-[#FAFAFA] py-2 flex justify-center">
                        <div className="w-24 h-1 rounded-full bg-black/15" />
                      </div>
                    </div>
                    <div className="text-center mt-6">
                      <p className="font-[family-name:var(--font-syne)] font-bold text-sm text-txt">{demo.title}</p>
                      <p className="text-dim text-xs mt-1">{demo.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {demos.map((demo, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{
                  background: active === i ? demo.color : 'rgba(0,0,0,0.1)',
                  boxShadow: active === i ? `0 0 12px ${demo.color}40` : 'none',
                  transform: active === i ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Flow: how the system connects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm">
            {[
              { label: 'Hand them your card', icon: 'M3 10h18M3 14h18M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z' },
              { label: 'They tap their phone', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
              { label: 'They book + review', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
              { label: 'You get more clients', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <div className="card-premium rounded-xl px-4 py-3 flex items-center gap-3 min-w-[140px]">
                  <div className="w-8 h-8 rounded-lg bg-accent/[0.08] flex items-center justify-center shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={step.icon} />
                    </svg>
                  </div>
                  <span className="text-xs text-txt font-medium">{step.label}</span>
                </div>
                {i < 3 && (
                  <svg className="w-4 h-4 text-accent/40 hidden sm:block shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-btn text-white font-semibold text-sm"
          >
            Get Your Free Mockup
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <p className="text-dim text-xs mt-3">We&apos;ll send you a preview of your card in 24 hours</p>
        </motion.div>
      </div>
    </section>
  );
}
