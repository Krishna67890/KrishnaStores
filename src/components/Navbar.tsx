import React, { useState } from 'react';
import { ShoppingBag, Search, Heart, Menu, X, BookOpen, Gamepad2, Code2, Layers, Sun, Moon, Info } from 'lucide-react';
import { CategoryFilter } from '../types/store';

interface NavbarProps {
  activeCategory: CategoryFilter;
  onSelectCategory: (category: CategoryFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onGoHome: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  wishlistCount,
  onOpenWishlist,
  onGoHome,
  theme,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const handleNavClick = (cat: CategoryFilter) => {
    onSelectCategory(cat);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 8000,
        backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        {/* Brand Logo Link */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onGoHome();
          }}
          aria-label="KrishnaElite home"
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
        >
          <img
            src="/important/KrishnaStores logo.png"
            alt="KRISHNA STORES"
            className="krishna-logo"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav">
          <button
            onClick={() => handleNavClick('all')}
            style={{
              fontSize: '0.9rem',
              fontWeight: activeCategory === 'all' ? 700 : 600,
              color: activeCategory === 'all' ? 'var(--primary)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.15s'
            }}
          >
            <Layers size={16} /> Home
          </button>
          <button
            onClick={() => handleNavClick('book')}
            style={{
              fontSize: '0.9rem',
              fontWeight: activeCategory === 'book' ? 700 : 600,
              color: activeCategory === 'book' ? 'var(--primary)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.15s'
            }}
          >
            <BookOpen size={16} /> Bookstore (04)
          </button>
          <button
            onClick={() => handleNavClick('roblox')}
            style={{
              fontSize: '0.9rem',
              fontWeight: activeCategory === 'roblox' ? 700 : 600,
              color: activeCategory === 'roblox' ? 'var(--primary)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.15s'
            }}
          >
            <Gamepad2 size={16} /> Games (03)
          </button>
          <button
            onClick={() => handleNavClick('web')}
            style={{
              fontSize: '0.9rem',
              fontWeight: activeCategory === 'web' ? 700 : 600,
              color: activeCategory === 'web' ? 'var(--primary)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.15s'
            }}
          >
            <Code2 size={16} /> Web Dev (02)
          </button>
          <button
            onClick={() => handleNavClick('about')}
            style={{
              fontSize: '0.9rem',
              fontWeight: activeCategory === 'about' ? 700 : 600,
              color: activeCategory === 'about' ? 'var(--primary)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.15s'
            }}
          >
            <Info size={16} /> About
          </button>
        </nav>

        {/* Actions: Search, Wishlist & Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Search Box */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              width: searchFocused || searchQuery ? '200px' : '150px',
              transition: 'width 0.2s ease'
            }}
            className="search-input-wrapper"
          >
            <Search
              size={16}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }}
            />
            <input
              type="text"
              placeholder="Search store..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                width: '100%',
                padding: '0.45rem 0.75rem 0.45rem 2.25rem',
                fontSize: '0.85rem',
                borderRadius: '9999px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-main)',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
            />
          </div>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.45rem 0.85rem',
              borderRadius: '9999px',
              border: '1px solid var(--border-color)',
              backgroundColor: wishlistCount > 0 ? '#FEF2F2' : 'var(--bg-card)',
              color: wishlistCount > 0 ? '#EF4444' : 'var(--text-muted)',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
            aria-label="Wishlist"
          >
            <Heart size={16} fill={wishlistCount > 0 ? '#EF4444' : 'none'} color={wishlistCount > 0 ? '#EF4444' : 'var(--text-muted)'} />
            <span className="wishlist-label">Wishlist</span>
            {wishlistCount > 0 && (
              <span
                style={{
                  backgroundColor: '#EF4444',
                  color: '#FFFFFF',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={onToggleTheme}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={18} color="#F59E0B" /> : <Moon size={18} color="#475569" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              padding: '6px',
              color: 'var(--text-main)'
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
        >
          <button
            onClick={() => handleNavClick('all')}
            style={{
              padding: '10px 0',
              fontSize: '1rem',
              fontWeight: activeCategory === 'all' ? 700 : 600,
              color: activeCategory === 'all' ? 'var(--primary)' : 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Layers size={18} /> Home
          </button>
          <button
            onClick={() => handleNavClick('book')}
            style={{
              padding: '10px 0',
              fontSize: '1rem',
              fontWeight: activeCategory === 'book' ? 700 : 600,
              color: activeCategory === 'book' ? 'var(--primary)' : 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <BookOpen size={18} /> Bookstore (04)
          </button>
          <button
            onClick={() => handleNavClick('roblox')}
            style={{
              padding: '10px 0',
              fontSize: '1rem',
              fontWeight: activeCategory === 'roblox' ? 700 : 600,
              color: activeCategory === 'roblox' ? 'var(--primary)' : 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Gamepad2 size={18} /> Games (03)
          </button>
          <button
            onClick={() => handleNavClick('web')}
            style={{
              padding: '10px 0',
              fontSize: '1rem',
              fontWeight: activeCategory === 'web' ? 700 : 600,
              color: activeCategory === 'web' ? 'var(--primary)' : 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Code2 size={18} /> Webstore (02)
          </button>
          <button
            onClick={() => handleNavClick('about')}
            style={{
              padding: '10px 0',
              fontSize: '1rem',
              fontWeight: activeCategory === 'about' ? 700 : 600,
              color: activeCategory === 'about' ? 'var(--primary)' : 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Info size={18} /> About
          </button>
          <button
            onClick={() => {
              onToggleTheme();
              setMobileMenuOpen(false);
            }}
            style={{
              padding: '10px 0',
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              borderTop: '1px solid var(--border-color)',
              marginTop: '6px'
            }}
          >
            {theme === 'dark' ? <Sun size={18} color="#F59E0B" /> : <Moon size={18} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .search-input-wrapper { width: 120px !important; }
          .wishlist-label { display: none; }
        }
      `}</style>
    </header>
  );
};
