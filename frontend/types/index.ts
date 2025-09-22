export interface PaletteCardProps {
  palette: Palette;
  onColorCopy?: (color: string) => void;
  onAddToFavorites?: (palette: Palette) => void;
  onRemoveFromFavorites?: (paletteId: string) => void;
  isFavorite?: boolean;
}

export interface ColorSquareProps {
  color: string;
  size?: 'small' | 'large'
}

export interface Palette {
  id: string;
  name: string;
  colors: string[];
  source?: string;
}

export interface HeaderProps {
  activeLink?: 'Home'| "Collection" | "Create" | "About us";
  profileImage?: string;
  onLinkClick?: (link: string) => void;
}

export interface AboutSectionProps {
  icon: React.ReactNode;
  title: string;
  text: string;
  reverse?: boolean;
}

export interface FloatingIconProps {
  children: React.ReactNode;
  delay?: number;
}

export interface CollectionPalette {
  id: string;
  name: string;
  colors: string[];
  source?: string;
  type: 'created' | 'favorite';
  dateCreated: string;
  tags?: string[];
}

export interface CreatePalette {
  id: string;
  name: string;
  colors: string[];
  source?: string;
  type: 'created' | 'favorite';
  dateCreated: string;
  tags?: string[];
}

export interface ColorPalette {
  id: string;
  name: string;
  style: string;
  colors: string[];
  dateCreated: string;
}

export interface CollectionPaletteCardProps {
  palette: CollectionPalette;
  onColorCopy?: (color: string) => void;
  onRemoveFromCollection?: (paletteId: string) => void;
  onEditPalette?: (paletteId: string) => void;
}

export interface CollectionSearchFilters {
  query: string;
  type: 'all' | 'created' | 'favorite';
  dateRange: 'all' | 'today' | 'week' | 'month' | 'year';
  tags: string[];
}

export interface CopyNotificationProps {
  show: boolean;
  color: string;
}

export interface CollectionSearchAndFilterProps {
  filters: CollectionSearchFilters;
  onFiltersChange: (filters: CollectionSearchFilters) => void;
  availableTags: string[];
}