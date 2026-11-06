export const CHECKED = '5 Nov 2026';

export const STYLES = [
  { id: 'budget', label: 'Budget' },
  { id: 'mid', label: 'Comfortable' },
  { id: 'lux', label: 'Treat yourself' },
];

const SRC = {
  mara: { label: 'Maasai Mara reserve fees', url: 'https://www.masaimara.travel/park-entry-fees.php' },
  table: { label: 'Table Mountain cableway prices', url: 'https://www.tablemountain.net/plan-your-visit/ticket-prices/' },
  kruger: { label: 'SANParks fees from 1 Nov 2026', url: 'https://www.riotimesonline.com/kruger-cape-point-park-fees-1-november-2026/' },
  uganda: { label: 'Uganda gorilla permit prices', url: 'https://ugandasafaritravelguide.com/cost-of-gorilla-permits/' },
  kili: { label: 'Kilimanjaro 2026 park fees', url: 'https://globalsummitguide.com/?p=2813' },
  falls: { label: 'Victoria Falls entry fees', url: 'https://atta.travel/resource/zimparks-lifts-victoria-falls-entry-fees-as-vat-takes-effect.html' },
  namibia: { label: 'Namibia park fees 2026', url: 'https://safarifind.com/blog/namibia-national-park-fees-availability-2026' },
  giza: { label: 'Giza plateau ticket price', url: 'https://emotours.com/how-much-does-a-giza-pyramids-entry-ticket-cost-in-2026/' },
};

