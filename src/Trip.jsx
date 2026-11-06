import { useEffect, useMemo, useState } from 'react';
import { DESTINATIONS } from './destinations.js';
import { VISITS } from './visits.js';
import { CHECKED, COSTS, STYLES, estimate, fixes, links, money, verdict } from './costs.js';

export const day = (offset) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
};

export function Photo({ d }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return <img src={`/images/${d.id}.jpg`} alt="" draggable="false" onError={() => setOk(false)} />;
}

export function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export function Stepper({ label, value, min, max, onChange, unit }) {
  return (
    <div className="field">
      <span className="lab">{label}</span>
      <div className="step">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} aria-label={`Fewer ${unit}`}>-</button>
        <b>{value}<em>{unit}</em></b>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} aria-label={`More ${unit}`}>+</button>
      </div>
    </div>
  );
}

export function Sheet({ children, onClose, label, wide }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="sheet" onClick={onClose}>
      <div className={`sheet-card ${wide ? 'wide' : ''}`} role="dialog" aria-label={label} onClick={(e) => e.stopPropagation()}>
        <button className="sheet-x" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        {children}
      </div>
    </div>
  );
}

export const LEVELS = {
  budget: { label: 'Low', hint: 'Hostels and guesthouses, local food and shared transport' },
  mid: { label: 'Mid', hint: 'Comfortable hotels or lodges, restaurant meals and some private transport' },
  lux: { label: 'High', hint: 'Boutique stays and top lodges, fine dining and private transfers' },
};

export const DEFAULT_TRIP = { budget: 2500, days: 5, people: 2, style: 'mid', start: day(60), flights: '' };

export const tripInput = (t) => ({
  days: t.days,
  people: t.people,
  style: t.style,
  month: Number(t.start.slice(5, 7)) || 1,
  flights: Number(t.flights) || 0,
  start: t.start,
});

export function TripForm({ trip, setTrip }) {
  const set = (k) => (v) => setTrip((t) => ({ ...t, [k]: v }));
  return (
    <section className="form" aria-label="Your trip">
      <div className="field wide">
        <span className="lab">Total budget (USD)</span>
        <div className="money">
          <span>$</span>
          <input type="number" min="100" max="50000" step="50" value={trip.budget} onChange={(e) => set('budget')(Math.max(0, Number(e.target.value) || 0))} aria-label="Total budget in US dollars" />
        </div>
      </div>
      <Stepper label="Days" value={trip.days} min={2} max={21} onChange={set('days')} unit=" days" />
      <Stepper label="Travellers" value={trip.people} min={1} max={8} onChange={set('people')} unit={trip.people === 1 ? ' adult' : ' adults'} />
      <div className="field">
        <span className="lab">Trip starts</span>
        <input className="date" type="date" min={day(0)} value={trip.start} onChange={(e) => e.target.value && set('start')(e.target.value)} />
      </div>
      <div className="field wide">
        <span className="lab">Spending level</span>
        <div className="seg-ctl" role="group" aria-label="Travel style">
          {STYLES.map((s) => (
            <button key={s.id} type="button" className={trip.style === s.id ? 'on' : ''} onClick={() => set('style')(s.id)}>{LEVELS[s.id].label}</button>
          ))}
        </div>
        <span className="level-hint">{LEVELS[trip.style].hint}</span>
      </div>
      <div className="field">
        <span className="lab">Flights, optional</span>
        <div className="money">
          <span>$</span>
          <input type="number" min="0" step="50" placeholder="0" value={trip.flights} onChange={(e) => set('flights')(e.target.value)} aria-label="Total flight cost in US dollars" />
        </div>
      </div>
    </section>
  );
}

