import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import TechnologyPage from "./pages/TechnologyPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import { pagePath } from "./lib/paths.js";

const PAGES = {
  "/about": AboutPage,
  "/projects": ProjectsPage,
  "/technology": TechnologyPage,
  "/gallery": GalleryPage,
};

export default function App() {
  const Page = PAGES[pagePath()] || HomePage;
  return <Page />;
}
