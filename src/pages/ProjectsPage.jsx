import NavigationSection from "../components/sections/navigation/NavigationSection.jsx";
import ProjectsPageSection from "../components/sections/projectsPage/ProjectsPageSection.jsx";
import FooterSection from "../components/sections/footer/FooterSection.jsx";

export default function ProjectsPage() {
  return (
    <>
      <div data-pwc-section="navigation">
        <NavigationSection />
      </div>
      <div data-pwc-section="section">
        <ProjectsPageSection />
      </div>
      <div data-pwc-section="footer">
        <FooterSection criticalRoot="footer-1" criticalInner="footer-2" />
      </div>
    </>
  );
}
