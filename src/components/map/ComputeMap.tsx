import { animate, stagger } from 'animejs'
import { useInView } from '../../hooks/useInView'
import { COUNTRIES, CENTROIDS, MAP_W, MAP_H } from './europeMap'

// EUR per H100 GPU-hour and day-ahead power (EUR/MWh) per market
const MARKETS: Record<string, { code: string; city: string; price: number; power: number }> = {
  '246': { code: 'FI', city: 'Helsinki', price: 1.69, power: 41 },
  '752': { code: 'SE', city: 'Stockholm', price: 1.72, power: 38 },
  '578': { code: 'NO', city: 'Oslo', price: 1.81, power: 44 },
  '208': { code: 'DK', city: 'Copenhagen', price: 1.89, power: 62 },
  '250': { code: 'FR', city: 'Paris', price: 1.98, power: 58 },
  '620': { code: 'PT', city: 'Lisbon', price: 2.01, power: 65 },
  '724': { code: 'ES', city: 'Madrid', price: 2.05, power: 67 },
  '040': { code: 'AT', city: 'Vienna', price: 2.12, power: 74 },
  '616': { code: 'PL', city: 'Warsaw', price: 2.18, power: 78 },
  '276': { code: 'DE', city: 'Frankfurt', price: 2.24, power: 82 },
  '056': { code: 'BE', city: 'Brussels', price: 2.28, power: 80 },
  '528': { code: 'NL', city: 'Amsterdam', price: 2.31, power: 84 },
  '372': { code: 'IE', city: 'Dublin', price: 2.35, power: 95 },
  '380': { code: 'IT', city: 'Milan', price: 2.42, power: 98 },
  '756': { code: 'CH', city: 'Zurich', price: 2.26, power: 86 },
}

// keep price pills from colliding in dense regions
const PILL_NUDGE: Record<string, [number, number]> = {
  '528': [-4, -16],
  '056': [-26, 14],
  '276': [12, 8],
  '208': [10, -8],
  '372': [-12, 2],
  '380': [-12, -14],
  '040': [8, 10],
}

const LOW = [52, 211, 153] // mint
const MID = [242, 193, 78] // gold
const HIGH = [248, 113, 113] // red

function priceColor(price: number): string {
  const t = Math.min(1, Math.max(0, (price - 1.65) / (2.45 - 1.65)))
  const lerp = (a: number[], b: number[], u: number) =>
    a.map((v, i) => Math.round(v + (b[i] - v) * u))
  const rgb = t < 0.5 ? lerp(LOW, MID, t * 2) : lerp(MID, HIGH, (t - 0.5) * 2)
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
}

const RANKED = Object.entries(MARKETS).sort((a, b) => a[1].price - b[1].price)

export default function ComputeMap() {
  const ref = useInView<HTMLElement>(() => {
    const root = ref.current!
    animate(root.querySelectorAll('[data-reveal]'), {
      translateY: [30, 0],
      opacity: [0, 1],
      delay: stagger(120),
      duration: 900,
      ease: 'outExpo',
    })
    animate(root.querySelectorAll('.country'), {
      opacity: [0, 1],
      delay: stagger(18, { start: 200 }),
      duration: 700,
      ease: 'outQuad',
    })
    animate(root.querySelectorAll('.price-pill'), {
      scale: [0, 1],
      opacity: [0, 1],
      delay: stagger(70, { start: 900 }),
      duration: 600,
      ease: 'outBack',
    })
    animate(root.querySelectorAll('.market-row'), {
      translateX: [-18, 0],
      opacity: [0, 1],
      delay: stagger(60, { start: 500 }),
      duration: 700,
      ease: 'outExpo',
    })
  }, 0.15)

  return (
    <section ref={ref} id="map" className="relative z-10 border-t border-line bg-ink/40 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p data-reveal className="font-mono text-xs uppercase tracking-[0.3em] text-electric opacity-0">
          Live coverage
        </p>
        <h2
          data-reveal
          className="mt-4 max-w-2xl font-display text-4xl font-600 tracking-tight text-white opacity-0 md:text-5xl"
        >
          Compute prices follow power prices.
        </h2>
        <p data-reveal className="mt-5 max-w-2xl text-lg text-muted opacity-0">
          Electricity is the marginal cost of every GPU-hour, so the map of
          compute looks like the map of power: cheap in the hydro-rich Nordics,
          expensive where grids are tight. ECM-H100 by delivery market,
          EUR per GPU-hour.
        </p>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_1.5fr]">
          {/* ranked market list */}
          <div data-reveal className="card-glow rounded-2xl p-5 opacity-0">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-faint">
              Markets, cheapest first
            </p>
            <ul className="space-y-1">
              {RANKED.map(([id, m]) => (
                <li
                  key={id}
                  className="market-row flex items-center justify-between rounded-lg px-3 py-1.5 opacity-0 transition-colors hover:bg-line/40"
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: priceColor(m.price) }}
                    />
                    <span className="text-sm text-white">{m.city}</span>
                    <span className="font-mono text-[11px] text-faint">{m.code}</span>
                  </span>
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-faint">
                      {m.power} EUR/MWh
                    </span>
                    <span className="font-mono text-sm text-white">
                      {m.price.toFixed(2)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-line pt-4">
              <div
                className="h-1.5 w-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${priceColor(1.65)}, ${priceColor(2.05)}, ${priceColor(2.45)})`,
                }}
              />
              <div className="mt-1.5 flex justify-between font-mono text-[10px] text-faint">
                <span>1.65</span>
                <span>EUR / GPU-hr</span>
                <span>2.45</span>
              </div>
            </div>
          </div>

          {/* map */}
          <div data-reveal className="opacity-0">
            <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="w-full">
              {COUNTRIES.map((c) => {
                const market = MARKETS[c.id]
                return (
                  <path
                    key={c.id}
                    className="country"
                    d={c.d}
                    fill={market ? priceColor(market.price) : '#0d1122'}
                    fillOpacity={market ? 0.22 : 0.8}
                    stroke={market ? priceColor(market.price) : '#1c2340'}
                    strokeOpacity={market ? 0.75 : 1}
                    strokeWidth="1"
                    opacity="0"
                  >
                    <title>
                      {market
                        ? `${c.name}: EUR ${market.price.toFixed(2)}/GPU-hr, power ${market.power} EUR/MWh`
                        : `${c.name}: not yet covered`}
                    </title>
                  </path>
                )
              })}
              {Object.entries(CENTROIDS).map(([id, [cx, cy]]) => {
                const m = MARKETS[id]
                if (!m) return null
                const [dx, dy] = PILL_NUDGE[id] ?? [0, 0]
                const x = cx + dx
                const y = cy + dy
                return (
                  <g
                    key={id}
                    className="price-pill"
                    opacity="0"
                    style={{ transformOrigin: `${x}px ${y}px` }}
                  >
                    <rect
                      x={x - 23}
                      y={y - 11}
                      width="46"
                      height="22"
                      rx="11"
                      fill="#04050c"
                      stroke={priceColor(m.price)}
                      strokeWidth="1.2"
                    />
                    <text
                      x={x}
                      y={y + 4}
                      textAnchor="middle"
                      fill="#e6e9f5"
                      fontSize="11.5"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="600"
                    >
                      {m.price.toFixed(2)}
                    </text>
                  </g>
                )
              })}
            </svg>
            <p className="mt-3 text-center font-mono text-[11px] text-faint">
              ECM-H100 delivery-market readings, illustrative. Day-ahead power from EPEX SPOT reference markets.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
