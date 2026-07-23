import { animate, stagger, svg } from 'animejs'
import { useInView } from '../hooks/useInView'

/* ---------- chart data (deterministic, generated once at module load) ---------- */

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const WEEKS = 48

/* price trajectory waypoints [week, EUR/GPU-hr]: sideways, failed rally,
   winter squeeze, training-season repricing, consolidation, late leg, pullback */
const ECM_WAY: [number, number][] = [
  [0, 1.82], [6, 1.80], [13, 1.85], [17, 2.02], [20, 1.93], [24, 1.79],
  [29, 1.98], [33, 2.15], [38, 2.11], [44, 2.31], [47, 2.21],
]
/* cost leg: power-linked, winter peak, summer relief */
const ECC_WAY: [number, number][] = [
  [0, 1.86], [8, 1.89], [14, 1.95], [20, 2.04], [24, 2.01], [30, 1.9],
  [38, 1.83], [43, 1.8], [47, 1.78],
]

function interp(way: [number, number][], w: number): number {
  for (let i = 1; i < way.length; i++) {
    if (w <= way[i][0]) {
      const [w0, p0] = way[i - 1]
      const [w1, p1] = way[i]
      return p0 + ((p1 - p0) * (w - w0)) / (w1 - w0)
    }
  }
  return way[way.length - 1][1]
}

type Candle = { open: number; close: number; high: number; low: number; vol: number }

const rand = mulberry32(11)
const CANDLES: Candle[] = []
{
  let prev = ECM_WAY[0][1]
  for (let w = 0; w < WEEKS; w++) {
    const open = prev
    const close = interp(ECM_WAY, w + 1) + (rand() - 0.5) * 0.05
    const high = Math.max(open, close) + rand() * 0.028
    const low = Math.min(open, close) - rand() * 0.028
    const vol = (0.25 + rand() * 0.55) * (1 + Math.abs(close - open) * 9)
    CANDLES.push({ open, close, high, low, vol })
    prev = close
  }
}
const ECC_PTS: number[] = Array.from(
  { length: WEEKS },
  (_, w) => interp(ECC_WAY, w + 0.5) + (rand() - 0.5) * 0.022,
)
const LAST = CANDLES[WEEKS - 1].close
const MAX_VOL = Math.max(...CANDLES.map((c) => c.vol))

/* geometry */
const STEP = 16
const BODY_W = 9
const Y = (p: number) => 16 + (2.4 - p) * 300 // 1.70..2.40 -> 226..16
const CX = (w: number) => w * STEP + STEP / 2
const VOL_BASE = 290
const VOL_MAX_H = 44
const TICKS = [1.8, 2.0, 2.2, 2.4]
const MONTHS = ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN']

const ECC_PATH = ECC_PTS.map(
  (p, w) => `${w === 0 ? 'M' : 'L'}${CX(w)} ${Y(p).toFixed(1)}`,
).join(' ')

const UP = '#34d399'
const DOWN = '#f87171'

