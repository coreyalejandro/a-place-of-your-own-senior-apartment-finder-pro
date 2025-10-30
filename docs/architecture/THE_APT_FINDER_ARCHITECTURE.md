# 🏙️ The Apt Finder — Full Architecture Specification

**Magazine-Style Application Flow & Developer Schema**

---

## 🧭 USER FLOW DIAGRAM — "Magazine Navigation Model"

Each feature appears as a page in a digital magazine.
Users swipe or click to turn pages, with smooth horizontal transitions.

```
[ COVER ]
    ↓ (swipe)
[ LETTER FROM EDITOR ]
    ↓ (turn)
[ TABLE OF CONTENTS ]
    ↓
[ PREFERENCE SETUP ]
    ↓
[ APARTMENT SEARCH ]
    ↓
[ REALTOR FINDER ]
    ↓
[ FAVORITES ]
    ↓
[ BOOKMARKS ]
    ↓
[ ARTICLES ]
    ↓
[ CARTOONS ]
    ↓
[ CLOSING SPREAD ]
```

All pages use the shared `MagazineLayout.tsx` wrapper and `net-yorker-theme.css` for consistent typography, color, and framing.

---

## 🧱 COMPONENT HIERARCHY DIAGRAM

```
App Entry (Next.js)
└── MagazineLayout.tsx  ← shared wrapper
    ├── Navbar.tsx       ← persistent nav, page indicator
    ├── Footer.tsx       ← optional paper-shadow accent
    ├── FramerMotionController.tsx
    │    └── AnimatePresence + motion.div transitions
    └── Page Components
         ├── CoverPage.tsx
         ├── LetterPage.tsx
         ├── ContentsPage.tsx
         ├── PreferencesPage.tsx
         ├── ApartmentPage.tsx
         ├── RealtorPage.tsx
         ├── FavoritesPage.tsx
         ├── BookmarksPage.tsx
         ├── ArticlesPage.tsx
         └── CartoonsPage.tsx
└── net-yorker-theme.css ← global theme
```

---

## ⚙️ ROUTE STRUCTURE (Next.js App Router)

| Route | File | Description |
|-------|------|-------------|
| `/` | `/app/page.tsx` | Magazine cover |
| `/letter` | `/app/letter/page.tsx` | Letter from the Editor |
| `/contents` | `/app/contents/page.tsx` | Table of Contents |
| `/preferences` | `/app/preferences/page.tsx` | Preference setup form |
| `/apartments` | `/app/apartments/page.tsx` | Apartment finder map + list |
| `/realtors` | `/app/realtors/page.tsx` | Realtor finder directory |
| `/favorites` | `/app/favorites/page.tsx` | User's saved listings |
| `/bookmarks` | `/app/bookmarks/page.tsx` | Saved articles |
| `/articles` | `/app/articles/page.tsx` | Long-form content with cartoons |
| `/cartoons` | `/app/cartoons/page.tsx` | Humor section |
| `/end` | `/app/end/page.tsx` | Closing "thank you" spread |

---

## 🎞️ PAGE-TURN ANIMATION LAYER (Framer Motion)

```tsx
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function MagazineLayout({ children }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -200, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="magazine-wrapper"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

---

## 🎨 GLOBAL THEME — `/app/styles/net-yorker-theme.css`

```css
:root {
  --color-bg: #F5EBD1;
  --color-text: #1C1C1C;
  --color-text-secondary: #4B3E2B;
  --color-accent: #C48F4A;
  --color-border: #D3C5A0;
  --color-highlight: #8A6A45;
  --color-link: #855E2B;
  --color-nav-bg: #F8F3E7;
}

html, body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: 'Lora', serif;
  line-height: 1.6;
}

h1, h2, h3 { font-family: 'Playfair Display', serif; }
.subtitle { font-family: 'Crimson Text', serif; color: var(--color-text-secondary); }

button, nav, input, label {
  font-family: 'Source Sans Pro', sans-serif;
}

.editor-letter p::first-letter {
  float: left;
  font-size: 3.5em;
  line-height: 0.8;
  margin-right: 10px;
  font-family: "Playfair Display";
  font-weight: 700;
}
```

---

## 🗂️ PAGE DESIGN TEMPLATES

| Page Type | Layout Style | Key Elements |
|-----------|--------------|--------------|
| Letter | Two-column, drop cap intro | Gradient top → cream base |
| Table of Contents | Interactive list | Paper cards w/ ink icons |
| Apartment Search | Map + list hybrid | Sepia-toned map, serif labels |
| Realtor Finder | Profile grid | Ivory cards with amber border |
| Favorites / Bookmarks | Clean grid | Warm parchment background |
| Articles | Long-form | Drop caps, inline cartoons |
| Cartoons | Black-line humor | Minimalist cream background |

---

## 🧠 YAML ARCHITECTURE SPEC (for Claude or AI Agents)

```yaml
app:
  name: "The Apt Finder"
  layout: "MagazineLayout.tsx"
  theme: "net-yorker-theme.css"
  mode: "multi-route"
  transition_system:
    library: "Framer Motion"
    effect: "horizontal_slide"
    duration: 0.6
    easing: "easeInOut"
  navigation:
    persistent_navbar: true
    page_indicator: true
    next_prev_arrows: true
  pages:
    - route: "/"
      component: "CoverPage.tsx"
    - route: "/letter"
      component: "LetterPage.tsx"
    - route: "/contents"
      component: "ContentsPage.tsx"
    - route: "/preferences"
      component: "PreferencesPage.tsx"
    - route: "/apartments"
      component: "ApartmentPage.tsx"
    - route: "/realtors"
      component: "RealtorPage.tsx"
    - route: "/favorites"
      component: "FavoritesPage.tsx"
    - route: "/bookmarks"
      component: "BookmarksPage.tsx"
    - route: "/articles"
      component: "ArticlesPage.tsx"
    - route: "/cartoons"
      component: "CartoonsPage.tsx"
    - route: "/end"
      component: "ClosingPage.tsx"
  data_sources:
    apartments: "Google Maps API or Supabase"
    realtors: "Supabase or JSON feed"
  storage:
    favorites: "localStorage"
    bookmarks: "localStorage"
  ui_theme:
    typography: ["Playfair Display", "Lora", "Source Sans Pro"]
    palette:
      background: "#F5EBD1"
      ink: "#1C1C1C"
      accent: "#C48F4A"
      border: "#D3C5A0"
```

---

## 🧩 DATA FLOW OVERVIEW

```
User Interaction (Navbar / Page turn)
        ↓
Framer Motion Controller (Animation)
        ↓
Page Component (e.g. ApartmentPage.tsx)
        ↓
Data Fetch (API, Supabase)
        ↓
Render (Net-Yorker Theme CSS)
```

All features inherit typography, colors, and "paper" layout automatically.

---

## 🎭 CARTOON & ARTICLE SYSTEM

- Each article page includes:
  - Drop-cap serif intro
  - Body text in Lora font
  - One embedded cartoon per article
- Cartoons are `.svg` line drawings, saved under:

```
/app/articles/cartoons/
├── article-name.svg
├── apartment-life.svg
└── downsizing-humor.svg
```

---

## ✅ FINAL NOTES

**Core UX Principle:**
→ "Every feature should feel like a page in a timeless magazine."

**Technical Key:**
→ Separate routes (for real data and SSR) + shared wrapper for magazine illusion.

**Design Key:**
→ Typography + texture are constant; only content changes per spread.
