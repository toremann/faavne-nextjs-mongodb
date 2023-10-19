'use client';

import { ThemeProvider } from 'next-themes';
import { useEffect, useState, ReactNode } from 'react';

interface ThemeProps {
  children: ReactNode;
}

export default function Theme({ children }: ThemeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) {
    return <>{children}</>;
  }

  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
