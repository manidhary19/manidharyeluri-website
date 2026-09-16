import "./TechnologyPageSection.css";
import MotionHeading from '../../MotionHeading.jsx';

const ITEMS = [
  {
    href: "/technology/detailing",
    title: "Detailing",
    image: "/assets/images/SUgE1OZsGiaqkKuONJKPFsRznA.jpg",
  },
  {
    href: "/technology/general-arrangement-drawings",
    title: "General Arrangement Drawings",
    image: "/assets/images/lqCzne538jBC9fGEMDVtdv2VnQ.jpg",
  },
  {
    href: "/technology/access-and-egress",
    title: "Access and Egress",
    image: "/assets/images/Ohu8IAkiCY6khqyduG9UFiVDbY.jpg",
  },
  {
    href: "/technology/bsa-eagle-project",
    title: "BSA Eagle Project",
    image: "/assets/images/kkCY1zVPSWPF4UWNcWqy9GBXdT0.jpg",
  },
];

export default function TechnologyPageSection() {
  return (
    <main className="tp-main">
      <section className="tp-content">
        <div className="tp-heading">
          <MotionHeading>Technology</MotionHeading>
        </div>
        <div className="tp-list">
          {ITEMS.map((item) => (
            <a className="tp-row" href={item.href} key={item.href}>
              <div className="tp-image">
                <img alt="" src={item.image} />
              </div>
              <div className="tp-title">
                <h4>{item.title}</h4>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
