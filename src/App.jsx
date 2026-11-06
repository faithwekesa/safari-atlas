import { useCallback, useEffect, useRef, useState } from 'react';
import { DESTINATIONS } from './destinations.js';
import { VISITS } from './visits.js';

const N = DESTINATIONS.length;
const AUTO_MS = 3300;
const KINDS = ['rise'];
const pad = (n) => String(n).padStart(2, '0');

function Pic({ d, className }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return <img className={className} src={`/images/${d.id}.jpg`} alt="" draggable="false" onError={() => setOk(false)} />;
}

function Visit({ id, onClose }) {
  const d = DESTINATIONS.find((x) => x.id === id);
  const v = VISITS[id];
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  if (!d || !v) return null;
  const link = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  return (
    <div className="sheet" onClick={onClose}>
      <div className="sheet-card" role="dialog" aria-label={`Plan your visit to ${d.title.join(' ')}`} onClick={(e) => e.stopPropagation()}>
        <button className="sheet-x" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <p className="sheet-kicker"><span className="bar" />Plan your visit</p>
        <h2>{d.title.join(' ')}</h2>
        <dl>
          <dt>Best time</dt>
          <dd>{v.best}</dd>
          <dt>Getting there</dt>
          <dd>{v.getThere}</dd>
        </dl>
        <p className="sheet-sub">Where to stay</p>
        <div className="stays">
          {v.stays.map((st) => (
            <a key={st.type} href={link(st.q)} target="_blank" rel="noreferrer">
              <span><b>{st.type}</b><em>{st.note}</em></span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
            </a>
          ))}
        </div>
        <p className="sheet-note">Each button opens a live Google Maps search. Check prices and availability there.</p>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState({ index: 0, last: -1, kind: 'fade' });
  const [paused, setPaused] = useState(false);
  const [layout, setLayout] = useState('row');
  const [visit, setVisit] = useState(null);
  const [box, setBox] = useState({ t: 0, r: 0, b: 0, l: 0 });
  const { index, last, kind } = view;
  const idx = useRef(0);
  const spin = useRef(0);
  const cards = useRef([]);
  const reduce = useRef(false);
  const touchX = useRef(null);

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    DESTINATIONS.forEach((d) => {
      const img = new Image();
      img.src = `/images/${d.id}.jpg`;
    });
  }, []);

  const show = useCallback((to, from, clicked) => {
    if (to === idx.current) return;
    const el = cards.current[from];
    if (clicked && el) {
      const r = el.getBoundingClientRect();
      setBox({ t: r.top, r: window.innerWidth - r.right, b: window.innerHeight - r.bottom, l: r.left });
    }
    const nextKind = clicked ? 'card' : KINDS[spin.current++ % KINDS.length];
    const was = idx.current;
    idx.current = to;
    setView({ index: to, last: was, kind: nextKind });
  }, []);
  const go = useCallback((i) => show(i, i, true), [show]);
  const next = useCallback(() => {
    const to = (idx.current + 1) % N;
    show(to, to, false);
  }, [show]);
  const prev = useCallback(() => show((idx.current - 1 + N) % N, 0, false), [show]);

  useEffect(() => {
    if (paused || reduce.current) return undefined;
    const t = setTimeout(next, AUTO_MS);
    return () => clearTimeout(t);
  }, [index, paused, next]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const cur = DESTINATIONS[index];

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  };

  const copy = (d, out) => (
    <section className={out ? 'copy copy-out' : 'copy'} key={(out ? 'o' : 'c') + d.id} aria-live={out ? undefined : 'polite'} aria-hidden={out ? 'true' : undefined}>
        <p className="loc hi" style={{ '--n': 0 }}>
          <span className="bar" />
          {d.place}, {d.country}
        </p>
        <h1>
          {d.title.map((line, i) => (
            <span className="ln" key={line}>
              <span className="hi up" style={{ '--n': 1 + i }}>{line}</span>
            </span>
          ))}
        </h1>
        <p className="desc hi" style={{ '--n': 3 }}>{d.text}</p>
        <a
          className="discover hi"
          style={{ '--n': 4 }}
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.map)}`}
          target="_blank"
          rel="noreferrer"
        >
          <i>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
          </i>
          Discover location
        </a>
        {VISITS[d.id] && (
          <button className="plan hi" style={{ '--n': 5 }} onClick={() => setVisit(d.id)}>
            Plan your visit
          </button>
        )}
    </section>
  );

  return (
    <main
      className="stage"
      data-kind={kind}
      data-layout={layout}
      style={{ '--it': `${box.t}px`, '--ir': `${box.r}px`, '--ib': `${box.b}px`, '--il': `${box.l}px` }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="bgs" aria-hidden="true">
        {DESTINATIONS.map((d, i) => (
          <div
            key={d.id}
            className={`bg ${i === index ? 'on' : i === last ? 'out' : ''}`}
            style={{ '--from': d.from, '--to': d.to }}
          >
            <Pic d={d} className="bg-img" />
          </div>
        ))}
      </div>
      <div className="shade" aria-hidden="true" />

      <header className="top">
        <span className="brand">
          <i>S</i>
          Safari Atlas
        </span>
        <span className="top-note">Africa, {N} places to see</span>
      </header>

      {last >= 0 && last !== index && copy(DESTINATIONS[last], true)}
      {copy(cur, false)}

      <div className="rail">
        {DESTINATIONS.map((d, i) => {
          const off = (i - index + N) % N;
          return (
            <button
              key={d.id}
              ref={(el) => {
                cards.current[i] = el;
              }}
              className={`card ${off === 0 ? 'gone' : ''} ${off === 1 ? 'front' : ''}`}
              style={{ '--off': off, '--from': d.from, '--to': d.to }}
              onClick={() => go(i)}
              aria-label={`Show ${d.title.join(' ')}`}
              tabIndex={off === 0 ? -1 : 0}
            >
              <Pic d={d} className="card-img" />
              <span className="card-txt">
                <small><b />{d.country}</small>
                <strong>{d.title.join(' ')}</strong>
              </span>
            </button>
          );
        })}
      </div>

      <footer className="ctrl">
        <div className="arrows">
          <button onClick={prev} aria-label="Previous place">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button onClick={next} aria-label="Next place">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
          </button>
          <button className="swap" onClick={() => setLayout(layout === 'fan' ? 'row' : 'fan')} aria-label="Change card layout">
            {layout === 'fan' ? 'Show cards' : 'Hide cards'}
          </button>
        </div>
        <span className="count">
          {pad(index + 1)}
          <em>/{pad(N)}</em>
        </span>
      </footer>
      {visit && <Visit id={visit} onClose={() => setVisit(null)} />}
    </main>
  );
}
