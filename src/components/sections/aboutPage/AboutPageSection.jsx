import { useEffect, useRef, useState } from "react";
import { pageUrl } from "../../../lib/paths.js";
import "./AboutPageSection.css";

const VALUES = [
  {
    id: "value1",
    text: "Architecture student with strong skills in design, technical drawing, and 3D modelling, currently studying at University College Dublin.",
    image: "/assets/images/FJ8eWnCPJXDD5G0J9fr16fquR9M.png",
  },
  {
    id: "value2",
    text: "Team‑focused and detail‑driven, with experience collaborating on studio projects that require clear communication and shared problem‑solving.",
    image: "/assets/images/XWm0SfpQREFqHHw80BCE4fpFE.jpg",
  },
  {
    id: "value3",
    text: "Committed to sustainable, meaningful design, integrating environmental awareness into every stage of project development.",
    image: "/assets/images/Z4YDPP3i3z7Sh56f7Bv4o9FPzk.jpg",
  },
];

const EXPERIENCE = [
  {
    title: "Architectural Research Intern",
    org: "Trinity College Dublin",
    location: "Dublin, IE",
    dates: "June 2026 - Present",
    bullets: [
      ["Conducted", " a post-occupancy evaluation of 15 student study spaces across 5 typologies, assessing acoustics, spatial legibility and sensory conditions against 85 neuro-inclusive design criteria to inform accessibility improvements."],
      ["Ran", " on-site fieldwork combining instrument readings (light, temperature, sound), photographic documentation, and building records, scoring each space 1–5 against the PAS 6463:2022 Design for the Mind standard."],
      ["Built", " a structured Excel survey instrument to standardise room-by-room scoring across the framework, with a Master Dashboard consolidating results into comparative outputs for design review and stakeholder meetings."],
    ],
  },
  {
    title: "Architecture Visualizer",
    org: "Boyd Cody Architects",
    location: "Dublin, IE",
    dates: "May 2026 - June 2026",
    bullets: [
      ["Provided", " freelance architectural visualisation services as a B.Arch student, developing 5+ photorealistic renderings to support a client's planning permission appeal."],
      ["Utilized", " provided plans, sections, and elevations to create a detailed 3D model in Revit, accurately reconstructing the building geometry across a 2-week turnaround."],
      ["Applied", " materials, lighting, and shadows using D5 Render, calibrating 3+ camera views to match on-site photographs for contextual accuracy and proportions."],
      ["Composited", " photomontages in Affinity by removing existing buildings from site photos and inserting accurate 3D models, producing realistic visuals that supported a successful planning appeal."],
    ],
  },
  {
    title: "Architectural Intern",
    org: "Sigma Construction",
    location: "Piscataway, NJ",
    dates: "Jun 2024 - Sep 2024",
    bullets: [
      ["Monitored", " on-site construction activities and documented observations to facilitate improvements, achieving a 95% compliance rate with project standards through comprehensive documentation and proactive support."],
      ["Drafted", " detailed drawings in AutoCAD for neighborhood developments, apartment buildings, and other structures."],
      ["Collaborated", " with architects, engineers, and designers to discuss project requirements and propose cost-effective building solutions, resulting in an estimated 15-20% reduction in project costs."],
      ["Conducted", " on-site measurements of kitchens and furniture to ensure accurate fabrication and installation by Home Depot."],
    ],
  },
  {
    title: "Owner",
    org: "Arrival Detailing",
    location: "New Jersey",
    dates: "May 2023 - Present",
    bullets: [
      ["Established", " and operated a self-employed car detailing business, developing marketing and advertising strategies to attract clients in the central New Jersey area."],
      ["Provided", " comprehensive interior and exterior detailing services, successfully met 90% of client needs for interior and exterior detailing, including scratch removal and paint restoration, earning high customer satisfaction rates."],
      ["Performed", " buffing and applied ceramic coating, achieving a 30% boost in durability and ensuring protection lasting 2-5 years by utilizing professional-grade equipment meticulously selected through comprehensive research."],
      ["Managed", " client relations by scheduling appointments, negotiating pricing, and hiring additional staff based on demand."],
    ],
  },
];

