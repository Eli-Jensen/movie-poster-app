import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import ThemeToggle from './components/ThemeToggle';
import './globals.css'

export const metadata: Metadata = {
  title: "Similar Movie Posters",
  description: "Find similar movie posters based on a selected movie.",
};

const setInitialTheme = `
  (function() {
    const theme = window.localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    } else if (systemPrefersDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  })();
`;

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
