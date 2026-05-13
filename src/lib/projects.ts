export type ProjectCategory = 'residential' | 'commercial' | 'urban' | 'public';

export interface Project {
  id: string;
  slug: string;
  title: { de: string; en: string };
  category: ProjectCategory;
  location: string;
  year: number;
  client?: { de: string; en: string };
  area?: string;
  status: { de: string; en: string };
  description: { de: string; en: string };
  longDescription?: { de: string; en: string };
  coverImage: string;
  images: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'wohnquartier-seehof',
    title: { de: 'Wohnquartier Seehof', en: 'Seehof Residential Quarter' },
    category: 'residential',
    location: 'Zürich, CH',
    year: 2023,
    client: { de: 'Seehof Immobilien AG', en: 'Seehof Real Estate AG' },
    area: '8 200 m²',
    status: { de: 'Realisiert', en: 'Completed' },
    description: {
      de: 'Ein nachhaltiges Wohnquartier am Seeufer mit 72 Einheiten und gemeinschaftlichen Grünflächen.',
      en: 'A sustainable residential quarter on the lakeside with 72 units and communal green spaces.'
    },
    longDescription: {
      de: 'Das Wohnquartier Seehof entstand in enger Zusammenarbeit mit der Gemeinde und zukünftigen Bewohnern. Ziel war ein dichtes, aber lebenswertes Quartier mit hoher Aufenthaltsqualität im Außenraum. Die Gebäude gliedern sich um einen baumbestandenen Innenhof und öffnen sich zum See hin.',
      en: 'The Seehof Residential Quarter was developed in close collaboration with the community and future residents. The goal was a dense yet livable neighborhood with high quality outdoor spaces. The buildings are arranged around a tree-lined courtyard and open towards the lake.'
    },
    coverImage: '/images/projects/seehof-cover.svg',
    images: ['/images/projects/seehof-1.svg', '/images/projects/seehof-2.svg'],
    featured: true
  },
  {
    id: '2',
    slug: 'buerohaus-nordpark',
    title: { de: 'Bürohaus Nordpark', en: 'Nordpark Office Building' },
    category: 'commercial',
    location: 'Basel, CH',
    year: 2022,
    client: { de: 'Nordpark Holding', en: 'Nordpark Holding' },
    area: '12 400 m²',
    status: { de: 'Realisiert', en: 'Completed' },
    description: {
      de: 'Flexibles Bürogebäude mit Holz-Hybridkonstruktion und begrünten Terrassen.',
      en: 'Flexible office building with timber-hybrid construction and green terraces.'
    },
    longDescription: {
      de: 'Das Bürohaus Nordpark setzt auf eine zukunftsfähige Holz-Hybridkonstruktion, die ressourcenschonend und CO₂-neutral realisiert wurde. Flexible Grundrisse ermöglichen verschiedene Nutzungsszenarien, von Großraumbüros bis hin zu kleinteiligen Einheiten.',
      en: 'The Nordpark Office Building relies on a future-proof timber-hybrid construction, realized in a resource-efficient and CO₂-neutral manner. Flexible floor plans allow for various usage scenarios, from open-plan offices to smaller units.'
    },
    coverImage: '/images/projects/nordpark-cover.svg',
    images: ['/images/projects/nordpark-1.svg', '/images/projects/nordpark-2.svg'],
    featured: true
  },
  {
    id: '3',
    slug: 'stadtentwicklung-westend',
    title: { de: 'Stadtentwicklung Westend', en: 'Westend Urban Development' },
    category: 'urban',
    location: 'Bern, CH',
    year: 2023,
    client: { de: 'Stadt Bern', en: 'City of Bern' },
    area: '45 ha',
    status: { de: 'In Planung', en: 'In Planning' },
    description: {
      de: 'Städtebauliche Entwicklung eines ehemaligen Industrieareals zu einem gemischten Stadtquartier.',
      en: 'Urban development of a former industrial site into a mixed-use urban quarter.'
    },
    longDescription: {
      de: 'Das Westend-Areal bietet die seltene Chance, auf 45 Hektaren ein neues, lebendiges Stadtquartier zu entwickeln. Das Konzept sieht eine durchmischte Nutzung mit Wohnen, Arbeiten, Kultur und Gewerbe vor, verbunden durch ein dichtes Netz von öffentlichen Räumen und Grünachsen.',
      en: 'The Westend site offers the rare opportunity to develop a new, vibrant urban quarter on 45 hectares. The concept envisions a mixed-use neighborhood with housing, workplaces, culture, and commerce, connected by a dense network of public spaces and green axes.'
    },
    coverImage: '/images/projects/westend-cover.svg',
    images: ['/images/projects/westend-1.svg', '/images/projects/westend-2.svg'],
    featured: true
  },
  {
    id: '4',
    slug: 'schule-gruenfeld',
    title: { de: 'Schulhaus Grünfeld', en: 'Grünfeld School' },
    category: 'public',
    location: 'Winterthur, CH',
    year: 2021,
    client: { de: 'Gemeinde Winterthur', en: 'Municipality of Winterthur' },
    area: '6 800 m²',
    status: { de: 'Realisiert', en: 'Completed' },
    description: {
      de: 'Neubau einer Primarschule mit innovativem Lernraumkonzept und Minergie-P-Zertifizierung.',
      en: 'New primary school building with innovative learning space concept and Minergie-P certification.'
    },
    longDescription: {
      de: 'Das Schulhaus Grünfeld wurde als Lernlandschaft konzipiert: Offen, flexibel und dennoch strukturiert. Clusterartige Gruppenräume verbinden sich mit großzügigen Gemeinschaftsbereichen. Die Minergie-P-Zertifizierung belegt den konsequenten Einsatz erneuerbarer Energien.',
      en: 'Grünfeld School was conceived as a learning landscape: open, flexible yet structured. Cluster-like group rooms connect with generous communal areas. The Minergie-P certification demonstrates the consistent use of renewable energies.'
    },
    coverImage: '/images/projects/gruenfeld-cover.svg',
    images: ['/images/projects/gruenfeld-1.svg', '/images/projects/gruenfeld-2.svg'],
    featured: false
  },
  {
    id: '5',
    slug: 'villa-bergblick',
    title: { de: 'Villa Bergblick', en: 'Villa Bergblick' },
    category: 'residential',
    location: 'Davos, CH',
    year: 2022,
    client: { de: 'Privat', en: 'Private' },
    area: '640 m²',
    status: { de: 'Realisiert', en: 'Completed' },
    description: {
      de: 'Privates Wohnhaus im alpinen Kontext mit zeitgenössischer Formensprache und traditionellen Materialien.',
      en: 'Private residence in an alpine context combining contemporary form with traditional materials.'
    },
    longDescription: {
      de: 'Die Villa Bergblick interpretiert das alpine Chalet neu: Massivholzkonstruktion trifft auf klare Linien und große Glasflächen. Das Haus öffnet sich zum Bergpanorama und zieht gleichzeitig die Landschaft ins Innere.',
      en: 'Villa Bergblick reinterprets the alpine chalet: solid wood construction meets clean lines and large glass surfaces. The house opens to the mountain panorama while simultaneously drawing the landscape inward.'
    },
    coverImage: '/images/projects/bergblick-cover.svg',
    images: ['/images/projects/bergblick-1.svg', '/images/projects/bergblick-2.svg'],
    featured: false
  },
  {
    id: '6',
    slug: 'gewerbepark-ost',
    title: { de: 'Gewerbepark Ost', en: 'East Business Park' },
    category: 'commercial',
    location: 'Luzern, CH',
    year: 2024,
    client: { de: 'Ost Invest AG', en: 'Ost Invest AG' },
    area: '18 000 m²',
    status: { de: 'In Bau', en: 'Under Construction' },
    description: {
      de: 'Modularer Gewerbepark mit nachhaltiger Energieversorgung und flexiblen Mieteinheiten.',
      en: 'Modular business park with sustainable energy supply and flexible rental units.'
    },
    longDescription: {
      de: 'Der Gewerbepark Ost bietet auf 18 000 m² flexible Einheiten für Produktion, Lager und Büro. Das modulare Konzept ermöglicht es, den Park an wechselnde Anforderungen anzupassen. Eine Photovoltaikanlage auf dem Dach versorgt den Großteil des Parks mit Strom.',
      en: 'The East Business Park offers 18,000 m² of flexible units for production, storage, and offices. The modular concept allows the park to adapt to changing requirements. A rooftop photovoltaic system powers the majority of the park.'
    },
    coverImage: '/images/projects/gewerbepark-cover.svg',
    images: ['/images/projects/gewerbepark-1.svg', '/images/projects/gewerbepark-2.svg'],
    featured: false
  }
];

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory | 'all'): Project[] {
  if (category === 'all') return projects;
  return projects.filter(p => p.category === category);
}
