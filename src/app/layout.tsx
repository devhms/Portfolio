import type { Metadata, Viewport } from 'next';
import { Syne, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import { ConsoleBreadcrumb } from '@/components/ui/ConsoleBreadcrumb';
import { ClientProviders } from '@/components/layout/ClientProviders';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '500'],
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'Senior Frontend Architect | Technical Portfolio',
  description: 'Technical portfolio of a world-class senior frontend engineer and creative director specializing in React, Three.js and performance.',
};

export const viewport: Viewport = {
  themeColor: '#0B0B10',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="antialiased selection:bg-accent selection:text-white bg-bg">
        <ConsoleBreadcrumb />
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
