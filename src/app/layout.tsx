import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'DraftCopyAI - Content That Sounds Like You Wrote It',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  description:
    'Scale your content marketing with AI speed and human polish. Blog posts, social content, and email sequences delivered fast, in your brand voice.',
  keywords: [
    'AI content writing',
    'blog writing service',
    'content marketing',
    'SEO content',
    'AI copywriting',
    'B2B content',
  ],
  openGraph: {
    title: 'DraftCopyAI - Content That Sounds Like You Wrote It',
    description:
      'Scale your content marketing with AI speed and human polish. Blog posts, social content, and email sequences.',
    url: 'https://draftcopyai.com',
    siteName: 'DraftCopyAI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DraftCopyAI - AI-Powered Content',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DraftCopyAI - Content That Sounds Like You Wrote It',
    description:
      'Scale your content marketing with AI speed and human polish. Blog posts, social content, and email sequences.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-slate-50`}>
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
