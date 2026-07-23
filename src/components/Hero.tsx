import { useEffect, useRef, useState } from 'react'
import { animate, createScope, stagger, utils, type Scope } from 'animejs'

const HEADLINE = ['The benchmark for', 'European compute.']

function SplitLine({ text, gradient }: { text: string; gradient?: boolean }) {
  return (
    <span className="block overflow-hidden">
      {text.split(' ').map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split('').map((ch, ci) => (
            <span
              key={ci}
              data-char
              className={`inline-block opacity-0 ${gradient ? 'text-gradient' : ''}`}
            >
              {ch}
            </span>
          ))}
          {wi < text.split(' ').length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const [indexValue, setIndexValue] = useState(1042.18)

  useEffect(() => {
    let scope: Scope | null = null
    if (root.current) {
      scope = createScope({ root: root.current }).add(() => {
        animate('[data-char]', {
          translateY: ['110%', '0%'],
          opacity: [0, 1],
          delay: stagger(24, { start: 350 }),
          duration: 900,
          ease: 'outExpo',
        })
        animate('[data-hero-fade]', {
          translateY: [24, 0],
          opacity: [0, 1],
          delay: stagger(140, { start: 1100 }),
          duration: 900,
          ease: 'outExpo',
        })
        animate('[data-orb]', {
          translateX: () => utils.random(-60, 60),
          translateY: () => utils.random(-40, 40),
          scale: () => utils.random(0.85, 1.25),
          duration: () => utils.random(5000, 9000),
          ease: 'inOutSine',
          loop: true,
          alternate: true,
        })
        animate('[data-hero-card]', {
          translateY: [40, 0],
          opacity: [0, 1],
          duration: 1100,
          delay: 1400,
          ease: 'outExpo',
        })
      })
    }
    return () => scope?.revert()
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setIndexValue((v) => +(v + (Math.random() - 0.46) * 0.8).toFixed(2))
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <header
      ref={root}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16"
    >
      <div className="grid-bg absolute inset-0" />
      <div
        data-orb
        className="absolute left-[12%] top-[22%] h-72 w-72 rounded-full bg-electric/25 blur-[110px]"
      />
      <div
        data-orb
        className="absolute bottom-[18%] right-[10%] h-80 w-80 rounded-full bg-pulse/15 blur-[120px]"
      />
      <div
        data-orb
        className="absolute right-[28%] top-[12%] h-40 w-40 rounded-full bg-gold/10 blur-[80px]"
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div
          data-hero-fade
          className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-4 py-1.5 text-xs font-medium tracking-wide text-muted opacity-0"
        >
          <span className="blink h-1.5 w-1.5 rounded-full bg-mint" />
          ECX Composite live
          <span className="text-faint">|</span>
          <span className="font-mono text-mint">daily fixing 18:00 CET</span>
        </div>

        <h1 className="font-display text-5xl font-700 leading-[1.05] tracking-tight text-white md:text-7xl">
          <SplitLine text={HEADLINE[0]} />
          <SplitLine text={HEADLINE[1]} gradient />
        </h1>

        <p
          data-hero-fade
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted opacity-0"
        >
          EuroCompute turns raw GPU capacity, pricing, and utilization signals from
          across Europe into one investable benchmark: real-time market data for
          exchanges, licensed indices for fund managers, and advisory for anyone
          buying or selling compute.
        </p>

        <div
          data-hero-fade
          className="mt-10 flex flex-wrap items-center justify-center gap-4 opacity-0"
        >
          <a
            href="#contact"
            className="rounded-full bg-electric px-7 py-3 font-medium text-white transition-all hover:shadow-[0_0_40px_rgba(79,125,255,0.55)]"
          >
            Request access
          </a>
          <a
            href="#index"
            className="rounded-full border border-line px-7 py-3 font-medium text-muted transition-colors hover:border-electric/50 hover:text-white"
          >
            Explore the index
          </a>
        </div>

        <div
          data-hero-card
          className="glass mx-auto mt-14 flex max-w-md items-center justify-between rounded-2xl px-6 py-4 opacity-0"
        >
          <div className="text-left">
            <p className="font-mono text-[11px] uppercase tracking-widest text-faint">
              ECX Composite
            </p>
            <p className="font-mono text-2xl font-600 text-white">
              {indexValue.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[11px] uppercase tracking-widest text-faint">
              24h
            </p>
            <p className="font-mono text-lg text-mint">+2.34%</p>
          </div>
        </div>
      </div>
    </header>
  )
}
