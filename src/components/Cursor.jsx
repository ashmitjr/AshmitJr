import useCursor from '../hooks/useCursor'

export default function Cursor() {
  const { pos, expanded } = useCursor()

  const style = {
    position: 'fixed',
    top: pos.y,
    left: pos.x,
    width: expanded ? 48 : 12,
    height: expanded ? 48 : 12,
    background: '#fe3c01',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9999,
    transform: 'translate(-50%, -50%)',
    transition: 'width .3s ease, height .3s ease',
    mixBlendMode: 'difference',
  }

  return <div style={style} />
}