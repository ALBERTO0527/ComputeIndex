import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { animate, stagger } from 'animejs'
import { useInView } from '../hooks/useInView'
import {
  ChipIllustration,
  PlayersIllustration,
  SpotIllustration,
  FuturesIllustration,
  SettlementIllustration,
} from '../components/learn/Illustrations'

function Chapter({
  num,
  title,
  aside,
  flip,
  illustration,
  children,
}: {
  num: string
  title: string
  aside: string
  flip?: boolean
  illustration: React.ReactNode
  children: React.ReactNode
}) {
  const ref = useInView<HTMLElement>(() => {
    animate(ref.current!.querySelectorAll('[data-reveal]'), {
      translateY: [30, 0],
      opacity: [0, 1],
      delay: stagger(130),
      duration: 900,
      ease: 'outExpo',
    })
  }, 0.15)

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-20">
      <div
        className={`grid items-center gap-10 lg:grid-cols-2 ${
          flip ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        <div>
          <p data-reveal className="font-mono text-xs uppercase tracking-[0.3em] text-electric opacity-0">
            Chapter {num}
          </p>
          <h2 data-reveal className="mt-3 font-display text-3xl font-600 tracking-tight text-white opacity-0 md:text-4xl">
            {title}
          </h2>
          <div data-reveal className="mt-5 space-y-4 text-[17px] leading-relaxed text-muted opacity-0">
            {children}
          </div>
          <div
            data-reveal
            className="mt-6 rounded-xl border border-gold/25 bg-gold/5 px-5 py-4 text-sm leading-relaxed text-gold opacity-0"
          >
            <span className="font-mono text-[11px] uppercase tracking-widest">In one line: </span>
            {aside}
          </div>
        </div>
        <div data-reveal className="opacity-0">
          {illustration}
        </div>
      </div>
    </section>
  )
}

export default function Learn() {
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

      <div ref={heroRef} className="relative mx-auto max-w-3xl px-6 pb-8 pt-24 text-center">
        <p data-reveal className="font-mono text-xs uppercase tracking-[0.3em] text-electric opacity-0">
          Learn
        </p>
        <h1 data-reveal className="mt-4 font-display text-5xl font-700 tracking-tight text-white opacity-0 md:text-6xl">
          Compute, <span className="text-gradient">explained.</span>
        </h1>
        <p data-reveal className="mx-auto mt-6 max-w-xl text-lg text-muted opacity-0">
          Five ideas that explain what we do: what compute is, who trades it,
          how it gets priced, and why one trusted number matters. No finance
          degree required.
        </p>
      </div>

      <div className="relative">
        <Chapter
          num="01"
          title="What is compute?"
          aside="Compute is machine time, sold by the hour. Think kilowatt-hours, but for intelligence."
          illustration={<ChipIllustration />}
        >
          <p>
            Compute is machine time. When a company trains an AI model, renders
            a film, or simulates a new drug, the work runs on powerful chips
            called GPUs, stacked by the thousands inside data centres. Renting
            one of those chips for one hour is a GPU-hour, and it is the basic
            unit this market trades, just like electricity is traded in
            kilowatt-hours.
          </p>
          <p>
            Like electricity, compute is essential, standardised, and consumed
            around the clock. Unlike electricity, nobody agrees on what it
            costs: the same GPU-hour can cost twice as much one country over.
          </p>
        </Chapter>

        <Chapter
          num="02"
          title="Who are the players?"
          aside="Sellers own the chips, buyers need the hours, and investors want exposure to the price."
          flip
          illustration={<PlayersIllustration />}
        >
          <p>
            On one side sit the sellers: data centres, cloud providers, and
            national supercomputing labs with racks of idle or rented GPUs. On
            the other side are the buyers: AI companies, banks, film studios,
            universities, anyone whose work needs serious computation.
          </p>
          <p>
            Between them, brokers and marketplaces match spare capacity with
            demand. And a third group is arriving fast: investors who want
            exposure to compute prices without ever touching a server. All
            three meet at the market in the middle.
          </p>
        </Chapter>

        <Chapter
          num="03"
          title="How spot pricing works"
          aside="The spot price is what a GPU-hour costs if you buy it right now."
          illustration={<SpotIllustration />}
        >
          <p>
            The spot market is the right-now market. A buyer asks for a
            thousand GPU-hours today, sellers quote, and the deal clears at the
            price where supply meets demand. When a big model starts training,
            demand spikes and the price jumps. When a new data centre comes
            online, supply grows and the price eases.
          </p>
          <p>
            That constantly moving number is the spot price. Our job is to
            measure it across Europe, every hour, and compress it into one
            index anyone can check.
          </p>
        </Chapter>

        <Chapter
          num="04"
          title="What are futures?"
          aside="Futures fix tomorrow's price today. They are certainty for planners, not just bets for traders."
          flip
          illustration={<FuturesIllustration />}
        >
          <p>
            A future is a promise: a price agreed today for compute delivered
            later. Despite the reputation, it is not primarily a tool for
            gamblers. It is insurance. An AI startup that must train a model
            next spring can lock the price now and stop worrying about a
            demand spike eating its budget.
          </p>
          <p>
            The same contract protects the other side: a data centre can sell
            next year's capacity forward and secure the revenue that pays for
            construction. Farmers have hedged wheat this way for 150 years, and
            airlines do it with jet fuel. Compute is next.
          </p>
        </Chapter>

        <Chapter
          num="05"
          title="How cash-settled futures work"
          aside="At expiry only the price difference moves, in cash, measured against an index. That index is us."
          illustration={<SettlementIllustration />}
        >
          <p>
            Nobody wants a truck of GPUs delivered to settle a contract, so
            compute futures settle in cash. At expiry, no hardware changes
            hands: the two sides compare the price they agreed with the
            official index price of that day, and whoever is on the wrong side
            of the move pays the difference.
          </p>
          <p>
            For that to work, everyone has to trust the reference number. That
            is exactly why EuroCompute exists: an independent, auditable index
            that a European exchange can settle contracts against, that fund
            managers can license, and that buyers and sellers can negotiate on.
          </p>
        </Chapter>
      </div>

      <div className="relative mx-auto max-w-3xl px-6 pb-32 pt-10 text-center">
        <h2 className="font-display text-3xl font-600 tracking-tight text-white md:text-4xl">
          That is the whole story.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          A new commodity needs a trusted price. We build it.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/#index"
            className="rounded-full bg-electric px-7 py-3 font-medium text-white transition-all hover:shadow-[0_0_40px_rgba(79,125,255,0.55)]"
          >
            See the index live
          </Link>
          <Link
            to="/#contact"
            className="rounded-full border border-line px-7 py-3 font-medium text-muted transition-colors hover:border-electric/50 hover:text-white"
          >
            Talk to the team
          </Link>
        </div>
      </div>
    </div>
  )
}