/* ---------- copy ---------- */

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
    animate(root.querySelectorAll('.candle'), {
      translateY: [6, 0],
      opacity: [0, 1],
      delay: stagger(14, { start: 300 }),
      duration: 500,
      ease: 'outQuad',
    })
    animate(root.querySelectorAll('.vol'), {
      scaleY: [0, 1],
      delay: stagger(10, { start: 500 }),
      duration: 500,
      ease: 'outQuad',
    })
    animate(svg.createDrawable(root.querySelector('.ecc-line')!), {
      draw: ['0 0', '0 1'],
      duration: 2000,
      delay: 1100,
      ease: 'inOutQuart',
    })
    animate(root.querySelector('.price-tag')!, {
      opacity: [0, 1],
      translateX: [12, 0],
      duration: 600,
      delay: 2100,
      ease: 'outExpo',
    })
    animate(root.querySelectorAll('.chart-label'), {
      opacity: [0, 1],
      duration: 700,
      delay: stagger(180, { start: 2300 }),
      ease: 'outQuad',
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
              ECM-H100 weekly / trailing 12 months
            </p>
            <p className="font-mono text-3xl font-600 text-white">
              EUR {LAST.toFixed(2)} <span className="text-base text-muted">/ GPU-hr</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-2 font-mono text-xs text-muted">
              <svg viewBox="0 0 8 14" className="h-3.5 w-2">
                <line x1="4" y1="0" x2="4" y2="14" stroke={UP} strokeWidth="1.5" />
                <rect x="1" y="4" width="6" height="6" fill={UP} />
              </svg>
              ECM market
            </span>
            <span className="flex items-center gap-2 font-mono text-xs text-muted">
              <span className="h-0.5 w-4 bg-gold" /> ECC cost
            </span>
            <span className="rounded-full border border-mint/30 bg-mint/10 px-3 py-1 font-mono text-sm text-mint">
              ECS +{(LAST - ECC_PTS[WEEKS - 1]).toFixed(2)}
            </span>
          </div>
        </div>

        <svg viewBox="0 0 860 316" className="w-full">
          {/* horizontal grid + right price axis */}
          {TICKS.map((p) => (
            <g key={p}>
              <line x1="0" y1={Y(p)} x2="770" y2={Y(p)} stroke="#1c2340" strokeWidth="1" />
              <text
                x="782"
                y={Y(p) + 3.5}
                fill="#5a6183"
                fontSize="10"
                fontFamily="JetBrains Mono, monospace"
              >
                {p.toFixed(2)}
              </text>
            </g>
          ))}

          {/* candles */}
          {CANDLES.map((c, w) => {
            const up = c.close >= c.open
            const color = up ? UP : DOWN
            const bodyTop = Y(Math.max(c.open, c.close))
            const bodyH = Math.max(1.5, Math.abs(Y(c.open) - Y(c.close)))
            return (
              <g key={w} className="candle" opacity="0">
                <line
                  x1={CX(w)}
                  y1={Y(c.high)}
                  x2={CX(w)}
                  y2={Y(c.low)}
                  stroke={color}
                  strokeWidth="1"
                />
                <rect
                  x={CX(w) - BODY_W / 2}
                  y={bodyTop}
                  width={BODY_W}
                  height={bodyH}
                  fill={color}
                />
              </g>
            )
          })}

          {/* cost leg overlay */}
          <path
            className="ecc-line"
            d={ECC_PATH}
            fill="none"
            stroke="#f2c14e"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />

          {/* last price */}
          <g className="price-tag" opacity="0">
            <line
              x1="0"
              y1={Y(LAST)}
              x2="770"
              y2={Y(LAST)}
              stroke="#22d3ee"
              strokeWidth="1"
              strokeDasharray="3 4"
              opacity="0.6"
            />
            <rect x="774" y={Y(LAST) - 9} width="60" height="18" rx="3" fill="#22d3ee" />
            <text
              x="804"
              y={Y(LAST) + 4}
              textAnchor="middle"
              fill="#04050c"
              fontSize="11"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="600"
            >
              {LAST.toFixed(4)}
            </text>
          </g>

          {/* annotations */}
          <text
            className="chart-label"
            x={CX(22)}
            y={Y(1.74) + 14}
            textAnchor="middle"
            fill="#5a6183"
            fontSize="10"
            fontFamily="JetBrains Mono, monospace"
            opacity="0"
          >
            MARGIN SQUEEZE
          </text>
          <text
            className="chart-label"
            x={CX(31)}
            y={Y(2.2)}
            textAnchor="middle"
            fill="#5a6183"
            fontSize="10"
            fontFamily="JetBrains Mono, monospace"
            opacity="0"
          >
            TRAINING SEASON
          </text>

          {/* volume */}
          {CANDLES.map((c, w) => {
            const h = (c.vol / MAX_VOL) * VOL_MAX_H
            const up = c.close >= c.open
            return (
              <rect
                key={w}
                className="vol"
                x={CX(w) - BODY_W / 2}
                y={VOL_BASE - h}
                width={BODY_W}
                height={h}
                fill={up ? UP : DOWN}
                opacity="0.3"
                style={{ transformOrigin: `${CX(w)}px ${VOL_BASE}px` }}
              />
            )
          })}
          <line x1="0" y1={VOL_BASE} x2="770" y2={VOL_BASE} stroke="#1c2340" strokeWidth="1" />

          {/* month axis */}
          {MONTHS.map((m, i) => (
            <text
              key={i}
              x={CX(i * 4 + 2)}
              y="308"
              textAnchor="middle"
              fill="#5a6183"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
            >
              {m}
            </text>
          ))}
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
