import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'
import { useInView } from '../hooks/useInView'

function Section({
  kicker,
  title,
  children,
}: {
  kicker: string
  title: string
  children: React.ReactNode
}) {
  const ref = useInView<HTMLElement>(() => {
    animate(ref.current!.querySelectorAll('[data-reveal]'), {
      translateY: [30, 0],
      opacity: [0, 1],
      delay: stagger(110),
      duration: 900,
      ease: 'outExpo',
    })
  }, 0.1)

  return (
    <section ref={ref} className="mx-auto max-w-5xl px-6 py-16">
      <p data-reveal className="font-mono text-xs uppercase tracking-[0.3em] text-electric opacity-0">
        {kicker}
      </p>
      <h2 data-reveal className="mt-3 font-display text-3xl font-600 tracking-tight text-white opacity-0 md:text-4xl">
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  )
}

const FAMILY = [
  { ticker: 'ECM-H100', name: 'EuroCompute Market H100', desc: 'EUR per GPU-hour, standardized on-demand H100 SXM rental, EU-jurisdiction delivery, published daily' },
  { ticker: 'ECM-H200 / B200 / MI300X', name: 'Per-generation market indices', desc: 'Same construction repeated per accelerator generation' },
  { ticker: 'ECX', name: 'EuroCompute Composite', desc: 'Capacity-weighted basket across accelerator generations, rebased to 1,000 points' },
  { ticker: 'ECC-H100 etc.', name: 'EuroCompute Cost', desc: 'Synthetic replication cost per GPU-hour: hardware amortization at market prices, EUR financing, EU electricity, facility opex' },
  { ticker: 'ECS', name: 'EuroCompute Margin', desc: 'ECM minus ECC: the implied gross margin of renting out compute in Europe' },
]

const SOURCES = [
  { rank: '1', name: 'Contributed transaction data', desc: 'Anonymized executed rental prices under signed data-contribution agreements with European providers: price, GPU model, term, cluster size, region, interconnect. Highest quality tier.' },
  { rank: '2', name: 'Marketplace and broker data', desc: 'GPU rental marketplaces, compute resale platforms, and colocation brokers active in Europe. Purchased or revenue-shared.' },
  { rank: '3', name: 'Committed public quotes', desc: 'Programmatic collection of published EU-region pricing across the provider set: collected continuously, timestamped, archived for auditability.' },
  { rank: '4', name: 'Buy-side panel', desc: 'Procurement teams share paid invoice rates under NDA, validating list-versus-paid discounts. Modeled on the commodity price-reporting window.' },
]

const PIPELINE = [
  { step: 'Collect', desc: 'All observations in the 24h window: transactions, quotes, list prices. Each carries a full attribute set: GPU model, count, term, region, interconnect, storage and network bundle, currency.' },
  { step: 'Normalize', desc: 'Everything converts to the reference configuration. Reserved pricing maps to on-demand equivalent via the estimated term-structure curve; small-node prices adjust via scale curves; PCIe versus SXM and memory variants map via fixed ratios re-estimated quarterly; non-EUR observations convert at the ECB reference rate of the day.' },
  { step: 'Filter', desc: 'De-duplicate, drop quotes that are stale (unchanged and untransacted beyond a threshold), and trim outliers beyond 3 median absolute deviations from the trimmed median.' },
  { step: 'Weight', desc: 'Observation weight = data-quality tier times source-capacity weight. Any single provider is capped at 20% so no contributor can dominate: a statistical choice that doubles as manipulation resistance.' },
  { step: 'Aggregate', desc: 'Capacity-weighted trimmed mean (trimmed median on thin days) to EUR per GPU-hour, published to 4 decimals.' },
  { step: 'Publish', desc: 'Daily fixing at 18:00 CET every TARGET2 business day, with a same-day methodology note flagging any fallback used. Full audit trail retained 5+ years.' },
]

const FALLBACK = [
  { level: 'Normal', desc: 'Standard calculation, full source set' },
  { level: 'Reduced-source', desc: 'Wider trimming when sources fall below the sufficiency threshold' },
  { level: 'Carry-forward', desc: 'Previous fixing republished with a staleness flag, 3 days maximum' },
  { level: 'Suspension', desc: 'Index suspended under the published cessation policy' },
]

