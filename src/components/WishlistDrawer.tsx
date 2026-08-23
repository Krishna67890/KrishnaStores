import React from 'react';
import { X, Heart, ExternalLink, ArrowRight } from 'lucide-react';
import { Product } from '../types/store';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveItem: (id: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveItem,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(4px)'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '100%',
          backgroundColor: 'var(--bg-card)',
          color: 'var(--text-main)',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          transition: 'background-color 0.3s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={20} fill="#EF4444" color="#EF4444" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
              Saved Wishlist ({wishlistItems.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: '8px',
              color: 'var(--text-muted)',
              transition: 'background 0.2s'
            }}
            aria-label="Close wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {/* List Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          {wishlistItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <Heart size={48} color="var(--text-light)" style={{ marginBottom: '1rem' }} />
              <p style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-main)' }}>Your wishlist is empty</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                Click the heart icon on any product card to save it for later.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {wishlistItems.map((product) => (
                <div
                  key={product.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    backgroundColor: 'var(--bg-secondary)',
                    position: 'relative'
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      width: '70px',
                      height: '70px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      backgroundColor: 'var(--border-color)'
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        color: 'var(--primary)',
                        textTransform: 'uppercase'
                      }}
                    >
                      {product.categoryLabel}
                    </span>
                    <h4
                      className="line-clamp-1"
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        margin: '2px 0 4px 0',
                        color: 'var(--text-main)',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                    >
                      {product.title}
                    </h4>
                    <p style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {product.priceDisplay}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <button
                      onClick={() => onRemoveItem(product.id)}
                      style={{ color: 'var(--text-muted)', padding: '2px', cursor: 'pointer' }}
                      title="Remove"
                    >
                      <X size={16} />
                    </button>
                    <button
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px'
                      }}
                    >
                      View <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
