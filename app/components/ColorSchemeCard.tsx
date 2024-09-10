import React, { useState } from 'react';
import Image from 'next/image';
import { ColorScheme, encodeThemeForUrl } from '../utils/colorSchemes';
import { generateYAML, generateJSON, generateXResources, generateTOML, generateITerm2, generateWindowsTerminal, generateTerminalApp } from '../utils/exportFormats';
import { motion, useAnimation } from 'framer-motion';
import ColorPalette from './ColorPalette';
import confetti from 'canvas-confetti';
import { AppSettings } from '../utils/types';
import CodePreview from './CodePreview';

interface ColorSchemeCardProps {
  scheme: ColorScheme;
  onLike: () => void;
  onDislike: () => void;
  index: number;
  isDarkMode: boolean;
  settings: AppSettings;
}

const ColorSchemeCard: React.FC<ColorSchemeCardProps> = ({ scheme, onLike, onDislike, index, isDarkMode, settings }) => {
  const [overlayColor, setOverlayColor] = useState('rgba(0, 0, 0, 0)');
  const controls = useAnimation();

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    let content: string;
    let fileExtension: string;

    switch (settings.outputFormat) {
      case 'json':
        content = generateJSON(scheme);
        fileExtension = 'json';
        break;
      case 'xresources':
        content = generateXResources(scheme);
        fileExtension = 'Xresources';
        break;
      case 'toml':
        content = generateTOML(scheme);
        fileExtension = 'toml';
        break;
      case 'iterm2':
        content = generateITerm2(scheme);
        fileExtension = 'itermcolors';
        break;
      case 'windows-terminal':
        content = generateWindowsTerminal(scheme);
        fileExtension = 'json';
        break;
      case 'terminal-app':
        content = generateTerminalApp(scheme);
        fileExtension = 'terminal';
        break;
      case 'yaml':
      default:
        content = generateYAML(scheme);
        fileExtension = 'yaml';
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${scheme.name.replace(/\s+/g, '_').toLowerCase()}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLike = () => {
    setOverlayColor('rgba(0, 255, 0, 0.1)');
    controls.start({ x: 300, opacity: 0, transition: { duration: 0.3 } }).then(() => {
      if (settings.partyMode) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      onLike();
    });
  };

  const handleDislike = () => {
    setOverlayColor('rgba(255, 0, 0, 0.1)');
    controls.start({ x: -300, opacity: 0, transition: { duration: 0.3 } }).then(onDislike);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const encodedTheme = encodeThemeForUrl(scheme);
    window.open(`/share/${encodedTheme}`, '_blank');
  };

  const paletteColors = [
    scheme.colors.normal.black,
    scheme.colors.normal.red,
    scheme.colors.normal.green,
    scheme.colors.normal.yellow,
    scheme.colors.normal.blue,
    scheme.colors.normal.magenta,
    scheme.colors.normal.cyan,
    scheme.colors.normal.white,
    scheme.colors.bright.black,
    scheme.colors.bright.red,
    scheme.colors.bright.green,
    scheme.colors.bright.yellow,
    scheme.colors.bright.blue,
    scheme.colors.bright.magenta,
    scheme.colors.bright.cyan,
    scheme.colors.bright.white,
  ];

  return (
    <motion.div
      className="absolute w-[80vw] max-w-[480px] h-[90vh] max-h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      initial={{ scale: 1 - index * 0.05, y: index * 15, opacity: 1 }}
      animate={controls}
      style={{ 
        zIndex: 3 - index
      }}
      drag="x"
      dragConstraints={{ left: -50, right: 50 }}
      onDragEnd={(e, { offset }) => {
        if (offset.x > 50) handleLike();
        else if (offset.x < -50) handleDislike();
      }}
    >
      <div className="p-4 h-full flex flex-col relative">
        <motion.div 
          className="absolute inset-0 rounded-lg"
          animate={{ backgroundColor: overlayColor }}
          initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
          transition={{ duration: 0.2 }}
        />
        <div className="flex justify-between items-center mb-2 z-10">
          <h2 className="text-lg font-semibold truncate">{scheme.name}</h2>
          <div className="flex space-x-2">
            <button 
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300"
              onClick={handleShare}
            >
              <Image src={isDarkMode ? "/share-icon-dark.svg" : "/share-icon-light.svg"} alt="Share" width={20} height={20} />
            </button>
            <button 
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300"
              onClick={handleDownload}
            >
              <Image src={isDarkMode ? "/download-icon-dark.svg" : "/download-icon-light.svg"} alt="Download" width={20} height={20} />
            </button>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-md mb-2 flex-grow overflow-hidden z-10 shadow-md">
          <CodePreview scheme={scheme} codeSample={settings.codeSample} />
        </div>
        <div className="mt-2 z-10">
          <ColorPalette 
            colors={paletteColors}
            size="small"
          />
        </div>
        <div className="flex justify-center space-x-6 mt-4 z-10">
          <button 
            className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-colors duration-300"
            onClick={handleDislike}
          >
            <Image src={isDarkMode ? "/cross-icon-dark.svg" : "/cross-icon-light.svg"} alt="Dislike" width={32} height={32} />
          </button>
          <button 
            className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
            onClick={handleLike}
          >
            <Image src={isDarkMode ? "/heart-icon-dark.svg" : "/heart-icon-light.svg"} alt="Like" width={32} height={32} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ColorSchemeCard;