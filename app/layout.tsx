import type {Metadata} from 'next';
import { Inter, Quicksand } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'PurrfectSpa | Premium Cat Grooming & Wellness',
  description: 'Book professional grooming treatments designed for your feline companion.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${quicksand.variable}`}>
      <body className="font-sans text-slate-800 bg-[#fef9f0] min-h-screen flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