const SOFTWARE = [
  { name: "REVit", level: "Advanced", icon: "/assets/images/FZfyY0U9xYpiRJVAOyHxkZqkLCs.png" },
  { name: "Autocad", level: "advanced", icon: "/assets/images/kIBLBAkFB8bobWGUhHHunFYIs.png" },
  { name: "Rhino", level: "ADVANCED", icon: "/assets/images/IkuHpwfYR8gq2ioXerbnd4WTAc.png" },
  { name: "affinity", level: "advanced", icon: "/assets/images/tl6EaCGZO5pugHy0GmqmKS8C5S8.png" },
  { name: "D5 Render", level: "INTERMEDIATE", icon: "/assets/images/tOXYYJgsk2rqfQV61R1AurzhhMU.png" },
  { name: "ARc GIS", level: "intermediate", icon: "/assets/images/hkNHHe65ebOSwOmMpDjopeF1Bw.png" },
];

const EDUCATION = [
  {
    school: "University College Dublin",
    program: "Masters of Architecture",
    dates: "Sep 2026 - May 2028",
    body: "",
  },
  {
    school: "University College Dublin",
    program: "Bachelors of Architectural Science",
    dates: "Sep 2023 - May 2026",
    body: "Pursuing a Bachelor of Architecture at University College Dublin. My passion for architecture drives me to actively explore both creative and technical aspects of the field. I continually develop skills in design, structural systems, and digital modeling, and I enjoy creating detailed drawings and models that clearly communicate context-driven architectural ideas.",
  },
  {
    school: "Mercer technical Schools",
    program: "Certificate, A&ED",
    dates: "Sep 2021 - jun 2023",
    body: "Received an Architecture & Engineering Certificate from Mercer County Technical Schools, where I gained proficiency in industry-standard software, 3D modeling, and technical drafting. This program also provided hands-on experience with construction methods and engineering workflows.",
  },
];

const CERTS = [
  {
    title: "Revit Architecture - Intermediate to Advanced",
    issued: "Issued July 2026",
    icon: "/assets/images/DQ4DP4nBUKDE2HCL23oKyRs7P4.png",
  },
  {
    title: "Revit for Architectural Design Professional Certification Prep",
    issued: "Issued Dec 2025",
    icon: "/assets/images/DQ4DP4nBUKDE2HCL23oKyRs7P4.png",
  },
  {
    title: "OSHA 10-Hour General Industry Safety and Health",
    issued: "Issued Nov 2021",
    icon: "/assets/images/vjclsULeEx4DoBc3fNlE0LBN5Q.png",
  },
];

function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(-el.getBoundingClientRect().top, 0), Math.max(total, 1));
      setProgress(total > 0 ? passed / total : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);
  return progress;
}

