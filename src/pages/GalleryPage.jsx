import NavigationSection from "../components/sections/navigation/NavigationSection.jsx";
import GallerySection from "../components/sections/gallery/GallerySection.jsx";
import FooterSection from "../components/sections/footer/FooterSection.jsx";

export default function GalleryPage() {
  return (
    <>
      <div data-pwc-section="navigation">
        <NavigationSection />
      </div>
      <div data-pwc-section="gallery">
        <GallerySection />
      </div>
      <div data-pwc-section="footer">
        <FooterSection criticalRoot="footer-1" criticalInner="footer-2" />
      </div>
    </>
  );
}
