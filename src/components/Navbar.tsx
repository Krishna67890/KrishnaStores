import React, { useState } from 'react';
import { ShoppingBag, Search, Heart, Menu, X, BookOpen, Gamepad2, Code2, Layers, Sun, Moon, Info, Sparkles, User, LogOut, ChevronDown, UserPlus, ShieldCheck } from 'lucide-react';
import { CategoryFilter } from '../types/store';
import { useAuthStore } from '../store/useAuthStore';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

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

const UserAccountControl: React.FC<{ theme: string }> = ({ theme }) => {
  const { user, isAuthenticated, loading } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const navigateTo = (url: string) => {
    window.history.pushState(null, '', url);
    window.dispatchEvent(new Event('popstate'));
  };

  if (loading) {
    return (
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', padding: '0.4rem 0.8rem' }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <a
          href="/login"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('/login');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '0.4rem 0.85rem',
            borderRadius: '9999px',
            backgroundColor: 'var(--primary)',
            color: '#FFFFFF',
            fontSize: '0.82rem',
            fontWeight: 700,
            textDecoration: 'none',
            transition: 'all 0.2s',
            boxShadow: '0 2px 8px rgba(37,99,235,0.25)'
          }}
        >
          <User size={15} />
          <span>Login</span>
        </a>

        <a
          href="/register"
          onClick={(e) => {
            e.preventDefault();
            navigateTo('/register');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '0.4rem 0.85rem',
            borderRadius: '9999px',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-main)',
            fontSize: '0.82rem',
            fontWeight: 700,
            textDecoration: 'none',
            transition: 'all 0.2s'
          }}
        >
          <UserPlus size={15} />
          <span>Register</span>
        </a>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 10px 4px 4px',
          borderRadius: '9999px',
          border: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-card)',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
        }}
      >
        <img
          src={user.photoURL || (user.gender === 'girl' ? '/assets/girl.png' : '/assets/boy.png')}
          alt={user.displayName}
          style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--primary)' }}
        />
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {user.displayName.split(' ')[0]}
        </span>
        <ChevronDown size={14} color="var(--text-muted)" />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            width: '190px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)',
            padding: '8px',
            zIndex: 9000
          }}
        >
          <div style={{ padding: '8px 12px 10px 12px', borderBottom: '1px solid var(--border-color)', marginBottom: '6px' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.displayName}
            </p>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '2px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user.email}
            </p>
          </div>

          <a
            href="/account"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--text-main)',
              textDecoration: 'none',
              transition: 'background 0.2s'
            }}
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              navigateTo('/account');
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <User size={16} /> My Account
          </a>

          {user.role === 'admin' && (
            <a
              href="/admin"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--primary)',
                textDecoration: 'none',
                transition: 'background 0.2s'
              }}
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                navigateTo('/admin');
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <ShieldCheck size={16} /> Admin Panel
            </a>
          )}

          <button
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#EF4444',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'background 0.2s'
            }}
            onClick={async () => {
              await signOut(auth);
              useAuthStore.getState().logout();
              setIsOpen(false);
              navigateTo('/login');
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.08)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

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
  const { user, isAuthenticated } = useAuthStore();

  const handleNavClick = (cat: CategoryFilter) => {
    onSelectCategory(cat);
    setMobileMenuOpen(false);
  };

  const navigateTo = (url: string) => {
    window.history.pushState(null, '', url);
    window.dispatchEvent(new Event('popstate'));
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
        
        {/* Left Section: Logo & Account Control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onGoHome();
            }}
            aria-label="KrishnaStores home"
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          >
            <img
              src="/important/KrishnaStores logo.png"
              alt="KRISHNA STORES"
              className="krishna-logo"
            />
          </a>

          {/* Account Control on LEFT side of navbar */}
          <div className="desktop-account-left">
            <UserAccountControl theme={theme} />
          </div>
        </div>

        {/* Center Section: Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }} className="desktop-nav">
          <button
            onClick={() => handleNavClick('all')}
            style={{
              fontSize: '0.88rem',
              fontWeight: activeCategory === 'all' ? 700 : 600,
              color: activeCategory === 'all' ? 'var(--primary)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'color 0.15s'
            }}
          >
            <Layers size={15} /> Home
          </button>
          <button
            onClick={() => handleNavClick('book')}
            style={{
              fontSize: '0.88rem',
              fontWeight: activeCategory === 'book' ? 700 : 600,
              color: activeCategory === 'book' ? 'var(--primary)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'color 0.15s'
            }}
          >
            <BookOpen size={15} /> Bookstore
          </button>
          <button
            onClick={() => handleNavClick('roblox')}
            style={{
              fontSize: '0.88rem',
              fontWeight: activeCategory === 'roblox' ? 700 : 600,
              color: activeCategory === 'roblox' ? 'var(--primary)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'color 0.15s'
            }}
          >
            <Gamepad2 size={15} /> GameStore
          </button>
          <button
            onClick={() => handleNavClick('web')}
            style={{
              fontSize: '0.88rem',
              fontWeight: activeCategory === 'web' ? 700 : 600,
              color: activeCategory === 'web' ? 'var(--primary)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'color 0.15s'
            }}
          >
            <Code2 size={15} /> WebStore
          </button>
          <button
            onClick={() => handleNavClick('personal')}
            style={{
              fontSize: '0.88rem',
              fontWeight: activeCategory === 'personal' ? 700 : 600,
              color: activeCategory === 'personal' ? 'var(--primary)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'color 0.15s'
            }}
          >
            <Sparkles size={15} /> PersonalStore
          </button>
          <button
            onClick={() => handleNavClick('about')}
            style={{
              fontSize: '0.88rem',
              fontWeight: activeCategory === 'about' ? 700 : 600,
              color: activeCategory === 'about' ? 'var(--primary)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'color 0.15s'
            }}
          >
            <Info size={15} /> About
          </button>
        </nav>

        {/* Right Section: Search, Wishlist & Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Search Box */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              width: searchFocused || searchQuery ? '190px' : '140px',
              transition: 'width 0.2s ease'
            }}
            className="search-input-wrapper"
          >
            <Search
              size={15}
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
                padding: '0.45rem 0.75rem 0.45rem 2.2rem',
                fontSize: '0.83rem',
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
              fontSize: '0.83rem',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
            aria-label="Wishlist"
          >
            <Heart size={15} fill={wishlistCount > 0 ? '#EF4444' : 'none'} color={wishlistCount > 0 ? '#EF4444' : 'var(--text-muted)'} />
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
              width: '36px',
              height: '36px',
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
            {theme === 'dark' ? <Sun size={17} color="#F59E0B" /> : <Moon size={17} color="#475569" />}
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
          {/* Account status info for mobile */}
          <div style={{ paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>
            {isAuthenticated && user ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={user.photoURL || (user.gender === 'girl' ? '/assets/girl.png' : '/assets/boy.png')}
                    alt={user.displayName}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <p style={{ fontSize: '0.9rem', fontWeight: 800, margin: 0 }}>{user.displayName}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('/account')}
                  style={{ padding: '4px 10px', borderRadius: '6px', backgroundColor: 'var(--primary)', color: '#FFF', fontSize: '0.75rem', fontWeight: 700, border: 'none' }}
                >
                  Account
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => navigateTo('/login')}
                  style={{ flex: 1, padding: '8px', borderRadius: '8px', backgroundColor: 'var(--primary)', color: '#FFF', fontWeight: 700, fontSize: '0.85rem', border: 'none' }}
                >
                  Login
                </button>
                <button
                  onClick={() => navigateTo('/register')}
                  style={{ flex: 1, padding: '8px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-main)', fontWeight: 700, fontSize: '0.85rem' }}
                >
                  Register
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('all')}
            style={{
              padding: '8px 0',
              fontSize: '0.95rem',
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
              padding: '8px 0',
              fontSize: '0.95rem',
              fontWeight: activeCategory === 'book' ? 700 : 600,
              color: activeCategory === 'book' ? 'var(--primary)' : 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <BookOpen size={18} /> BookStore
          </button>
          <button
            onClick={() => handleNavClick('roblox')}
            style={{
              padding: '8px 0',
              fontSize: '0.95rem',
              fontWeight: activeCategory === 'roblox' ? 700 : 600,
              color: activeCategory === 'roblox' ? 'var(--primary)' : 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Gamepad2 size={18} /> GameStore
          </button>
          <button
            onClick={() => handleNavClick('web')}
            style={{
              padding: '8px 0',
              fontSize: '0.95rem',
              fontWeight: activeCategory === 'web' ? 700 : 600,
              color: activeCategory === 'web' ? 'var(--primary)' : 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Code2 size={18} /> WebStore
          </button>
          <button
            onClick={() => handleNavClick('personal')}
            style={{
              padding: '8px 0',
              fontSize: '0.95rem',
              fontWeight: activeCategory === 'personal' ? 700 : 600,
              color: activeCategory === 'personal' ? 'var(--primary)' : 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Sparkles size={18} /> PersonalStore
          </button>
          <button
            onClick={() => handleNavClick('about')}
            style={{
              padding: '8px 0',
              fontSize: '0.95rem',
              fontWeight: activeCategory === 'about' ? 700 : 600,
              color: activeCategory === 'about' ? 'var(--primary)' : 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Info size={18} /> About
          </button>

          {isAuthenticated && user && (
            <button
              onClick={async () => {
                await signOut(auth);
                useAuthStore.getState().logout();
                setMobileMenuOpen(false);
                navigateTo('/login');
              }}
              style={{
                padding: '10px 0',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#EF4444',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                borderTop: '1px solid var(--border-color)',
                marginTop: '6px'
              }}
            >
              <LogOut size={18} /> Logout
            </button>
          )}

          <button
            onClick={() => {
              onToggleTheme();
              setMobileMenuOpen(false);
            }}
            style={{
              padding: '10px 0',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              borderTop: isAuthenticated ? 'none' : '1px solid var(--border-color)'
            }}
          >
            {theme === 'dark' ? <Sun size={18} color="#F59E0B" /> : <Moon size={18} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .desktop-account-left { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .search-input-wrapper { width: 130px !important; }
          .wishlist-label { display: none; }
        }
      `}</style>
    </header>
  );
};
