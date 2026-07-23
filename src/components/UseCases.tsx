import { useRef, useState } from 'react'
import { animate, stagger } from 'animejs'
import { useInView } from '../hooks/useInView'

const TABS = [
  {
    key: 'finance',
    label: 'Financial institutions',
    headline: 'Trade, hedge, and mark the newest commodity.',
    items: [
      { title: 'Trading firms', body: 'Low-latency index feeds to trade compute futures and arbitrage the ECM-ECC spread.' },
      { title: 'Banks and private credit', body: 'Mark GPU-backed collateral against an independent reference price instead of a borrower spreadsheet.' },
      { title: 'Asset managers', body: 'License the family as the underlying for ETNs, ETCs, and thematic products.' },
      { title: 'Insurers', body: 'Underwrite residual-value and business-interruption risk on live market data.' },
    ],
  },
  {
    key: 'buyers',
    label: 'Compute buyers',
    headline: 'Stop negotiating blind.',
    items: [
      { title: 'AI labs', body: 'Benchmark procurement against the index and lock training budgets with cash-settled futures.' },
      { title: 'Enterprises', body: 'Budget multi-year AI programs on a EUR reference price, not a sales quote.' },
      { title: 'Procurement teams', body: 'See list-versus-paid discounts across the market before signing.' },
      { title: 'Public sector', body: 'Track sovereign compute cost competitiveness across member states.' },
    ],
  },
  {
    key: 'providers',
    label: 'Providers & data centres',
    headline: 'Price with the market, not against it.',
    items: [
      { title: 'Neoclouds', body: 'Set and defend price books with ECC cost curves and live ECM market data.' },
      { title: 'Data centre operators', body: 'Index long-term contracts to ECX and de-risk revenue with forward sales.' },
      { title: 'Contributors', body: 'Supply anonymized executed prices, get free index access and a seat on the advisory panel.' },
      { title: 'CFOs', body: 'Show lenders collateral cash flows marked to an auditable benchmark.' },
    ],
  },
]

export default function UseCases() {
  const [active, setActive] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)

  const ref = useInView<HTMLElement>(() => {
    animate(ref.current!.querySelectorAll('[data-reveal]'), {
      translateY: [30, 0],
      opacity: [0, 1],
      delay: stagger(120),
      duration: 900,
      ease: 'outExpo',
    })
  })

  const switchTab = (i: number) => {
    if (i === active) return
    setActive(i)
    requestAnimationFrame(() => {
      if (!panelRef.current) return
      animate(panelRef.current.querySelectorAll('[data-case]'), {
        translateY: [18, 0],
        opacity: [0, 1],
        delay: stagger(70),
        duration: 600,
        ease: 'outExpo',
      })
      animate(panelRef.current.querySelector('[data-headline]')!, {
        translateY: [10, 0],
        opacity: [0, 1],
        duration: 500,
        ease: 'outExpo',
      })
    })
  }

  const tab = TABS[active]

  return (
    <section ref={ref} className="relative z-10 mx-auto max-w-6xl px-6 py-28">
      <p data-reveal className="font-mono text-xs uppercase tracking-[0.3em] text-electric opacity-0">
        Who it is for
      </p>
      <h2
        data-reveal
        className="mt-4 max-w-2xl font-display text-4xl font-600 tracking-tight text-white opacity-0 md:text-5xl"
      >
        One benchmark, every side of the trade.
      </h2>

      <div data-reveal className="mt-10 flex flex-wrap gap-2 opacity-0">
        {TABS.map((t, i) => (
          <button
            key={t.key}
            onClick={() => switchTab(i)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              i === active
                ? 'bg-electric text-white shadow-[0_0_24px_rgba(79,125,255,0.35)]'
                : 'border border-line text-muted hover:border-electric/40 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div ref={panelRef} data-reveal className="mt-10 opacity-0">
        <h3 data-headline className="font-display text-2xl font-600 text-white">
          {tab.headline}
        </h3>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tab.items.map((c) => (
            <div key={c.title} data-case className="card-glow rounded-xl p-5">
              <p className="font-display text-base font-600 text-white">{c.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
