import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './ImageLightbox.css';

function ArrowIcon({ direction }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d={direction === 'previous' ? 'M15 5 8 12l7 7' : 'm9 5 7 7-7 7'} />
  </svg>;
}

function CloseIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>;
}

export default function ImageLightbox({ images, index, onIndexChange, onClose, label }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const gesture = useRef(null);
  const stateRef = useRef(null);
  const isOpen = index !== null && images.length > 0;
  const currentIndex = isOpen ? Math.min(index, images.length - 1) : 0;
  const current = images[currentIndex];

  stateRef.current = { currentIndex, imagesLength: images.length, onIndexChange, onClose };

  const move = (direction) => {
    const state = stateRef.current;
    const next = (state.currentIndex + direction + state.imagesLength) % state.imagesLength;
    state.onIndexChange(next);
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const appRoot = document.getElementById('root');
    const rootWasInert = appRoot?.hasAttribute('inert');
    document.body.style.overflow = 'hidden';
    appRoot?.setAttribute('inert', '');
    closeRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event) => {
      const state = stateRef.current;
      if (event.key === 'Escape') { event.preventDefault(); state.onClose(); }
      if (event.key === 'ArrowLeft' && state.imagesLength > 1) { event.preventDefault(); move(-1); }
      if (event.key === 'ArrowRight' && state.imagesLength > 1) { event.preventDefault(); move(1); }
      if (event.key === 'Tab') {
        const controls = [...dialogRef.current.querySelectorAll('button:not([disabled])')];
        if (!controls.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      if (!rootWasInert) appRoot?.removeAttribute('inert');
      document.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus?.({ preventScroll: true });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || images.length < 2) return;
    const adjacent = [images[(currentIndex + 1) % images.length], images[(currentIndex - 1 + images.length) % images.length]];
    adjacent.forEach(({ src }) => { const image = new Image(); image.src = src; });
  }, [isOpen, currentIndex, images]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="image-lightbox"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${label} image viewer`}
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="image-lightbox-topbar">
        <p className="image-lightbox-count" aria-live="polite">
          {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </p>
        <button className="image-lightbox-control image-lightbox-close" type="button" onClick={onClose} ref={closeRef} aria-label="Close image viewer">
          <CloseIcon />
        </button>
      </div>

      <div
        className="image-lightbox-stage"
        onPointerDown={(event) => {
          if (event.pointerType === 'touch') gesture.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerUp={(event) => {
          if (!gesture.current || event.pointerType !== 'touch') return;
          const dx = event.clientX - gesture.current.x;
          const dy = event.clientY - gesture.current.y;
          gesture.current = null;
          if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy) && images.length > 1) move(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => { gesture.current = null; }}
      >
        <img key={current.src} className="image-lightbox-image" src={current.src} alt={current.alt} decoding="async" />
      </div>

      {images.length > 1 && <>
        <button className="image-lightbox-control image-lightbox-previous" type="button" onClick={() => move(-1)} aria-label="Previous image">
          <ArrowIcon direction="previous" />
        </button>
        <button className="image-lightbox-control image-lightbox-next" type="button" onClick={() => move(1)} aria-label="Next image">
          <ArrowIcon direction="next" />
        </button>
      </>}
      <p className="image-lightbox-caption">{current.alt}</p>
    </div>,
    document.body,
  );
}
