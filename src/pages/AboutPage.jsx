import NavigationSection from "../components/sections/navigation/NavigationSection.jsx";
import AboutPageSection from "../components/sections/aboutPage/AboutPageSection.jsx";
import FooterSection from "../components/sections/footer/FooterSection.jsx";

export default function AboutPage() {
  return (
    <>
      <div data-pwc-section="navigation">
        <NavigationSection />
      </div>
      <div data-pwc-section="about-page">
        <AboutPageSection />
      </div>
      <div data-pwc-section="footer">
        <FooterSection criticalRoot="footer-3" criticalInner="footer-4" />
      </div>
    </>
  );
}
