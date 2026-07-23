import { useState } from 'react'
import { animate, stagger, utils } from 'animejs'
import { useInView } from '../hooks/useInView'

export default function FreeTier() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const ref = useInView<HTMLElement>(() => {
    const root = ref.current!
    animate(root.querySelectorAll('[data-reveal]'), {
      translateY: [30, 0],
      opacity: [0, 1],
      delay: stagger(130),
      duration: 900,
      ease: 'outExpo',
    })
    const el = root.querySelector<HTMLElement>('[data-delayed-value]')
    if (el) {
      const counter = { v: 0 }
      animate(counter, {
        v: 1018.42,
        duration: 2000,
        delay: 400,
        ease: 'outExpo',
        onUpdate: () => {
          el.textContent = counter.v.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        },
      })
    }
    utils.set(root, { opacity: 1 })
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setSubscribed(true)
  }

  return (
    <section
      ref={ref}
      id="free"
      className="relative z-10 border-t border-line bg-ink/40 py-28"
      style={{ opacity: 0 }}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <p data-reveal className="font-mono text-xs uppercase tracking-[0.3em] text-electric opacity-0">
            Free tier
          </p>
          <h2
            data-reveal
            className="mt-4 font-display text-4xl font-600 tracking-tight text-white opacity-0 md:text-5xl"
          >
            The headline number is free.
          </h2>
          <p data-reveal className="mt-5 max-w-lg text-lg text-muted opacity-0">
            Every week we publish the ECX Composite and a short read on what
            moved it, delayed one week, free forever. It is how commodity
            benchmarks earn trust: let everyone check the number. The live
            tape, sub-indices, and history are what you pay for.
          </p>
          {subscribed ? (
            <p data-reveal className="mt-8 rounded-xl border border-mint/30 bg-mint/10 px-5 py-4 text-mint">
              You are on the list. First indicative report lands next Friday.
            </p>
          ) : (
            <form data-reveal onSubmit={submit} className="mt-8 flex max-w-md gap-3 opacity-0">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="work email"
                className="min-w-0 flex-1 rounded-full border border-line bg-panel px-5 py-3 text-sm text-white placeholder:text-faint focus:border-electric/60 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-electric px-6 py-3 text-sm font-medium text-white transition-all hover:shadow-[0_0_40px_rgba(79,125,255,0.55)]"
              >
                Get the weekly
              </button>
            </form>
          )}
          <p data-reveal className="mt-4 font-mono text-[11px] text-faint opacity-0">
            No spam. One number, one paragraph, one chart, every Friday.
          </p>
        </div>

        <div data-reveal className="opacity-0">
          <div className="card-glow rounded-2xl p-8">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-widest text-faint">
                ECX Composite, 1-week delay
              </p>
              <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] text-faint">
                FREE
              </span>
            </div>
            <p className="mt-4 font-mono text-5xl font-600 text-white">
              <span data-delayed-value>0.00</span>
              <span className="ml-2 text-lg text-faint">pts</span>
            </p>
            <p className="mt-2 font-mono text-sm text-mint">+1.8% week over week</p>
            <div className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
              "Nordic capacity additions kept the composite's rally in check
              this week, while B200 scarcity pushed the top of the curve
              higher. The ECS margin widened for a fourth straight week."
            </div>
            <p className="mt-4 font-mono text-[11px] text-faint">
              Indicative, not for use as a benchmark reference.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
