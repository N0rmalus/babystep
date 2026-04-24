import { Urbanist } from 'next/font/google';

import { ModalProvider } from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

import './globals.css';
import { ReactNode } from 'react';

const font = Urbanist({ subsets: ['latin'] });

export const metadata = {
  title: 'Babystep',
  description: 'Babystep | kūdikių miego gaminiai ir aksesuarai.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={font.className}>
        <div className="flex min-h-screen flex-col bg-linear-to-br from-tumbleweed-50 to-white">
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
