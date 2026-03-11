import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vibe — Modern Startup Template',
  description:
    'A stunning, fully functional Next.js startup template with easy-to-change primary and secondary colors.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
