'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const demos = [
  {
    title: 'Digital Business Card',
    subtitle: 'Save your contact instantly',
    color: '#00e5a0',
    content: (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#0a1a14] to-[#0d0d16] px-5 pt-8 pb-6 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00e5a0]/20 to-[#00b8ff]/10 mx-auto mb-3 flex items-center justify-center border border-[#00e5a0]/20">
            <span className="text-2xl font-bold text-[#00e5a0]">JC</span>
          </div>
          <h4 className="font-bold text-white text-base">Jordan Rivera</h4>
          <p className="text-[#7c7c99] text-xs mt-0.5">Premium Barber -- Riverside, CA</p>
        </div>
        {/* Actions */}
        <div className="flex-1 px-4 py-4 space-y-2.5">
          <button className="w-full py-2.5 rounded-xl bg-[#00e5a0] text-[#07070c] text-xs font-bold">
            Save Contact
          </button>
          <button className="w-full py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-xs font-medium">
            Book Appointment
          </button>
          <button className="w-full py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-xs font-medium">
            Leave a Review
          </button>
          <div className="flex gap-2 pt-2">
            <div className="flex-1 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-center">
              <span className="text-[10px] text-[#7c7c99]">Call</span>
            </div>
            <div className="flex-1 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-center">
              <span className="text-[10px] text-[#7c7c99]">Text</span>
            </div>
            <div className="flex-1 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-center">
              <span className="text-[10px] text-[#7c7c99]">Instagram</span>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="px-4 pb-4 pt-2 border-t border-white/[0.04]">
          <div className="flex items-center gap-2">
            <div className="flex text-[#ffd600]">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="text-[10px] text-[#7c7c99]">5.0 on Google</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Review Catcher',
    subtitle: 'Collect 5-star reviews automatically',
    color: '#ffd600',
    content: (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#1a1708] to-[#0d0d16] px-5 pt-8 pb-5 text-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ffd600]/20 to-[#ff8c42]/10 mx-auto mb-3 flex items-center justify-center border border-[#ffd600]/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffd600">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <h4 className="font-bold text-white text-base">How was your visit?</h4>
          <p className="text-[#7c7c99] text-xs mt-1">Jordan&apos;s Barbershop</p>
        </div>
        {/* Stars */}
        <div className="px-5 py-5 text-center">
          <div className="flex justify-center gap-3 mb-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-10 h-10 rounded-xl flex items-center justify-center ${i < 5 ? 'bg-[#ffd600]/10 border border-[#ffd600]/30' : 'bg-white/[0.04] border border-white/[0.06]'}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill={i < 5 ? '#ffd600' : '#333'}>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
            ))}
          </div>
          <p className="text-[#7c7c99] text-xs mb-5">Tap a star to rate</p>
          <button className="w-full py-3 rounded-xl bg-[#ffd600] text-[#07070c] text-xs font-bold">
            Leave a Google Review
          </button>
          <p className="text-[10px] text-[#7c7c99] mt-3">Takes less than 10 seconds</p>
        </div>
        {/* Recent reviews */}
        <div className="flex-1 px-4 pb-4">
          <p className="text-[10px] text-[#7c7c99] uppercase tracking-wider mb-2">Recent reviews</p>
          <div className="space-y-2">
            {['Best fade in the IE!', 'Always on point'].map((r, i) => (
              <div key={i} className="bg-white/[0.03] rounded-lg p-2.5 border border-white/[0.04]">
                <div className="flex text-[#ffd600] mb-1">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-[10px] text-[#eaeaf2]">&quot;{r}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Booking Page',
    subtitle: 'Let clients book in seconds',
    color: '#00b8ff',
    content: (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#081420] to-[#0d0d16] px-5 pt-8 pb-5 text-center">
          <h4 className="font-bold text-white text-base">Book with Jordan</h4>
          <p className="text-[#7c7c99] text-xs mt-1">Pick a service below</p>
        </div>
        {/* Services */}
        <div className="flex-1 px-4 py-3 space-y-2">
          {[
            { name: 'Classic Haircut', price: '$35', time: '30 min' },
            { name: 'Fade + Beard', price: '$45', time: '45 min' },
            { name: 'Kids Cut', price: '$25', time: '20 min' },
            { name: 'Hot Towel Shave', price: '$30', time: '25 min' },
          ].map((s) => (
            <div key={s.name} className="flex items-center justify-between bg-white/[0.03] rounded-xl p-3 border border-white/[0.06] hover:border-[#00b8ff]/20 transition-colors">
              <div>
                <p className="text-xs font-medium text-white">{s.name}</p>
                <p className="text-[10px] text-[#7c7c99] mt-0.5">{s.time}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-[#00b8ff]">{s.price}</p>
                <button className="text-[9px] text-[#00b8ff] mt-0.5 hover:underline">Book</button>
              </div>
            </div>
          ))}
        </div>
        {/* Time slots */}
        <div className="px-4 pb-4">
          <p className="text-[10px] text-[#7c7c99] uppercase tracking-wider mb-2">Next available</p>
          <div className="flex gap-2">
            {['10:00', '11:30', '1:00', '2:30'].map((t) => (
              <div key={t} className="flex-1 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-center hover:border-[#00b8ff]/30 transition-colors cursor-pointer">
                <span className="text-[10px] text-white">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

const CARD_WIDTH = 280;
const CARD_GAP = 20;
const CARD_STEP = CARD_WIDTH + CARD_GAP;

export default function DemoCarousel() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [active, setActive] = useState(0);

  const maxDrag = -(demos.length - 1) * CARD_STEP;

  const handleDragEnd = (_: unknown, info: { velocity: { x: number }; offset: { x: number } }) => {
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    const currentX = x.get();

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
      {/* Background glows */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,229,160,0.05),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(0,170,255,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute top-[30%] right-[30%] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(255,214,0,0.03),transparent_60%)] pointer-events-none" />

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
            They tap the card and instantly see the action you want them to take.
            <span className="text-accent font-semibold"> No app. No friction. Just results.</span>
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative" ref={constraintsRef}>
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
                {demos.map((demo, i) => {
                  return (
                    <motion.div
                      key={demo.title}
                      className="shrink-0"
                      style={{ width: CARD_WIDTH }}
                    >
                      {/* Phone frame */}
                      <div
                        className="rounded-[2.5rem] overflow-hidden border-2 mx-auto"
                        style={{
                          borderColor: `${demo.color}30`,
                          boxShadow: `0 0 60px ${demo.color}10, 0 25px 50px rgba(0,0,0,0.4)`,
                          width: 260,
                        }}
                      >
                        {/* Status bar */}
                        <div className="bg-[#0d0d16] px-6 py-2 flex items-center justify-between">
                          <span className="text-[9px] text-[#7c7c99]">9:41</span>
                          <div className="w-16 h-4 rounded-full bg-black" />
                          <div className="flex gap-1">
                            <div className="w-3 h-2 rounded-sm bg-[#7c7c99]/40" />
                            <div className="w-1.5 h-2 rounded-sm bg-[#7c7c99]/40" />
                          </div>
                        </div>
                        {/* Content */}
                        <div className="bg-[#0d0d16] h-[420px] overflow-hidden">
                          {demo.content}
                        </div>
                        {/* Home bar */}
                        <div className="bg-[#0d0d16] py-2 flex justify-center">
                          <div className="w-24 h-1 rounded-full bg-white/20" />
                        </div>
                      </div>

                      {/* Label */}
                      <div className="text-center mt-6">
                        <p className="font-[family-name:var(--font-syne)] font-bold text-sm text-txt">{demo.title}</p>
                        <p className="text-dim text-xs mt-1">{demo.subtitle}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {demos.map((demo, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{
                  background: active === i ? demo.color : 'rgba(255,255,255,0.1)',
                  boxShadow: active === i ? `0 0 12px ${demo.color}40` : 'none',
                  transform: active === i ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}
          </div>

          {/* Arrow nav for desktop */}
          <div className="hidden sm:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none px-4 md:px-16">
            <button
              onClick={() => goTo(Math.max(0, active - 1))}
              className="pointer-events-auto w-10 h-10 rounded-full card-premium flex items-center justify-center text-dim hover:text-txt hover:border-accent/20 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => goTo(Math.min(demos.length - 1, active + 1))}
              className="pointer-events-auto w-10 h-10 rounded-full card-premium flex items-center justify-center text-dim hover:text-txt hover:border-accent/20 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* CTA below carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-btn text-bg font-semibold text-sm"
          >
            Get Your Free Mockup
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
