export default function Footer() {
  return (
    <footer id="company" className="relative z-10 border-t border-line bg-ink/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 32 32" className="h-6 w-6">
            <rect width="32" height="32" rx="7" fill="#0d1122" stroke="#1c2340" />
            <path
              d="M6 22 L12 14 L17 18 L26 8"
              stroke="#4f7dff"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="26" cy="8" r="2.5" fill="#f2c14e" />
          </svg>
          <span className="font-display font-600 text-white">
            Euro<span className="text-electric">Compute</span>
          </span>
        </div>
        <p className="text-sm text-faint">
          Indexing the European compute economy. Amsterdam, Milan, Frankfurt.
        </p>
        <p className="font-mono text-xs text-faint">
          (c) 2026 EuroCompute BV
        </p>
      </div>
    </footer>
  )
}
