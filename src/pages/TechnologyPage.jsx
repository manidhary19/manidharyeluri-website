import NavigationSection from "../components/sections/navigation/NavigationSection.jsx";
import TechnologyPageSection from "../components/sections/technologyPage/TechnologyPageSection.jsx";
import FooterSection from "../components/sections/footer/FooterSection.jsx";

export default function TechnologyPage() {
  return (
    <>
      <div data-pwc-section="navigation">
        <NavigationSection />
      </div>
      <div data-pwc-section="section">
        <TechnologyPageSection />
      </div>
      <div data-pwc-section="footer">
        <FooterSection criticalRoot="footer-1" criticalInner="footer-2" />
      </div>
    </>
  );
}
