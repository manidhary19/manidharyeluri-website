import { ArrowUpRightIcon } from "../about/icons.jsx";
import "./ProjectsPageSection.css";
import MotionHeading from '../../MotionHeading.jsx';

const PROJECTS = [
  {
    id: "notion-gardens-project",
    href: "/projects/notion-gardens",
    location: "Graiguenamanagh, Ireland",
    title: "Notion Gardens",
    image: "/assets/images/DcVi0AXoDe6h8XD63rMJtKy7IE.png",
    shift: -168.75,
  },
  {
    id: "monarch-lofts-project",
    href: "/projects/monarch-lofts",
    location: "Dublin, Ireland",
    title: "Monarch Lofts",
    image: "/assets/images/T4KTSsoQaXha5GABplINx2NsQI.png",
    shift: -337.5,
  },
  {
    id: "rambling-house-project",
    href: "/projects/rambling-house",
    location: "Graiguenamanagh, Ireland",
    title: "Rambling House",
    image: "/assets/images/N9Tsa0JN1QglWxeDrjDDFM1LA0.png",
    shift: -337.5,
  },
  {
    id: "equilibrium-of-water-project",
    href: "/projects/equilibrium-of-water",
    location: "Graiguenamanagh, Ireland",
    title: "Equilibrium of Water",
    image: "/assets/images/WyWQG55edMhG9Z5JN3giEIyDm50.jpg",
    shift: -337.5,
  },
  {
    id: "parkhouse-project-project",
    href: "/projects/parkhouse-project",
    location: "Dublin, Ireland",
    title: "Parkhouse Project",
    image: "/assets/images/6jfYLmJbrnRNqoIPLtR1JFHuhEo.jpg",
    shift: -337.5,
  },
  {
    id: "climatic-pavilion-project",
    href: "/projects/climatic-pavilion",
    location: "Dublin, Ireland",
    title: "Climatic Pavilion",
    image: "/assets/images/CT5NByRWzLJrPKpg8WMZtNOtxVw.jpg",
    shift: -337.5,
  },
];

export default function ProjectsPageSection() {
  return (
    <main className="pp-main">
      <section className="pp-hero">
        <div className="pp-hero-heading">
          <MotionHeading>Projects</MotionHeading>
        </div>
      </section>
      <section className="pp-list">
        {PROJECTS.map((project) => (
          <a className="pp-item" id={project.id} href={project.href} key={project.id}>
            <div className="pp-sticky">
              <div className="pp-media" role="img" aria-label={project.title}>
                <div
                  className="pp-media-shift"
                  style={{
                    backgroundImage: `url("${project.image}")`,
                  }}
                />
              </div>
              <div className="pp-card">
                <p className="pp-location">{project.location}</p>
                <div className="pp-row">
                  <h2>{project.title}</h2>
                  <span className="pp-cta">
                    <span>View project</span>
                    <span className="pp-cta-icon">
                      <ArrowUpRightIcon className="pp-icon" />
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
