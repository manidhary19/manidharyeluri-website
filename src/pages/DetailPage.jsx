import NavigationSection from '../components/sections/navigation/NavigationSection.jsx';
import FooterSection from '../components/sections/footer/FooterSection.jsx';
import MotionHeading from '../components/MotionHeading.jsx';
import { asset } from '../data/portfolio.js';
import dimensions from '../data/image-dimensions.json';
import { useState } from 'react';
import ImageLightbox from '../components/ImageLightbox.jsx';

function ImageSequence({ item, technical, onOpen }) {
  return <div className={`detail-images ${technical ? 'technical-images' : ''}`}>
    {item.images.map((name, i) => <figure className={i === item.images.length - 1 && !technical ? 'detail-final-image' : ''} key={name} data-reveal>
      <button className="image-lightbox-trigger" type="button" onClick={() => onOpen(i + 1)} aria-label={`Open ${item.title} drawing ${i + 1} full screen`}>
        <img src={asset(name)} {...dimensions[name]} alt={`${item.title} — drawing ${i + 1}`} loading="lazy" decoding="async" />
      </button>
    </figure>)}
  </div>;
}

export default function DetailPage({item, technical = false, openingFromProjects = false}) {
  // Preserve the entrance variant after the incoming shell joins document flow.
  const [projectEntrance] = useState(openingFromProjects);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const lightboxImages = [
    { src: asset(item.cover), alt: `${item.title} — cover` },
    ...item.images.map((name, i) => ({ src: asset(name), alt: `${item.title} — drawing ${i + 1}` })),
  ];
  return <>
    <NavigationSection />
    <main className={`detail-page ${technical ? 'technical-detail' : 'project-detail'}${projectEntrance ? ' project-card-entrance' : ''}`}>
      {technical ? <>
        <div className="technical-heading"><MotionHeading>{item.title}</MotionHeading></div>
        <section className="technical-intro">
          <div className={`technical-copy ${item.slug === 'detailing' ? 'large-copy' : ''}`} data-reveal>
            <h2>{item.intro}</h2>
            {item.paragraphs.map(p=><p key={p}>{p}</p>)}
          </div>
          <button className="technical-cover" style={{backgroundImage:`url("${asset(item.cover)}")`}} type="button" onClick={() => setLightboxIndex(0)} aria-label={`Open ${item.title} cover full screen`} />
        </section>
      </> : <>
        <section className="detail-hero">
          <button className="detail-cover" style={{backgroundImage:`url("${asset(item.cover)}")`}} type="button" onClick={() => setLightboxIndex(0)} aria-label={`Open ${item.title} cover full screen`} />
          <div className="detail-title"><MotionHeading>{item.title}</MotionHeading></div>
        </section>
        <section className="detail-summary">
          <div className="detail-facts" data-reveal>
            <h2>{item.subtitle}</h2>
            <dl>{['client','location','typology','workflow'].map(key=><div key={key}><dt>{key}</dt><dd>{item[key]}</dd></div>)}</dl>
          </div>
          <p className="detail-description" data-reveal>{item.description}</p>
        </section>
      </>}
      <ImageSequence item={item} technical={technical} onOpen={setLightboxIndex} />
    </main>
    <FooterSection />
    <ImageLightbox images={lightboxImages} index={lightboxIndex} onIndexChange={setLightboxIndex} onClose={() => setLightboxIndex(null)} label={item.title} />
  </>;
}
