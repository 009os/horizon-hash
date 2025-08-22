"use client";

import styles from "./switch.module.css";
import { useEffect } from "react";

/**
 * This component ensures the theme stays light/white only.
 */
export const ThemeSwitcher = () => {
  useEffect(() => {
    // Ensure light theme is always applied
    const root = document.documentElement;
    root.classList.remove("dark");
    root.setAttribute("data-mode", "light");
  }, []);

  // Return null since we don't need a visible switch
  return null;
};
