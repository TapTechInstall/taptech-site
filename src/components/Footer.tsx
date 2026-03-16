import Link from 'next/link';

const footerLinks = [
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#industries', label: 'Industries' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="relative">
      {/* Gradient divider */}
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="font-[family-name:var(--font-syne)] font-extrabold text-2xl tracking-tight">
            Tap<span className="text-accent">Tech</span>
          </Link>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-dim">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-txt transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social + contact */}
          <div className="flex items-center gap-5">
            <a
              href="mailto:taptechinstall@gmail.com"
              className="text-dim hover:text-accent transition-colors duration-200"
              aria-label="Email"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 6L2 7" />
              </svg>
            </a>
            <a
              href="https://instagram.com/taptech.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dim hover:text-accent transition-colors duration-200"
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-dim text-xs">&copy; 2026 TapTech Connect. All rights reserved.</p>
          <p className="text-dim/50 text-xs">Riverside, CA</p>
        </div>
      </div>
    </footer>
  );
}
