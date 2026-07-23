import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { animate, stagger } from 'animejs'

const links = [
  { label: 'Index', to: '/#index' },
  { label: 'Map', to: '/#map' },
  { label: 'Products', to: '/#products' },
  { label: 'Methodology', to: '/methodology' },
  { label: 'Learn', to: '/learn' },
]

export default function Nav() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    animate(ref.current.querySelectorAll('[data-nav-item]'), {
      translateY: [-16, 0],
      opacity: [0, 1],
      delay: stagger(70, { start: 200 }),
      duration: 700,
      ease: 'outExpo',
    })
  }, [])

  return (
    <nav
      ref={ref}
      className="glass fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-6 md:px-12"
    >
      <Link to="/" data-nav-item className="flex items-center gap-2.5 opacity-0">
        <svg viewBox="0 0 32 32" className="h-7 w-7">
          <rect width="32" height="32" rx="7" fill="#0d1122" stroke="#1c2340" />
          <path
            d="M6 22 L12 14 L17 18 L26 8"
            stroke="#4f7dff"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="26" cy="8" r="2.5" fill="#f2c14e" />
        </svg>
        <span className="font-display text-lg font-600 tracking-tight text-white">
          Euro<span className="text-electric">Compute</span>
        </span>
      </Link>

      <div className="hidden items-center gap-8 md:flex">
        {links.map((l) => (
          <Link
            key={l.label}
            data-nav-item
            to={l.to}
            className="text-sm text-muted opacity-0 transition-colors hover:text-white"
          >
            {l.label}
          </Link>
        ))}
      </div>

      <Link
        data-nav-item
        to="/#contact"
        className="rounded-full border border-electric/40 bg-electric/10 px-4 py-1.5 text-sm font-medium text-white opacity-0 transition-all hover:bg-electric/25 hover:shadow-[0_0_24px_rgba(79,125,255,0.4)]"
      >
        Request access
      </Link>
    </nav>
  )
}
