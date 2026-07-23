import { animate, stagger, svg } from 'animejs'
import { useInView } from '../hooks/useInView'

/*
 * ECM (market leg): volatile, trends up with a spring drawdown and pullbacks.
 * ECC (cost leg): smooth, creeping up with power prices.
 * Lower y = higher price.
 */
const ECM_LINE =
  'M0 228 L40 220 L80 232 L120 208 L160 216 L200 186 L240 196 L280 168 ' +
  'L320 178 L360 148 L400 176 L440 188 L480 158 L520 166 L560 134 ' +
  'L600 146 L640 118 L680 126 L720 94 L760 102 L800 72'

const ECC_LINE = 'M0 196 C100 192 200 194 300 190 S500 186 600 184 S750 180 800 178'

const FACTS = [
  {
    tag: 'ECX Composite',
    title: 'The flagship benchmark',
    body: 'A capacity-weighted basket of GPU rental prices across accelerator generations, EU-jurisdiction delivery only, rebased to 1,000 points and published every TARGET2 business day at 18:00 CET.',
  },
  {
    tag: 'ECM + ECC',
    title: 'Two legs, one story',
    body: 'The Market leg (ECM) tracks what compute actually rents for: executed transactions first, committed quotes second, list prices last. The Cost leg (ECC) computes what an hour should cost from hardware capex, EUR financing rates, and European power prices.',
  },
  {
    tag: 'ECS Margin',
    title: 'The spread nobody else publishes',
    body: 'ECM minus ECC is the compute margin: the implied gross profit of renting out a GPU in Europe. Think crack spread for oil refiners, or spark spread in power. It tells providers when margins compress and lenders when cash flows are at risk.',
  },
]

const PIPELINE = [
  { step: 'Collect', detail: 'every transaction, quote, and list price in a 24h window' },
  { step: 'Normalize', detail: 'to one reference GPU-hour; FX at ECB rates' },
  { step: 'Filter', detail: 'de-duplicate, drop stale quotes, trim outliers' },
  { step: 'Weight', detail: 'by data quality and capacity, 20% source cap' },
  { step: 'Aggregate', detail: 'capacity-weighted trimmed mean, 4 decimals' },
  { step: 'Publish', detail: 'daily fixing with full audit trail' },
]

function Pipeline() {
  const ref = useInView<HTMLDivElement>(() => {
    animate(ref.current!.querySelectorAll('[data-step]'), {
      translateY: [24, 0],
      opacity: [0, 1],
      delay: stagger(110),
      duration: 800,
      ease: 'outExpo',
    })
  })

  return (
    <div ref={ref} className="mt-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-electric">
        How the number is made
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {PIPELINE.map((p, i) => (
          <div key={p.step} data-step className="card-glow rounded-xl p-4 opacity-0">
            <p className="font-mono text-xs text-gold">0{i + 1}</p>
            <p className="mt-1.5 font-display text-sm font-600 text-white">{p.step}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted">{p.detail}</p>
          </div>
        ))}
      </div>
      <p data-step className="mt-6 flex items-center gap-2.5 text-sm text-faint opacity-0">
        <span className="rounded-full border border-mint/30 bg-mint/10 px-2.5 py-0.5 font-mono text-[11px] text-mint">
          BMR
        </span>
        Governed for EU Benchmarks Regulation authorization: independent oversight,
        pre-published fallback ladder, records kept 5+ years.
      </p>
    </div>
  )
}

