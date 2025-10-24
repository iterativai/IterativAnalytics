# PWA Icons

This directory contains icons for the Progressive Web App installation.

## Required Icons

The manifest.webmanifest references the following icons:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-167x167.png (iOS specific)
- icon-180x180.png (iOS specific)
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

## iOS Splash Screens

The following splash screens are needed for iOS devices (in /splash directory):
- apple-splash-640-1136.png
- apple-splash-750-1334.png
- apple-splash-1125-2436.png
- apple-splash-1242-2688.png
- apple-splash-1536-2048.png
- apple-splash-1668-2388.png
- apple-splash-2048-2732.png

## Generating Icons

You can generate these icons from a single high-resolution source image (1024x1024 or larger) using:

1. Online tools like https://realfavicongenerator.net/
2. PWA Asset Generator: `npx @vite-pwa/assets-generator --preset minimal public/icon-source.png`
3. Manual resizing with image editing software

## Brand Guidelines

Icons should:
- Use the Iterativ brand colors (#0A84FF primary blue)
- Include the BarChart3 icon or Iterativ logo
- Have a clean, professional appearance
- Work on both light and dark backgrounds
- Follow iOS and Android design guidelines
