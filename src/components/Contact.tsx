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
          email: data.get('email'),
          phone: data.get('phone'),
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
            Ready?
          </span>
          <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] leading-[1.1] mb-5">
            Stop handing out
            <br />
            <span className="gradient-text">forgettable cards</span>
          </h2>
          <p className="text-dim text-lg md:text-xl leading-relaxed">
            Get set up in 48 hours. Show up first on Google. Turn every handshake into a customer.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          onSubmit={handleSubmit}
          className="card-premium rounded-2xl p-6 sm:p-8 md:p-10 space-y-5"
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
              <label htmlFor="email" className="block text-xs font-medium text-dim mb-2.5 tracking-wide">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                maxLength={254}
                placeholder="you@example.com"
                className={inputClasses}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="phone" className="block text-xs font-medium text-dim mb-2.5 tracking-wide">
                Phone (optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                maxLength={30}
                placeholder="(951) 555-0100"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="service" className="block text-xs font-medium text-dim mb-2.5 tracking-wide">
                Package Interest
              </label>
              <select
                id="service"
                name="service"
                className={inputClasses}
              >
                <option value="">Choose a plan...</option>
                <option value="Starter - $149 + $29/mo">Starter - $149 + $29/mo</option>
                <option value="Growth - $299 + $59/mo">Growth - $299 + $59/mo</option>
                <option value="Pro - $499 + $99/mo">Pro - $499 + $99/mo</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-medium text-dim mb-2.5 tracking-wide">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              maxLength={3000}
              rows={4}
              placeholder="Tell us about your business and what you need..."
              className={`${inputClasses} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-4 rounded-full gradient-btn text-bg font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent!' : 'Send Message'}
          </button>

          {status === 'error' && (
            <p className="text-red text-xs text-center">Something went wrong. Try emailing us directly.</p>
          )}

          <p className="text-center text-dim text-xs pt-1">
            Or email directly:{' '}
            <a href="mailto:taptechinstall@gmail.com" className="text-accent hover:underline">
              taptechinstall@gmail.com
            </a>
          </p>
        </motion.form>

        <p className="text-center text-dim text-xs mt-8">
          Riverside, CA -- serving all of the Inland Empire
        </p>
      </div>
    </section>
  );
}
