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
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'name'>('recommended');

  const catalogRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // 1. Mount effect: load theme & wishlist from localStorage safely on client side
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

  // 4. Handle URL Hash & Route Navigation (e.g. /products/[slug] or #product-slug or #about or /about)
  useEffect(() => {
    const handleHashAndRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash.replace('#', '');

      if (path === '/about' || hash === 'about') {
        setActiveCategory('about');
        setSelectedProduct(null);
        return;
      }

      // Check pathname for /products/[slug], /book/[slug], /game/[slug], /website-store/[slug]
      const matchProductPath = path.match(/^\/(?:products|book|game|website-store)\/([^/]+)/);
      if (matchProductPath && matchProductPath[1]) {
        const slug = matchProductPath[1];
        const found = PRODUCTS.find((p) => p.slug === slug || p.id === slug);
        if (found) {
          setSelectedProduct(found);
          return;
        }
      }

      if (hash.startsWith('product-')) {
        const slug = hash.replace('product-', '');
        const found = PRODUCTS.find((p) => p.slug === slug || p.id === slug);
        if (found) {
          setSelectedProduct(found);
          return;
        }
      }

      if (hash === 'books' || hash === 'book') setActiveCategory('book');
      else if (hash === 'games' || hash === 'game') setActiveCategory('game');
      else if (hash === 'web') setActiveCategory('web');
      else if (hash === 'all') setActiveCategory('all');
    };

    handleHashAndRoute();
    window.addEventListener('hashchange', handleHashAndRoute);
    window.addEventListener('popstate', handleHashAndRoute);
    return () => {
      window.removeEventListener('hashchange', handleHashAndRoute);
      window.removeEventListener('popstate', handleHashAndRoute);
    };
  }, []);

  // Filter & sort products by category, search query, and sortBy
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
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

    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => (a.priceINR || a.price || 0) - (b.priceINR || b.price || 0));
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => (b.priceINR || b.price || 0) - (a.priceINR || a.price || 0));
    } else if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

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
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', `/products/${product.slug}`);
    }
    window.location.hash = `product-${product.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStore = () => {
    setSelectedProduct(null);
    setActiveCategory('all');
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', '/');
    }
    window.location.hash = '';
  };

  const handleCategorySelect = (category: CategoryFilter) => {
    setActiveCategory(category);
    setSelectedProduct(null);
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', category === 'all' ? '/' : `#${category}`);
    }
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
                      {activeCategory === 'roblox' || activeCategory === 'game'
                        ? "All Games BY Krishna Ajaysing Patil but now we are adding Roblox Games by Krishna Ajaysing Patil"
                        : "EXPLORE CATALOG"}
                    </span>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
                      {activeCategory === 'all' ? 'ALL PRODUCTS' :
                       activeCategory === 'book' ? 'BOOKSTORE' :
                       activeCategory === 'game' ? 'OFFLINE GAMES' :
                       activeCategory === 'roblox' ? 'ONLINE ROBLOX GAMES' :
                       activeCategory === 'web' ? 'WEBSTORE' : 'PRODUCTS'} ({filteredProducts.length})
                    </h2>
                  </div>

                  {/* Filter Pills & Sorting */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      {[
                        { key: 'all', label: 'ALL PRODUCTS', count: PRODUCTS.length },
                        { key: 'book', label: 'BOOKSTORE', count: PRODUCTS.filter((p) => p.category === 'book').length },
                        { key: 'game', label: 'OFFLINE GAMES', count: PRODUCTS.filter((p) => p.category === 'game').length },
                        { key: 'roblox', label: 'ONLINE GAMES', count: PRODUCTS.filter((p) => p.category === 'roblox').length },
                        { key: 'web', label: 'WEBSTORE', count: PRODUCTS.filter((p) => p.category === 'web').length },
                      ].map((pill) => (
                        <button
                          key={pill.key}
                          onClick={() => handleCategorySelect(pill.key as CategoryFilter)}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '9999px',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            backgroundColor: activeCategory === pill.key ? 'var(--primary)' : 'var(--bg-secondary)',
                            color: activeCategory === pill.key ? '#FFFFFF' : 'var(--text-muted)',
                            border: '1px solid',
                            borderColor: activeCategory === pill.key ? 'var(--primary)' : 'var(--border-color)',
                            transition: 'all 0.2s',
                            cursor: 'pointer'
                          }}
                        >
                          {pill.label} ({pill.count < 10 ? `0${pill.count}` : pill.count})
                        </button>
                      ))}
                    </div>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      aria-label="Sort products"
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        backgroundColor: 'var(--bg-secondary)',
                        color: 'var(--text-main)',
                        border: '1px solid var(--border-color)',
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                    >
                      <option value="recommended">Recommended</option>
                      <option value="price-low">Price: Low → High</option>
                      <option value="price-high">Price: High → Low</option>
                      <option value="name">A → Z</option>
                    </select>
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
