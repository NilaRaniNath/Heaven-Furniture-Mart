import React, { createContext, useContext, useState } from 'react';

// Shared collections catalog data so both Collections component & Favorites Modal have access to full item details
export const collectionsData = [
  {
    id: 'lounge-office',
    category: 'office',
    title: 'Outdoor & Lounge Chair',
    subtitle: 'Ergonomic Teak & Accent Loungers',
    description: 'Precision-carved solid teak lounge armchairs designed for executive balconies, lounges, and modern patios.',
    image: '/assets/chair table.jpg',
    gallery: ['/assets/chair table.jpg', '/assets/Office chair table.jpg', '/assets/Office chair.jpg'],
    pieces: '18 Bespoke Models',
    featured: true,
    bentoType: 'top-left',
    specs: {
      material: '100% Solid Seasoned Teak',
      finish: 'Weather-resistant Satin Polish',
      warranty: '10 Years Frame Guarantee',
      leadTime: '7 - 14 Days'
    }
  },
  {
    id: 'modern-couches',
    category: 'living',
    title: 'Modern Couches',
    subtitle: 'Deep-Seating Luxury Sofas',
    description: 'Plush multi-layered density foam wrapped in premium Italian velvet and sturdy teak structural framing.',
    image: '/assets/Sufa.jpg',
    gallery: ['/assets/Sufa.jpg', '/assets/Sufa (2).jpg', '/assets/Sufa (3).jpg', '/assets/sufa (5).jpg'],
    pieces: '24 Tailored Configurations',
    featured: true,
    bentoType: 'bottom-left',
    specs: {
      material: 'Chittagong Teak & Velvet Upholstery',
      finish: 'Custom Hand-rubbed Oil',
      warranty: '12 Years Structural Support',
      leadTime: '10 - 18 Days'
    }
  },
  {
    id: 'dining-masterpiece',
    category: 'dining',
    title: 'Grand Dining Suites',
    subtitle: 'Single-Slab Timber Tables & Sideboards',
    description: 'Architectural single-slab timber dining tables built to serve as the heart of family celebrations and dinner parties.',
    image: '/assets/Dinning table.jpg',
    gallery: ['/assets/Dinning table.jpg', '/assets/Dinning chair-table.jpg', '/assets/Dinning table (2).jpg', '/assets/Dinning table (3).jpg'],
    pieces: '14 Statement Sets',
    featured: true,
    bentoType: 'right-tall',
    specs: {
      material: 'Heavy Timber & Teak Wood',
      finish: 'Matte Polyurethane Protective Shield',
      warranty: '15 Years Guarantee',
      leadTime: '12 - 20 Days'
    }
  },
  {
    id: 'sanctuary-bedroom',
    category: 'bedroom',
    title: 'Sanctuary Bedsteads',
    subtitle: 'King & Queen Bed Sets',
    description: 'Solid wood bed frames featuring integrated headboard lighting, under-bed storage drawers, and hand-stitched leatherette cushions.',
    image: '/assets/Bed 2.jpg',
    gallery: ['/assets/Bed 2.jpg', '/assets/Bed.jpg'],
    pieces: '16 Luxury Designs',
    featured: false,
    bentoType: 'standard',
    specs: {
      material: 'Solid Burma Teak & Walnut Accents',
      finish: 'Honey Teak Satin Coating',
      warranty: '15 Years Frame Warranty',
      leadTime: '14 - 21 Days'
    }
  },
  {
    id: 'dressing-suite',
    category: 'dressing',
    title: 'Dressing Tables & Vanities',
    subtitle: 'Mirrored Vanity Units & Jewelry Organizers',
    description: 'Elegantly proportioned dressing tables with warm LED mirrors, velvet-lined drawers, and matching solid wood stools.',
    image: '/assets/Dressing Table.jpg',
    gallery: ['/assets/Dressing Table.jpg', '/assets/Dressing Table (2).jpg'],
    pieces: '10 Vanity Models',
    featured: false,
    bentoType: 'standard',
    specs: {
      material: 'Seasoned Teak & Frameless Mirror',
      finish: 'Warm Gold & Wood Grain Polish',
      warranty: '10 Years Guarantee',
      leadTime: '7 - 12 Days'
    }
  },
  {
    id: 'custom-wardrobes',
    category: 'dressing',
    title: 'Modular Wardrobes',
    subtitle: 'Walk-in Closets & High Armoires',
    description: 'Custom-built full height wardrobes featuring soft-closing drawers, integrated tie racks, and solid teak sliding doors.',
    image: '/assets/wardrove.jpg',
    gallery: ['/assets/wardrove.jpg', '/assets/wardrove (2).jpg'],
    pieces: '12 Closet Modules',
    featured: false,
    bentoType: 'standard',
    specs: {
      material: 'Waterproof Solid Teak & Plywood Core',
      finish: 'Natural Teak Melamine Gloss',
      warranty: '15 Years Hardware Warranty',
      leadTime: '14 - 25 Days'
    }
  }
];

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((itemId) => itemId !== id));
  };

  const clearFavorites = () => setFavorites([]);

  const favoritedProducts = collectionsData.filter((item) =>
    favorites.includes(item.id)
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoritedProducts,
        toggleFavorite,
        isFavorite,
        removeFavorite,
        clearFavorites,
        isFavoritesOpen,
        setIsFavoritesOpen,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