export default function AboutPageSection() {
  const valuesRef = useRef(null);
  const compareRef = useRef(null);
  const valuesProgress = useScrollProgress(valuesRef);
  const valueIndex = Math.min(VALUES.length - 1, Math.floor(valuesProgress * VALUES.length));
  const [split, setSplit] = useState(50);

  const setSplitFromEvent = (clientX) => {
    const el = compareRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setSplit(Math.min(100, Math.max(0, next)));
  };

  return (
    <main className="ap-main">
      <section className="ap-hero" id="hero" data-pwc-critical="hero-1">
        <div className="ap-hero-media">
          <img
            alt="Organic architectural forms with warm wood tones and flowing ceiling structure"
            src="/assets/images/bcTqZu19WPklvHAl4KlmcwUbwVk.png"
          />
        </div>
        <div className="ap-hero-copy">
          <h1 className="ap-hero-title">About Me</h1>
        </div>
      </section>

      <section className="ap-values" id="values" ref={valuesRef}>
        <div className="ap-values-sticky">
          <div
            className="ap-values-media"
            style={{ backgroundImage: `url("${VALUES[valueIndex].image}")` }}
          />
          <div className="ap-values-inner">
            <div className="ap-values-copy">
              {VALUES.map((item, i) => (
                <p key={item.id} id={item.id} className={i === valueIndex ? "is-active" : ""}>
                  {item.text}
                </p>
              ))}
            </div>
            <a className="ap-projects-btn" href={pageUrl("/projects")}>
              <span>ALL PROJECTS</span>
              <span className="ap-projects-btn-alt">EXPLORE</span>
            </a>
          </div>
        </div>
      </section>

      <div className="ap-philosophy" id="philosophy" data-pwc-critical="philosophy">
        <div className="ap-philosophy-sticky">
          <div
            className="ap-compare"
            ref={compareRef}
            role="slider"
            tabIndex={0}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(split)}
            aria-orientation="horizontal"
            data-pwc-interaction="philosophy-compare"
            data-pwc-controlled="philosophy-compare"
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              setSplitFromEvent(e.clientX);
            }}
            onPointerMove={(e) => {
              if (e.buttons) setSplitFromEvent(e.clientX);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setSplit((v) => Math.max(0, v - 2));
              if (e.key === "ArrowRight") setSplit((v) => Math.min(100, v + 2));
            }}
          >
            <div
              className="ap-compare-layer is-after"
              style={{ backgroundImage: 'url("/assets/images/et0akTR7eeMSRNAMkl3rBSA9yEM.jpg")' }}
            />
            <div
              className="ap-compare-layer is-before"
              style={{
                backgroundImage: 'url("/assets/images/Pde2xrxYU1EyFASUmp6IJNx0zsY.png")',
                clipPath: `inset(0 ${100 - split}% 0 0)`,
              }}
            />
            <div className="ap-compare-handle" style={{ left: `${split}%` }} />
          </div>
        </div>
        <div id="pragraph-scroll" />
      </div>

      <footer className="ap-experience" id="footer-appear" data-pwc-critical="footer-1">
        <div className="ap-split">
          <div className="ap-split-left">
            <h3>EXPERIENCE</h3>
          </div>
          <div className="ap-split-right">
            {EXPERIENCE.map((job) => (
              <article className="ap-job" key={job.title}>
                <h2>{job.title}</h2>
                <div className="ap-job-meta">
                  <span>{job.org}</span>
                  <span>{job.location}</span>
                  <span>{job.dates}</span>
                </div>
                <ul>
                  {job.bullets.map((b) => (
                    <li key={b[0] + b[1].slice(0, 24)}>
                      <strong>{b[0]}</strong>
                      {b[1]}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </footer>

      <section className="ap-software">
        <div className="ap-split">
          <div className="ap-split-left">
            <h1>SOFTWARE</h1>
          </div>
          <div className="ap-software-grid">
            {SOFTWARE.map((item) => (
              <article className="ap-soft-card" key={item.name}>
                <img alt="" src={item.icon} />
                <h2>{item.name}</h2>
                <p>{item.level}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="ap-education" id="footer-appear-2" data-pwc-critical="footer-2">
        <div className="ap-split">
          <div className="ap-split-left">
            <h3>Education</h3>
          </div>
          <div className="ap-split-right">
            {EDUCATION.map((ed) => (
              <article className="ap-edu" key={ed.program}>
                <div className="ap-edu-top">
                  <h2>{ed.school}</h2>
                  <span>{ed.dates}</span>
                </div>
                <p className="ap-edu-program">{ed.program}</p>
                {ed.body ? <p className="ap-edu-body">{ed.body}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </footer>

      <section className="ap-certs">
        <div className="ap-split">
          <div className="ap-split-left">
            <h1>CERTIFICATION</h1>
          </div>
          <div className="ap-cert-list">
            {CERTS.map((cert) => (
              <article className="ap-cert" key={cert.title}>
                <img alt="" src={cert.icon} />
                <div>
                  <h2>{cert.title}</h2>
                  <p>{cert.issued}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
