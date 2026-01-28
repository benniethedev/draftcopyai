import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DraftCopyAI - AI-Powered Content, Human Quality',
  description:
    'Scale your content marketing with AI-powered blog posts, social content, and email sequences. Professional quality content delivered fast.',
  keywords: [
    'AI content writing',
    'blog writing service',
    'content marketing',
    'SEO content',
    'AI copywriting',
  ],
  openGraph: {
    title: 'DraftCopyAI - AI-Powered Content, Human Quality',
    description:
      'Scale your content marketing with AI-powered blog posts, social content, and email sequences.',
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
    title: 'DraftCopyAI - AI-Powered Content, Human Quality',
    description:
      'Scale your content marketing with AI-powered blog posts, social content, and email sequences.',
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
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
