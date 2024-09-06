import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import React from 'react';
import QuestionsProvider from '@/stores/questions';
import surveyConfig from '@/surveyConfig';
import { Header } from '@/components/Header';
import AnswersProvider from '@/stores/answers';
import { Theme } from '@/components/Theme';

const inter = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NEBULA',
  description: 'Personal assessment survey',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-y-scroll no-scrollbar`}>
        <QuestionsProvider questions={surveyConfig.questions}>
          <AnswersProvider>
            <Theme>
              <div className={'bg-primary dark:bg-gradient min-h-screen flex flex-col w-full items-center'}>
                <Header />

                {children}
              </div>
            </Theme>
          </AnswersProvider>
        </QuestionsProvider>
      </body>
    </html>
  );
}