export const COSTS = {
  'maasai-mara': {
    min: 3, fly: 'Nairobi', q: 'Maasai Mara, Kenya',
    high: [7, 8, 9, 10], low: [4, 5, 11],
    stay: { budget: 60, mid: 220, lux: 550 }, food: { budget: 20, mid: 45, lux: 90 }, move: { budget: 45, mid: 100, lux: 220 },
    fees: [{ label: 'Reserve fee per adult per day', amount: 100, alt: 200, altMonths: [7, 8, 9, 10, 11, 12], per: 'day', src: SRC.mara, note: '$100 January to June and $200 July to December' }],
    official: { label: 'Kenya Tourism Board', url: 'https://magicalkenya.com' },
  },
  giza: {
    min: 2, fly: 'Cairo', q: 'Giza, Cairo, Egypt',
    high: [10, 11, 12, 1, 2, 3, 4], low: [6, 7, 8],
    stay: { budget: 25, mid: 75, lux: 220 }, food: { budget: 12, mid: 30, lux: 70 }, move: { budget: 8, mid: 20, lux: 60 },
    fees: [{ label: 'Giza Plateau entry ticket', amount: 14, per: 'trip', src: SRC.giza, note: 'EGP 700 for foreign adults. The Great Pyramid interior is an extra ticket' }],
    official: { label: 'Egypt Tourism', url: 'https://egypt.travel' },
  },
  'victoria-falls': {
    min: 2, fly: 'Livingstone', q: 'Victoria Falls',
    high: [7, 8, 9, 10], low: [1, 2, 3, 11, 12],
    stay: { budget: 35, mid: 130, lux: 450 }, food: { budget: 18, mid: 40, lux: 90 }, move: { budget: 15, mid: 35, lux: 90 },
    fees: [{ label: 'Falls entry ticket', amount: 58, per: 'trip', src: SRC.falls, note: 'Zimbabwe side main gate for international visitors' }],
    official: { label: 'Zambia Tourism', url: 'https://www.zambiatourism.com' },
  },
  sossusvlei: {
    min: 3, fly: 'Windhoek', q: 'Sesriem, Namibia',
    high: [6, 7, 8, 9, 10], low: [1, 2, 12],
    stay: { budget: 40, mid: 180, lux: 500 }, food: { budget: 18, mid: 38, lux: 85 }, move: { budget: 30, mid: 55, lux: 120 },
    fees: [{ label: 'Park entry per adult per day', amount: 17.5, per: 'day', src: SRC.namibia, note: 'N$280 per adult per day for international visitors' }],
    official: { label: 'Namibia Wildlife Resorts', url: 'https://www.nwr.com.na' },
  },
  zanzibar: {
    min: 3, fly: 'Zanzibar', q: 'Zanzibar, Tanzania',
    high: [6, 7, 8, 9, 10, 12, 1, 2], low: [4, 5, 11],
    stay: { budget: 30, mid: 95, lux: 300 }, food: { budget: 14, mid: 30, lux: 70 }, move: { budget: 8, mid: 20, lux: 55 },
    fees: [],
    official: { label: 'Tanzania Tourism', url: 'https://www.tanzaniatourism.go.tz' },
  },
  'table-mountain': {
    min: 3, fly: 'Cape Town', q: 'Cape Town, South Africa',
    high: [11, 12, 1, 2, 3], low: [5, 6, 7, 8],
    stay: { budget: 30, mid: 95, lux: 300 }, food: { budget: 15, mid: 32, lux: 75 }, move: { budget: 12, mid: 28, lux: 70 },
    fees: [{ label: 'Table Mountain cable car return', amount: 29, per: 'trip', src: SRC.table, note: 'R475 online for an adult from July 2026' }],
    official: { label: 'Table Mountain Cableway', url: 'https://www.tablemountain.net' },
  },
  merzouga: {
    min: 3, fly: 'Marrakech', q: 'Merzouga, Morocco',
    high: [10, 11, 3, 4], low: [6, 7, 8],
    stay: { budget: 30, mid: 85, lux: 250 }, food: { budget: 12, mid: 25, lux: 55 }, move: { budget: 20, mid: 45, lux: 110 },
    fees: [{ label: 'Camel trek and desert camp night', amount: 60, per: 'trip', note: 'Typical price for an overnight camp trip with dinner', approx: true }],
    official: { label: 'Visit Morocco', url: 'https://www.visitmorocco.com' },
  },
  kilimanjaro: {
    min: 9, covered: 7, fly: 'Kilimanjaro', q: 'Moshi, Tanzania',
    high: [1, 2, 7, 8, 9, 10], low: [4, 5, 11],
    stay: { budget: 30, mid: 90, lux: 260 }, food: { budget: 15, mid: 30, lux: 70 }, move: { budget: 10, mid: 25, lux: 60 },
    fees: [
      { label: '7 day Machame climb with a licensed operator', amount: { budget: 1900, mid: 2700, lux: 4200 }, per: 'trip', src: SRC.kili, note: 'Includes park fees of about $1,022 plus guides, porters, tents and meals. The source warns against quotes under $1,800' },
      { label: 'Tips for the climbing crew', amount: 250, per: 'trip', note: 'Typical guideline per climber', approx: true },
    ],
    official: { label: 'Tanzania National Parks', url: 'https://www.tanzaniaparks.go.tz' },
  },
  lalibela: {
    min: 2, fly: 'Lalibela', q: 'Lalibela, Ethiopia',
    high: [10, 11, 12, 1], low: [6, 7, 8],
    stay: { budget: 20, mid: 60, lux: 180 }, food: { budget: 8, mid: 18, lux: 40 }, move: { budget: 10, mid: 22, lux: 50 },
    fees: [{ label: 'Rock churches ticket', amount: 50, per: 'trip', note: 'Approximate price for foreign visitors. Confirm at the ticket office', approx: true }],
  },
  marrakech: {
    min: 3, fly: 'Marrakech', q: 'Marrakech, Morocco',
    high: [3, 4, 5, 10, 11], low: [7, 8],
    stay: { budget: 25, mid: 70, lux: 200 }, food: { budget: 10, mid: 22, lux: 50 }, move: { budget: 10, mid: 22, lux: 60 },
    fees: [],
    official: { label: 'Visit Morocco', url: 'https://www.visitmorocco.com' },
  },
  kruger: {
    min: 3, fly: 'Johannesburg', q: 'Kruger National Park, South Africa',
    high: [6, 7, 8, 9], low: [1, 2, 11],
    stay: { budget: 30, mid: 110, lux: 450 }, food: { budget: 15, mid: 30, lux: 70 }, move: { budget: 25, mid: 40, lux: 90 },
    fees: [{ label: 'Conservation fee per adult per day', amount: 42, per: 'day', src: SRC.kruger, note: 'R692 per international adult from 1 November 2026' }],
    official: { label: 'South African National Parks', url: 'https://www.sanparks.org' },
  },
  etosha: {
    min: 3, fly: 'Windhoek', q: 'Etosha National Park, Namibia',
    high: [6, 7, 8, 9, 10], low: [1, 2, 3, 12],
    stay: { budget: 35, mid: 150, lux: 450 }, food: { budget: 15, mid: 32, lux: 70 }, move: { budget: 35, mid: 55, lux: 110 },
    fees: [{ label: 'Park entry per adult per day', amount: 17.5, per: 'day', src: SRC.namibia, note: 'N$280 per adult per day for international visitors' }],
    official: { label: 'Namibia Wildlife Resorts', url: 'https://www.nwr.com.na' },
  },
  'cape-coast': {
    min: 3, fly: 'Accra', q: 'Cape Coast, Ghana',
    high: [12, 1, 2], low: [6, 7, 8],
    stay: { budget: 25, mid: 65, lux: 170 }, food: { budget: 8, mid: 18, lux: 40 }, move: { budget: 8, mid: 18, lux: 45 },
    fees: [{ label: 'Castle tours and Kakum canopy walk', amount: 20, per: 'trip', note: 'Approximate combined entry for foreign visitors', approx: true }],
  },
  sal: {
    min: 4, fly: 'Sal Cape Verde', q: 'Santa Maria, Sal, Cape Verde',
    high: [11, 12, 1, 2, 3, 4], low: [6, 7, 8, 9],
    stay: { budget: 40, mid: 85, lux: 220 }, food: { budget: 14, mid: 28, lux: 60 }, move: { budget: 6, mid: 12, lux: 35 },
    fees: [],
  },
  bwindi: {
    min: 3, fly: 'Entebbe', q: 'Bwindi Impenetrable National Park, Uganda',
    high: [6, 7, 8, 9, 12, 1, 2], low: [4, 5, 11],
    stay: { budget: 40, mid: 160, lux: 600 }, food: { budget: 15, mid: 35, lux: 80 }, move: { budget: 50, mid: 120, lux: 250 },
    fees: [{ label: 'Gorilla trekking permit', amount: 800, alt: 600, altMonths: [4, 5, 11], per: 'trip', src: SRC.uganda, note: '$800 standard and $600 in April, May and November' }],
    official: { label: 'Uganda Wildlife Authority', url: 'https://ugandawildlife.org' },
  },
};

