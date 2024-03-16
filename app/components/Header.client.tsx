// components/Header.client.tsx
import React, { useState, useEffect } from 'react';

const Header = () => {
  // State to manage if the retro theme is active or not
  const [isretro, setIsretro] = useState(false);

  // Update the theme whenever the isretro state changes
  useEffect(() => {
    const theme = isretro ? 'retro' : 'default'; // Assuming 'default' is your default theme
    document.documentElement.setAttribute('data-theme', theme);
  }, [isretro]);

  // Handler to toggle the theme based on the checkbox
  const handleThemeToggle = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setIsretro(e.target.checked);
  };

  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="text-xl">Secure Cipher</h1>
      <input 
        type="checkbox" 
        checked={isretro} 
        onChange={handleThemeToggle} 
        className="toggle theme-controller"
      />
    </header>
  );
};

export default Header;
