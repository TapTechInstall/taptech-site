import Link from 'next/link';

const serviceLinks = [
  { href: '/', label: 'Tap Cards' },
  { href: '/websites.html', label: 'Websites' },
  { href: '/shop.html', label: 'Shop' },
  { href: '/#pricing', label: 'Full Service Plans' },
];

const sectionLinks = [
  { href: '#demo', label: 'How It Works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="relative">
      {/* Gradient divider */}
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Logo */}
          <div>
            <Link href="/" className="font-[family-name:var(--font-syne)] font-extrabold text-2xl tracking-tight text-txt">
              Tap<span className="text-accent">Tech</span>
            </Link>
            <p className="text-dim text-sm mt-3 leading-relaxed">
              Custom tap cards, professional websites, and Google ranking for local businesses.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-[family-name:var(--font-syne)] font-bold text-xs tracking-[0.15em] uppercase text-txt mb-4">Services</h4>
            <div className="flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-dim hover:text-txt transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-[family-name:var(--font-syne)] font-bold text-xs tracking-[0.15em] uppercase text-txt mb-4">Company</h4>
            <div className="flex flex-col gap-2.5">
              {sectionLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-dim hover:text-txt transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-[family-name:var(--font-syne)] font-bold text-xs tracking-[0.15em] uppercase text-txt mb-4">Contact</h4>
            <div className="flex flex-col gap-2.5">
              <a href="sms:+15105700690" className="text-sm text-dim hover:text-txt transition-colors duration-200">Text us</a>
              <a href="tel:+15105700690" className="text-sm text-dim hover:text-txt transition-colors duration-200">Call us</a>
              <a href="mailto:taptechinstall@gmail.com" className="text-sm text-dim hover:text-txt transition-colors duration-200">Email</a>
              <a href="https://instagram.com/taptech.ai" target="_blank" rel="noopener noreferrer" className="text-sm text-dim hover:text-txt transition-colors duration-200">Instagram</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-dim text-xs">&copy; 2026 TapTech Connect. All rights reserved.</p>
          <div className="flex items-center gap-4 text-dim text-xs">
            <a href="/privacy.html" className="hover:text-txt transition-colors duration-200">Privacy Policy</a>
            <a href="/terms.html" className="hover:text-txt transition-colors duration-200">Terms of Service</a>
          </div>
          <p className="text-dim/50 text-xs">Riverside, CA</p>
        </div>
      </div>
    </footer>
  );
}
