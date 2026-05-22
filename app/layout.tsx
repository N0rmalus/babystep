import { Bricolage_Grotesque, Urbanist } from 'next/font/google';

import { ModalProvider } from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';
import Navbar from '@/components/navbar';
import { Footer } from '@/components/footer';

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
        <div className="from-tumbleweed-50 flex min-h-screen flex-col bg-linear-to-br to-white">
          <ToastProvider />
          <ModalProvider />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
