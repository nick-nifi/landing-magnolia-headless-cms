import { Metadata } from 'next';
import { Libre_Baskerville, Roboto } from 'next/font/google';
import '../styles.css';

export const metadata: Metadata = {
  title: 'Minimal Headless Next.js Demo',
  icons: {
    icon: '/Magnolia_favicon.png',
  },
};

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
});

const libreBaskerville = Libre_Baskerville({
  variable: '--font-libre-baskerville',
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${roboto.variable} ${libreBaskerville.variable} font-sans antialiased relative`}
    >
      <body>{children}</body>
    </html>
  );
}
