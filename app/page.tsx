'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ColorSchemeCard from "./components/ColorSchemeCard";
import HistoryPopup from "./components/HistoryPopup";
import Settings from "./components/Settings";
import HelpDialog from "./components/HelpDialog";
import { ColorScheme, knownSchemes, generateRandomScheme, generateSchemeFromGeneticAlgorithm } from './utils/colorSchemes';
import { AnimatePresence } from 'framer-motion';
import { AppSettings } from './utils/types';

export default function Home() {
  const [schemes, setSchemes] = useState<ColorScheme[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [likedSchemes, setLikedSchemes] = useState<ColorScheme[]>([]);
  const [dislikedSchemes, setDislikedSchemes] = useState<ColorScheme[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [settings, setSettings] = useState<AppSettings>({
    outputFormat: 'yaml',
    codeSample: 'javascript',
    juniorDevMode: false,
    partyMode: false,
  });
  const [saveSettings, setSaveSettings] = useState(false);
  const [totalSchemes, setTotalSchemes] = useState(0);

  const generateNewSchemes = (count: number) => {
    const knownCount = Math.floor(count / 2);
    const generatedCount = count - knownCount;
    const newSchemes = [
      ...knownSchemes.sort(() => 0.5 - Math.random()).slice(0, knownCount),
      ...Array(generatedCount).fill(null).map(() => 
        likedSchemes.length > 0 || dislikedSchemes.length > 0
          ? generateSchemeFromGeneticAlgorithm(likedSchemes, dislikedSchemes, totalSchemes)
          : generateRandomScheme(totalSchemes)
      )
    ];

    setSchemes(prevSchemes => [...prevSchemes, ...newSchemes].sort(() => 0.5 - Math.random()));
    setTotalSchemes(prev => prev + count);
  };

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
      setSettings(settings);
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

  useEffect(() => {
    if (saveSettings) {
      const settingsToSave = JSON.stringify(settings);
      document.cookie = `settings=${settingsToSave}; max-age=31536000; path=/`; // 1 year expiration
    } else {
      document.cookie = 'settings=; max-age=0; path=/';
    }
  }, [saveSettings, settings]);

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

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const toggleHelp = () => {
    setIsHelpOpen(!isHelpOpen);
  };

  const handleClearHistory = () => {
    setLikedSchemes([]);
    setDislikedSchemes([]);
    localStorage.removeItem('likedSchemes');
    localStorage.removeItem('dislikedSchemes');
  };

  return (
    <div className="min-h-screen w-screen overflow-hidden font-[family-name:var(--font-geist-sans)] dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <header className="absolute top-2 left-2 right-2 flex justify-between items-start z-20">
        <div className="flex items-center">
          <Image src="/app-icon.svg" alt="App Icon" width={32} height={32} className="mr-2" />
          <div>
            <h1 className="text-lg font-bold">TerminalTinder</h1>
            <p className="text-xs">Fall in love with your next color scheme</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button onClick={toggleHistory}>
            <Image src={isDarkMode ? "/history-icon-dark.svg" : "/history-icon-light.svg"} alt="History" width={24} height={24} />
          </button>
          <button onClick={toggleSettings}>
            <Image src={isDarkMode ? "/settings-icon-dark.svg" : "/settings-icon-light.svg"} alt="Settings" width={24} height={24} />
          </button>
          <button onClick={toggleHelp}>
            <Image src={isDarkMode ? "/help-icon-dark.svg" : "/help-icon-light.svg"} alt="Help" width={24} height={24} />
          </button>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center h-screen pt-16 sm:pt-20">
        <AnimatePresence>
          {schemes.slice(0, 3).map((scheme, index) => (
            <ColorSchemeCard
              key={`${scheme.name}-${index}`}
              scheme={scheme}
              onLike={() => handleLike(scheme)}
              onDislike={() => handleDislike(scheme)}
              index={index}
              isDarkMode={isDarkMode}
              settings={settings}
            />
          ))}
        </AnimatePresence>
      </main>
      {isHistoryOpen && (
        <HistoryPopup
          likedSchemes={likedSchemes}
          dislikedSchemes={dislikedSchemes}
          onClose={toggleHistory}
          onClearHistory={handleClearHistory}
          isDarkMode={isDarkMode}
          outputFormat={settings.outputFormat}
        />
      )}
      {isSettingsOpen && (
        <Settings
          isOpen={isSettingsOpen}
          onClose={toggleSettings}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          settings={settings}
          setSettings={setSettings}
          saveSettings={saveSettings}
          setSaveSettings={setSaveSettings}
        />
      )}
      {isHelpOpen && (
        <HelpDialog
          isOpen={isHelpOpen}
          onClose={toggleHelp}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}
