export const VISITS = {
  'maasai-mara': {
    best: 'July to October for the Great Migration and the best game viewing',
    getThere: 'Drive from Nairobi in about 5 to 6 hours or take a short flight to an airstrip inside the reserve',
    stays: [
      { type: 'Budget', note: 'Simple campsites and guesthouses near the reserve gates', q: 'budget camps near Maasai Mara' },
      { type: 'Mid-range', note: 'Tented camps with meals and game drives', q: 'tented camps near Maasai Mara' },
      { type: 'Lodge', note: 'Full-service lodges with views over the plains', q: 'safari lodges Maasai Mara' },
    ],
  },
  giza: {
    best: 'October to April when the days are cooler',
    getThere: 'Giza sits on the edge of Cairo and is about 30 minutes from the city centre by taxi or ride-hailing',
    stays: [
      { type: 'Budget', note: 'Hostels and small guesthouses close to the plateau', q: 'budget hotels near Pyramids of Giza' },
      { type: 'Mid-range', note: 'Hotels with rooftop views of the pyramids', q: 'hotels with pyramid view Giza' },
      { type: 'Lodge', note: 'Historic hotels with gardens and pools', q: 'luxury hotels near Pyramids of Giza' },
    ],
  },
  'victoria-falls': {
    best: 'February to July for the most water and September to December for swimming at the edge on the Zambian side',
    getThere: 'Fly into Livingstone in Zambia or Victoria Falls Airport in Zimbabwe and both are close to the falls',
    stays: [
      { type: 'Budget', note: 'Backpacker lodges and campsites in the two border towns', q: 'budget lodges Victoria Falls' },
      { type: 'Mid-range', note: 'Hotels and lodges within reach of the falls', q: 'hotels near Victoria Falls' },
      { type: 'Lodge', note: 'River lodges on the Zambezi', q: 'Zambezi river lodges near Victoria Falls' },
    ],
  },
  sossusvlei: {
    best: 'May to September when the air is cool and clear',
    getThere: 'About 5 to 6 hours by road from Windhoek to the Sesriem gate and the dunes open at sunrise',
    stays: [
      { type: 'Budget', note: 'Campsites at Sesriem close to the dune road', q: 'campsites Sesriem Namibia' },
      { type: 'Mid-range', note: 'Desert lodges and guest farms nearby', q: 'lodges near Sossusvlei' },
      { type: 'Lodge', note: 'Luxury camps inside the Namib Desert', q: 'luxury camps Sossusvlei' },
    ],
  },
  zanzibar: {
    best: 'June to October and December to February for dry weather',
    getThere: 'Fly into Zanzibar airport and reach Stone Town in about 20 minutes or take the ferry from Dar es Salaam in about 2 hours',
    stays: [
      { type: 'Budget', note: 'Guesthouses in Stone Town and Paje', q: 'budget guesthouses Zanzibar' },
      { type: 'Mid-range', note: 'Beach hotels on the north and east coasts', q: 'beach hotels Zanzibar' },
      { type: 'Lodge', note: 'Resorts right on the sand', q: 'luxury beach resorts Zanzibar' },
    ],
  },
  'table-mountain': {
    best: 'October to April for the clearest days and fewer closures of the cable car',
    getThere: 'Cape Town airport is about 30 minutes from the city and the cable car station is a short drive from the centre',
    stays: [
      { type: 'Budget', note: 'Hostels in the city bowl and Gardens', q: 'hostels near Table Mountain Cape Town' },
      { type: 'Mid-range', note: 'Guesthouses and hotels around the city bowl', q: 'hotels near Table Mountain Cape Town' },
      { type: 'Lodge', note: 'Boutique hotels with mountain views', q: 'boutique hotels Cape Town Table Mountain view' },
    ],
  },
  merzouga: {
    best: 'October to April when the desert is cooler',
    getThere: 'Roughly 9 hours by road from Marrakech or 7 hours from Fez or fly to Errachidia and drive about 2 hours',
    stays: [
      { type: 'Budget', note: 'Guesthouses in Merzouga village', q: 'budget guesthouses Merzouga' },
      { type: 'Mid-range', note: 'Desert camps with dinner and a camel ride', q: 'desert camps Merzouga' },
      { type: 'Lodge', note: 'Luxury tents beside the dunes', q: 'luxury desert camp Erg Chebbi' },
    ],
  },
  kilimanjaro: {
    best: 'January to March and June to October for the clearest climbing weather',
    getThere: 'Fly into Kilimanjaro International Airport and reach Moshi in about 45 minutes and note that climbs need a licensed guide',
    stays: [
      { type: 'Budget', note: 'Guesthouses in Moshi before and after the climb', q: 'budget hotels Moshi Tanzania' },
      { type: 'Mid-range', note: 'Hotels with garden views of the mountain', q: 'hotels Moshi Kilimanjaro view' },
      { type: 'Lodge', note: 'Lodges on the lower slopes', q: 'lodges near Kilimanjaro National Park' },
    ],
  },
  lalibela: {
    best: 'October to March for dry weather and January for the Ethiopian Christmas and Timkat festivals',
    getThere: 'Fly from Addis Ababa to Lalibela in about 1 hour and the churches are a short walk or tuk-tuk ride from town',
    stays: [
      { type: 'Budget', note: 'Simple guesthouses in the town centre', q: 'budget guesthouses Lalibela' },
      { type: 'Mid-range', note: 'Hotels with views over the valley', q: 'hotels Lalibela Ethiopia' },
      { type: 'Lodge', note: 'Cliff-top lodges with terraces', q: 'lodges Lalibela Ethiopia' },
    ],
  },
  marrakech: {
    best: 'March to May and September to November when the days are warm and not too hot',
    getThere: 'Marrakech Menara airport is about 15 minutes from the old city by taxi and has many direct flights from Europe and Africa',
    stays: [
      { type: 'Budget', note: 'Hostels and small riads inside the medina', q: 'budget riads Marrakech medina' },
      { type: 'Mid-range', note: 'Riads with courtyards and rooftop breakfast', q: 'riads Marrakech medina' },
      { type: 'Lodge', note: 'Palace hotels with pools and spas', q: 'luxury riads Marrakech' },
    ],
  },
  kruger: {
    best: 'May to September in the dry winter when animals gather at the rivers and the bush is thin',
    getThere: 'Fly into Johannesburg and drive about 5 hours or fly to Kruger Mpumalanga airport near Nelspruit and hire a car',
    stays: [
      { type: 'Budget', note: 'Rest camp campsites and safari tents inside the park', q: 'camping Kruger National Park' },
      { type: 'Mid-range', note: 'Guesthouses and bush lodges near the gates', q: 'lodges near Kruger National Park gates' },
      { type: 'Lodge', note: 'Private reserve lodges with guided drives', q: 'luxury lodges Kruger private reserve' },
    ],
  },
  etosha: {
    best: 'June to October in the dry season when animals crowd around the waterholes',
    getThere: 'About 5 hours by road from Windhoek on good tarred roads and most visitors hire a car and drive themselves',
    stays: [
      { type: 'Budget', note: 'Campsites at Okaukuejo, Halali and Namutoni', q: 'camping Etosha National Park' },
      { type: 'Mid-range', note: 'Rest camp chalets and lodges near the gates', q: 'lodges near Etosha National Park' },
      { type: 'Lodge', note: 'Safari lodges with private game drives', q: 'luxury lodges Etosha' },
    ],
  },
  'cape-coast': {
    best: 'November to March for dry weather and the Panafest and Emancipation Day events in summer',
    getThere: 'About 3 hours by road from Accra by taxi or the Cape Coast bus and the castle is in the town centre',
    stays: [
      { type: 'Budget', note: 'Guesthouses and hostels near the castle', q: 'budget guesthouses Cape Coast Ghana' },
      { type: 'Mid-range', note: 'Beach hotels with restaurants', q: 'hotels Cape Coast Ghana' },
      { type: 'Lodge', note: 'Beachfront resorts near Elmina', q: 'resorts Elmina Cape Coast Ghana' },
    ],
  },
  sal: {
    best: 'November to June for sunny weather and strong wind for kitesurfing',
    getThere: 'Fly into Amilcar Cabral airport and Santa Maria is about 20 minutes away by taxi',
    stays: [
      { type: 'Budget', note: 'Guesthouses and apartments in Santa Maria', q: 'budget guesthouses Santa Maria Sal Cape Verde' },
      { type: 'Mid-range', note: 'Beach hotels with breakfast', q: 'hotels Santa Maria Sal Cape Verde' },
      { type: 'Lodge', note: 'All-inclusive resorts on the sand', q: 'resorts Santa Maria Sal Cape Verde' },
    ],
  },
  bwindi: {
    best: 'June to September and December to February for drier trails and easier treks',
    getThere: 'Drive from Entebbe in about 9 to 10 hours or fly to Kihihi airstrip near the park and transfer by road',
    stays: [
      { type: 'Budget', note: 'Simple guesthouses and campsites in Buhoma and Rushaga', q: 'budget lodges Bwindi Buhoma' },
      { type: 'Mid-range', note: 'Lodges with forest views and meals', q: 'lodges Bwindi Impenetrable National Park' },
      { type: 'Lodge', note: 'Luxury forest lodges with guided walks', q: 'luxury lodges Bwindi Impenetrable Forest' },
    ],
  },
};
