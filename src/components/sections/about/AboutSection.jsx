import "./AboutSection.css";
import { ArrowUpRightIcon, IconButton, LinkedInIcon, MailIcon } from "./icons.jsx";
import HeroContours from "./HeroContours.jsx";

const PROJECTS = [
  {
    id: "notion-gardens-project",
    href: "/projects/notion-gardens",
    location: "Graiguenamanagh, Ireland",
    title: "Notion Gardens",
    image: "/assets/images/DcVi0AXoDe6h8XD63rMJtKy7IE.png",
  },
  {
    id: "monarch-lofts-project",
    href: "/projects/monarch-lofts",
    location: "Dublin, Ireland",
    title: "Monarch Lofts",
    image: "/assets/images/T4KTSsoQaXha5GABplINx2NsQI.png",
  },
  {
    id: "rambling-house-project",
    href: "/projects/rambling-house",
    location: "Graiguenamanagh, Ireland",
    title: "Rambling House",
    image: "/assets/images/N9Tsa0JN1QglWxeDrjDDFM1LA0.png",
  },
];

export default function AboutSection() {
  return (
    <main className="about-main">
      <section className="about-hero" id="hero" data-pwc-critical="hero-1">
        <div className="about-hero-sticky">
          <div className="about-hero-copy">
            <div className="about-hero-title-wrap">
              <h1 className="about-hero-title">
                Manidhar Yeluri
                <br />
                Portfolio
              </h1>
            </div>
          </div>
          <div className="about-hero-media" id="mza0ue">
            <HeroContours
              alt="Topographic contour drawing of white lines on black"
              src="/assets/images/GaJUFPEVKhnToN8GVkwDOL8Q0o.jpg"
            />
          </div>
        </div>
      </section>

      <section className="about-bio" id="about" data-pwc-critical="hero-2">
        <div className="about-bio-card">
          <div className="about-bio-photo-col">
            <div className="about-bio-photo">
              <div
                className="about-bio-photo-img"
                style={{ backgroundImage: 'url("/assets/images/ULfXbV5b49xpDxjUaySIEr3L8.png")' }}
                role="img"
                aria-label="Portrait of Manidhar Yeluri"
              />
            </div>
          </div>
          <div className="about-bio-copy">
            <h2 className="about-bio-title">
              Architecture Student at UCD: Passionate about Design, Project Management &amp; Business
            </h2>
            <div className="about-bio-actions">
              <IconButton href="mailto:manidhary19@gmail.com" label="Email">
                <MailIcon className="about-icon" />
              </IconButton>
              <IconButton href="https://ie.linkedin.com/in/manidhary19" label="LinkedIn">
                <LinkedInIcon className="about-icon" />
              </IconButton>
            </div>
          </div>
        </div>
      </section>

      <section className="about-projects">
        {PROJECTS.map((project) => (
          <a
            className="about-project"
            id={project.id}
            href={project.href}
            key={project.id}
          >
            <div className="about-project-sticky">
              <div
                className="about-project-media"
                style={{ backgroundImage: `url("${project.image}")` }}
              />
              <div className="about-project-card">
                <p className="about-project-location">{project.location}</p>
                <div className="about-project-row">
                  <h2 className="about-project-title">{project.title}</h2>
                  <span className="about-project-cta">
                    <span>View project</span>
                    <span className="about-project-cta-icon">
                      <ArrowUpRightIcon className="about-icon" />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}
