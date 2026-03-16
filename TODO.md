# PWA Conversion TODO

## Approved Plan Steps (Breakdown):

1. ✅ **Plan confirmed** by user
2. **Install vite-plugin-pwa**: `npm i vite-plugin-pwa -D`
3. **[ ] Generate PWA icons**: Create multiple sized maskable PNGs from hblogo.jpg (192x192, 512x512)
4. **[ ] Update vite.config.js**: Add vite-plugin-pwa with config (precache manifest, caching strategies)
5. **[ ] Enhance public/manifest.json**: Add categories, screenshots, lang=ar, orientation=portrait
6. **[ ] Update index.html**: Add iOS PWA metas (apple-mobile-web-app-capable, status-bar-style)
7. **[ ] Update src/App.jsx**: Integrate PWA install prompt
8. **[ ] Minor src/index.css**: Add safe-100vh, splash screen support
9. **[ ] Test build**: `npm run build`, `npm run preview`, check Lighthouse PWA score
10. **[ ] Deploy & verify**: Push to Render, test install on mobile

*Mark as you complete each step*
