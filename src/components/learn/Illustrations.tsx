import { animate, stagger, svg, utils } from 'animejs'
import { useInView } from '../../hooks/useInView'

/* Shared frame for every illustration */
function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="card-glow rounded-2xl p-6">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-faint">
        {label}
      </p>
      {children}
    </div>
  )
}

/* 01 - a GPU chip eating jobs and emitting answers */
export function ChipIllustration() {
  const ref = useInView<HTMLDivElement>(() => {
    const root = ref.current!
    animate(root.querySelectorAll('.ring'), {
      scale: [1, 2.1],
      opacity: [0.5, 0],
      duration: 2600,
      delay: stagger(850),
      loop: true,
      ease: 'outSine',
    })
    animate(root.querySelectorAll('.job'), {
      translateX: [0, 150],
      opacity: [0, 1, 0],
      duration: () => utils.random(2000, 3400),
      delay: stagger(400),
      loop: true,
      ease: 'inOutSine',
    })
    animate(root.querySelectorAll('.answer'), {
      translateX: [0, 150],
      opacity: [0, 1, 0],
      duration: () => utils.random(2200, 3600),
      delay: stagger(600),
      loop: true,
      ease: 'inOutSine',
    })
    animate(root.querySelector('.chip-core')!, {
      opacity: [0.6, 1],
      duration: 1200,
      loop: true,
      alternate: true,
      ease: 'inOutSine',
    })
  })

  return (
    <div ref={ref}>
      <Frame label="fig. 01 / a unit of compute">
        <svg viewBox="0 0 460 300" className="w-full">
          <g style={{ transformOrigin: '230px 150px' }}>
            <circle className="ring" cx="230" cy="150" r="60" fill="none" stroke="#4f7dff" strokeWidth="1.5" style={{ transformOrigin: '230px 150px' }} />
            <circle className="ring" cx="230" cy="150" r="60" fill="none" stroke="#22d3ee" strokeWidth="1.5" style={{ transformOrigin: '230px 150px' }} />
            <circle className="ring" cx="230" cy="150" r="60" fill="none" stroke="#4f7dff" strokeWidth="1.5" style={{ transformOrigin: '230px 150px' }} />
          </g>

          {/* chip */}
          <rect x="185" y="105" width="90" height="90" rx="12" fill="#0d1122" stroke="#4f7dff" strokeWidth="2" />
          <rect className="chip-core" x="203" y="123" width="54" height="54" rx="6" fill="#4f7dff" opacity="0.8" />
          <text x="230" y="155" textAnchor="middle" fill="#ffffff" fontSize="13" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            GPU
          </text>
          {/* pins */}
          {[120, 140, 160, 180].map((y) => (
            <g key={y}>
              <rect x="176" y={y} width="9" height="3" rx="1.5" fill="#3a4470" />
              <rect x="275" y={y} width="9" height="3" rx="1.5" fill="#3a4470" />
            </g>
          ))}

          {/* jobs flowing in */}
          {[95, 150, 205].map((y, i) => (
            <rect key={i} className="job" x="28" y={y - 7} width="14" height="14" rx="3" fill="#f2c14e" opacity="0" />
          ))}
          <text x="35" y="252" textAnchor="middle" fill="#5a6183" fontSize="11" fontFamily="Inter, sans-serif">
            work in
          </text>

          {/* answers flowing out */}
          {[115, 150, 185].map((y, i) => (
            <circle key={i} className="answer" cx="290" cy={y} r="5" fill="#22d3ee" opacity="0" />
          ))}
          <text x="425" y="252" textAnchor="middle" fill="#5a6183" fontSize="11" fontFamily="Inter, sans-serif">
            answers out
          </text>
        </svg>
      </Frame>
    </div>
  )
}

/* 02 - sellers, the market, buyers */
const LEFT_NODES = [
  { y: 70, label: 'Data centres' },
  { y: 150, label: 'Clouds' },
  { y: 230, label: 'HPC labs' },
]
const RIGHT_NODES = [
  { y: 70, label: 'AI companies' },
  { y: 150, label: 'Enterprises' },
  { y: 230, label: 'Investors' },
]

