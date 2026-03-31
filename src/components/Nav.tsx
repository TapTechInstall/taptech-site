'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const pageLinks = [
  { href: '/', label: 'Tap Cards' },
  { href: '/websites.html', label: 'Websites' },
  { href: '/shop.html', label: 'Shop' },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-bg/90 backdrop-blur-2xl border-b border-border shadow-[0_1px_12px_rgba(0,0,0,0.05)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 group">
            <span className="font-[family-name:var(--font-syne)] font-extrabold text-xl tracking-tight text-txt">
              Tap<span className="text-accent transition-all duration-300">Tech</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {pageLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm text-dim hover:text-txt transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-black/[0.03]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-4 text-sm font-semibold px-6 py-2.5 rounded-full gradient-btn text-white"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className={`block w-5 h-0.5 bg-txt transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-txt transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-txt transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-2xl pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {pageLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, ease }}
                  className="text-2xl font-[family-name:var(--font-syne)] font-bold text-txt py-3 border-b border-border hover:text-accent transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, ease }}
                className="text-lg font-semibold px-6 py-4 rounded-full gradient-btn text-white text-center mt-6"
              >
                Book a Free Call
              </motion.a>
              <motion.a
                href="sms:+15105700690?body=Hey%20TapTech%2C%20I%27m%20interested!"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, ease }}
                className="text-base font-medium text-center text-accent mt-2"
              >
                Or text us directly
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
