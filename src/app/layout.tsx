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
  title: 'Ibrahim Salman | Senior Frontend Architect',
  description: 'Technical portfolio of Ibrahim Salman, a senior frontend engineer and creative director based in Taxila, specializing in React, Three.js and performance engineering.',
  keywords: ['Frontend Architect', 'React Developer', 'Three.js', 'WebGL', 'Taxila Developer', 'Ibrahim Salman'],
  authors: [{ name: 'Ibrahim Salman' }],
  openGraph: {
    title: 'Ibrahim Salman | Senior Frontend Architect',
    description: 'Building high-performance, award-winning digital experiences with React, TypeScript, and Three.js.',
    url: 'https://skill-deploy-fwgk5oq8bj-agent-skill-vercel.vercel.app',
    siteName: 'Ibrahim Salman Portfolio',
    images: [
      {
        url: 'https://skill-deploy-fwgk5oq8bj-agent-skill-vercel.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ibrahim Salman Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ibrahim Salman | Senior Frontend Architect',
    description: 'Building high-performance digital experiences.',
    images: ['https://skill-deploy-fwgk5oq8bj-agent-skill-vercel.vercel.app/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
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