export function PlayersIllustration() {
  const ref = useInView<HTMLDivElement>(() => {
    const root = ref.current!
    utils.set(root.querySelectorAll('.flow'), { strokeDasharray: '5 9' })
    animate(root.querySelectorAll('.flow'), {
      strokeDashoffset: [0, -56],
      duration: 2000,
      loop: true,
      ease: 'linear',
    })
    animate(root.querySelectorAll('.node'), {
      scale: [1, 1.12],
      duration: 1600,
      delay: stagger(250),
      loop: true,
      alternate: true,
      ease: 'inOutSine',
    })
  })

  return (
    <div ref={ref}>
      <Frame label="fig. 02 / who trades compute">
        <svg viewBox="0 0 460 300" className="w-full">
          {LEFT_NODES.map((n) => (
            <path key={n.y} className="flow" d={`M92 ${n.y} Q160 ${n.y} 196 150`} fill="none" stroke="#4f7dff" strokeWidth="1.5" opacity="0.7" />
          ))}
          {RIGHT_NODES.map((n) => (
            <path key={n.y} className="flow" d={`M264 150 Q300 ${n.y} 368 ${n.y}`} fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.7" />
          ))}

          {LEFT_NODES.map((n) => (
            <g key={n.label}>
              <circle className="node" cx="70" cy={n.y} r="20" fill="#0d1122" stroke="#4f7dff" strokeWidth="1.5" style={{ transformOrigin: `70px ${n.y}px` }} />
              {[-6, 0, 6].map((dy) => (
                <line key={dy} x1="61" y1={n.y + dy} x2="79" y2={n.y + dy} stroke="#4f7dff" strokeWidth="2" strokeLinecap="round" />
              ))}
              <text x="70" y={n.y + 38} textAnchor="middle" fill="#8b93b8" fontSize="11" fontFamily="Inter, sans-serif">
                {n.label}
              </text>
            </g>
          ))}

          <circle className="node" cx="230" cy="150" r="34" fill="#0d1122" stroke="#f2c14e" strokeWidth="2" style={{ transformOrigin: '230px 150px' }} />
          <path d="M216 158 L226 144 L232 150 L244 136" stroke="#f2c14e" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="230" y="205" textAnchor="middle" fill="#f2c14e" fontSize="11" fontFamily="JetBrains Mono, monospace">
            THE MARKET
          </text>

          {RIGHT_NODES.map((n) => (
            <g key={n.label}>
              <circle className="node" cx="390" cy={n.y} r="20" fill="#0d1122" stroke="#22d3ee" strokeWidth="1.5" style={{ transformOrigin: `390px ${n.y}px` }} />
              <circle cx="390" cy={n.y - 4} r="4.5" fill="none" stroke="#22d3ee" strokeWidth="1.8" />
              <path d={`M381 ${n.y + 10} Q390 ${n.y + 1} 399 ${n.y + 10}`} fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" />
              <text x="390" y={n.y + 38} textAnchor="middle" fill="#8b93b8" fontSize="11" fontFamily="Inter, sans-serif">
                {n.label}
              </text>
            </g>
          ))}

          <text x="70" y="26" textAnchor="middle" fill="#5a6183" fontSize="11" fontFamily="JetBrains Mono, monospace">
            SELLERS
          </text>
          <text x="390" y="26" textAnchor="middle" fill="#5a6183" fontSize="11" fontFamily="JetBrains Mono, monospace">
            BUYERS
          </text>
        </svg>
      </Frame>
    </div>
  )
}

/* 03 - spot price: a dot riding the live price line */
const SPOT_PATH =
  'M24 170 C60 150 80 210 116 190 C152 170 168 110 204 130 C240 150 256 90 292 105 C328 120 344 60 380 78 C404 90 420 70 436 62'

