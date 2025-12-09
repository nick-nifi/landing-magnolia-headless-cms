import '../styles.css';
import { Metadata } from 'next';
import { Karla } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Next.js SSR Starter Project',
  icons: {
    icon: '/Magnolia_favicon.png',
  },
};

const karla = Karla({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-karla',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={karla.variable}>
      <body>{children}</body>
    </html>
  );
}
