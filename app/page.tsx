'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ColorSchemeCard from "./components/ColorSchemeCard";
import HistoryPopup from "./components/HistoryPopup";
import { ColorScheme, knownSchemes, generateRandomScheme, generateSchemeFromGeneticAlgorithm } from './utils/colorSchemes';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [schemes, setSchemes] = useState<ColorScheme[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [likedSchemes, setLikedSchemes] = useState<ColorScheme[]>([]);
  const [dislikedSchemes, setDislikedSchemes] = useState<ColorScheme[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

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
    const newSchemes = Array(count).fill(null).map(() => {
      const schemeType = Math.random();
      if (schemeType < 0.25) {
        // 25% chance of known scheme
        return knownSchemes[Math.floor(Math.random() * knownSchemes.length)];
      } else if (schemeType < 0.5) {
        // 25% chance of random scheme
        return generateRandomScheme();
      } else if (likedSchemes.length > 2 && dislikedSchemes.length > 2) {
        // 50% chance of genetic scheme if there are more than 2 liked and disliked schemes
        return generateSchemeFromGeneticAlgorithm(likedSchemes, dislikedSchemes);
      } else {
        // 30% known, 20% random for other cases
        if (Math.random() < 0.3) {
          return generateRandomScheme();
        } else {
          return knownSchemes[Math.floor(Math.random() * knownSchemes.length)];
        }
      }
    });

    setSchemes(prevSchemes => [...prevSchemes, ...newSchemes]);
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

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  const getAllSchemes = () => {
    const allSchemes = [...likedSchemes, ...dislikedSchemes];
    const uniqueSchemes = allSchemes.filter((scheme, index, self) =>
      index === self.findIndex((t) => t.name === scheme.name)
    );
    return uniqueSchemes.reverse(); // Most recent first
  };

  return (
    <div className="h-screen w-screen overflow-hidden font-[family-name:var(--font-geist-sans)] dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <header className="absolute top-4 left-4 z-10">
        <Image src="/app-icon.svg" alt="App Icon" width={40} height={40} />
      </header>
      <button 
        className="absolute top-4 right-4 z-10"
        onClick={toggleHistory}
      >
        <Image src={isDarkMode ? "/history-icon-dark.svg" : "/history-icon-light.svg"} alt="History" width={32} height={32} />
      </button>
      <main className="flex flex-col items-center justify-center h-full">
        <AnimatePresence>
          {schemes.slice(0, 3).map((scheme, index) => (
            <ColorSchemeCard
              key={`${scheme.name}-${index}`}
              scheme={scheme}
              onLike={() => handleLike(scheme)}
              onDislike={() => handleDislike(scheme)}
              index={index}
              isDarkMode={isDarkMode}
            />
          ))}
        </AnimatePresence>
      </main>
      {isHistoryOpen && (
        <HistoryPopup
          likedSchemes={likedSchemes}
          dislikedSchemes={dislikedSchemes}
          onClose={toggleHistory}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}
