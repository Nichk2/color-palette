// utils/storage.ts
import type { ColorPalette, Palette, CollectionPalette } from '../../types/index';

// Legacy key used by the Create page to show its local list
const LEGACY_CREATED_KEY = 'savedColorPalettes';

// New collection keys powering the Collection page
const COLLECTION_CREATED_KEY = 'collection:created';
const COLLECTION_FAVORITES_KEY = 'collection:favorites';

// ----- Legacy helpers (Create page local list) -----
export const savePalettesToStorage = (palettes: ColorPalette[]): void => {
  try {
    localStorage.setItem(LEGACY_CREATED_KEY, JSON.stringify(palettes));
  } catch (error) {
    console.error('Error saving palettes to localStorage:', error);
  }
};

export const getPalettesFromStorage = (): ColorPalette[] => {
  try {
    const stored = localStorage.getItem(LEGACY_CREATED_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading palettes from localStorage:', error);
    return [];
  }
};

// ----- Collection helpers (source of truth for Collection page) -----
const readJson = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
};

// Created palettes
export const addCreatedToCollection = (palette: ColorPalette): void => {
  const created = readJson<CollectionPalette[]>(COLLECTION_CREATED_KEY, []);
  const toStore: CollectionPalette = {
    id: palette.id,
    name: palette.name,
    colors: palette.colors,
    type: 'created',
    dateCreated: palette.dateCreated,
  };
  writeJson(COLLECTION_CREATED_KEY, [...created.filter(p => p.id !== toStore.id), toStore]);
};

export const getCreatedCollection = (): CollectionPalette[] => {
  return readJson<CollectionPalette[]>(COLLECTION_CREATED_KEY, []);
};

export const removeCreatedFromCollection = (id: string): void => {
  const created = getCreatedCollection().filter(p => p.id !== id);
  writeJson(COLLECTION_CREATED_KEY, created);
};

// Favorite palettes
export const addFavoriteToCollection = (palette: Palette): void => {
  const favorites = readJson<CollectionPalette[]>(COLLECTION_FAVORITES_KEY, []);
  const toStore: CollectionPalette = {
    id: palette.id,
    name: palette.name,
    colors: palette.colors,
    type: 'favorite',
    dateCreated: new Date().toISOString(),
    source: palette.source,
  };
  // de-duplicate by id
  writeJson(COLLECTION_FAVORITES_KEY, [...favorites.filter(p => p.id !== toStore.id), toStore]);
};

export const getFavoriteCollection = (): CollectionPalette[] => {
  return readJson<CollectionPalette[]>(COLLECTION_FAVORITES_KEY, []);
};

export const removeFavoriteFromCollection = (id: string): void => {
  const favorites = getFavoriteCollection().filter(p => p.id !== id);
  writeJson(COLLECTION_FAVORITES_KEY, favorites);
};

// Combined
export const getAllCollectionPalettes = (): CollectionPalette[] => {
  const created = getCreatedCollection();
  const favorites = getFavoriteCollection();
  return [...created, ...favorites];
};