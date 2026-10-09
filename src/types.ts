export type ScreenId = 'revista' | 'discografia' | 'galeria' | 'serveis' | 'presskit' | 'contacte' | 'legal';

export type Language = 'ca' | 'es' | 'en';

export type ThemeMode = 'dark' | 'light';

export type LegalDocId = 'aviso' | 'privacitat' | 'cookies' | 'credits';

export interface Track {
  id: string;
  title: string;
  year: number | string;
  category: 'single' | 'ep' | 'album' | 'hit';
  categoryLabel: string;
  coverUrl: string;
  duration: string;
  spotifyUrl: string;
  youtubeUrl: string;
  description: string;
  plays?: string;
  isUpcoming?: boolean;
  upcomingNote?: string;
  lyricsExcerpt?: string;
  credits?: string;
  bpm?: number;
  keyNote?: string;
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
  basePrice: number;
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
