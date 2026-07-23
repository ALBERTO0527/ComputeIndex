import { useEffect, useRef } from 'react'

/** Calls `onEnter` once, the first time the element scrolls into view. */
export function useInView<T extends HTMLElement>(
  onEnter: () => void,
  threshold = 0.2,
) {
  const ref = useRef<T>(null)
  const fired = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true
          onEnter()
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
