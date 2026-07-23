import { Link } from 'react-router-dom'
import { AI_ICONS } from './aiIcons'

const SITE_URL = 'https://alberto0527.github.io/ComputeIndex/'
const AI_PROMPT = encodeURIComponent(
  `What is EuroCompute (${SITE_URL}), the European compute index family (ECX, ECM, ECC, ECS)? Summarize what they publish and who uses it.`,
)

const AI_ENGINES = [
  { name: 'ChatGPT', url: `https://chatgpt.com/?q=${AI_PROMPT}` },
  { name: 'Claude', url: `https://claude.ai/new?q=${AI_PROMPT}` },
  { name: 'Perplexity', url: `https://www.perplexity.ai/search?q=${AI_PROMPT}` },
  { name: 'Grok', url: `https://grok.com/?q=${AI_PROMPT}` },
  { name: 'Gemini', url: `https://gemini.google.com/app` },
]

const COLUMNS: {
  title: string
  links: { label: string; to?: string; soon?: boolean }[]
}[] = [
  {
    title: 'Indices',
    links: [
      { label: 'ECX Composite', to: '/#index' },
      { label: 'ECM-H100', to: '/#index' },
      { label: 'ECM-H200 / B200 / MI300X', to: '/#index' },
      { label: 'ECC Cost', to: '/methodology' },
      { label: 'ECS Margin', to: '/#index' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'Exchange licensing', to: '/#products' },
      { label: 'ETP licensing', to: '/#products' },
      { label: 'Data subscriptions', to: '/#products' },
      { label: 'Advisory', to: '/#products' },
      { label: 'Free weekly report', to: '/#free' },
    ],
  },
  {
    title: 'Roadmap',
    links: [
      { label: 'GPU forward curve', soon: true },
      { label: 'Regional sub-indices', soon: true },
      { label: 'Carbon-adjusted compute index', soon: true },
      { label: 'Token-price indices', soon: true },
      { label: 'Options analytics', soon: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Methodology', to: '/methodology' },
      { label: 'Compute, explained', to: '/learn' },
      { label: 'Market map', to: '/#map' },
      { label: 'Contact', to: '/#contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer id="company" className="relative z-10 border-t border-line bg-ink/60">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          <div>
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
            <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-faint">
              The EUR benchmark family for European compute. Amsterdam, Milan,
              Frankfurt.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[11px] uppercase tracking-widest text-faint">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.to ? (
                      <Link
                        to={l.to}
                        className="text-sm text-muted transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <span className="flex items-center gap-2 text-sm text-faint">
                        {l.label}
                        {l.soon && (
                          <span className="rounded-full border border-gold/30 bg-gold/10 px-1.5 py-px font-mono text-[9px] uppercase tracking-wide text-gold">
                            soon
                          </span>
                        )}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-line pt-8">
          <span className="font-mono text-[11px] uppercase tracking-widest text-faint">
            Ask an AI about us
          </span>
          {AI_ENGINES.map((e) => (
            <a
              key={e.name}
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-xs text-muted transition-all hover:border-electric/50 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
                <path fillRule="evenodd" d={AI_ICONS[e.name]} />
              </svg>
              {e.name}
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 md:flex-row md:items-center">
          <p className="font-mono text-xs text-faint">(c) 2026 EuroCompute BV</p>
          <p className="font-mono text-[11px] text-faint">
            All figures illustrative. Not investment advice. Not yet a BMR-registered benchmark.
          </p>
        </div>
      </div>
    </footer>
  )
}
