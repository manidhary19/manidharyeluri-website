import "./GallerySection.css";

const COLUMNS = [
  [
    { src: "/assets/images/NhcLklKn6AQ4fUlz7qYTZsJ60I.jpg", height: 422 },
    { src: "/assets/images/PNcilpzIemiVqap7UthOFf4Epk.jpg", height: 390 },
    { src: "/assets/images/9pNMan2FcR2aKkX5JwkCYqdR2fY.jpg", height: 239 },
    { src: "/assets/images/CoXzAKsq2Ncgr52kbD0rTQCDjo.jpg", height: 390 },
  ],
  [
    { src: "/assets/images/ApY2Ru0jeaih4dPkOFXFuzJvIG4.jpg", height: 390 },
    { src: "/assets/images/oVHyu7dudtETby6qWELRPVMn1E.jpg", height: 250 },
    { src: "/assets/images/yIwlokpPL9X5TBpdg3rfKCTJ8A.jpg", height: 400 },
    { src: "/assets/images/tuY77L2EWbfZX5tCor4K3e1O3XA.jpg", height: 322 },
  ],
  [
    { src: "/assets/images/qRK7nDay54aJgdBgT6sBAi5OaQ.jpg", height: 322 },
    { src: "/assets/images/AwBiAH3tLYrHqg7qk6j0ArfIKwc.jpg", height: 300 },
    { src: "/assets/images/WALNLoUh2MJHe5NskCWNpZCg3XE.jpg", height: 422 },
    { src: "/assets/images/jcnUYWj3WqYOvH3rb7uMuY1UrB0.jpg", height: 500 },
  ],
];

function LetterLink({ href, label }) {
  return (
    <a className="gp-letter-link" href={href} target="_blank" rel="noreferrer">
      <span className="gp-letter-row">
        {label.split("").map((ch, i) =>
          ch === " " ? (
            <span className="gp-letter-space" key={`sp-${i}`}>
              {" "}
            </span>
          ) : (
            <span className="gp-letter" key={`${ch}-${i}`}>
              <span className="gp-letter-inner">
                <span>{ch}</span>
                <span className="gp-letter-dup" aria-hidden="true">
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

export default function GallerySection() {
  return (
    <main className="gp-main">
      <section className="gp-hero" id="hero" data-pwc-critical="hero-1">
        <img
          className="gp-hero-media"
          alt="Warm-toned architectural space with layered wooden elements and diffused light"
          src="/assets/images/B0kmKugrGmNSEkiBR6Rb6uxroj8.jpg"
        />
        <div className="gp-hero-copy">
          <div className="gp-hero-top">
            <h1>Gallery</h1>
            <LetterLink href="https://monarchraw.framer.website/" label="MON_ARCH PHOTOGRAPHY" />
          </div>
        </div>
      </section>
      <section className="gp-gallery" id="gallery">
        <div className="gp-grid">
          {COLUMNS.map((col, i) => (
            <div className="gp-col" key={i}>
              {col.map((item) => (
                <div className="gp-cell" style={{ height: item.height }} key={item.src}>
                  <div className="gp-cell-shift" style={{ backgroundImage: `url("${item.src}")` }} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
