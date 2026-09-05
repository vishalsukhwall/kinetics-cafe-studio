import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kinetics Cafe Studio | Artisan Coffee Roastery',
  description:
    'An ultra-luxury artisan coffee experience. Flame-roasted single-origin beans from the Western Ghats, precision-brewed drinks, and a sanctuary crafted for those who appreciate the art of coffee.',
  keywords: [
    'artisan coffee',
    'specialty roastery',
    'single origin',
    'craft coffee',
    'Bengaluru coffee',
    'Kinetics Cafe',
    'Udaipur cafe',
  ],
  openGraph: {
    title: 'Kinetics Cafe Studio | Artisan Coffee Roastery',
    description:
      'Where every cup is an expression of terroir, craft, and uncompromising quality. Flame-roasted, precision-brewed artisan coffee.',
    type: 'website',
    locale: 'en_IN',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0705',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for Playfair Display */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain-overlay">
        {children}
      </body>
    </html>
  );
}
