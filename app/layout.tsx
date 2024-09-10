import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import ThemeToggle from './components/ThemeToggle';
import './globals.css'

const setInitialTheme = `
  (function() {
    const savedTheme = window.localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  })();
`;

export const metadata: Metadata = {
  title: "Similar Movie Posters",
  description: "Find similar movie posters based on a selected movie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      </head>
      <body>
        <ThemeToggle>
          <AppRouterCacheProvider>
              {children}
          </AppRouterCacheProvider>
         </ThemeToggle>
      </body>
    </html>
  );
}