export default function Methodology() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return
    animate(heroRef.current.querySelectorAll('[data-reveal]'), {
      translateY: [30, 0],
      opacity: [0, 1],
      delay: stagger(140, { start: 250 }),
      duration: 900,
      ease: 'outExpo',
    })
  }, [])

  return (
    <div className="relative overflow-hidden pt-16">
      <div className="grid-bg absolute inset-0" />

      <div ref={heroRef} className="relative mx-auto max-w-3xl px-6 pb-4 pt-24 text-center">
        <p data-reveal className="font-mono text-xs uppercase tracking-[0.3em] text-electric opacity-0">
          Methodology
        </p>
        <h1 data-reveal className="mt-4 font-display text-5xl font-700 tracking-tight text-white opacity-0 md:text-6xl">
          How the number <span className="text-gradient">is made.</span>
        </h1>
        <p data-reveal className="mx-auto mt-6 max-w-xl text-lg text-muted opacity-0">
          A benchmark is only worth what its methodology can defend. Ours is
          published, versioned, and governed for EU Benchmarks Regulation
          authorization.
        </p>
        <div data-reveal className="mt-8 flex flex-wrap items-center justify-center gap-4 opacity-0">
          <a
            href={`${import.meta.env.BASE_URL}EuroCompute_Methodology_v0.9.pdf`}
            download
            className="rounded-full bg-electric px-7 py-3 font-medium text-white transition-all hover:shadow-[0_0_40px_rgba(79,125,255,0.55)]"
          >
            Download the whitepaper (PDF)
          </a>
          <span className="font-mono text-xs text-faint">v0.9 draft, July 2026</span>
        </div>
      </div>

      <div className="relative">
        <Section kicker="01 / The unit" title="One reference GPU-hour">
          <div data-reveal className="card-glow rounded-2xl p-8 opacity-0">
            <p className="leading-relaxed text-muted">
              Every observation is normalized to a single reference
              configuration before it touches an index:
            </p>
            <div className="mt-5 grid gap-3 font-mono text-sm text-white sm:grid-cols-2">
              {[
                'H100 SXM 80GB in an 8-GPU HGX node',
                'Cluster interconnect at 3.2+ Tbps InfiniBand or RoCE',
                'On-demand term, no committed-spend discount',
                'EU-located data centre, EU-jurisdiction delivery',
              ].map((s) => (
                <p key={s} className="rounded-lg border border-line bg-ink px-4 py-3">
                  {s}
                </p>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-faint">
              Why so strict: a 3-year reserved contract in one region is not
              economically comparable to a spot hour elsewhere. Blending
              unadjusted observations produces noise, not a benchmark.
            </p>
          </div>
        </Section>

        <Section kicker="02 / The family" title="Five indices, one construction">
          <div data-reveal className="card-glow overflow-hidden rounded-2xl opacity-0">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line font-mono text-[11px] uppercase tracking-widest text-faint">
                  <th className="px-6 py-4">Ticker</th>
                  <th className="px-6 py-4">Index</th>
                  <th className="hidden px-6 py-4 md:table-cell">Construction</th>
                </tr>
              </thead>
              <tbody>
                {FAMILY.map((f) => (
                  <tr key={f.ticker} className="border-b border-line/50 last:border-0">
                    <td className="px-6 py-4 font-mono text-gold">{f.ticker}</td>
                    <td className="px-6 py-4 text-white">{f.name}</td>
                    <td className="hidden px-6 py-4 leading-relaxed text-muted md:table-cell">{f.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section kicker="03 / Market leg" title="ECM: observed prices, ranked by quality">
          <p data-reveal className="max-w-3xl leading-relaxed text-muted opacity-0">
            The market leg only uses observed prices, and it ranks them:
            executed transactions beat committed quotes, committed quotes beat
            list prices. Each observation carries a quality weight, and the
            methodology defines minimum data sufficiency per index before a
            fixing publishes.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {SOURCES.map((s) => (
              <div key={s.rank} data-reveal className="card-glow rounded-xl p-6 opacity-0">
                <p className="font-mono text-xs text-electric">TIER {s.rank}</p>
                <p className="mt-2 font-display text-lg font-600 text-white">{s.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 space-y-4">
            {PIPELINE.map((p, i) => (
              <div key={p.step} data-reveal className="flex gap-5 rounded-xl border border-line bg-ink/60 p-5 opacity-0">
                <span className="font-mono text-sm text-gold">0{i + 1}</span>
                <div>
                  <p className="font-display font-600 text-white">{p.step}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section kicker="04 / Cost leg" title="ECC: what an hour should cost">
          <p data-reveal className="max-w-3xl leading-relaxed text-muted opacity-0">
            The cost leg is synthetic: it converts three liquid, observable
            markets (hardware, rates, power) into the breakeven cost of one
            GPU-hour for a new-build European operator. For accelerator model g
            on day t:
          </p>
          <div data-reveal className="card-glow mt-8 overflow-x-auto rounded-2xl p-8 opacity-0">
            <pre className="font-mono text-sm leading-relaxed text-pulse">{`ECC(g,t) = CAPEX_hour + POWER_hour + FACILITY_hour + OPEX_hour

CAPEX_hour    = [ P_hw(g,t) x A(r,L) ] / ( 8760 x U )
POWER_hour    = kW_per_GPU x PUE x PowerPrice_t
FACILITY_hour = ( Coloc_per_kW_month x kW_per_GPU x 12 ) / ( 8760 x U )
OPEX_hour     = fixed adder for staff, maintenance, network, insurance`}</pre>
            <div className="mt-6 grid gap-x-8 gap-y-2 text-sm text-muted sm:grid-cols-2">
              <p><span className="font-mono text-white">P_hw</span> per-GPU share of current market server price</p>
              <p><span className="font-mono text-white">A(r,L)</span> annuity factor at EUR financing rate r over life L</p>
              <p><span className="font-mono text-white">U</span> billable utilization assumption, governed at 75%</p>
              <p><span className="font-mono text-white">PowerPrice</span> weighted EU day-ahead power incl. grid fees</p>
            </div>
          </div>
          <div data-reveal className="card-glow mt-6 rounded-2xl p-8 opacity-0">
            <p className="font-mono text-[11px] uppercase tracking-widest text-faint">
              Worked example, H100, illustrative inputs
            </p>
            <pre className="mt-4 overflow-x-auto font-mono text-sm leading-relaxed text-muted">{`CAPEX_hour    = 25,000 x 0.2886 / (8,760 x 0.75)  =  EUR 1.10
POWER_hour    = 1.3 kW x 1.3 PUE x 0.12 EUR/kWh   =  EUR 0.20
FACILITY_hour = 180 x 1.3 x 12 / 6,570            =  EUR 0.43
OPEX_hour     =                                      EUR 0.15
                                        ECC(H100) =  EUR 1.88`}</pre>
            <p className="mt-4 text-sm leading-relaxed text-faint">
              Against a market print near EUR 2.21, that is a positive but thin
              European operating margin: exactly the kind of finding the ECS
              spread surfaces daily. Utilization and useful life move this
              number more than anything else, so both are fixed by the
              methodology and reviewed annually with public consultation.
            </p>
          </div>
        </Section>

        <Section kicker="05 / Resilience" title="The fallback ladder">
          <p data-reveal className="max-w-3xl leading-relaxed text-muted opacity-0">
            Exchanges will not list futures without a credible answer to "what
            happens when the data is bad". The ladder is pre-published, and
            every fixing states which rung produced it.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {FALLBACK.map((f, i) => (
              <div key={f.level} data-reveal className="card-glow rounded-xl p-5 opacity-0">
                <p className="font-mono text-xs text-gold">RUNG {i + 1}</p>
                <p className="mt-2 font-display font-600 text-white">{f.level}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section kicker="06 / Governance" title="What makes it a benchmark">
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { t: 'Independent oversight', b: 'An oversight committee independent from commercial management approves the methodology, reviews assumption changes, and handles complaints.' },
              { t: 'Public methodology', b: 'This document is published and versioned, with annual public consultation on material changes.' },
              { t: 'Conflict-of-interest policy', b: 'Advisory staff are ring-fenced from index determination. Contributors\' commercial relationships cannot influence calculation.' },
              { t: 'Manipulation resistance', b: 'Source caps, trimming, transaction-over-quote hierarchy, and full audit trails, designed in from day one.' },
              { t: 'IOSCO alignment', b: 'Built to the IOSCO Principles for Financial Benchmarks from the first fixing.' },
              { t: 'BMR path', b: 'Registration under the EU Benchmarks Regulation (EU 2016/1011) so the index can legally settle EU futures and underlie EU ETPs.' },
            ].map((g) => (
              <div key={g.t} data-reveal className="card-glow rounded-xl p-6 opacity-0">
                <p className="font-display font-600 text-white">{g.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{g.b}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <div className="relative mx-auto max-w-3xl px-6 pb-32 pt-8 text-center">
        <h2 className="font-display text-3xl font-600 tracking-tight text-white md:text-4xl">
          Read the full specification.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          The whitepaper covers every parameter, adjustment curve, and
          governance procedure in detail.
        </p>
        <a
          href={`${import.meta.env.BASE_URL}EuroCompute_Methodology_v0.9.pdf`}
          download
          className="mt-8 inline-block rounded-full bg-electric px-8 py-3.5 font-medium text-white transition-all hover:shadow-[0_0_50px_rgba(79,125,255,0.6)]"
        >
          Download the whitepaper (PDF)
        </a>
      </div>
    </div>
  )
}
