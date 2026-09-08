import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Heart,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Info,
  BookOpen,
  Gamepad2,
  Code2,
  ChevronRight,
  ChevronLeft,
  Zap,
  Clock,
  Award,
  XCircle,
  ChevronDown,
  Layers,
  ShoppingBag,
  ArrowRight,
  FileText,
  Loader2,
  Maximize2,
  X,
  Camera
} from 'lucide-react';
import { Product, CategoryFilter } from '../types/store';
import { ProductCard } from './ProductCard';
import gsap from 'gsap';
import { useCheckout } from '../hooks/useCheckout';
import { useAuthStore } from '../store/useAuthStore';
import { db } from '../lib/firebase';
import {
  collection, addDoc, serverTimestamp, query, where, getDocs,
  orderBy, updateDoc, doc, getDoc
} from 'firebase/firestore';

interface ProductDetailsPageProps {
  product: Product;
  allProducts: Product[];
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  onSelectProduct: (product: Product) => void;
  onBackToStore: () => void;
  onSelectCategory: (category: CategoryFilter) => void;
}

// --- Local Types ---
interface Review {
  id: string;
  userId: string;
  userDisplayName: string;
  userPhotoURL: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: any;
  status: 'pending' | 'approved' | 'rejected';
}

interface ProductComment {
  id: string;
  userId: string;
  userDisplayName: string;
  userPhotoURL: string;
  text: string;
  createdAt: any;
  replies?: ProductComment[];
  parentCommentId?: string;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  product,
  allProducts,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onBackToStore,
  onSelectCategory
}) => {
  const { user, isAuthenticated } = useAuthStore();
  const [activeImage, setActiveImage] = useState(product.image);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Advanced Photo Lightbox State
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryList = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % galleryList.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + galleryList.length) % galleryList.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, galleryList.length]);

  const { initiateCheckout, isLoading } = useCheckout();

  // Reviews & Comments State
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comments, setComments] = useState<ProductComment[]>([]);
  const [userReview, setUserReview] = useState<Partial<Review>>({ rating: 5, title: '', comment: '' });
  const [newComment, setNewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'community' | 'suggestions'>('details');
  const [stats, setStats] = useState({ avgRating: product.rating || 0, totalReviews: product.reviewsCount || 0 });

  const detailsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLImageElement>(null);

  // Fetch reviews and comments on mount
  useEffect(() => {
    if (db.app?.options?.apiKey !== "mock-key") {
      fetchReviews();
      fetchComments();
    }
  }, [product.id]);

  const fetchReviews = async () => {
    try {
      let snap;
      try {
        const q = query(
          collection(db, 'reviews'),
          where('productId', '==', product.id),
          where('status', '==', 'approved'),
          orderBy('createdAt', 'desc')
        );
        snap = await getDocs(q);
      } catch (err) {
        // Fallback for missing compound index
        const fallbackQ = query(
          collection(db, 'reviews'),
          where('productId', '==', product.id)
        );
        snap = await getDocs(fallbackQ);
      }
      const data = snap.docs
        .map(doc => ({ id: doc.id, ...doc.data() } as Review))
        .filter(r => r.status === 'approved' || !r.status);
      setReviews(data);

      if (data.length > 0) {
        const sum = data.reduce((acc, r) => acc + r.rating, 0);
        setStats({ avgRating: parseFloat((sum / data.length).toFixed(1)), totalReviews: data.length });
      }
    } catch (e) { console.error("Error fetching reviews", e); }
  };

  const fetchComments = async () => {
    try {
      let snap;
      try {
        const q = query(
          collection(db, 'products', product.id, 'comments'),
          orderBy('createdAt', 'desc')
        );
        snap = await getDocs(q);
      } catch (err) {
        const fallbackQ = collection(db, 'products', product.id, 'comments');
        snap = await getDocs(fallbackQ);
      }
      const allComments = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProductComment));

      const roots = allComments.filter(c => !c.parentCommentId);
      const withReplies = roots.map(root => ({
        ...root,
        replies: allComments.filter(c => c.parentCommentId === root.id).reverse()
      }));
      setComments(withReplies);
    } catch (e) { console.error("Error fetching comments", e); }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      alert("Please login to submit a review.");
      return;
    }
    if (!userReview.rating || userReview.rating < 1 || userReview.rating > 5) return;

    setIsSubmittingReview(true);
    try {
      const q = query(
        collection(db, 'reviews'),
        where('productId', '==', product.id),
        where('userId', '==', user.uid)
      );
      const existing = await getDocs(q);

      let isVerified = false;
      try {
        const orderQ = query(
          collection(db, 'orders'),
          where('userId', '==', user.uid),
          where('productId', '==', product.id)
        );
        const orderSnap = await getDocs(orderQ);
        if (!orderSnap.empty) {
          isVerified = true;
        }
      } catch (err) {
        console.warn("Verified purchase check failed:", err);
      }

      const reviewData = {
        productId: product.id,
        userId: user.uid,
        userDisplayName: user.displayName,
        userPhotoURL: user.photoURL || '',
        rating: userReview.rating,
        title: userReview.title,
        comment: userReview.comment,
        verifiedPurchase: isVerified,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'approved'
      };

      if (!existing.empty) {
        await updateDoc(doc(db, 'reviews', existing.docs[0].id), {
          ...reviewData,
          createdAt: existing.docs[0].data().createdAt
        });
      } else {
        await addDoc(collection(db, 'reviews'), reviewData);
      }

      setUserReview({ rating: 5, title: '', comment: '' });
      fetchReviews();
      alert("Thank you! Your review has been submitted.");
    } catch (e) {
      console.error(e);
      alert("Failed to submit review.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      alert("Please login to comment.");
      return;
    }
    if (!newComment.trim()) return;

    setIsSubmittingComment(true);
    try {
      await addDoc(collection(db, 'products', product.id, 'comments'), {
        userId: user.uid,
        userDisplayName: user.displayName,
        userPhotoURL: user.photoURL || '',
        text: newComment,
        parentCommentId: parentId || null,
        createdAt: serverTimestamp(),
      });
      setNewComment('');
      fetchComments();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    if (product.category === 'personal') {
      initiateCheckout(product);
    } else if (product.gumroadUrl) {
      window.open(product.gumroadUrl, '_blank');
    }
  };

  // 1. On product change: reset state, scroll to top, load recently viewed & animate
  useEffect(() => {
    setActiveImage(product.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Auto-trigger checkout if query param exists
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('checkout') === 'true' && product.category === 'personal') {
      initiateCheckout(product);
      // Clean up URL
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, '', newUrl);
    }

    // Track recently viewed in localStorage
    try {
      const stored = localStorage.getItem('krishnastores_recently_viewed');
      const viewedIds: string[] = stored ? JSON.parse(stored) : [];
      const updatedIds = [product.id, ...viewedIds.filter((id) => id !== product.id)].slice(0, 6);
      localStorage.setItem('krishnastores_recently_viewed', JSON.stringify(updatedIds));

      // Resolve full product objects for recently viewed (excluding current product)
      const viewedProducts = updatedIds
        .filter((id) => id !== product.id)
        .map((id) => allProducts.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p));

      setRecentlyViewed(viewedProducts);
    } catch (e) {
      console.error(e);
    }

    // GSAP Staggered Entry Animations
    if (detailsRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.gsap-detail-item', {
          y: 35,
          opacity: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: 'power3.out'
        });

        gsap.from(mainImageRef.current, {
          scale: 0.94,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out'
        });
      }, detailsRef);

      return () => ctx.revert();
    }
  }, [product, allProducts]);

  // 2. Scroll listener to show desktop sticky bar past hero
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setShowStickyBar(heroBottom < 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Thumbnail click image swap animation
  const handleThumbnailClick = (img: string) => {
    if (img === activeImage) return;
    if (mainImageRef.current) {
      gsap.to(mainImageRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 0.15,
        onComplete: () => {
          setActiveImage(img);
          gsap.to(mainImageRef.current, { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' });
        }
      });
    } else {
      setActiveImage(img);
    }
  };

  // Determine category display details
  const isBook = product.category === 'book';
  const isGame = product.category === 'game';
  const isWeb = product.category === 'web';
  const isRoblox = product.category === 'roblox';

  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return url;
  };

  const categoryName = isBook ? 'Bookstore' : isGame ? 'Gamestore' : isWeb ? 'Webstore' : 'Roblox Games';

  // Primary Purchase Link
  const isPersonalStore = product.category === 'personal';
  const primaryPurchaseUrl = product.gumroadUrl || product.buyLink;

  // Recommendations: same category + matching tags
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.tags.some((t) => product.tags.includes(t))))
    .slice(0, 3);

  // Comparable Products (for "NOT SURE WHICH ONE?" matrix)
  const comparableProducts = allProducts.filter((p) => p.category === product.category).slice(0, 3);

  // Dynamic FAQs
  const productFaqs = [
    {
      q: isRoblox ? `Is this a physical game?` : `Is this a physical ${isBook ? 'book' : isGame ? 'game' : 'product'}?`,
      a: isRoblox
        ? `No. This is an online Roblox game experience. You play it directly on the Roblox platform.`
        : `No. This is a 100% digital product. No physical package will be shipped.`
    },
    {
      q: isRoblox ? 'Where can I play this game?' : 'Where do I complete my purchase?',
      a: isRoblox
        ? `You can play this game instantly on the official Roblox platform using the link provided.`
        : `Your purchase is securely processed and fulfilled through ${product.itchUrl ? 'official Gumroad or itch.io' : 'official Gumroad'} storefronts.`
    },
    {
      q: 'How much does it cost?',
      a: isRoblox
        ? `This game is FREE to play on Roblox! Some in-game items may be available for purchase with Robux.`
        : `${product.priceDisplay}. This is a one-time purchase with lifetime access and zero subscription fees.`
    },
    {
      q: isRoblox ? 'How do I start playing?' : 'How will I receive my product after purchase?',
      a: isRoblox
        ? `Simply click the "VIEW ON ROBLOX" button, which will take you to the official game page. Click the Play button on Roblox to launch the game.`
        : `Immediately after checkout, you will receive an instant download link in your email and on the checkout confirmation screen.`
    },
    {
      q: isRoblox ? 'What platforms is this game on?' : 'What format is this product delivered in?',
      a: isRoblox
        ? 'This game can be played on any device that supports Roblox, including PC, Mac, iOS, Android, and Xbox.'
        : isBook
        ? 'Delivered as a high-resolution PDF digital book suitable for reading on phone, tablet, or desktop.'
        : isGame
        ? 'Delivered as a ZIP archive containing all HTML5/WebGL source code files, graphics, and sound assets.'
        : 'Delivered as a ZIP archive containing complete full-stack React / Node source code and setup instructions.'
    }
  ];

  return (
    <div
      ref={detailsRef}
      style={{
        backgroundColor: 'var(--bg-main)',
        color: 'var(--text-main)',
        minHeight: '100vh',
        paddingBottom: '6rem',
        transition: 'background-color 0.3s ease'
      }}
    >
      {/* 20. STICKY DESKTOP PURCHASE BAR */}
      <div
        style={{
          position: 'fixed',
          top: '72px',
          left: 0,
          right: 0,
          zIndex: 7000,
          backgroundColor: 'var(--bg-card)',
          borderBottom: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sticky)',
          padding: '0.6rem 0',
          transform: showStickyBar ? 'translateY(0)' : 'translateY(-120%)',
          opacity: showStickyBar ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="sticky-purchase-bar"
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--border-color)' }}
            />
            <div>
              <span className="line-clamp-1" style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {product.title}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                {product.categoryLabel} · {product.priceDisplay}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isPersonalStore ? (
              <button
                disabled={isLoading}
                onClick={() => initiateCheckout(product)}
                className="btn-primary"
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', gap: '6px' }}
              >
                {isLoading ? <Loader2 className="animate-spin" size={14} /> : 'BUY NOW'} →
              </button>
            ) : (
              <a
                href={primaryPurchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', gap: '6px' }}
              >
                {isRoblox ? 'VIEW ON ROBLOX' : 'BUY NOW'} → <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '1.5rem' }}>
        {/* 35. BREADCRUMBS */}
        <nav
          aria-label="Breadcrumb"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}
        >
          <button
            onClick={onBackToStore}
            style={{ color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
          >
            <ArrowLeft size={14} /> Home Store
          </button>
          <ChevronRight size={14} color="var(--text-light)" />
          <button
            onClick={() => onSelectCategory(product.category)}
            style={{ color: 'var(--primary)', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            {categoryName}
          </button>
          <ChevronRight size={14} color="var(--text-light)" />
          <span style={{ color: 'var(--text-main)', fontWeight: 700 }} className="line-clamp-1">
            {product.title}
          </span>
        </nav>

        {/* 3. PRODUCT HERO SECTION (55% Visual, 45% Info) */}
        <div
          ref={heroRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
            marginBottom: '4rem'
          }}
        >
          {/* 21. PRODUCT IMAGE GALLERY (55%) */}
          <div className="gsap-detail-item">
            <div
              onClick={() => {
                const idx = galleryList.indexOf(activeImage);
                setLightboxIndex(idx >= 0 ? idx : 0);
                setIsLightboxOpen(true);
              }}
              style={{
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                padding: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
                minHeight: '380px',
                boxShadow: 'var(--shadow-card)',
                position: 'relative',
                cursor: 'zoom-in'
              }}
            >
              <img
                ref={mainImageRef}
                src={activeImage}
                alt={product.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '440px',
                  objectFit: 'contain',
                  borderRadius: '10px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.08)'
                }}
              />

              {/* Floating Fullscreen Zoom Overlay Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              >
                <Maximize2 size={13} /> Fullscreen Zoom
              </div>

              {/* Floating Photo Count Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <Camera size={13} color="#38BDF8" /> Photo {(galleryList.indexOf(activeImage) >= 0 ? galleryList.indexOf(activeImage) : 0) + 1} of {galleryList.length}
              </div>
            </div>

            {/* Clickable Thumbnails */}
            {galleryList.length > 1 && (
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '6px' }}>
                {galleryList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      handleThumbnailClick(img);
                      setLightboxIndex(idx);
                    }}
                    style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: '12px',
                      border: activeImage === img ? '2.5px solid var(--primary)' : '1px solid var(--border-color)',
                      padding: '4px',
                      backgroundColor: 'var(--bg-secondary)',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      transition: 'all 0.2s ease',
                      flexShrink: 0
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PRODUCT INFORMATION (45%) */}
          <div className="gsap-detail-item" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <span className="category-badge" style={{ marginBottom: '0.6rem', display: 'inline-block' }}>
                {product.categoryLabel}
              </span>
              <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1.15 }}>
                {product.title}
              </h1>
              {product.subtitle && (
                <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', marginTop: '0.4rem' }}>
                  {product.subtitle}
                </p>
              )}
            </div>

            {/* Factual Short Description */}
            <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {product.shortDescription || product.description}
            </p>

            {/* 5. PRICE + VALUE BOX */}
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {isRoblox ? 'GAME STATUS' : 'ONE-TIME PURCHASE'}
                  </span>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1.1 }}>
                    {product.priceDisplay}
                  </div>
                </div>

                {product.estimatedValue && (
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block' }}>ESTIMATED VALUE</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-warm)', textDecoration: 'line-through' }}>
                      {product.estimatedValue}
                    </span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-emerald)' }}>
                  <CheckCircle2 size={15} /> {isRoblox ? 'Playable on Roblox' : '100% Digital Product'}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Zap size={15} color="var(--primary)" /> {isRoblox ? 'Play Instantly' : 'Instant Access via Gumroad'}
                </span>
              </div>
            </div>

            {/* 6 & 7. PRIMARY & SECONDARY CTAS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.25rem' }}>
              {isPersonalStore ? (
                <button
                  disabled={isLoading}
                  onClick={() => initiateCheckout(product)}
                  className="btn-primary"
                  style={{ width: '100%', padding: '1rem 1.5rem', fontSize: '1.1rem', fontWeight: 800, justifyContent: 'center', gap: '8px' }}
                >
                  {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'BUY NOW'} →
                </button>
              ) : (
                <a
                  href={primaryPurchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ width: '100%', padding: '1rem 1.5rem', fontSize: '1.1rem', fontWeight: 800, justifyContent: 'center', gap: '8px' }}
                >
                  {isRoblox ? 'VIEW ON ROBLOX' : 'BUY NOW'} → <ExternalLink size={18} />
                </a>
              )}

              <button
                onClick={(e) => onToggleWishlist(product, e)}
                className="btn-secondary"
                style={{
                  width: '100%',
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  justifyContent: 'center',
                  gap: '8px',
                  color: isWishlisted ? '#EF4444' : 'var(--text-main)',
                  borderColor: isWishlisted ? '#FCA5A5' : 'var(--border-color)',
                  backgroundColor: isWishlisted ? '#FEF2F2' : 'var(--bg-card)'
                }}
              >
                <Heart size={18} fill={isWishlisted ? '#EF4444' : 'none'} color={isWishlisted ? '#EF4444' : 'var(--text-main)'} />
                {isWishlisted ? '✓ SAVED TO WISHLIST' : '♡ SAVE FOR LATER'}
              </button>
            </div>
          </div>
        </div>

        {/* 8. "WHY SHOULD YOU BUY THIS?" SECTION */}
        <section className="gsap-detail-item" style={{ marginBottom: '4rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '24px', padding: '2.5rem', border: '1px solid var(--border-color)' }}>
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2.25rem auto' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {isRoblox ? 'GAME BENEFIT BREAKDOWN' : 'PRODUCT BENEFIT BREAKDOWN'}
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>
              {isRoblox ? 'WHY SHOULD YOU PLAY THIS?' : 'WHY SHOULD YOU BUY THIS?'}
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {product.benefits && product.benefits.length > 0 ? (
              product.benefits.map((benefit) => (
                <div
                  key={benefit.number}
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    padding: '1.75rem',
                    borderRadius: '16px',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-card)'
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 900,
                      color: 'var(--primary)',
                      backgroundColor: 'var(--primary-light)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      display: 'inline-block',
                      marginBottom: '0.75rem'
                    }}
                  >
                    {benefit.number}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                    {benefit.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                    {benefit.desc}
                  </p>
                </div>
              ))
            ) : (
              [
                { number: '01', title: 'LEARN', desc: 'Gain structured, factual knowledge grounded in practical modern standards.' },
                { number: '02', title: 'UNDERSTAND', desc: 'Clear explanations without jargon to build solid foundational understanding.' },
                { number: '03', title: 'PRACTICE', desc: 'Use the material as an immediate reference for building your own projects.' },
                { number: '04', title: '2026 EDITION', desc: 'Up-to-date resources aligned with current industry tools and techniques.' }
              ].map((b) => (
                <div key={b.number} style={{ backgroundColor: 'var(--bg-card)', padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--primary)', backgroundColor: 'var(--primary-light)', padding: '4px 10px', borderRadius: '6px', display: 'inline-block', marginBottom: '0.75rem' }}>{b.number}</span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>{b.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>{b.desc}</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* GAMEPLAY VIDEO SECTION */}
        {product.youtubeUrl && (
          <section className="gsap-detail-item" style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              🎬 GAMEPLAY VIDEO
            </h2>
            <div
              style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <iframe
                src={getYouTubeEmbedUrl(product.youtubeUrl) || ''}
                title={`${product.title} Gameplay Video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0
                }}
              />
            </div>
          </section>
        )}

        {/* 9. "WHY YOU MIGHT LIKE THIS" SECTION */}
        <section className="gsap-detail-item" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
            WHY YOU MIGHT LIKE THIS
          </h2>

          <div
            style={{
              backgroundColor: 'var(--primary-light)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: '2rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1rem'
            }}
          >
            {(product.youMightWantThisIf && product.youMightWantThisIf.length > 0
              ? product.youMightWantThisIf
              : [
                  `You enjoy structured learning and clear digital references`,
                  `You are building skills in ${product.categoryLabel.toLowerCase()}`,
                  `You want immediate access without subscription commitments`,
                  `You appreciate factual, code-grounded digital products`
                ]
            ).map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                <CheckCircle2 size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 10. "IS THIS FOR YOU?" (GOOD FIT vs OTHER OPTIONS) */}
        <section className="gsap-detail-item" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
            IS THIS FOR YOU?
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {/* Good Fit */}
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '2px solid var(--accent-emerald)',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                <CheckCircle2 size={22} color="var(--accent-emerald)" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  THIS MAY BE A GOOD FIT IF...
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {(product.isRightForYou?.goodFit || [
                  'You want a clear, concise digital resource.',
                  'You prefer practical examples over generic theory.',
                  'You want instant digital download access.'
                ]).map((fit, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: 'var(--accent-emerald)', fontWeight: 800 }}>✓</span>
                    <span>{fit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Look At Something Else */}
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '20px',
                padding: '2rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                <XCircle size={22} color="var(--text-muted)" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                  YOU MAY WANT TO LOOK AT SOMETHING ELSE IF...
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                {(product.isRightForYou?.mayNotBe || [
                  'You are looking specifically for a physical printed book shipped in the mail.'
                ]).map((noFit, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 800 }}>✕</span>
                    <span>{noFit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 11. CUSTOMER DECISION MATRIX (QUICK DECISION TABLE) */}
        <section className="gsap-detail-item" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
            QUICK DECISION MATRIX
          </h2>

          <div
            style={{
              overflowX: 'auto',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-card)'
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '1rem 1.25rem', fontWeight: 800, color: 'var(--text-main)', width: '35%' }}>Decision Metric</th>
                  <th style={{ padding: '1rem 1.25rem', fontWeight: 800, color: 'var(--primary)' }}>Product Details</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--text-muted)' }}>What is it?</td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>{product.details.type || product.categoryLabel}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--text-muted)' }}>Who is it for?</td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>Students, developers & digital creators</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--text-muted)' }}>Format</td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>{product.format ? product.format.join(', ') : 'Digital File (PDF/ZIP)'}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--text-muted)' }}>Price</td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>{product.priceDisplay} {isRoblox ? '' : '(One-Time)'}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--text-muted)' }}>{isRoblox ? 'Game Platform' : 'Purchase Platform'}</td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--primary)' }}>{product.details.purchasePlatform || (isRoblox ? 'Roblox' : 'Gumroad')}</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--text-muted)' }}>{isRoblox ? 'Online Multiplayer?' : 'Physical product shipped?'}</td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>{isRoblox ? 'Yes — Play with friends' : 'No — Instant digital download'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 12. "WHAT DO YOU GET?" & 13. HIGHLIGHTS */}
        <div
          className="gsap-detail-item"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}
        >
          {/* What Do You Get? */}
          <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '2rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
              WHAT DO YOU GET?
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {product.whatYouGet.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.925rem', color: 'var(--text-main)', fontWeight: 600 }}>
                  <ShieldCheck size={18} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Highlights */}
          <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '2rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
              PRODUCT HIGHLIGHTS
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {(product.whatMakesItUseful && product.whatMakesItUseful.length > 0
                ? product.whatMakesItUseful
                : [
                    'Digital format accessible on all devices',
                    'Product-specific practical content',
                    'Created for modern 2026 standards',
                    'Instant fulfillment upon purchase'
                  ]
              ).map((highlight, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.925rem', color: 'var(--text-main)', fontWeight: 600 }}>
                  <Sparkles size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 14. "WHAT MAKES THIS PRODUCT DIFFERENT?" */}
        <section className="gsap-detail-item" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem', textAlign: 'center' }}>
            WHAT MAKES THIS PRODUCT DIFFERENT?
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {/* Alternative Approach */}
            <div style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', padding: '2rem', borderRadius: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <XCircle size={22} color="var(--text-muted)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                  TYPICAL ALTERNATIVE
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <p>✕ Searching across scattered YouTube video tutorials</p>
                <p>✕ Outdated syntax and deprecated dependencies</p>
                <p>✕ Mandatory monthly recurring subscription fees</p>
              </div>
            </div>

            {/* KrishnaStores Approach */}
            <div style={{ border: '2px solid var(--primary)', backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '20px', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <CheckCircle2 size={22} color="var(--primary)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  KRISHNASTORES DEDICATED RESOURCE
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>
                <p>✓ One structured, dedicated product with all key answers</p>
                <p>✓ Code-grounded 2026 production standards</p>
                <p>✓ Pay once, own forever with lifetime digital access</p>
              </div>
            </div>
          </div>
        </section>

        {/* 15. CUSTOMER USE CASES & 16. WHO IS THIS FOR? */}
        <div
          className="gsap-detail-item"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}
        >
          {/* Customer Use Cases */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
              WHAT COULD YOU USE THIS FOR?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {(isBook
                ? ['Learning Core Concepts', 'Project Reference', 'Skill Expansion', 'Portfolio Preparation']
                : isGame
                ? ['Browser Gaming', 'Source Code Study', 'Game Reskinning', 'Match-3 / WebGL Sandbox']
                : ['Full-Stack Foundation', 'Portfolio Project', 'Architecture Study', 'Code Re-use']
              ).map((useCase, idx) => (
                <div key={idx} style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '14px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)' }}>{useCase}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Who Is This For? */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
              WHO IS THIS FOR?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem' }}>
              {product.audience.map((aud, idx) => (
                <div key={idx} style={{ padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.25rem' }}>
                    {aud.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {aud.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 17. "BEFORE YOU BUY" (TRANSPARENT WARNING PANEL) */}
        <section className="gsap-detail-item" style={{ marginBottom: '4rem', backgroundColor: '#FEF3C7', border: '1px solid #FDE68A', padding: '2rem', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.85rem' }}>
            <Info size={22} color="#D97706" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#92400E' }}>
              {isRoblox ? 'BEFORE YOU PLAY — KEY DETAILS' : 'BEFORE YOU BUY — TRANSPARENT DETAILS'}
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {product.beforeYouBuy.map((note, idx) => (
              <p key={idx} style={{ fontSize: '0.925rem', color: '#78350F', fontWeight: 700 }}>
                • {note}
              </p>
            ))}
          </div>
        </section>

        {/* 18. TRUST SECTION ("KNOW WHAT YOU'RE BUYING") */}
        <section className="gsap-detail-item" style={{ marginBottom: '4rem', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '2.5rem', borderRadius: '24px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            TRANSPARENT DECISION PROCESS
          </span>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem', marginBottom: '2rem' }}>
            KNOW WHAT YOU'RE BUYING
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', alignItems: 'center' }}>
            <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', display: 'block' }}>STEP 01</span>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>Clear Information</span>
            </div>

            <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', display: 'block' }}>STEP 02</span>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>Visible Pricing</span>
            </div>

            <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', display: 'block' }}>STEP 03</span>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>Specific Details</span>
            </div>

            <div style={{ padding: '1.25rem', backgroundColor: 'var(--primary-light)', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', display: 'block' }}>STEP 04</span>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary)' }}>Official Store Checkout</span>
            </div>
          </div>
        </section>

        {/* 19. PURCHASE PLATFORM ("WHERE WILL I BUY IT?") */}
        <section
          className="gsap-detail-item"
          style={{
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            borderRadius: '24px',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            marginBottom: '4rem',
            boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.3)'
          }}
        >
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38BDF8', letterSpacing: '0.1em' }}>
            {isRoblox ? 'WHERE CAN I PLAY IT?' : 'WHERE WILL I BUY IT?'}
          </span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 900, margin: '0.5rem 0 1rem 0' }}>
            {product.title}
          </h2>
          <div style={{ fontSize: '2.75rem', fontWeight: 900, color: '#FFFFFF', marginBottom: '1.5rem' }}>
            {product.priceDisplay}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            {isPersonalStore ? (
              <button
                disabled={isLoading}
                onClick={() => initiateCheckout(product)}
                className="btn-primary"
                style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', backgroundColor: '#2563EB', gap: '8px' }}
              >
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'BUY NOW SECURELY'} →
              </button>
            ) : (
              <a
                href={primaryPurchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', backgroundColor: '#2563EB', gap: '8px' }}
              >
                {isRoblox ? 'VIEW ON ROBLOX' : 'BUY ON GUMROAD'} ↗ <ExternalLink size={18} />
              </a>
            )}
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '1.5rem' }}>
            {isRoblox ? 'Play instantly on the official Roblox platform.' : 'Secure payment & instant digital delivery via official platform checkout.'}
          </p>
        </section>

        {/* 30. PRODUCT FAQ SECTION */}
        <section className="gsap-detail-item" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem', textAlign: 'center' }}>
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', margin: '0 auto' }}>
            {productFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 800,
                      color: 'var(--text-main)'
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={20}
                      color="var(--primary)"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease'
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 1.5rem 1.25rem 1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 34. STILL HAVE QUESTIONS? (FINAL CTA) */}
        <section className="gsap-detail-item" style={{ marginBottom: '4rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '20px', padding: '2.5rem', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            {isRoblox ? 'READY TO PLAY?' : 'STILL HAVE QUESTIONS?'}
          </h3>
          <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', maxWidth: '550px', margin: '0 auto 1.5rem auto' }}>
            {isRoblox ? 'Join thousands of players in the game today. Click below to start your adventure on Roblox.' : 'Explore the product details above or visit the official purchase platform for complete product information.'}
          </p>
          {isPersonalStore ? (
            <button
              disabled={isLoading}
              onClick={() => initiateCheckout(product)}
              className="btn-primary"
              style={{ padding: '0.85rem 2rem', fontSize: '1rem', display: 'inline-flex', gap: '8px' }}
            >
              {isLoading ? <Loader2 className="animate-spin" size={16} /> : 'BUY NOW'} →
            </button>
          ) : (
            <a
              href={primaryPurchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: '0.85rem 2rem', fontSize: '1rem', display: 'inline-flex', gap: '8px' }}
            >
              {isRoblox ? 'PLAY ON ROBLOX' : 'VIEW PURCHASE PAGE'} → <ExternalLink size={16} />
            </a>
          )}
        </section>

        {/* 29. "COMPARE YOUR OPTIONS" MATRIX */}
        {comparableProducts.length > 1 && (
          <section className="gsap-detail-item" style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem' }}>
              NOT SURE WHICH ONE? — COMPARE YOUR OPTIONS
            </h2>

            <div
              style={{
                overflowX: 'auto',
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-card)'
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>Product</th>
                    <th style={{ padding: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>Category</th>
                    <th style={{ padding: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>Price</th>
                    <th style={{ padding: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>Format</th>
                    <th style={{ padding: '1rem', fontWeight: 800, color: 'var(--primary)' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {comparableProducts.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={p.image} alt="" style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: '4px' }} />
                          <span className="line-clamp-1">{p.title}</span>
                        </div>
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>{p.categoryLabel}</td>
                      <td style={{ padding: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>{p.priceDisplay}</td>
                      <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Digital</td>
                      <td style={{ padding: '1rem' }}>
                        <button
                          onClick={() => onSelectProduct(p)}
                          className="btn-secondary"
                          style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}
                        >
                          View Details →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 28. YOU MAY ALSO LIKE */}
        {relatedProducts.length > 0 && (
          <section className="gsap-detail-item" style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)' }}>
                YOU MAY ALSO LIKE
              </h2>
              <button
                onClick={onBackToStore}
                style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)', cursor: 'pointer' }}
              >
                View Full Catalog →
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.75rem'
              }}
            >
              {relatedProducts.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  product={relProduct}
                  isWishlisted={false}
                  onToggleWishlist={onToggleWishlist}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          </section>
        )}

        {/* 27. RECENTLY VIEWED PRODUCTS */}
        {recentlyViewed.length > 0 && (
          <section className="gsap-detail-item" style={{ marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem' }}>
              RECENTLY VIEWED
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '1.5rem'
              }}
            >
              {recentlyViewed.map((rvProduct) => (
                <ProductCard
                  key={rvProduct.id}
                  product={rvProduct}
                  isWishlisted={false}
                  onToggleWishlist={onToggleWishlist}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* 38. MOBILE FIXED BOTTOM PURCHASE BAR */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 8000,
          backgroundColor: 'var(--bg-card)',
          borderTop: '1px solid var(--border-color)',
          padding: '12px 16px env(safe-area-inset-bottom, 12px) 16px',
          boxShadow: 'var(--shadow-sticky)',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        className="mobile-bottom-bar"
      >
        <div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>PRICE</span>
          <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-main)' }}>{product.priceDisplay}</span>
        </div>
        {isPersonalStore ? (
          <button
            disabled={isLoading}
            onClick={() => initiateCheckout(product)}
            className="btn-primary"
            style={{ padding: '0.7rem 1.75rem', fontSize: '0.95rem', fontWeight: 800 }}
          >
            {isLoading ? <Loader2 className="animate-spin" size={14} /> : 'BUY NOW'} →
          </button>
        ) : (
          <a
            href={primaryPurchaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '0.7rem 1.75rem', fontSize: '0.95rem', fontWeight: 800 }}
          >
            {isRoblox ? 'VIEW ON ROBLOX' : 'BUY NOW'} →
          </a>
        )}
      </div>

      {/* 39. ADVANCED FULLSCREEN PHOTO LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(5, 8, 17, 0.96)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem',
            color: '#FFFFFF'
          }}
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Header Controls Bar */}
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Camera size={18} color="#38BDF8" />
              <span style={{ fontSize: '0.9rem', fontWeight: 800 }}>{product.title}</span>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>({lightboxIndex + 1} of {galleryList.length})</span>
            </div>

            <button
              onClick={() => setIsLightboxOpen(false)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Fullscreen Image Display with Arrow Navigation */}
          <div
            style={{
              position: 'relative',
              flex: 1,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem 0'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {galleryList.length > 1 && (
              <button
                onClick={() => setLightboxIndex((prev) => (prev - 1 + galleryList.length) % galleryList.length)}
                style={{
                  position: 'absolute',
                  left: '20px',
                  zIndex: 10,
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <img
              src={galleryList[lightboxIndex]}
              alt={product.title}
              style={{
                maxWidth: '90vw',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: '16px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.6)'
              }}
            />

            {galleryList.length > 1 && (
              <button
                onClick={() => setLightboxIndex((prev) => (prev + 1) % galleryList.length)}
                style={{
                  position: 'absolute',
                  right: '20px',
                  zIndex: 10,
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Bottom Thumbnail Strip */}
          {galleryList.length > 1 && (
            <div
              style={{
                display: 'flex',
                gap: '12px',
                overflowX: 'auto',
                padding: '8px 16px',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                maxWidth: '90vw'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {galleryList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setLightboxIndex(idx);
                    setActiveImage(img);
                  }}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '10px',
                    border: lightboxIndex === idx ? '2.5px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '2px',
                    backgroundColor: '#0F172A',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    flexShrink: 0
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .sticky-purchase-bar { display: none !important; }
          .mobile-bottom-bar { display: flex !important; }
        }
      `}</style>
    </div>
  );
};