export function Trip({ id, trip, setTrip, onClose }) {
  const input = tripInput(trip);
  const budget = trip.budget;
  const d = DESTINATIONS.find((x) => x.id === id);
  const c = COSTS[id];
  const v = VISITS[id];
  const est = estimate(id, input);
  const ver = verdict(est, budget);
  const fix = ver.kind === 'over' ? fixes(id, input, budget) : null;
  const lk = links(id, input);
  const styleLabel = LEVELS[input.style].label;
  const rows = [
    { label: `Stay, ${est.rooms} room${est.rooms > 1 ? 's' : ''} for ${est.nights - est.covered > 0 ? est.nights - est.covered : 0} night${est.nights - est.covered === 1 ? '' : 's'}`, note: `${money(c.stay[input.style])} a night${est.season === 'high' ? ', high season' : est.season === 'low' ? ', low season' : ''}`, value: est.stay },
    { label: 'Food', note: `${money(c.food[input.style])} per person a day`, value: est.food },
    { label: 'Getting around', note: `${money(c.move[input.style])} per person a day`, value: est.move },
  ];
  return (
    <Sheet onClose={onClose} label={`Trip plan for ${d.title.join(' ')}`} wide>
      <p className="sheet-kicker"><span className="bar" />Plan your visit · {d.country}</p>
      <h2>{d.title.join(' ')}</h2>
      <TripForm trip={trip} setTrip={setTrip} />
      <p className={`pill ${ver.kind}`}>{ver.label}</p>
      <p className="sheet-lede">{input.days} days for {input.people} {input.people === 1 ? 'person' : 'people'}, {styleLabel.toLowerCase()} spending. About <b>{money(est.total)}</b> in total against your {money(budget)}.</p>

      <p className="sheet-sub">Where the money goes</p>
      <div className="ledger">
        {rows.map((r) => (
          <div key={r.label} className="lrow"><span><b>{r.label}</b><em>{r.note}</em></span><strong>{money(r.value)}</strong></div>
        ))}
        {est.fees.map((f) => (
          <div key={f.label} className="lrow">
            <span>
              <b>{f.label}</b>
              <em>{f.note}{f.src ? <> · <a href={f.src.url} target="_blank" rel="noreferrer">{f.src.label}</a></> : null}</em>
            </span>
            <strong>{money(f.total)}</strong>
          </div>
        ))}
        {est.flights > 0 && <div className="lrow"><span><b>Flights</b><em>The amount you entered</em></span><strong>{money(est.flights)}</strong></div>}
        <div className="lrow sum"><span><b>Total</b></span><strong>{money(est.total)}</strong></div>
      </div>

      {fix && (
        <p className="hint">
          To fit this in {money(budget)} you could go for {fix.days} day{fix.days > 1 ? 's' : ''} at the {LEVELS[fix.style].label.toLowerCase()} spending level. That comes to about {money(estimate(id, { ...input, ...fix }).total)}.
        </p>
      )}
      {ver.kind === 'over' && !fix && <p className="hint">This one is out of reach for this budget even with the cheapest settings. Try raising the budget or picking a nearer place.</p>}

      <p className="sheet-sub">Good to know</p>
      <dl>
        <dt>Best time</dt>
        <dd>{v.best}</dd>
        <dt>Getting there</dt>
        <dd>{v.getThere}</dd>
      </dl>

      <p className="sheet-sub">Book it</p>
      <div className="stays">
        <a href={lk.booking} target="_blank" rel="noreferrer"><span><b>Stays on Booking.com</b><em>Searches {c.q} for your dates and guests</em></span><Arrow /></a>
        <a href={lk.airbnb} target="_blank" rel="noreferrer"><span><b>Stays on Airbnb</b><em>Same dates and guests</em></span><Arrow /></a>
        <a href={lk.flights} target="_blank" rel="noreferrer"><span><b>Flights on Google Flights</b><em>To {c.fly} on your start date</em></span><Arrow /></a>
        <a href={lk.tours} target="_blank" rel="noreferrer"><span><b>Tours and activities on GetYourGuide</b><em>Guided trips and tickets</em></span><Arrow /></a>
        {lk.official && <a href={lk.official.url} target="_blank" rel="noreferrer"><span><b>{lk.official.label}</b><em>Official site for fees, rules and permits</em></span><Arrow /></a>}
      </div>

      <p className="sheet-note">
        Park fees and permits were checked on {CHECKED}. Rooms, meals and transport are typical prices for the season, rounded, so treat them as a guide. Real prices are on the booking sites. Costs are for adults and visa fees depend on your passport.
      </p>
    </Sheet>
  );
}

export function Compare({ ids, trip, onClose }) {
  const input = tripInput(trip);
  const budget = trip.budget;
  const cols = ids.map((id) => ({ id, d: DESTINATIONS.find((x) => x.id === id), est: estimate(id, input) }));
  return (
    <Sheet onClose={onClose} label="Compare places" wide>
      <p className="sheet-kicker"><span className="bar" />Compare</p>
      <h2>Side by side</h2>
      <div className="cmp" style={{ '--n': cols.length }}>
        <span />
        {cols.map((c) => <b key={c.id} className="ch">{c.d.title.join(' ')}</b>)}
        {[
          ['Total', (c) => money(c.est.total)],
          ['Verdict', (c) => verdict(c.est, budget).label],
          ['Stay', (c) => money(c.est.stay)],
          ['Food', (c) => money(c.est.food)],
          ['Getting around', (c) => money(c.est.move)],
          ['Fees and permits', (c) => money(c.est.feeTotal)],
          ['Best time', (c) => VISITS[c.id].best],
        ].map(([label, f]) => (
          <div className="cr" key={label}>
            <span className="cl">{label}</span>
            {cols.map((c) => <span key={c.id} className="cv">{f(c)}</span>)}
          </div>
        ))}
      </div>
    </Sheet>
  );
}