export function SpotIllustration() {
  const ref = useInView<HTMLDivElement>(() => {
    const root = ref.current!
    const path = root.querySelector<SVGPathElement>('.spot-path')!
    animate(svg.createDrawable(path), {
      draw: ['0 0', '0 1'],
      duration: 2000,
      ease: 'inOutQuart',
    })
    const motion = svg.createMotionPath(path)
    animate(root.querySelector('.spot-dot')!, {
      translateX: motion.translateX,
      translateY: motion.translateY,
      duration: 7000,
      loop: true,
      alternate: true,
      ease: 'inOutSine',
    })
    animate(root.querySelector('.spot-dot')!, {
      opacity: [0, 1],
      duration: 600,
      delay: 800,
      ease: 'outQuad',
    })
    animate(root.querySelector('.spot-pill')!, {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 800,
      delay: 1800,
      ease: 'outExpo',
    })
  })

  return (
    <div ref={ref}>
      <Frame label="fig. 03 / the spot market">
        <svg viewBox="0 0 460 300" className="w-full">
          {[80, 140, 200].map((y) => (
            <line key={y} x1="24" y1={y} x2="436" y2={y} stroke="#1c2340" strokeWidth="1" />
          ))}
          <line x1="24" y1="240" x2="436" y2="240" stroke="#3a4470" strokeWidth="1.5" />
          <text x="24" y="262" fill="#5a6183" fontSize="11" fontFamily="Inter, sans-serif">
            morning
          </text>
          <text x="436" y="262" textAnchor="end" fill="#5a6183" fontSize="11" fontFamily="Inter, sans-serif">
            evening
          </text>

          <path className="spot-path" d={SPOT_PATH} fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" />
          <circle className="spot-dot" cx="0" cy="0" r="7" fill="#22d3ee" opacity="0" />

          <g className="spot-pill" opacity="0">
            <rect x="150" y="20" width="160" height="30" rx="15" fill="#0d1122" stroke="#1c2340" />
            <text x="230" y="39" textAnchor="middle" fill="#e6e9f5" fontSize="12" fontFamily="JetBrains Mono, monospace">
              EUR 2.14 / GPU-hr
            </text>
          </g>
          <text x="230" y="290" textAnchor="middle" fill="#5a6183" fontSize="11" fontFamily="Inter, sans-serif">
            demand rises, price rises. supply arrives, price falls.
          </text>
        </svg>
      </Frame>
    </div>
  )
}

/* 04 - futures: a locked flat line vs a wobbly spot line */
export function FuturesIllustration() {
  const ref = useInView<HTMLDivElement>(() => {
    const root = ref.current!
    animate(svg.createDrawable(root.querySelector('.fut-spot')!), {
      draw: ['0 0', '0 1'],
      duration: 2200,
      ease: 'inOutQuart',
    })
    animate(svg.createDrawable(root.querySelector('.fut-lock-line')!), {
      draw: ['0 0', '0 1'],
      duration: 2200,
      delay: 500,
      ease: 'inOutQuart',
    })
    animate(root.querySelector('.lock')!, {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 700,
      delay: 400,
      ease: 'outBack',
    })
    animate(root.querySelector('.lock')!, {
      rotate: [-4, 4],
      duration: 1800,
      delay: 1200,
      loop: true,
      alternate: true,
      ease: 'inOutSine',
    })
    animate(root.querySelectorAll('.fut-label'), {
      opacity: [0, 1],
      translateY: [8, 0],
      delay: stagger(200, { start: 1600 }),
      duration: 700,
      ease: 'outExpo',
    })
  })

  return (
    <div ref={ref}>
      <Frame label="fig. 04 / locking a price">
        <svg viewBox="0 0 460 300" className="w-full">
          <line x1="24" y1="240" x2="436" y2="240" stroke="#3a4470" strokeWidth="1.5" />
          <text x="24" y="264" fill="#5a6183" fontSize="11" fontFamily="Inter, sans-serif">
            today
          </text>
          <text x="436" y="264" textAnchor="end" fill="#5a6183" fontSize="11" fontFamily="Inter, sans-serif">
            delivery month
          </text>

          {/* wobbly spot */}
          <path
            className="fut-spot"
            d="M60 150 C100 120 120 190 160 165 C200 140 216 80 256 110 C296 140 312 190 352 150 C380 122 408 140 428 118"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.65"
          />
          {/* locked price */}
          <line className="fut-lock-line" x1="60" y1="150" x2="428" y2="150" stroke="#f2c14e" strokeWidth="2.5" strokeDasharray="8 7" strokeLinecap="round" />

          <g className="lock" opacity="0" style={{ transformOrigin: '60px 150px' }}>
            <circle cx="60" cy="150" r="17" fill="#0d1122" stroke="#f2c14e" strokeWidth="2" />
            <rect x="53" y="149" width="14" height="10" rx="2" fill="#f2c14e" />
            <path d="M56 149 v-4 a4 4 0 0 1 8 0 v4" fill="none" stroke="#f2c14e" strokeWidth="2" />
          </g>

          <text className="fut-label" x="105" y="128" fill="#f2c14e" fontSize="12" fontFamily="JetBrains Mono, monospace" opacity="0">
            locked: EUR 2.00/hr
          </text>
          <text className="fut-label" x="270" y="78" fill="#22d3ee" fontSize="12" fontFamily="JetBrains Mono, monospace" opacity="0">
            spot keeps moving
          </text>
          <text className="fut-label" x="230" y="292" textAnchor="middle" fill="#5a6183" fontSize="11" fontFamily="Inter, sans-serif" opacity="0">
            whatever spot does, your price is the gold line.
          </text>
        </svg>
      </Frame>
    </div>
  )
}

