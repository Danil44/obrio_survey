import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import SurveyProvider from '@/src/store/answers';
import React from 'react';

const inter = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NEBULA',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SurveyProvider>{children}</SurveyProvider>
      </body>
    </html>
  );
}
