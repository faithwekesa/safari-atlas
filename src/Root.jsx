import { useState } from 'react';
import App from './App.jsx';
import Planner from './Planner.jsx';
import { DEFAULT_TRIP } from './Trip.jsx';

export default function Root() {
  const [mode, setMode] = useState('explore');
  const [trip, setTrip] = useState(DEFAULT_TRIP);
  return (
    <>
      <nav className="modes" aria-label="Views">
        <button className={mode === 'explore' ? 'on' : ''} onClick={() => setMode('explore')}>Explore</button>
        <button className={mode === 'plan' ? 'on' : ''} onClick={() => setMode('plan')}>Plan by budget</button>
      </nav>
      {mode === 'plan' ? <Planner trip={trip} setTrip={setTrip} /> : <App trip={trip} setTrip={setTrip} />}
    </>
  );
}
