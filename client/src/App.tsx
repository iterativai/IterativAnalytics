import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { SectorThemeProvider } from '@/components/ui/sector-theme-selector';
import LandingPage from '@/pages/LandingPage';

export default function App() {
  return (
    <ThemeProvider>
      <SectorThemeProvider>
        <LandingPage />
      </SectorThemeProvider>
    </ThemeProvider>
  );
}