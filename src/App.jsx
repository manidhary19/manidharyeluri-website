import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import TechnologyPage from "./pages/TechnologyPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import { pagePath } from "./lib/paths.js";
import { useEffect, useRef, useState } from 'react';
import DetailPage from './pages/DetailPage.jsx';
import { projects, technology } from './data/portfolio.js';
import SiteMotion from './components/SiteMotion.jsx';

const PAGES = {
  "/about": AboutPage,
  "/projects": ProjectsPage,
  "/technology": TechnologyPage,
  "/gallery": GalleryPage,
};

export default function App() {
  const [path, setPath] = useState(pagePath);
  const [transition, setTransition] = useState(() => pagePath() === '/' && !matchMedia('(prefers-reduced-motion: reduce)').matches ? {home:true, initial:true} : null);
  const [revision, setRevision] = useState(0);
  const timers = useRef([]);
  useEffect(() => {
    let busy = false;
    let pending;
    const later = (fn, delay) => timers.current.push(setTimeout(fn, delay));
    const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
    later(() => setTransition(null), 2700);
    const go = (next, push = true) => {
      if (busy) { if (!push) pending = next; return; }
      clear();
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const home = new URL(next, location.origin).pathname === '/';
      const projectOpening = location.pathname === '/projects' && projects.some(project => new URL(next, location.origin).pathname === `/projects/${project.slug}`);
      const commit = () => {
        if (push) history.pushState({}, '', next);
        window.scrollTo({top:0,behavior:'instant'});
        setPath(pagePath());
        setRevision(v => v + 1);
      };
      if (reduce) { setTransition(null); commit(); return; }
      busy = true;
      setTransition({home,projectOpening,initial:false,next:new URL(next, location.origin).pathname});
      if (home) later(commit, 600);
      later(() => {
        if (!home) commit();
        setTransition(null);
        busy = false;
        if (pending) { const destination = pending; pending = null; go(destination, false); }
      }, home ? 2700 : projectOpening ? 1000 : 750);
    };
    const click = e => {
      const link = e.target.closest('a[href]');
      if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || link.target === '_blank' || link.hasAttribute('download')) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.hash) return;
      e.preventDefault();
      if (url.pathname === location.pathname && !link.classList.contains('footer-mark')) { window.scrollTo({top:0,behavior:'smooth'}); return; }
      go(url.pathname + url.search, url.pathname !== location.pathname);
    };
    const pop = () => go(location.pathname, false);
    document.addEventListener('click', click);
    window.addEventListener('popstate', pop);
    return () => { clear(); document.removeEventListener('click',click); window.removeEventListener('popstate',pop); };
  }, []);
  // Keep the outgoing page mounted beneath the actual incoming page. Its key
  // survives the handoff so heading animations don't restart at full size.
  const visiblePages = [{path, revision, incoming:false}];
  if (transition && !transition.home) visiblePages.push({path:transition.next, revision:revision + 1, incoming:true});
  return <>
    {visiblePages.map(page => {
      const project = projects.find(p => page.path === `/projects/${p.slug}`);
      const technical = technology.find(p => page.path === `/technology/${p.slug}`);
      const Page = PAGES[page.path] || HomePage;
      return <div className={`page-shell${page.incoming ? ' route-incoming' : ''}${page.incoming && transition?.projectOpening ? ' route-project-opening' : ''}${page.path === '/about' ? ' route-about' : ''}`} key={`${page.path}-${page.revision}`} inert={transition ? '' : undefined}>
        {project || technical ? <DetailPage item={project || technical} technical={!!technical} openingFromProjects={page.incoming && transition?.projectOpening} /> : <Page />}
      </div>;
    })}
    <SiteMotion path={`${path}-${revision}`} incomingPath={transition && !transition.home ? transition.next : null} transitioning={!!transition} />
    {transition?.home && <div className={`route-transition with-logo ${transition.initial ? 'initial-load' : ''}`} role="status" aria-label="Loading page">
      <div className="route-rectangle"><div className="route-strips">{Array.from({length:5},(_,i)=><span key={i} style={{animationDelay:`${(transition.home ? 1800 : 650) + i*85}ms`}} />)}</div></div>
      {transition.home && <img className="route-logo" src="/assets/images/NGOEt7uX16GHfFZhujvGvG89N0.png" alt="" />}
    </div>}
  </>;
}