const pick = (v, style) => (typeof v === 'object' ? v[style] : v);

export function estimate(id, { days, people, style, month, flights }) {
  const c = COSTS[id];
  const nights = Math.max(1, days - 1);
  const rooms = Math.ceil(people / 2);
  const covered = c.covered || 0;
  const paidDays = Math.max(0, days - covered);
  const paidNights = Math.max(0, nights - covered);
  const season = c.high.includes(month) ? 'high' : c.low.includes(month) ? 'low' : 'mid';
  const mult = season === 'high' ? 1.25 : season === 'low' ? 0.85 : 1;
  const stay = Math.round(rooms * paidNights * c.stay[style] * mult);
  const food = Math.round(people * paidDays * c.food[style]);
  const move = Math.round(people * paidDays * c.move[style]);
  const fees = c.fees.map((f) => {
    const base = f.altMonths && f.altMonths.includes(month) ? f.alt : pick(f.amount, style);
    const unit = f.per === 'day' ? days : f.per === 'night' ? nights : 1;
    return { ...f, each: base, total: Math.round(base * unit * people) };
  });
  const feeTotal = fees.reduce((n, f) => n + f.total, 0);
  const total = stay + food + move + feeTotal + flights;
  return { stay, food, move, fees, feeTotal, flights, total, nights, rooms, season, mult, shortBy: Math.max(0, c.min - days), min: c.min, covered };
}

export function verdict(est, budget) {
  const left = budget - est.total;
  if (est.shortBy > 0) return { kind: 'short', left, label: `Needs ${est.min}+ days` };
  if (left < 0) return { kind: 'over', left, label: `${money(-left)} over` };
  if (est.total > budget * 0.9) return { kind: 'tight', left, label: `Tight, ${money(left)} left` };
  return { kind: 'fits', left, label: `Fits, ${money(left)} left` };
}

export const money = (n) => `$${Math.round(n).toLocaleString('en-US')}`;

export function fixes(id, input, budget) {
  const c = COSTS[id];
  const order = STYLES.map((s) => s.id);
  const from = order.indexOf(input.style);
  const tries = [];
  for (let d = input.days; d >= c.min; d -= 1) {
    for (let s = from; s >= 0; s -= 1) {
      if (d === input.days && s === from) continue;
      tries.push({ days: d, style: order[s] });
    }
  }
  tries.sort((a, b) => (input.days - a.days) * 2 + (from - order.indexOf(a.style)) - ((input.days - b.days) * 2 + (from - order.indexOf(b.style))));
  return tries.find((t) => estimate(id, { ...input, ...t }).total <= budget) || null;
}

const iso = (d) => d.toISOString().slice(0, 10);

export function links(id, { start, days, people }) {
  const c = COSTS[id];
  const a = new Date(`${start}T00:00:00Z`);
  const b = new Date(a.getTime() + days * 86400000);
  const enc = encodeURIComponent;
  const rooms = Math.ceil(people / 2);
  return {
    booking: `https://www.booking.com/searchresults.html?ss=${enc(c.q)}&checkin=${iso(a)}&checkout=${iso(b)}&group_adults=${people}&no_rooms=${rooms}`,
    airbnb: `https://www.airbnb.com/s/${enc(c.q)}/homes?checkin=${iso(a)}&checkout=${iso(b)}&adults=${people}`,
    flights: `https://www.google.com/travel/flights?q=${enc(`Flights to ${c.fly} on ${iso(a)} returning ${iso(b)} for ${people} passengers`)}`,
    tours: `https://www.getyourguide.com/s/?q=${enc(c.q)}`,
    official: c.official || null,
  };
}
