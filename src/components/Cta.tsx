import { animate, stagger } from 'animejs'
import { useInView } from '../hooks/useInView'

export default function Cta() {
  const ref = useInView<HTMLElement>(() => {
    animate(ref.current!.querySelectorAll('[data-reveal]'), {
      translateY: [30, 0],
      opacity: [0, 1],
      delay: stagger(140),
      duration: 900,
      ease: 'outExpo',
    })
  })

  return (
    <section
      ref={ref}
      id="contact"
      className="relative z-10 overflow-hidden py-32 text-center"
    >
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/15 blur-[140px]" />
      <div className="relative mx-auto max-w-3xl px-6">
        <h2
          data-reveal
          className="font-display text-4xl font-600 tracking-tight text-white opacity-0 md:text-6xl"
        >
          Compute is the next
          <span className="text-gradient"> commodity class.</span>
        </h2>
        <p data-reveal className="mx-auto mt-6 max-w-xl text-lg text-muted opacity-0">
          Exchanges, fund managers, and operators are already building on our
          data. Get the index before the market prices you out.
        </p>
        <div
          data-reveal
          className="mt-10 flex flex-wrap items-center justify-center gap-4 opacity-0"
        >
          <a
            href="mailto:hello@eurocompute.eu"
            className="rounded-full bg-electric px-8 py-3.5 font-medium text-white transition-all hover:shadow-[0_0_50px_rgba(79,125,255,0.6)]"
          >
            Talk to the team
          </a>
          <a
            href="#index"
            className="rounded-full border border-line px-8 py-3.5 font-medium text-muted transition-colors hover:border-electric/50 hover:text-white"
          >
            Read the methodology
          </a>
        </div>
      </div>
    </section>
  )
}
