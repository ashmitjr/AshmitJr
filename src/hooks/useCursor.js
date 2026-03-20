import { useState, useEffect } from 'react'

export default function useCursor() {
  const [pos, setPos]       = useState({ x: -100, y: -100 })
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const expand   = () => setExpanded(true)
  const contract = () => setExpanded(false)

  return { pos, expanded, expand, contract }
}