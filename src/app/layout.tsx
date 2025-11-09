import type { Metadata } from 'next';
import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'Reddit Posts Viewer',
  description: 'Real-time Reddit data with comments and replies',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
