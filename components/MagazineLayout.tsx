'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { MagazineNavigation } from './MagazineNavigation';
import Layout from './Layout';

interface MagazineLayoutProps {
  children: ReactNode;
}

// Define all magazine pages in order
export const MAGAZINE_PAGES = [
  { path: '/', title: 'Cover', shortTitle: 'Cover' },
  { path: '/letter', title: 'Letter from the Editor', shortTitle: 'Letter' },
  { path: '/contents', title: 'Table of Contents', shortTitle: 'Contents' },
  { path: '/preferences', title: 'Preference Setup', shortTitle: 'Preferences' },
  { path: '/apartments', title: 'Apartment Search', shortTitle: 'Apartments' },
  { path: '/realtors', title: 'Realtor Finder', shortTitle: 'Realtors' },
  { path: '/favorites', title: 'Favorites', shortTitle: 'Favorites' },
  { path: '/bookmarks', title: 'Bookmarks', shortTitle: 'Bookmarks' },
  { path: '/articles', title: 'Articles', shortTitle: 'Articles' },
  { path: '/cartoons', title: 'Cartoons', shortTitle: 'Cartoons' },
  { path: '/end', title: 'Closing Spread', shortTitle: 'End' },
];

export function MagazineLayout({ children }: MagazineLayoutProps) {
  const pathname = usePathname();

  // Find current page index
  const currentPageIndex = MAGAZINE_PAGES.findIndex(page => page.path === pathname);
  const currentPage = currentPageIndex >= 0 ? MAGAZINE_PAGES[currentPageIndex] : null;
  const totalPages = MAGAZINE_PAGES.length;

  // Cover page - render without any wrapper
  if (pathname === '/') {
    return children;
  }

  // All other pages - with Layout wrapper
  return (
    <Layout>
      {/* Persistent Navigation */}
      <MagazineNavigation
        currentPage={currentPageIndex + 1}
        totalPages={totalPages}
        pageTitle={currentPage?.shortTitle || ''}
      />

      {/* Animated Page Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