export default function IndexSection() {
  const ref = useInView<HTMLElement>(() => {
    const root = ref.current!
    animate(root.querySelectorAll('[data-reveal]'), {
      translateY: [30, 0],
      opacity: [0, 1],
      delay: stagger(120),
      duration: 900,
      ease: 'outExpo',
    })
    animate(svg.createDrawable(root.querySelector('.ecm-line')!), {
      draw: ['0 0', '0 1'],
      duration: 2400,
      delay: 300,
      ease: 'inOutQuart',
    })
    animate(svg.createDrawable(root.querySelector('.ecc-line')!), {
      draw: ['0 0', '0 1'],
      duration: 2400,
      delay: 700,
      ease: 'inOutQuart',
    })
    animate(root.querySelectorAll('.chart-dot'), {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 600,
      delay: stagger(150, { start: 2600 }),
      ease: 'outBack',
    })
    animate(svg.createDrawable(root.querySelector('.ecs-bracket')!), {
      draw: ['0 0', '0 1'],
      duration: 800,
      delay: 2900,
      ease: 'outQuart',
    })
    animate(root.querySelectorAll('.chart-label'), {
      opacity: [0, 1],
      translateX: [-8, 0],
      duration: 700,
      delay: stagger(180, { start: 3100 }),
      ease: 'outExpo',
    })
  })

  return (
    <section ref={ref} id="index" className="relative z-10 mx-auto max-w-6xl px-6 py-28">
      <p
        data-reveal
        className="font-mono text-xs uppercase tracking-[0.3em] text-electric opacity-0"
      >
        The index family
      </p>
      <h2
        data-reveal
        className="mt-4 max-w-2xl font-display text-4xl font-600 tracking-tight text-white opacity-0 md:text-5xl"
      >
        One number for a fragmented market.
      </h2>
      <p data-reveal className="mt-5 max-w-2xl text-lg text-muted opacity-0">
        Compute in Europe trades across hundreds of providers, currencies, and
        contract shapes. The EuroCompute family compresses that noise into
        settlement-grade signals: what compute rents for, what it should cost,
        and the margin between the two.
      </p>

      <div
        data-reveal
        className="card-glow mt-14 overflow-hidden rounded-2xl p-6 opacity-0 md:p-10"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-faint">
              ECM-H100 vs ECC-H100 / trailing 12 months
            </p>
            <p className="font-mono text-3xl font-600 text-white">
              EUR 2.21 <span className="text-base text-muted">/ GPU-hr</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-2 font-mono text-xs text-muted">
              <span className="h-2 w-2 rounded-full bg-pulse" /> ECM market
            </span>
            <span className="flex items-center gap-2 font-mono text-xs text-muted">
              <span className="h-2 w-2 rounded-full bg-gold" /> ECC cost
            </span>
            <span className="rounded-full border border-mint/30 bg-mint/10 px-3 py-1 font-mono text-sm text-mint">
              ECS +0.33
            </span>
          </div>
        </div>

        <svg viewBox="0 0 860 300" className="w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ecmStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4f7dff" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          {[60, 120, 180, 240].map((y) => (
            <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#1c2340" strokeWidth="1" />
          ))}

          <path
            className="ecc-line"
            d={ECC_LINE}
            fill="none"
            stroke="#f2c14e"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            className="ecm-line"
            d={ECM_LINE}
            fill="none"
            stroke="url(#ecmStroke)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle className="chart-dot" cx="800" cy="72" r="5.5" fill="#22d3ee" opacity="0" style={{ transformOrigin: '800px 72px' }} />
          <circle className="chart-dot" cx="800" cy="178" r="4.5" fill="#f2c14e" opacity="0" style={{ transformOrigin: '800px 178px' }} />

          {/* ECS margin bracket at the right edge */}
          <path
            className="ecs-bracket"
            d="M818 72 h10 v106 h-10"
            fill="none"
            stroke="#34d399"
            strokeWidth="1.5"
          />
          <text
            className="chart-label"
            x="836"
            y="122"
            fill="#34d399"
            fontSize="11"
            fontFamily="JetBrains Mono, monospace"
            opacity="0"
            transform="rotate(90 836 122)"
          >
            ECS
          </text>
          <text className="chart-label" x="368" y="215" fill="#8b93b8" fontSize="11" fontFamily="Inter, sans-serif" opacity="0">
            spring capacity glut
          </text>
          <text className="chart-label" x="590" y="105" fill="#8b93b8" fontSize="11" fontFamily="Inter, sans-serif" opacity="0">
            training season
          </text>
        </svg>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {FACTS.map((f) => (
          <div key={f.tag} data-reveal className="card-glow rounded-2xl p-7 opacity-0">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">
              {f.tag}
            </p>
            <h3 className="mt-3 font-display text-xl font-600 text-white">
              {f.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{f.body}</p>
          </div>
        ))}
      </div>

      <Pipeline />
    </section>
  )
}
