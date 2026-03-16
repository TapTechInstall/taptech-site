import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="font-[family-name:var(--font-syne)] font-extrabold text-lg">
          Tap<span className="text-accent">Tech</span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-dim">
          <a href="mailto:taptechinstall@gmail.com" className="hover:text-txt transition-colors">
            Contact
          </a>
          <a
            href="https://instagram.com/taptech.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-txt transition-colors"
          >
            Instagram
          </a>
        </div>
        <p className="text-dim text-xs">&copy; 2026 TapTech Connect</p>
      </div>
    </footer>
  );
}
