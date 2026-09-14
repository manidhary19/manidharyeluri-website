import NavigationSection from "../components/sections/navigation/NavigationSection.jsx";
import AboutSection from "../components/sections/about/AboutSection.jsx";
import FooterSection from "../components/sections/footer/FooterSection.jsx";

export default function HomePage() {
  return (
    <>
      <div data-pwc-section="navigation">
        <NavigationSection />
      </div>
      <div data-pwc-section="about">
        <AboutSection />
      </div>
      <div data-pwc-section="footer">
        <FooterSection />
      </div>
    </>
  );
}
