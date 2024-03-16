// hooks/useThemeToggle.ts
import { useEffect, useState } from 'react';

export const useThemeToggle = () => {
  const [isToggled, setIsToggled] = useState<boolean>(false); // Default state

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('themeToggle');
      const isThemeRetro = savedState ? savedState === 'true' : false;
      setIsToggled(isThemeRetro);
      const theme = isThemeRetro ? 'retro' : 'dracula';
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const theme = isToggled ? 'retro' : 'dracula';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('themeToggle', isToggled.toString());
    }
  }, [isToggled]);

  return { isToggled, setIsToggled };
};
