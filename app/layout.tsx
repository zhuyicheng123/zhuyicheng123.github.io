import type { Metadata } from 'next';
import { profile } from './profile';
import './globals.css';

export const metadata: Metadata = {
  title: `狼人杀 · ${profile.gameTitle}`,
  description: `狼人杀与${profile.gameTitle}游戏界面展示。`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
