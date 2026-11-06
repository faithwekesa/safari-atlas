import { useMemo, useState } from 'react';
import { DESTINATIONS } from './destinations.js';
import { CHECKED, estimate, money, verdict } from './costs.js';
import { Photo, TripForm, tripInput, Trip, Compare } from './Trip.jsx';

export default function Planner({ trip, setTrip }) {
  const [onlyFits, setOnlyFits] = useState(false);
  const [sort, setSort] = useState('best');
  const [open, setOpen] = useState(null);
  const [picked, setPicked] = useState([]);
  const [cmp, setCmp] = useState(false);

  const { budget, days, people } = trip;
  const input = tripInput(trip);

  const rows = useMemo(() => {
    const list = DESTINATIONS.map((d) => {
      const est = estimate(d.id, input);
      return { d, est, ver: verdict(est, budget) };
    });
    const rank = { fits: 0, tight: 1, over: 2, short: 3 };
    list.sort((a, b) => {
      if (sort === 'cheap') return a.est.total - b.est.total;
      if (rank[a.ver.kind] !== rank[b.ver.kind]) return rank[a.ver.kind] - rank[b.ver.kind];
      if (a.ver.kind === 'over') return a.est.total - b.est.total;
      return b.est.total - a.est.total;
    });
    return list;
  }, [trip, sort]);

  const counts = rows.reduce((n, r) => ({ ...n, [r.ver.kind]: (n[r.ver.kind] || 0) + 1 }), {});
  const shown = onlyFits ? rows.filter((r) => r.ver.kind === 'fits' || r.ver.kind === 'tight') : rows;
  const reachable = (counts.fits || 0) + (counts.tight || 0);
  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length < 3 ? [...p, id] : p));

  return (
    <div className="planner">
      <div className="pwrap">
        <header className="phead">
          <h1>Where can your budget take you?</h1>
          <p>Set your budget and dates and see what a trip to each place would cost.</p>
        </header>

        <TripForm trip={trip} setTrip={setTrip} />

        <div className="summary">
          <p>
            {reachable > 0 ? <><b>{reachable}</b> of {rows.length} places fit {money(budget)}</> : <>Nothing fits {money(budget)} yet</>}
            {' '}for {days} days and {people} {people === 1 ? 'person' : 'people'}
          </p>
          <div className="tools">
            <label className="check"><input type="checkbox" checked={onlyFits} onChange={(e) => setOnlyFits(e.target.checked)} />Only what fits</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort places">
              <option value="best">Best use of the budget</option>
              <option value="cheap">Cheapest first</option>
            </select>
          </div>
        </div>

        <ul className="list">
          {shown.map(({ d, est, ver }) => (
            <li key={d.id} className="row">
              <button className="row-open" onClick={() => setOpen(d.id)} aria-label={`See the plan for ${d.title.join(' ')}`}>
                <span className="thumb"><Photo d={d} /></span>
                <span className="row-name"><strong>{d.title.join(' ')}</strong><em>{d.country}</em></span>
                <span className="row-total">{money(est.total)}</span>
                <span className={`pill ${ver.kind}`}>{ver.label}</span>
              </button>
              <label className="cmp-pick">
                <input type="checkbox" checked={picked.includes(d.id)} onChange={() => toggle(d.id)} disabled={!picked.includes(d.id) && picked.length >= 3} />
                Compare
              </label>
            </li>
          ))}
        </ul>

        <p className="pfoot">Prices are estimates in US dollars. Park fees were last checked on {CHECKED}. Rooms, meals and transport are typical prices, rounded. Costs are for adults and do not include visas. Always confirm on the booking sites.</p>
      </div>

      {picked.length >= 2 && <button className="cmp-bar" onClick={() => setCmp(true)}>Compare {picked.length} places</button>}
      {open && <Trip id={open} trip={trip} setTrip={setTrip} onClose={() => setOpen(null)} />}
      {cmp && picked.length >= 2 && <Compare ids={picked} trip={trip} onClose={() => setCmp(false)} />}
    </div>
  );
}
