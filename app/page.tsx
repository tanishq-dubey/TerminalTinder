'use client';

import React, { useState, useEffect } from 'react';
import ColorSchemeCard from "./components/ColorSchemeCard";
import SettingsIcon from "./components/SettingsIcon";
import Settings from "./components/Settings";
import { ColorScheme, knownSchemes, generateRandomScheme, generateSchemeFromGeneticAlgorithm } from './utils/colorSchemes';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [schemes, setSchemes] = useState<ColorScheme[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [likedSchemes, setLikedSchemes] = useState<ColorScheme[]>([]);
  const [dislikedSchemes, setDislikedSchemes] = useState<ColorScheme[]>([]);

  useEffect(() => {
    generateNewSchemes(8);
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    const storedLikedSchemes = localStorage.getItem('likedSchemes');
    const storedDislikedSchemes = localStorage.getItem('dislikedSchemes');
    if (storedLikedSchemes) {
      setLikedSchemes(JSON.parse(storedLikedSchemes));
    }
    if (storedDislikedSchemes) {
      setDislikedSchemes(JSON.parse(storedDislikedSchemes));
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('likedSchemes', JSON.stringify(likedSchemes));
  }, [likedSchemes]);

  useEffect(() => {
    localStorage.setItem('dislikedSchemes', JSON.stringify(dislikedSchemes));
  }, [dislikedSchemes]);

  const generateNewSchemes = (count: number) => {
    const knownCount = Math.floor(count / 2);
    const generatedCount = count - knownCount;

    const newSchemes = [
      ...knownSchemes.sort(() => 0.5 - Math.random()).slice(0, knownCount),
      ...Array(generatedCount).fill(null).map(() => 
        likedSchemes.length > 0 ? generateSchemeFromGeneticAlgorithm(likedSchemes, dislikedSchemes) : generateRandomScheme()
      )
    ];

    // Shuffle the new schemes
    const shuffledSchemes = newSchemes.sort(() => 0.5 - Math.random());

    setSchemes(prevSchemes => [...prevSchemes, ...shuffledSchemes]);
  };

  const handleLike = (scheme: ColorScheme) => {
    setLikedSchemes(prev => [...prev, scheme]);
    removeTopScheme();
  };

  const handleDislike = (scheme: ColorScheme) => {
    setDislikedSchemes(prev => [...prev, scheme]);
    removeTopScheme();
  };

  const removeTopScheme = () => {
    setSchemes(prevSchemes => {
      const newSchemes = prevSchemes.slice(1);
      if (newSchemes.length < 3) {
        generateNewSchemes(3);
      }
      return newSchemes;
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Terminal Color Scheme Generator</h1>
        <SettingsIcon onClick={() => setIsSettingsOpen(true)} />
      </header>
      <main className="flex flex-col items-center justify-center h-[calc(100vh-200px)] relative">
        <AnimatePresence>
          {schemes.slice(0, 3).map((scheme, index) => (
            <ColorSchemeCard
              key={`${scheme.name}-${index}`}
              scheme={scheme}
              onLike={() => handleLike(scheme)}
              onDislike={() => handleDislike(scheme)}
              index={index}
            />
          ))}
        </AnimatePresence>
      </main>
      <Settings
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
