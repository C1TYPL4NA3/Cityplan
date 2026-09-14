export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  year: number;
  status: string;
  description: string;
  client?: string;
  area?: string;
  coverImage: string;
  images: string[];
  order: number;
  featured: boolean;
  /** Kurzer Teasertext neben dem Projekttitel auf der Detailseite. */
  intro?: string;
  /** Überschrift im grünen Info-Block ("Architektur, die ..."). */
  highlight?: string;
  /** Objektbeschreibung (z. B. "Mehrfamilienhaus, 24 Wohnungen"). */
  objekt?: string;
  /** Von Cityplan erbrachte Leistungen. */
  leistungen?: string;
  /** Realisationszeitraum, z. B. "2022–2023". Fällt sonst auf `year` zurück. */
  realisation?: string;
}

export const CATEGORIES = [
  { value: 'umbau-sanierung', label: 'Umbau & Sanierung' },
  { value: 'wohnen', label: 'Wohnen' },
  { value: 'gewerbe', label: 'Gewerbe' },
  { value: 'neubau', label: 'Neubau' },
  { value: 'denkmalschutz', label: 'Denkmalschutz' },
];
