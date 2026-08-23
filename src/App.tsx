import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShopByPurpose } from './components/ShopByPurpose';
import { FeaturedProduct } from './components/FeaturedProduct';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { AboutPage } from './components/about/AboutPage';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, CategoryFilter } from './types/store';
import { Search, RotateCcw } from 'lucide-react';
import gsap from 'gsap';

export const App: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const catalogRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // 1. Mount effect: load theme & wishlist from localStorage safely on client side (prevents SSR hydration error)
  useEffect(() => {
    setMounted(true);
    try {
      // Load saved theme
      const savedTheme = localStorage.getItem('krishnastores_theme') as 'light' | 'dark' | null;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }

      // Load saved wishlist
      const savedWishlist = localStorage.getItem('krishnastores_wishlist');
      if (savedWishlist) {
        setWishlistIds(JSON.parse(savedWishlist));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // 2. Toggle Theme handler
  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem('krishnastores_theme', nextTheme);
    } catch (e) {
      console.error(e);
    }
  };

  // 3. Sync wishlist to localStorage when wishlistIds change (after mount)
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('krishnastores_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds, mounted]);

  // 4. Handle URL Hash & Route Navigation (e.g. #product-slug or #about or /about)
  useEffect(() => {
    const handleHashAndRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash.replace('#', '');

      if (path === '/about' || hash === 'about') {
        setActiveCategory('about');
        setSelectedProduct(null);
        return;
      }

      if (hash.startsWith('product-')) {
        const slug = hash.replace('product-', '');
        const found = PRODUCTS.find((p) => p.slug === slug);
        if (found) {
          setSelectedProduct(found);
          return;
        }
      }
      if (hash === 'books') setActiveCategory('book');
      else if (hash === 'games') setActiveCategory('game');
      else if (hash === 'web') setActiveCategory('web');
      else if (hash === 'all') setActiveCategory('all');
    };

    handleHashAndRoute();
    window.addEventListener('hashchange', handleHashAndRoute);
    return () => window.removeEventListener('hashchange', handleHashAndRoute);
  }, []);

  // Filter products by category & search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCat = activeCategory === 'all' || p.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // GSAP animation when filtered products list updates
  useEffect(() => {
    if (!gridRef.current || !gridRef.current.children.length) return;
    gsap.fromTo(
      gridRef.current.children,
      { y: 25, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.06, ease: 'power2.out' }
    );
  }, [filteredProducts]);

  // Toggle Wishlist handler
  const handleToggleWishlist = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    if (wishlistIds.includes(product.id)) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      setToastMessage(`Removed "${product.title}" from wishlist`);
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      setToastMessage(`✓ Saved "${product.title}" to wishlist`);
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    window.location.hash = `product-${product.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStore = () => {
    setSelectedProduct(null);
    setActiveCategory('all');
    window.location.hash = '';
  };

  const handleCategorySelect = (category: CategoryFilter) => {
    setActiveCategory(category);
    setSelectedProduct(null);
    window.location.hash = category;
    if (category !== 'about' && catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  const featuredProduct = PRODUCTS.find((p) => p.featured) || PRODUCTS[1];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}>
      {/* Navigation */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={handleCategorySelect}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (selectedProduct) setSelectedProduct(null);
          if (activeCategory === 'about') setActiveCategory('all');
        }}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setWishlistOpen(true)}
        onGoHome={handleBackToStore}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main View Router */}
      <main style={{ flex: 1 }}>
        {selectedProduct ? (
          <ProductDetailsPage
            product={selectedProduct}
            allProducts={PRODUCTS}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={handleSelectProduct}
            onBackToStore={handleBackToStore}
            onSelectCategory={handleCategorySelect}
          />
        ) : activeCategory === 'about' ? (
          <AboutPage
            onSelectProduct={handleSelectProduct}
            onSelectCategory={handleCategorySelect}
          />
        ) : (
          <>
            {/* Storefront Hero */}
            <Hero
              onExploreClick={() => {
                if (catalogRef.current) {
                  catalogRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />

            {/* Shop By Purpose */}
            <ShopByPurpose onSelectCategory={handleCategorySelect} />

            {/* Featured Product Spotlight */}
            <FeaturedProduct
              product={featuredProduct}
              isWishlisted={wishlistIds.includes(featuredProduct.id)}
              onToggleWishlist={handleToggleWishlist}
              onSelectProduct={handleSelectProduct}
            />

            {/* Main Product Catalog Index */}
            <section ref={catalogRef} style={{ padding: '3.5rem 0 4.5rem 0', backgroundColor: 'var(--bg-main)' }}>
              <div className="container">
                {/* Section Header & Category Filter Tabs */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--primary)', textTransform: 'uppercase' }}>
                      EXPLORE CATALOG
                    </span>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
                      ALL PRODUCTS ({filteredProducts.length})
                    </h2>
                  </div>

                  {/* Filter Pills */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => handleCategorySelect('all')}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        backgroundColor: activeCategory === 'all' ? 'var(--primary)' : 'var(--bg-secondary)',
                        color: activeCategory === 'all' ? '#FFFFFF' : 'var(--text-muted)',
                        border: '1px solid',
                        borderColor: activeCategory === 'all' ? 'var(--primary)' : 'var(--border-color)',
                        transition: 'all 0.2s'
                      }}
                    >
                      ALL PRODUCTS (08)
                    </button>
                    <button
                      onClick={() => handleCategorySelect('book')}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        backgroundColor: activeCategory === 'book' ? 'var(--primary)' : 'var(--bg-secondary)',
                        color: activeCategory === 'book' ? '#FFFFFF' : 'var(--text-muted)',
                        border: '1px solid',
                        borderColor: activeCategory === 'book' ? 'var(--primary)' : 'var(--border-color)',
                        transition: 'all 0.2s'
                      }}
                    >
                      BOOKSTORE (04)
                    </button>
                    <button
                      onClick={() => handleCategorySelect('game')}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        backgroundColor: activeCategory === 'game' ? 'var(--primary)' : 'var(--bg-secondary)',
                        color: activeCategory === 'game' ? '#FFFFFF' : 'var(--text-muted)',
                        border: '1px solid',
                        borderColor: activeCategory === 'game' ? 'var(--primary)' : 'var(--border-color)',
                        transition: 'all 0.2s'
                      }}
                    >
                      GAMESTORE (02)
                    </button>
                    <button
                      onClick={() => handleCategorySelect('web')}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        backgroundColor: activeCategory === 'web' ? 'var(--primary)' : 'var(--bg-secondary)',
                        color: activeCategory === 'web' ? '#FFFFFF' : 'var(--text-muted)',
                        border: '1px solid',
                        borderColor: activeCategory === 'web' ? 'var(--primary)' : 'var(--border-color)',
                        transition: 'all 0.2s'
                      }}
                    >
                      WEBSTORE (02)
                    </button>
                  </div>
                </div>

                {/* Product Grid */}
                {filteredProducts.length === 0 ? (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '4rem 1rem',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: '16px',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <Search size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>NO PRODUCT FOUND</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.5rem 0 1.5rem 0' }}>
                      No matching products for "{searchQuery}".
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('all');
                      }}
                      className="btn-primary"
                    >
                      <RotateCcw size={16} /> RESET STORE
                    </button>
                  </div>
                ) : (
                  <div
                    ref={gridRef}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                      gap: '1.75rem'
                    }}
                  >
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isWishlisted={wishlistIds.includes(product.id)}
                        onToggleWishlist={handleToggleWishlist}
                        onSelectProduct={handleSelectProduct}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistItems={wishlistProducts}
        onRemoveItem={(id) => {
          const prod = PRODUCTS.find((p) => p.id === id);
          setWishlistIds((prev) => prev.filter((item) => item !== id));
          if (prod) setToastMessage(`Removed "${prod.title}" from wishlist`);
        }}
        onSelectProduct={handleSelectProduct}
      />

      {/* Toast Feedback */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Footer */}
      <Footer />
    </div>
  );
};
