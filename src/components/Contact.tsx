'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot check
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

  return (
    <section id="contact" className="relative py-28">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent text-xs font-semibold tracking-[3px] uppercase block mb-4">
            Ready?
          </span>
          <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl md:text-4xl tracking-tight mb-4">
            Stop handing out
            <br />
            <span className="gradient-text">forgettable cards</span>
          </h2>
          <p className="text-dim text-lg">
            Get set up in 48 hours. Show up first on Google. Turn every handshake into a customer.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-bg-card border border-white/[0.06] rounded-2xl p-6 md:p-8 space-y-5"
        >
          {/* Honeypot */}
          <div className="hidden" aria-hidden="true">
            <input type="text" name="_hp" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-dim mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                maxLength={120}
                placeholder="Jordan Rivera"
                className="w-full bg-bg-alt border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-txt placeholder:text-dim/50 focus:outline-none focus:border-accent/40 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-dim mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                maxLength={254}
                placeholder="you@example.com"
                className="w-full bg-bg-alt border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-txt placeholder:text-dim/50 focus:outline-none focus:border-accent/40 transition-colors"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="phone" className="block text-xs font-medium text-dim mb-2">
                Phone (optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                maxLength={30}
                placeholder="(951) 555-0100"
                className="w-full bg-bg-alt border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-txt placeholder:text-dim/50 focus:outline-none focus:border-accent/40 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="service" className="block text-xs font-medium text-dim mb-2">
                Package Interest
              </label>
              <select
                id="service"
                name="service"
                className="w-full bg-bg-alt border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-txt focus:outline-none focus:border-accent/40 transition-colors"
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
            <label htmlFor="message" className="block text-xs font-medium text-dim mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              maxLength={3000}
              rows={4}
              placeholder="Tell us about your business and what you need..."
              className="w-full bg-bg-alt border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-txt placeholder:text-dim/50 focus:outline-none focus:border-accent/40 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-3.5 rounded-xl bg-accent text-bg font-semibold text-sm hover:bg-accent/90 transition-all duration-200 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent!' : 'Send Message'}
          </button>

          {status === 'error' && (
            <p className="text-red text-xs text-center">Something went wrong. Try emailing us directly.</p>
          )}

          <p className="text-center text-dim text-xs">
            Or email directly:{' '}
            <a href="mailto:taptechinstall@gmail.com" className="text-accent hover:underline">
              taptechinstall@gmail.com
            </a>
          </p>
        </motion.form>

        <p className="text-center text-dim text-xs mt-6">
          Riverside, CA -- serving all of the Inland Empire
        </p>
      </div>
    </section>
  );
}
