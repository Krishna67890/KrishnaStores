import React from 'react';

export function useRouter() {
  return {
    push: (url: string) => {
      window.history.pushState(null, '', url);
      window.dispatchEvent(new Event('popstate'));
    },
    replace: (url: string) => {
      window.history.replaceState(null, '', url);
      window.dispatchEvent(new Event('popstate'));
    },
    back: () => window.history.back(),
    forward: () => window.history.forward(),
    refresh: () => window.location.reload(),
    prefetch: () => {},
  };
}

export function usePathname() {
  if (typeof window !== 'undefined') {
    return window.location.pathname;
  }
  return '/';
}

export function useParams() {
  if (typeof window !== 'undefined') {
    const parts = window.location.pathname.split('/').filter(Boolean);
    const slug = parts[parts.length - 1] || '';
    return { slug };
  }
  return { slug: '' };
}

export function useSearchParams() {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
}
