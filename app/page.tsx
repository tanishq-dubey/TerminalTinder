'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ColorSchemeCard from "./components/ColorSchemeCard";
import HistoryPopup from "./components/HistoryPopup";
import Settings from "./components/Settings";
import { ColorScheme, knownSchemes, generateRandomScheme, generateSchemeFromGeneticAlgorithm } from './utils/colorSchemes';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [schemes, setSchemes] = useState<ColorScheme[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [likedSchemes, setLikedSchemes] = useState<ColorScheme[]>([]);
  const [dislikedSchemes, setDislikedSchemes] = useState<ColorScheme[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [outputFormat, setOutputFormat] = useState('yaml');
  const [codeSample, setCodeSample] = useState('javascript');
  const [saveSettings, setSaveSettings] = useState(false);

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
    
    // Load settings from cookie if available
    const storedSettings = document.cookie.split('; ').find(row => row.startsWith('settings='));
    if (storedSettings) {
      const settings = JSON.parse(storedSettings.split('=')[1]);
      setOutputFormat(settings.outputFormat);
      setCodeSample(settings.codeSample);
      setSaveSettings(true);
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

    setSchemes(prevSchemes => [...prevSchemes, ...newSchemes].sort(() => 0.5 - Math.random()));
  };
  
  useEffect(() => {
    if (saveSettings) {
      const settings = JSON.stringify({ outputFormat, codeSample });
      document.cookie = `settings=${settings}; max-age=31536000; path=/`; // 1 year expiration
    } else {
      document.cookie = 'settings=; max-age=0; path=/';
    }
  }, [saveSettings, outputFormat, codeSample]);

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

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const getAllSchemes = () => {
    const allSchemes = [...likedSchemes, ...dislikedSchemes];
    const uniqueSchemes = allSchemes.filter((scheme, index, self) =>
      index === self.findIndex((t) => t.name === scheme.name)
    );
    return uniqueSchemes.reverse(); // Most recent first
  };

  return (
    <div className="min-h-screen w-screen overflow-hidden font-[family-name:var(--font-geist-sans)] dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <header className="absolute top-4 left-4 z-20">
        <Image src="/app-icon.svg" alt="App Icon" width={32} height={32} />
      </header>
      <div className="absolute top-4 right-4 z-20 flex space-x-2">
        <button onClick={toggleHistory}>
          <Image src={isDarkMode ? "/history-icon-dark.svg" : "/history-icon-light.svg"} alt="History" width={24} height={24} />
        </button>
        <button onClick={toggleSettings}>
          <Image src={isDarkMode ? "/settings-icon-dark.svg" : "/settings-icon-light.svg"} alt="Settings" width={24} height={24} />
        </button>
      </div>
      <main className="flex flex-col items-center justify-center h-screen">
        <AnimatePresence>
          {schemes.slice(0, 3).map((scheme, index) => (
            <ColorSchemeCard
              key={`${scheme.name}-${index}`}
              scheme={scheme}
              onLike={() => handleLike(scheme)}
              onDislike={() => handleDislike(scheme)}
              index={index}
              isDarkMode={isDarkMode}
              codeSample={codeSample}
              outputFormat={outputFormat}
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
          outputFormat={outputFormat}
        />
      )}
      {isSettingsOpen && (
        <Settings
          isOpen={isSettingsOpen}
          onClose={toggleSettings}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          outputFormat={outputFormat}
          setOutputFormat={setOutputFormat}
          codeSample={codeSample}
          setCodeSample={setCodeSample}
          saveSettings={saveSettings}
          setSaveSettings={setSaveSettings}
        />
      )}
    </div>
  );
}
