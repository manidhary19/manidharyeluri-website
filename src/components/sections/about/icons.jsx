export function MailIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" role="presentation" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11 L13.009 16.727 C13.63 17.088 14.397 17.088 15.018 16.727 L24 11" transform="translate(-2 -4)" />
        <path d="M4 8 C4 6.895 4.895 6 6 6 L22 6 C23.105 6 24 6.895 24 8 L24 20 C24 21.105 23.105 22 22 22 L6 22 C4.895 22 4 21.105 4 20 Z" />
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
