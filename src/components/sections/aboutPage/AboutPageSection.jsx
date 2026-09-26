import { useEffect, useRef, useState } from "react";
import { pageUrl } from "../../../lib/paths.js";
import "./AboutPageSection.css";
import MotionHeading from '../../MotionHeading.jsx';

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
    dates: "June 2026 - July 2026",
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
    body: "Pursuing a Master of Architecture at University College Dublin, I focus on the adaptive reuse of existing buildings and the development of sustainable design strategies. My work examines how environmental performance, material longevity, and contextual sensitivity can inform contemporary interventions within historic and aging structures. I design architecture that reflects this mission: structures that honor what already exists while introducing thoughtful, future‑focused solutions.",
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

const MOBILE_EDUCATION = [
  {school:'University College Dublin',program:'Bachelors of Architecture',dates:'Sep 2023 - May 2026',body:'Earned a Bachelor of Architecture from University College Dublin, focusing on design, structural fundamentals, and digital modeling. Created detailed drawings and models to effectively communicate context-driven architectural solutions.'},
  {school:'Mercer Technical Schools',program:'Certificate, A&ED',dates:'Sep 2021 - Jun 2023',body:'Earned an Architecture and Engineering certificate at Mercer County Technical Schools, developing skills in industry-standard software, 3D modeling, and technical drafting while gaining hands-on experience in construction methods and engineering workflows.'},
];
const MOBILE_JOBS = [
  {title:'Sales Representative',org:'Vector Marketing',location:'Mercer,NJ',dates:'May 2025 - Sep 2025',bullets:[
    ['Prospected',' and engaged over 120 prospective clients through strategic cold calling, referral outreach, and local networking initiatives, achieving a strong 60% conversion rate.'],
    ['Delivered',' 50+ product demonstrations highlighting the features and benefits of Cutco’s premium kitchen tools, resulting in $3,000+ in direct sales revenue.'],
    ['Developed',' customized sales strategies tailored to individual customer profiles, driving an 87% increase in upselling success and a 12% boost in average order value.'],
    ['Demonstrated',' initiative and adaptability by consistently exceeding weekly sales targets by adapting to customer feedback, analyzing trends, and refining sales techniques to optimize performance and confidence.'],
  ]},
  ...EXPERIENCE.slice(2),
  {title:'Production Associate',org:'Wingits Innovation',location:'Windsor, NJ',dates:'Nov 2022 - June 2023',bullets:[
    ['Inspected',' goods for defects or damages, promptly notifying supervisors to address quality issues.'],
    ['Recorded',' product information in inventory control systems and accurately completed necessary forms and documentation.'],
    ['Assembled',' components using small tools and jigs, and packed finished products into shipping and delivery containers.'],
    ['Enhanced',' team efficiency by 20% by unloading trucks, moving and organizing heavy materials, and improving error reporting, material handling, and overall workflow.'],
  ]},
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
  const compareGesture = useRef({ pointerId: null, startX: 0, startY: 0, axis: null });
  const valuesProgress = useScrollProgress(valuesRef);
  const valueIndex = Math.min(VALUES.length - 1, Math.floor(valuesProgress * VALUES.length));
  const [split, setSplit] = useState(50);
  const renderedSplit = useRef(50);
  useEffect(() => {
    const element = compareRef.current;
    const image = element.querySelector('.is-before');
    const line = element.querySelector('.ap-compare-handle');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame;
    let previous = performance.now();
    const paint = value => {
      // One sampled position controls both surfaces in the same frame.
      renderedSplit.current = value;
      image.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
      line.style.transform = `translateX(${value}%)`;
    };
    const tick = now => {
      const elapsed = Math.min(64, now - previous);
      previous = now;
      const instant = reduced.matches || element.matches(':focus-visible');
      const value = instant ? split : renderedSplit.current + (split - renderedSplit.current) * (1 - Math.exp(-elapsed / 70));
      if (Math.abs(split - value) < .01) paint(split);
      else { paint(value); frame = requestAnimationFrame(tick); }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [split]);

  const setSplitFromEvent = (clientX) => {
    const el = compareRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setSplit(Math.min(100, Math.max(0, next)));
  };

  const beginCompareGesture = (event) => {
    if (event.pointerType === 'touch') {
      compareGesture.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        axis: null,
      };
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    setSplitFromEvent(event.clientX);
  };

  const moveCompareGesture = (event) => {
    if (event.pointerType !== 'touch') {
      if (event.pointerType === 'mouse' || event.buttons) setSplitFromEvent(event.clientX);
      return;
    }

    const gesture = compareGesture.current;
    if (gesture.pointerId !== event.pointerId || gesture.axis === 'vertical') return;
    const deltaX = event.clientX - gesture.startX;
    const deltaY = event.clientY - gesture.startY;

    if (!gesture.axis) {
      if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 8) return;
      gesture.axis = Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical';
    }

    if (gesture.axis === 'horizontal') {
      if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.setPointerCapture(event.pointerId);
      }
      setSplitFromEvent(event.clientX);
    }
  };

  const endCompareGesture = (event) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (compareGesture.current.pointerId === event.pointerId) {
      compareGesture.current = { pointerId: null, startX: 0, startY: 0, axis: null };
    }
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
          <MotionHeading className="ap-hero-title" startDelay={350} stagger={80}>About Me</MotionHeading>
        </div>
      </section>

      <section className="ap-values" id="values" ref={valuesRef}>
        <div className="ap-values-sticky">
          {VALUES.map((value,i)=><div key={value.id} className="ap-values-media" style={{backgroundImage:`url("${value.image}")`,opacity:i === valueIndex ? 1 : 0}} />)}
          <div className="ap-values-inner">
            <h2 className="ap-values-title">VALUES°</h2>
            <div className="ap-values-copy">
              {VALUES.map((item, i) => (
                <p key={item.id} id={item.id} className={i === valueIndex ? "is-active" : ""}>
                  {item.text}
                </p>
              ))}
            </div>
            <a
              className={`ap-projects-btn${valueIndex === VALUES.length - 1 ? " is-visible" : ""}`}
              href={pageUrl("/projects")}
            >
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
            aria-label="Compare day and night architectural renderings"
            data-pwc-interaction="philosophy-compare"
            data-pwc-controlled="philosophy-compare"
            onPointerDown={beginCompareGesture}
            onPointerMove={moveCompareGesture}
            onPointerUp={endCompareGesture}
            onPointerCancel={endCompareGesture}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") { e.preventDefault(); setSplit((v) => Math.max(0, v - 2)); }
              if (e.key === "ArrowRight") { e.preventDefault(); setSplit((v) => Math.min(100, v + 2)); }
              if (e.key === 'Home') { e.preventDefault();setSplit(0); }
              if (e.key === 'End') { e.preventDefault();setSplit(100); }
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
                clipPath: 'inset(0 50% 0 0)',
              }}
            />
            <div className="ap-compare-handle" style={{ transform: 'translateX(50%)' }} />
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
      <section className="ap-mobile-resume">
        <h3>EDUCATION°</h3>
        {MOBILE_EDUCATION.map(ed=><article key={ed.school}>
          <h2>{ed.school}</h2><div className="ap-mobile-meta"><span>{ed.program}</span><span>{ed.dates}</span></div><p>{ed.body}</p>
        </article>)}
        <h3>EXPERIENCE°</h3>
        {MOBILE_JOBS.map(job=><article key={job.title}>
          <h2>{job.title}</h2><div className="ap-mobile-meta"><span>{job.org}</span><span>{job.location}</span><span>{job.dates}</span></div>
          <ul>{job.bullets.map(([lead,body])=><li key={lead}><strong>{lead}</strong>{body}</li>)}</ul>
        </article>)}
      </section>
    </main>
  );
}
