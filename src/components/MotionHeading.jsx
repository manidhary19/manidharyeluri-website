export default function MotionHeading({ children, as: Tag = 'h1', className = '', startDelay = 0, stagger = 35 }) {
  let letterIndex = 0;
  return <Tag className={`motion-heading ${className}`} aria-label={children}>
    {String(children).split(' ').map((word, w) => <span className="motion-word" key={w} aria-hidden="true">
      {[...word].map((letter, i) => <span className="motion-letter" key={i} style={{animationDelay:`${startDelay + letterIndex++ * stagger}ms`}}>{letter}</span>)}
      {w < String(children).split(' ').length - 1 && '\u00a0'}
    </span>)}
  </Tag>;
}
