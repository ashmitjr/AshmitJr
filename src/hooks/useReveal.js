import { useEffect, useRef } from "react"

export default function useReveal(options = {}) {
  const ref = useRef(null)

  const {
    threshold = 0.2,
    root = null,
    rootMargin = "0px",
    onReveal = null,
    once = true,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed")

          if (onReveal) onReveal()

          if (once) observer.unobserve(el)
        }
      },
      {
        threshold: Number.isFinite(threshold) ? threshold : 0.2,
        root,
        rootMargin,
      }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [threshold, root, rootMargin, onReveal, once])

  return ref
}