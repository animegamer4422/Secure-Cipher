// components/Header.client.tsx
import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {

  const [theme, setTheme] = useState("dracula"); // Default theme is emerald

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dracula" ? "retro" : "dracula";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="text-xl">Secure Cipher</h1>
      <label className="toggle-label">
      <input
              id="toggle-theme-checkbox"
              type="checkbox"
              checked={theme === "retro"}
              value="retro"
              onChange={toggleTheme}
              className="toggle theme-controller"
            />
        <span className="toggle-mark"></span>
      </label>
    </header>
  );
};

export default Header;
