import { animate, stagger, utils } from 'animejs'
import { useInView } from '../hooks/useInView'

const STATS = [
  { value: 312, suffix: '', label: 'Data centres tracked' },
  { value: 4.8, suffix: ' GW', label: 'Capacity under observation', decimals: 1 },
  { value: 41, suffix: 'M', label: 'Price points ingested daily' },
  { value: 15, suffix: '', label: 'European markets covered' },
]

export default function Stats() {
  const ref = useInView<HTMLElement>(() => {
    const nodes = ref.current?.querySelectorAll<HTMLElement>('[data-count]')
    if (!nodes) return
    nodes.forEach((node, i) => {
      const target = STATS[i]
      const counter = { v: 0 }
      animate(counter, {
        v: target.value,
        duration: 1800,
        delay: i * 120,
        ease: 'outExpo',
        onUpdate: () => {
          node.textContent =
            counter.v.toFixed(target.decimals ?? 0) + target.suffix
        },
      })
    })
    animate(ref.current!.querySelectorAll('[data-stat]'), {
      translateY: [30, 0],
      opacity: [0, 1],
      delay: stagger(120),
      duration: 900,
      ease: 'outExpo',
    })
    utils.set(ref.current!, { opacity: 1 })
  })

  return (
    <section
      ref={ref}
      id="data"
      className="relative z-10 mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4"
      style={{ opacity: 0 }}
    >
      {STATS.map((s) => (
        <div key={s.label} data-stat className="bg-ink px-8 py-10 opacity-0">
          <p data-count className="font-mono text-4xl font-600 text-white">
            0
          </p>
          <p className="mt-2 text-sm text-muted">{s.label}</p>
        </div>
      ))}
    </section>
  )
}
