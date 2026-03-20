import { useEffect, useRef } from 'react'

/**
 * Attach to any ref — when the element enters the viewport
 * it gets the class 'in' which triggers the CSS reveal transition.
 *
 * @param {number} threshold  0–1, default 0.15
 * @returns React ref to attach to your element
 */
export default function useReveal(threshold = 0.15) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { threshold }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return ref
}