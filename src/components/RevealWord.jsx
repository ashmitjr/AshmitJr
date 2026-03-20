/**
 * A single word that blurs in when `visible` becomes true.
 * Delay is staggered by the parent via `delayIndex`.
 */
export default function RevealWord({ word, delayIndex, visible }) {
  const style = {
    display: 'inline-block',
    opacity: visible ? 1 : 0.2,
    filter: visible ? 'blur(0)' : 'blur(8px)',
    transform: visible ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity .5s ease, filter .5s ease, transform .5s ease`,
    transitionDelay: visible ? `${delayIndex * 0.04}s` : '0s',
    marginRight: '0.3em',
  }

  const emStyle = {
    fontFamily: "'EB Garamond', serif",
    fontStyle: 'italic',
    fontWeight: 700,
    fontSize: '1.05em',
  }

  const accentStyle = {
    color: '#fe3c01',
    fontWeight: 900,
  }

  const content = word.em
    ? <em style={emStyle}>{word.text}</em>
    : word.accent
      ? <span style={accentStyle}>{word.text}</span>
      : word.text

  return <span style={style}>{content}</span>
}