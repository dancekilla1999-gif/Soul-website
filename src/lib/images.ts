/**
 * Centralized image registry for SOUL.
 *
 * Every hardcoded image path used by components/layout/schema lives here.
 * To swap a photo: replace the file on disk (keep the same name) — zero
 * code changes needed. To add a brand-new photo, drop it into the matching
 * folder under /public/images/ and reference it from here (or, for
 * gallery/events, add an entry in src/data/content.json).
 *
 * Folder map — see /public/images/README.md for the full guide:
 *   images/hero/    — homepage hero visual (1 photo, most important asset)
 *   images/gallery/ — venue photography reused across sections + the /gallery page
 *   images/events/  — event/afisha posters and videos
 *   images/brand/   — logo, OG share image, review QR code
 */
export const images = {
  hero: {
    main: "/images/hero/hero-main.jpg",
  },
  gallery: {
    atmosphere: "/images/gallery/atmosphere.jpg",
    interiorHall: "/images/gallery/interior-hall.jpg",
    bar: "/images/gallery/bar.jpg",
    oasis: "/images/gallery/oasis.jpg",
    lounge: "/images/gallery/lounge.jpg",
    details: "/images/gallery/details.jpg",
    gastronomy: "/images/gallery/gastronomy.jpg",
    chandelierDetail: "/images/gallery/chandelier-detail.jpg",
    djClose: "/images/gallery/dj-close.jpg",
    djPeacock: "/images/gallery/dj-peacock.jpg",
    hookahLounge: "/images/gallery/hookah-lounge.jpg",
    brandingStairs: "/images/gallery/branding-stairs.jpg",
    atmosphereBw: "/images/gallery/atmosphere-bw.jpg",
    logoWall: "/images/gallery/logo-wall.jpg",
  },
  events: {
    saturdayPoster: "/images/events/event-saturday-poster.jpg",
    poster1: "/images/events/poster-1.jpg",
    poster2: "/images/events/poster-2.jpg",
    poster3: "/images/events/poster-3.jpg",
  },
  brand: {
    logo: "/images/brand/logo.png",
    og: "/images/brand/og.jpg",
    reviewQr: "/images/brand/review-qr.png",
  },
} as const;
