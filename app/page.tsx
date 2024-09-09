'use client';

import React, { useState, useEffect } from 'react';
import ColorSchemeCard from "./components/ColorSchemeCard";
import ActionButton from "./components/ActionButton";
import SettingsIcon from "./components/SettingsIcon";
import Settings from "./components/Settings";
import { ColorScheme, knownSchemes, generateRandomScheme, crossSchemes, generateSchemeFromGeneticAlgorithm } from './utils/colorSchemes';

export default function Home() {
  const [schemes, setSchemes] = useState<ColorScheme[]>([]);
  const [selectedSchemes, setSelectedSchemes] = useState<number[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [likedSchemes, setLikedSchemes] = useState<ColorScheme[]>([]);
  const [dislikedSchemes, setDislikedSchemes] = useState<ColorScheme[]>([]);

  useEffect(() => {
    generateNewSchemes();
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

  const generateNewSchemes = () => {
    const newSchemes = [
      knownSchemes[Math.floor(Math.random() * knownSchemes.length)],
      generateRandomScheme(),
      likedSchemes.length > 0 ? generateSchemeFromGeneticAlgorithm(likedSchemes, dislikedSchemes) : generateRandomScheme()
    ];
    setSchemes(newSchemes);
    setSelectedSchemes([]);
  };

  const handleSchemeSelect = (index: number) => {
    setSelectedSchemes(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else if (prev.length < 2) {
        return [...prev, index];
      }
      return prev;
    });
  };

  const handleAction = () => {
    if (selectedSchemes.length === 2) {
      const crossedScheme = crossSchemes(schemes[selectedSchemes[0]], schemes[selectedSchemes[1]]);
      setLikedSchemes(prev => [...prev, schemes[selectedSchemes[0]], schemes[selectedSchemes[1]]]);
      setSchemes([crossedScheme, knownSchemes[Math.floor(Math.random() * knownSchemes.length)], generateSchemeFromGeneticAlgorithm(likedSchemes, dislikedSchemes)]);
      setSelectedSchemes([]);
    } else {
      setDislikedSchemes(prev => [...prev, ...schemes]);
      generateNewSchemes();
    }
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
      <main className="flex flex-col gap-8 items-center">
        <div className="flex flex-wrap justify-center gap-8">
          {schemes.map((scheme, index) => (
            <ColorSchemeCard
              key={index}
              scheme={scheme}
              isSelected={selectedSchemes.includes(index)}
              onSelect={() => handleSchemeSelect(index)}
            />
          ))}
        </div>
        <ActionButton
          onClick={handleAction}
          label={selectedSchemes.length === 2 ? 'Mix' : 'Shuffle'}
        />
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
