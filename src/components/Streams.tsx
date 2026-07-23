import { animate, stagger } from 'animejs'
import { useInView } from '../hooks/useInView'

const STREAMS = [
  {
    num: '01',
    title: 'Market data for exchanges',
    body: 'Settlement-grade fixings engineered for cash-settled compute futures on EEX, Euronext, or ICE Endex. Compute becomes a tradable commodity, and we supply the EUR reference price.',
    points: ['Daily fixings, 18:00 CET', 'Pre-published fallback ladder', 'BMR-grade audit trail'],
    accent: 'text-electric',
    border: 'group-hover:border-electric/60',
  },
  {
    num: '02',
    title: 'Index licensing for fund managers',
    body: 'License the ECX Composite and its sub-indices (ECM-H100, ECM-B200, ECS) as the underlying for ETNs, ETCs, and benchmarked strategies. Give allocators clean EUR exposure to compute prices.',
    points: ['ETN and ETC licensing', 'Basis points on AUM', 'Benchmark administration'],
    accent: 'text-pulse',
    border: 'group-hover:border-pulse/60',
  },
  {
    num: '03',
    title: 'Advisory for compute buyers and sellers',
    body: 'Pricing intelligence built on the ECC cost engine: given today\'s hardware prices, EUR swap curve, and European power, what is breakeven? Negotiate against the index instead of a sales deck.',
    points: ['Procurement benchmarking', 'Price books and contract structuring', 'Collateral valuation for lenders'],
    accent: 'text-gold',
    border: 'group-hover:border-gold/60',
  },
]

export default function Streams() {
  const ref = useInView<HTMLElement>(() => {
    animate(ref.current!.querySelectorAll('[data-reveal]'), {
      translateY: [40, 0],
      opacity: [0, 1],
      delay: stagger(150),
      duration: 900,
      ease: 'outExpo',
    })
  })

  return (
    <section ref={ref} id="products" className="relative z-10 border-t border-line bg-ink/40 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p
          data-reveal
          className="font-mono text-xs uppercase tracking-[0.3em] text-electric opacity-0"
        >
          What we sell
        </p>
        <h2
          data-reveal
          className="mt-4 max-w-2xl font-display text-4xl font-600 tracking-tight text-white opacity-0 md:text-5xl"
        >
          Three products. One source of truth.
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {STREAMS.map((s) => (
            <div
              key={s.num}
              data-reveal
              className={`card-glow group rounded-2xl p-8 opacity-0 ${s.border}`}
            >
              <p className={`font-mono text-sm ${s.accent}`}>{s.num}</p>
              <h3 className="mt-4 font-display text-2xl font-600 leading-snug text-white">
                {s.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{s.body}</p>
              <ul className="mt-6 space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-sm text-muted">
                    <span className={`font-mono ${s.accent}`}>+</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
