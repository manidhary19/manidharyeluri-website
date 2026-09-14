import { useEffect } from "react";
import { pageUrl } from "../../../lib/paths.js";
import "./NavigationSection.css";

const PRIMARY = [
  { href: "/about", label: "ABOUT" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/technology", label: "TECHNOLOGY" },
  { href: "/gallery", label: "GALLERY" },
];

const OVERLAY = [
  { href: "/projects", label: "Projects" },
  { href: "/", label: "Journal" },
  { href: "/", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/", label: "Careers" },
  { href: "/gallery", label: "Gallery" },
  { href: "/", label: "Contact" },
];

function LetterLink({ href, label }) {
  return (
    <a className="nav-letter-link" href={pageUrl(href)}>
      <span className="nav-letter-row">
        {label.split("").map((ch, i) => (
          <span className="nav-letter" key={`${ch}-${i}`}>
            <span className="nav-letter-inner">
              <span>{ch}</span>
              <span className="nav-letter-dup" aria-hidden="true">
                {ch}
              </span>
            </span>
          </span>
        ))}
      </span>
    </a>
  );
}

export default function NavigationSection() {
  useEffect(() => {
    document.title = "Manidhar Yeluri Portfolio";
  }, []);
  return (
    <>
      <div className="nav-frame nav-frame-top" aria-hidden="true" />
      <div className="nav-frame nav-frame-left" aria-hidden="true" />
      <div className="nav-frame nav-frame-right" aria-hidden="true" />
      <nav className="nav-root" data-pwc-critical="navigation-1">
        <div className="nav-bar">
          {PRIMARY.map((item) => (
            <LetterLink key={item.label} href={item.href} label={item.label} />
          ))}
        </div>
        <div className="nav-overlay-menu">
          {OVERLAY.map((item, i) => (
            <a key={`${item.label}-${i}`} href={pageUrl(item.href)}>
              <span>{item.label}</span>
              <span aria-hidden="true">{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
