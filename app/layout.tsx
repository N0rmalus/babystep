import { Bricolage_Grotesque, Urbanist } from 'next/font/google';

import { ModalProvider } from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';
import Navbar from '@/components/navbar/navbar';
import { Footer } from '@/components/footer';
import { PromoMarquee } from '@/components/promo-marquee';

import './globals.css';
import { ReactNode } from 'react';

const bodyFont = Urbanist({ subsets: ['latin'] });
const accentFont = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-bricolage-grotesque',
});

export const metadata = {
  title: 'Babystep',
  description: 'Babystep | kūdikių miego gaminiai ir aksesuarai.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={accentFont.variable}>
      <body className={bodyFont.className}>
        <div className="flex min-h-screen flex-col bg-white bg-[radial-gradient(rgba(199,110,72,0.1)_1px,transparent_1px)] bg-size-[3px_3px]">
          <ToastProvider />
          <ModalProvider />
          <PromoMarquee />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
