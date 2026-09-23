export function MailIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 0 L11.009 5.727 C10.388 6.088 9.621 6.088 9 5.727 L0 0" transform="translate(2 7)" />
        <path d="M2 16 C0.895 16 0 15.105 0 14 L0 2 C0 0.895 0.895 0 2 0 L18 0 C19.105 0 20 0.895 20 2 L20 14 C20 15.105 19.105 16 18 16 Z" transform="translate(2 4)" />
      </g>
    </svg>
  );
}

export function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8 C19.314 8 22 10.686 22 14 L22 21 L18 21 L18 14 C18 12.895 17.105 12 16 12 C14.895 12 14 12.895 14 14 L14 21 L10 21 L10 14 C10 10.686 12.686 8 16 8 Z" />
        <path d="M2 21 L2 9 L6 9 L6 21 Z" />
        <path d="M2 6 C2 4.895 2.895 4 4 4 C5.105 4 6 4.895 6 6 C6 7.105 5.105 8 4 8 C2.895 8 2 7.105 2 6 Z" />
      </g>
    </svg>
  );
}

export function ArrowUpRightIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 7 L17 7 L17 17" />
        <path d="M7 17 L17 7" />
      </g>
    </svg>
  );
}

export function IconButton({ href, label, children, light }) {
  return (
    <a className={`about-icon-btn${light ? " is-light" : ""}`} href={href} aria-label={label}>
      {children}
    </a>
  );
}
