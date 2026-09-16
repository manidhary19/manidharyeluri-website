import NavigationSection from '../components/sections/navigation/NavigationSection.jsx';
import FooterSection from '../components/sections/footer/FooterSection.jsx';
import MotionHeading from '../components/MotionHeading.jsx';
import { asset } from '../data/portfolio.js';
import dimensions from '../data/image-dimensions.json';

function ImageSequence({ item, technical }) {
  return <div className={`detail-images ${technical ? 'technical-images' : ''}`}>
    {item.images.map((name, i) => <figure className={i === item.images.length - 1 && !technical ? 'detail-final-image' : ''} key={name} data-reveal>
      <img src={asset(name)} {...dimensions[name]} alt={`${item.title} — drawing ${i + 1}`} loading="lazy" decoding="async" />
    </figure>)}
  </div>;
}

export default function DetailPage({item, technical = false}) {
  return <>
    <NavigationSection />
    <main className={`detail-page ${technical ? 'technical-detail' : 'project-detail'}`}>
      {technical ? <>
        <div className="technical-heading"><MotionHeading>{item.title}</MotionHeading></div>
        <section className="technical-intro">
          <div className={`technical-copy ${item.slug === 'detailing' ? 'large-copy' : ''}`} data-reveal>
            <h2>{item.intro}</h2>
            {item.paragraphs.map(p=><p key={p}>{p}</p>)}
          </div>
          <div className="technical-cover" style={{backgroundImage:`url("${asset(item.cover)}")`}} role="img" aria-label={item.title} />
        </section>
      </> : <>
        <section className="detail-hero">
          <div className="detail-cover" style={{backgroundImage:`url("${asset(item.cover)}")`}} />
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
      <ImageSequence item={item} technical={technical} />
    </main>
    <FooterSection />
  </>;
}
