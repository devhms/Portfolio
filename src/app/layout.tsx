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
  weight: ['300', '400', '500'],
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'Ibrahim Salman | Software Engineer',
  description: 'Portfolio of Ibrahim Salman, a Software Engineering student at UET Taxila building web apps, AI tools, and creative digital experiences.',
  keywords: ['Software Engineer', 'React Developer', 'Python', 'Next.js', 'UET Taxila', 'Ibrahim Salman'],
  authors: [{ name: 'Ibrahim Salman' }],
  openGraph: {
    title: 'Ibrahim Salman | Software Engineer',
    description: 'Building web apps, AI tools, and creative digital experiences.',
    url: 'https://devhms.vercel.app',
    siteName: 'Ibrahim Salman Portfolio',
    images: [
      {
        url: '/og-image.png',
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
    title: 'Ibrahim Salman | Software Engineer',
    description: 'Building web apps, AI tools, and creative digital experiences.',
    images: ['/og-image.png'],
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
      <body className="antialiased selection:bg-accent selection:text-white bg-bg">
        <ConsoleBreadcrumb />
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
