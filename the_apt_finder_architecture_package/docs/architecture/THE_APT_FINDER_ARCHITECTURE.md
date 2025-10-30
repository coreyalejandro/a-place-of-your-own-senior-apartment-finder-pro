# The Apt Finder — Full Architecture Specification

## Overview
Magazine-style Next.js app with each feature presented as a turnable page. Uses `MagazineLayout.tsx`, `FramerMotion`, and a unified `net-yorker-theme.css`.

## User Flow
COVER → LETTER → CONTENTS → APARTMENTS → REALTORS → FAVORITES → BOOKMARKS → ARTICLES → CARTOONS → END

## Component Hierarchy
App Entry (Next.js)
 └── MagazineLayout.tsx
      ├── Navbar.tsx
      ├── Footer.tsx
      ├── FramerMotionController.tsx
      └── Page Components
          ├── CoverPage.tsx
          ├── LetterPage.tsx
          ├── ContentsPage.tsx
          ├── ApartmentPage.tsx
          ├── RealtorPage.tsx
          ├── FavoritesPage.tsx
          ├── BookmarksPage.tsx
          ├── ArticlesPage.tsx
          └── CartoonsPage.tsx
 └── net-yorker-theme.css

## Route Map
/ → cover
/letter → editor letter
/contents → table of contents
/apartments → map + list
/realtors → realtor directory
/favorites → saved listings
/bookmarks → saved articles
/articles → longform with cartoons
/cartoons → humor section
/end → closing spread

## YAML Architecture Spec
app:
  name: "The Apt Finder"
  layout: "MagazineLayout.tsx"
  theme: "net-yorker-theme.css"
  mode: "multi-route"
  transition_system:
    library: "Framer Motion"
    effect: "horizontal_slide"
    duration: 0.6
  navigation:
    persistent_navbar: true
    page_indicator: true
    next_prev_arrows: true
  ui_theme:
    typography: ["Playfair Display", "Lora", "Source Sans Pro"]
    palette:
      background: "#F5EBD1"
      ink: "#1C1C1C"
      accent: "#C48F4A"
      border: "#D3C5A0"
