'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get('_hp')) {
      setStatus('sent');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          phone: data.get('phone'),
          email: data.get('email'),
          business: data.get('business'),
          service: data.get('service'),
          message: data.get('message'),
        }),
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClasses =
    'w-full bg-bg border border-white/[0.06] rounded-xl px-4 py-3.5 text-sm text-txt placeholder:text-dim/40 focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all duration-300';

  return (
    <section id="contact" className="relative py-28 sm:py-36">
      {/* RGB glows */}
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(0,229,160,0.05),transparent_60%)] pointer-events-none" />
      <div className="absolute top-[20%] right-1/4 w-[400px] h-[300px] bg-[radial-gradient(circle,rgba(255,51,102,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-[10%] right-1/3 w-[400px] h-[300px] bg-[radial-gradient(circle,rgba(0,170,255,0.04),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/[0.08] border border-accent/20 text-accent text-xs font-semibold tracking-[0.15em] uppercase mb-6">
            Let&apos;s Go
          </span>
          <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] mb-5">
            Get your free mockup
            <br />
            <span className="gradient-text">in 24 hours</span>
          </h2>
          <p className="text-dim text-lg md:text-xl leading-relaxed">
            Drop your info and we&apos;ll text you back with a preview of your card. No pressure, no commitment.
          </p>
        </motion.div>

        {/* Quick contact options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="grid grid-cols-3 gap-3 mb-8"
        >
          <a
            href="sms:+15105700690?body=Hey%20TapTech%2C%20I%27m%20interested!"
            className="card-premium rounded-xl p-4 text-center hover:border-accent/20 transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-accent/[0.08] flex items-center justify-center mx-auto mb-2 group-hover:bg-accent/[0.15] transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00e5a0" strokeWidth="1.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            <p className="text-xs font-medium text-txt">Text Us</p>
            <p className="text-[10px] text-dim mt-0.5">Fastest reply</p>
          </a>
          <a
            href="tel:+15105700690"
            className="card-premium rounded-xl p-4 text-center hover:border-accent-2/20 transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-accent-2/[0.08] flex items-center justify-center mx-auto mb-2 group-hover:bg-accent-2/[0.15] transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00b8ff" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <p className="text-xs font-medium text-txt">Call Us</p>
            <p className="text-[10px] text-dim mt-0.5">Talk now</p>
          </a>
          <a
            href="mailto:taptechinstall@gmail.com"
            className="card-premium rounded-xl p-4 text-center hover:border-purple/20 transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-purple/[0.08] flex items-center justify-center mx-auto mb-2 group-hover:bg-purple/[0.15] transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b388ff" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 6L2 7" />
              </svg>
            </div>
            <p className="text-xs font-medium text-txt">Email</p>
            <p className="text-[10px] text-dim mt-0.5">Send details</p>
          </a>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          onSubmit={handleSubmit}
          className="card-premium rounded-2xl p-6 sm:p-8 space-y-5"
        >
          {/* Honeypot */}
          <div className="hidden" aria-hidden="true">
            <input type="text" name="_hp" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-dim mb-2.5 tracking-wide">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                maxLength={120}
                placeholder="Jordan Rivera"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-xs font-medium text-dim mb-2.5 tracking-wide">
                Phone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                maxLength={30}
                placeholder="(951) 555-0100"
                className={inputClasses}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-dim mb-2.5 tracking-wide">
                Email (optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                maxLength={254}
                placeholder="you@example.com"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="business" className="block text-xs font-medium text-dim mb-2.5 tracking-wide">
                Business Type
              </label>
              <select
                id="business"
                name="business"
                className={inputClasses}
              >
                <option value="">What do you do?</option>
                <option value="Barber / Salon">Barber / Salon</option>
                <option value="Restaurant / Cafe">Restaurant / Cafe</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Personal Trainer / Gym">Personal Trainer / Gym</option>
                <option value="Nail Tech / Med Spa">Nail Tech / Med Spa</option>
                <option value="Dentist / Health">Dentist / Health</option>
                <option value="Auto Shop / Detailer">Auto Shop / Detailer</option>
                <option value="Contractor / Home Services">Contractor / Home Services</option>
                <option value="Photographer / Creative">Photographer / Creative</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="service" className="block text-xs font-medium text-dim mb-2.5 tracking-wide">
              Interested In
            </label>
            <select
              id="service"
              name="service"
              className={inputClasses}
            >
              <option value="Free Mockup">Free Card Mockup</option>
              <option value="Starter - $149 + $29/mo">Starter - $149 + $29/mo</option>
              <option value="Growth - $299 + $59/mo">Growth - $299 + $59/mo</option>
              <option value="Pro - $499 + $99/mo">Pro - $499 + $99/mo</option>
              <option value="Just browsing">Just browsing</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-medium text-dim mb-2.5 tracking-wide">
              Anything else? (optional)
            </label>
            <textarea
              id="message"
              name="message"
              maxLength={3000}
              rows={2}
              placeholder="Tell us about your business, or just send your logo for a free mockup..."
              className={`${inputClasses} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-4 rounded-full gradient-btn text-bg font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Got it! We\'ll text you back.' : 'Get My Free Mockup'}
          </button>

          {status === 'error' && (
            <p className="text-red text-xs text-center">Something went wrong. Try texting us directly.</p>
          )}

          <p className="text-center text-dim text-xs pt-1">
            We&apos;ll text you back within a few hours. No spam, no pressure.
          </p>
        </motion.form>

        <p className="text-center text-dim text-xs mt-8">
          Riverside, CA -- serving all of the Inland Empire
        </p>
      </div>
    </section>
  );
}
