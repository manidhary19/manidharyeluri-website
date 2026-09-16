import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export default function SiteMotion({path, transitioning = false}) {
  const cursor = useRef(null);
  const dot = useRef(null);
  const progress = useRef(null);
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let lenis;
    const configure = () => {
      lenis?.destroy();
      lenis = reduced.matches ? null : new Lenis({autoRaf:true, duration:1.2, smoothWheel:true});
      if (transitioning) lenis?.stop();
    };
    configure(); reduced.addEventListener('change', configure);
    return () => {lenis?.destroy(); reduced.removeEventListener('change', configure);};
  }, [path, transitioning]);

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const elements = [...document.querySelectorAll('[data-reveal], .about-bio-card, .tp-row, .ap-job, .ap-edu, .ap-soft-card, .ap-cert')];
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }, {threshold:0.08, rootMargin:'0px 0px -30px 0px'});
    elements.forEach(el => { el.classList.add('scroll-reveal'); observer.observe(el); });
    let raf = 0;
    const parallax = [...document.querySelectorAll('.gp-cell-shift, .pp-media-shift, .about-project-media')];
    const heroCopy = document.querySelector('.about-hero-copy');
    const detailCover = document.querySelector('.detail-cover');
    const valuesPanel = document.querySelector('.ap-values-sticky');
    const render = () => {
      raf = 0;
      const vh = innerHeight;
      const max = Math.max(1, document.documentElement.scrollHeight - vh);
      if(progress.current) progress.current.style.transform = `scaleX(${Math.min(1,scrollY/max)})`;
      if(reduced.matches) { parallax.forEach(el => el.style.transform='none'); if(valuesPanel) valuesPanel.style.transform='none'; return; }
      if(valuesPanel) valuesPanel.style.transform = `scale(${.78 + .22 * Math.min(1, scrollY / (vh * .8))})`;
      parallax.forEach(el => {
        const parent = el.closest('.gp-cell, .pp-sticky, .about-project-sticky');
        const b = parent.getBoundingClientRect();
        if (b.top > vh || b.bottom < 0) return;
        const p = Math.max(0, Math.min(1,(vh-b.top)/(vh+b.height)));
        const amount = el.classList.contains('gp-cell-shift') ? .3 : .75;
        el.style.transform = `translate3d(0,${(p-.5)*b.height*amount}px,0)`;
      });
      if(heroCopy) heroCopy.style.transform = `translate3d(0,${-Math.min(scrollY, vh*1.4)*.2}px,0)`;
      if(detailCover) {
        const p = Math.min(1,scrollY/(vh*.8));
        detailCover.style.transform = `translateY(${p*20}px) scale(${1+p*.12})`;
      }
    };
    const schedule = () => {if(!raf) raf = requestAnimationFrame(render);};
    render();
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    reduced.addEventListener('change',schedule);
    return () => {cancelAnimationFrame(raf);observer.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);reduced.removeEventListener('change',schedule);};
  }, [path]);

  useEffect(() => {
    const pointer = matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let x=0,y=0,cx=0,cy=0,frame=0,visible=false;
    const draw = () => {
      cx += (x-cx)*.24; cy += (y-cy)*.24;
      cursor.current.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      dot.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      if(Math.abs(x-cx)+Math.abs(y-cy)>.1) frame=requestAnimationFrame(draw); else frame=0;
    };
    const move = e => {
      if (!pointer.matches || reduced.matches || e.pointerType==='touch') return;
      x=e.clientX;y=e.clientY;
      if(!visible){cx=x;cy=y;visible=true;document.documentElement.classList.add('custom-pointer');}
      const hover = !!e.target.closest('a,button');
      cursor.current.dataset.hover = hover;
      dot.current.dataset.hover = hover;
      if(!frame) frame=requestAnimationFrame(draw);
    };
    const hide = () => {visible=false;document.documentElement.classList.remove('custom-pointer');};
    const press = () => {cursor.current.dataset.pressed='true';};
    const release = () => {cursor.current.dataset.pressed='false';};
    window.addEventListener('pointermove',move,{passive:true});
    document.addEventListener('pointerleave',hide);
    window.addEventListener('blur',hide);
    window.addEventListener('pointerdown',press);
    window.addEventListener('pointerup',release);
    window.addEventListener('keydown',hide);
    reduced.addEventListener('change',hide);
    return () => {cancelAnimationFrame(frame);hide();window.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',hide);window.removeEventListener('blur',hide);window.removeEventListener('pointerdown',press);window.removeEventListener('pointerup',release);window.removeEventListener('keydown',hide);reduced.removeEventListener('change',hide);};
  }, []);
  return <>
    <div className="scroll-progress" ref={progress} aria-hidden="true" />
    <div className="cursor-ring" ref={cursor} aria-hidden="true"><span /></div>
    <div className="cursor-dot" ref={dot} aria-hidden="true"><span /></div>
  </>;
}
