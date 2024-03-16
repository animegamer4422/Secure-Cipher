// components/Header.client.tsx
import React, { useState, useEffect } from 'react';

const Header = () => {
  // State to manage if the retro theme is active or not
  const [isRetro, setIsRetro] = useState(() => {
    // Get the theme from localStorage or default to false if not found
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'retro';
  });

  // Update the theme whenever the isRetro state changes
  useEffect(() => {
    const theme = isRetro ? 'retro' : 'default'; // Assuming 'default' is your default theme
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme); // Save the theme preference to localStorage
  }, [isRetro]);

  // Handler to toggle the theme based on the checkbox
  const handleThemeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRetro(e.target.checked);
  };

  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="text-xl">Secure Cipher</h1>
      <input 
        type="checkbox" 
        checked={isRetro} 
        onChange={handleThemeToggle} 
        className="toggle theme-controller"
      />
    </header>
  );
};

export default Header;
