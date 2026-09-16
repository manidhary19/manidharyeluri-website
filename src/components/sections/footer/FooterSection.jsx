import { pageUrl } from "../../../lib/paths.js";
import "./FooterSection.css";

function LetterMark({ href, text }) {
  const chars = text.split("");
  return (
    <a className="footer-mark" href={href} aria-label={text}>
      <span className="footer-mark-row" aria-hidden="true">
        {chars.map((ch, i) =>
          ch === " " ? (
            <span className="footer-mark-space" key={`sp-${i}`}>
              {" "}
            </span>
          ) : (
            <span className="footer-letter" key={`${ch}-${i}`}>
              <span className="footer-letter-inner" style={{ transitionDelay: `${i * 18}ms` }}>
                <span>{ch}</span>
                <span className="footer-letter-dup" aria-hidden="true">
                  {ch}
                </span>
              </span>
            </span>
          )
        )}
      </span>
    </a>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="footer-icon" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8 L13 13.7 C13.62 14.06 14.38 14.06 15 13.7 L24 8" transform="translate(-2 0)" />
        <rect x="4" y="6" width="16" height="12" rx="2" />
      </g>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="footer-icon" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8 C19.314 8 22 10.686 22 14 V21 H18 V14 C18 12.895 17.105 12 16 12 C14.895 12 14 12.895 14 14 V21 H10 V14 C10 10.686 12.686 8 16 8 Z" />
        <path d="M2 9 H6 V21 H2 Z" />
        <circle cx="4" cy="6" r="2" />
      </g>
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="footer-icon" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 17 H21 C21.6 17 22 16.6 22 16 V13 C22 12.1 21.3 11.3 20.5 11.1 C18.7 10.6 16 10 16 10 S14.7 8.6 13.8 7.7 C13.3 7.3 12.7 7 12 7 H5 C4.4 7 3.9 7.4 3.6 7.9 L2.2 10.8 C2.07 11.19 2 11.59 2 12 V16 C2 16.6 2.4 17 3 17 H5" />
        <circle cx="7" cy="17" r="2" />
        <path d="M9 17 H15" />
        <circle cx="17" cy="17" r="2" />
      </g>
    </svg>
  );
}

export default function FooterSection({
  criticalRoot = "footer-1",
  criticalInner = "footer-2",
}) {
  return (
    <footer className="footer-root" data-pwc-critical={criticalRoot}>
      <div className="footer-media">
        <img alt="" src="/assets/images/footer-full.png" />
      </div>
      <div className="footer-credits-top" />
      <footer className="footer-inner" data-pwc-critical={criticalInner}>
        <div className="footer-inner-row">
          <LetterMark href={pageUrl("/")} text="MANIDHAR YELURI" />
        </div>
      </footer>
      <div className="footer-credits-bottom">
        <div className="footer-icons">
          <a className="footer-icon-btn" href="mailto:manidhary19@gmail.com" aria-label="Email">
            <MailIcon />
          </a>
          <a
            className="footer-icon-btn"
            href="https://ie.linkedin.com/in/manidhary19"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <a
            className="footer-icon-btn"
            href="https://arrivaldetailing.framer.website/"
            aria-label="Arrival Detailing"
          >
            <ChatIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
