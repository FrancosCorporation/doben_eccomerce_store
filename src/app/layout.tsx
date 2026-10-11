import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'DoBen | Papelaria para ideias em movimento',
  description: 'Uma vitrine demonstrativa de papelaria criativa para estudar, planejar e criar.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
