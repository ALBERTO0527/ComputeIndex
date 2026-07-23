const QUOTES = [
  { sym: 'ECX', val: '1,042.18 pts', delta: '+2.34%', up: true },
  { sym: 'ECM.H100', val: 'EUR 2.21/hr', delta: '+1.2%', up: true },
  { sym: 'ECC.H100', val: 'EUR 1.88/hr', delta: '+0.3%', up: true },
  { sym: 'ECS', val: 'EUR 0.33/hr', delta: '+4.1%', up: true },
  { sym: 'ECM.H200', val: 'EUR 3.87/hr', delta: '+0.8%', up: true },
  { sym: 'ECM.B200', val: 'EUR 5.12/hr', delta: '+1.9%', up: true },
  { sym: 'ECM.MI300X', val: 'EUR 2.61/hr', delta: '-0.4%', up: false },
  { sym: 'ECM.H100.CH', val: 'EUR 2.26/hr', delta: '+0.6%', up: true },
  { sym: 'ECM.A100', val: 'EUR 1.42/hr', delta: '-0.7%', up: false },
  { sym: 'ECM.L40S', val: 'EUR 0.98/hr', delta: '+2.1%', up: true },
]

export default function Ticker() {
  const row = [...QUOTES, ...QUOTES]
  return (
    <div className="relative z-20 border-y border-line bg-ink/80 py-3">
      <div className="flex w-max marquee">
        {row.map((q, i) => (
          <span
            key={i}
            className="mx-6 flex items-center gap-2 font-mono text-xs text-muted"
          >
            <span className="text-white">{q.sym}</span>
            <span>{q.val}</span>
            <span className={q.up ? 'text-mint' : 'text-red-400'}>{q.delta}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
