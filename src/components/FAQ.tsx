'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: 'How does the tap card work?',
    a: 'Your client holds their phone near the card -- no app needed. It instantly opens a custom page with your contact info, booking link, Google reviews, and social media. Works with all modern iPhones and Androids.',
  },
  {
    q: 'Do my clients need to download anything?',
    a: 'Nope. Zero downloads, zero apps. They just tap and everything pops up instantly in their browser. One tap to save your contact directly to their phone.',
  },
  {
    q: 'What does the monthly fee cover?',
    a: 'Ongoing management: updating your tap page whenever you need, monitoring and responding to Google reviews, maintaining your booking system, and sending you a monthly report with your review growth and ranking changes.',
  },
  {
    q: 'Can I change my links later?',
    a: 'Absolutely. Your tap page is fully editable. New Instagram? Different booking link? Updated phone number? We update it for you anytime -- included in your monthly retainer.',
  },
  {
    q: 'How fast is setup?',
    a: 'Most clients are fully set up within 48 hours. We build your tap page, program your NFC cards, set up booking, and optimize your Google listing. You can be live by end of week.',
  },
  {
    q: 'What if I cancel?',
    a: 'No contracts. Cancel anytime. Your NFC cards still work as regular cards, but the tap page goes offline. Most clients stay because the reviews and bookings more than cover the monthly fee.',
  },
  {
    q: 'How do the Google reviews work?',
    a: 'We create a direct link to your Google review form and embed it on your tap page and NFC stand. After a service, you tell the customer "tap here to leave a review" -- takes them 10 seconds. No searching, no fumbling.',
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-white/[0.04]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-sm font-medium text-txt group-hover:text-accent transition-colors pr-4">
          {faq.q}
        </span>
        <span
          className={`text-dim transition-transform duration-300 shrink-0 ${open ? 'rotate-45' : ''}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-dim text-sm leading-relaxed pb-5">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative py-28">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent text-xs font-semibold tracking-[3px] uppercase block mb-4">
            FAQ
          </span>
          <h2 className="font-[family-name:var(--font-syne)] font-extrabold text-3xl tracking-tight">
            Questions? We got you.
          </h2>
        </motion.div>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
