// app/components/ThemeToggle.tsx
'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline, IconButton } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { lightTheme, darkTheme } from '../themes';

const ThemeToggle = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark');
    } else {
      setTheme(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    window.localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (!theme) return null; // Prevent rendering until theme is loaded

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <IconButton onClick={toggleTheme} color="inherit">
        {theme === 'light' ? <DarkMode /> : <LightMode />}
      </IconButton>
      {children}
    </ThemeProvider>
  );
};

export default ThemeToggle;
