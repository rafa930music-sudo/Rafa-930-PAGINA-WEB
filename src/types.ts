export type Language = 'ca' | 'es' | 'en';

export type Screen =
  | 'home'
  | 'revista'
  | 'discografia'
  | 'galeria'
  | 'conciertos'
  | 'presskit'
  | 'serveis'
  | 'enllacos'
  | 'contacte'
  | 'legal'
  | 'redes';

export type ScreenId = Screen;
export type ThemeMode = 'dark' | 'light';
export type LegalDocId = 'aviso' | 'privacitat' | 'cookies' | 'credits';

export interface Track {
  id: string;
  title: string;
  year: number | string;
  duration: string;
  coverImage?: string;
  coverUrl?: string;
  spotifyUrl: string;
  youtubeUrl?: string;
  description: string | Record<Language, string>;
  format?: 'single' | 'collab' | 'ep' | 'album' | 'hit';
  category?: 'single' | 'ep' | 'album' | 'hit';
  categoryLabel?: string;
  plays?: string;
  credits?: string;
  lyricsExcerpt?: string;
  isUpcoming?: boolean;
  upcomingNote?: string;
  bpm?: number;
  keyNote?: string;
  isrc?: string;
}

export type ShowStatus = 'confirmado' | 'ultimas' | 'sold-out';

export interface Show {
  id: string;
  city: string;
  venue: string;
  date: string; // ISO YYYY-MM-DD
  status: ShowStatus;
  ticketUrl?: string;
}

export interface PressKitItem {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileFormat: 'PDF' | 'ZIP';
  fileSize: string;
  lastUpdated: string;
}

export interface NavItem {
  id: Screen;
  label: string;
  hash: string;
}

export interface StreamingLink {
  label: string;
  url: string;
}

export interface Collaborator {
  id: string;
  name: string;
  role: string;
  roleColor: 'primary' | 'secondary' | 'tertiary';
  avatarUrl: string;
  instagramUrl: string;
  handle: string;
  bio: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'retrat' | 'moda' | 'urbana' | 'mina';
  categoryLabel: string;
  imageUrl: string;
  credits: string;
  year: string;
  location: string;
  description: string;
}

export interface ServicePackage {
  id: string;
  title: string;
  category: 'musica' | 'fotografia' | 'web';
  basePrice?: number;
  description: string;
  features: string[];
  turnaround: string;
  auraClass: string;
}

export interface TimelineEvent {
  year: string;
  dateStr?: string;
  title: string;
  badge?: string;
  badgeType?: 'primary' | 'secondary' | 'tertiary';
  description: string;
  highlight?: boolean;
}
