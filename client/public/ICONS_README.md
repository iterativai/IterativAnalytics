# PWA Icon Setup

## Current Status
The PWA currently uses an SVG icon (`/icon.svg`) which provides basic functionality. For full iOS/Android compatibility and optimal user experience, you should generate proper PNG icons.

## Required PNG Icons (Production)

For full PWA compliance and optimal installation experience on all devices, generate these PNG icons:

### Required for Chrome/Android:
- **192x192** - Android home screen  
- **512x512** - Android splash screen

### Required for iOS/Safari:
- **180x180** - iPhone/iPad home screen (apple-touch-icon)
- **167x167** - iPad Pro
- **152x152** - iPad  

### Recommended Additional Sizes:
- 72x72, 96x96, 128x128, 144x144, 384x384

## Quick Icon Generation Methods

### Option 1: PWA Asset Generator (Recommended)
```bash
npx @vite-pwa/assets-generator --preset minimal public/icon-source.png
```

### Option 2: Online Tool
Visit [RealFaviconGenerator.net](https://realfavicongenerator.net/) and upload a 1024x1024 PNG with your Iterativ branding.

### Option 3: ImageMagick (Command Line)
```bash
# From a 1024x1024 source image
convert icon-source.png -resize 192x192 client/public/icon-192.png
convert icon-source.png -resize 512x512 client/public/icon-512.png
convert icon-source.png -resize 180x180 client/public/icon-180.png
```

## After Generating Icons

Update `client/public/manifest.webmanifest`:
```json
"icons": [
  {
    "src": "/icon-192.png",
    "sizes": "192x192",
    "type": "image/png",
    "purpose": "any maskable"
  },
  {
    "src": "/icon-512.png",
    "sizes": "512x512",
    "type": "image/png",
    "purpose": "any maskable"
  }
]
```

Update `client/index.html`:
```html
<link rel="apple-touch-icon" sizes="180x180" href="/icon-180.png">
```

## Design Guidelines
- Use the brand colors: Primary #0A84FF, Secondary #0071E3
- Include the BarChart3 icon or simplified "I" logo
- Ensure good contrast on both light and dark backgrounds
- Test on actual devices after generation
- SVG source is in `/client/public/icon.svg` for reference

## Verification
After adding PNG icons, test with:
- Chrome DevTools > Application > Manifest
- Lighthouse PWA audit (should score 100)
- Test installation on actual iOS and Android devices