/* 05 - cash settlement: only the difference moves */
export function SettlementIllustration() {
  const ref = useInView<HTMLDivElement>(() => {
    const root = ref.current!
    utils.set(root.querySelectorAll('.set-flow'), { strokeDasharray: '5 9' })
    animate(root.querySelectorAll('.set-flow'), {
      strokeDashoffset: [0, -56],
      duration: 2200,
      loop: true,
      ease: 'linear',
    })
    animate(root.querySelector('.fixing')!, {
      scale: [1, 1.06],
      duration: 1500,
      loop: true,
      alternate: true,
      ease: 'inOutSine',
    })
    animate(root.querySelector('.coin')!, {
      translateX: [0, -190],
      opacity: [0, 1, 1, 0],
      duration: 3000,
      loop: true,
      loopDelay: 600,
      ease: 'inOutSine',
    })
  })

  return (
    <div ref={ref}>
      <Frame label="fig. 05 / settling in cash">
        <svg viewBox="0 0 460 300" className="w-full">
          {/* index fixing */}
          <g className="fixing" style={{ transformOrigin: '230px 62px' }}>
            <rect x="160" y="34" width="140" height="56" rx="12" fill="#0d1122" stroke="#f2c14e" strokeWidth="2" />
            <text x="230" y="57" textAnchor="middle" fill="#8b93b8" fontSize="10" fontFamily="JetBrains Mono, monospace">
              ECX FIXING
            </text>
            <text x="230" y="77" textAnchor="middle" fill="#f2c14e" fontSize="15" fontFamily="JetBrains Mono, monospace" fontWeight="600">
              EUR 2.30
            </text>
          </g>

          <path className="set-flow" d="M180 92 Q140 120 105 138" fill="none" stroke="#f2c14e" strokeWidth="1.5" opacity="0.7" />
          <path className="set-flow" d="M280 92 Q320 120 355 138" fill="none" stroke="#f2c14e" strokeWidth="1.5" opacity="0.7" />

          {/* buyer */}
          <rect x="30" y="140" width="150" height="76" rx="12" fill="#0d1122" stroke="#4f7dff" strokeWidth="1.5" />
          <text x="105" y="170" textAnchor="middle" fill="#e6e9f5" fontSize="13" fontFamily="Inter, sans-serif" fontWeight="600">
            Buyer
          </text>
          <text x="105" y="190" textAnchor="middle" fill="#8b93b8" fontSize="11" fontFamily="Inter, sans-serif">
            locked EUR 2.00
          </text>
          <text x="105" y="207" textAnchor="middle" fill="#34d399" fontSize="11" fontFamily="JetBrains Mono, monospace">
            receives 0.30
          </text>

          {/* seller */}
          <rect x="280" y="140" width="150" height="76" rx="12" fill="#0d1122" stroke="#22d3ee" strokeWidth="1.5" />
          <text x="355" y="170" textAnchor="middle" fill="#e6e9f5" fontSize="13" fontFamily="Inter, sans-serif" fontWeight="600">
            Seller
          </text>
          <text x="355" y="190" textAnchor="middle" fill="#8b93b8" fontSize="11" fontFamily="Inter, sans-serif">
            sold at EUR 2.00
          </text>
          <text x="355" y="207" textAnchor="middle" fill="#f87171" fontSize="11" fontFamily="JetBrains Mono, monospace">
            pays 0.30
          </text>

          {/* cash flow */}
          <line x1="180" y1="248" x2="280" y2="248" stroke="#1c2340" strokeWidth="1.5" />
          <g className="coin" opacity="0">
            <circle cx="300" cy="248" r="13" fill="#f2c14e" />
            <text x="300" y="252" textAnchor="middle" fill="#04050c" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="600">
              EUR
            </text>
          </g>
          <text x="230" y="286" textAnchor="middle" fill="#5a6183" fontSize="11" fontFamily="Inter, sans-serif">
            no hardware moves. only the difference, in cash.
          </text>
        </svg>
      </Frame>
    </div>
  )
}
