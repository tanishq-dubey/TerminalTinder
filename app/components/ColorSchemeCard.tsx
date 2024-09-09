import React, { useState } from 'react';
import Image from 'next/image';
import { ColorScheme } from '../utils/colorSchemes';
import { generateYAML } from '../utils/yamlExport';
import { Highlight, themes } from 'prism-react-renderer';
import { motion, useAnimation } from 'framer-motion';
import ColorPalette from './ColorPalette';

interface ColorSchemeCardProps {
  scheme: ColorScheme;
  onLike: () => void;
  onDislike: () => void;
  index: number;
  isDarkMode: boolean;
}

const ColorSchemeCard: React.FC<ColorSchemeCardProps> = ({ scheme, onLike, onDislike, index, isDarkMode }) => {
  const [overlayColor, setOverlayColor] = useState('rgba(0, 0, 0, 0)');
  const controls = useAnimation();

  const codeExample = `
// User object and function
const user = {
    name: 'DWS',
    power: 8999
};

class Shape {
    constructor(color) {
        this.color = color;
    }
}

// Async data fetch simulation
async function fetchData() {
    return await new Promise(resolve => setTimeout(() => resolve('Data loaded'), 500));
}
const [even, odd] = [2, 4, 6, 8].reduce(([e, o], n) => n % 2 ? [e, [...o, n]] : [
    [...e, n], o
], [
    [],
    []
]);

/*
Logging here
*/
fetchData().then(data => console.log(data)); `;

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const yaml = generateYAML(scheme);
    const blob = new Blob([yaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${scheme.name.replace(/\s+/g, '_').toLowerCase()}.yaml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLike = () => {
    setOverlayColor('rgba(0, 255, 0, 0.1)');
    controls.start({ x: 300, opacity: 0, transition: { duration: 0.3 } }).then(onLike);
  };

  const handleDislike = () => {
    setOverlayColor('rgba(255, 0, 0, 0.1)');
    controls.start({ x: -300, opacity: 0, transition: { duration: 0.3 } }).then(onDislike);
  };

  return (
    <motion.div
      className="absolute w-[350px] h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      initial={{ scale: 1 - index * 0.05, y: index * 15, opacity: 1 }}
      animate={controls}
      style={{ 
        zIndex: 3 - index
      }}
      drag="x"
      dragConstraints={{ left: -100, right: 100 }}
      onDragEnd={(e, { offset, velocity }) => {
        if (offset.x > 100) handleLike();
        else if (offset.x < -100) handleDislike();
      }}
    >
      <div className="p-6 h-full flex flex-col relative">
        <motion.div 
          className="absolute inset-0 rounded-lg"
          animate={{ backgroundColor: overlayColor }}
          initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
          transition={{ duration: 0.2 }}
        />
        <div className="flex justify-between items-center mb-4 z-10">
          <h2 className="text-xl font-semibold">{scheme.name}</h2>
          <button 
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300"
            onClick={handleDownload}
          >
            <Image src={isDarkMode ? "/download-icon-dark.svg" : "/download-icon-light.svg"} alt="Download" width={24} height={24} />
          </button>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-md mb-4 flex-grow overflow-hidden z-10 shadow-md">
          <Highlight theme={themes.dracula} code={codeExample} language="javascript">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={`${className} text-xs p-4 overflow-x-auto`} style={{ ...style, backgroundColor: scheme.colors.primary.background }}>
                {tokens.slice(0, 20).map((line, i) => (
                  <div key={i} {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => {
                      let color = scheme.colors.primary.foreground;
                      if (token.types.includes('keyword')) color = scheme.colors.normal.blue;
                      if (token.types.includes('string')) color = scheme.colors.normal.green;
                      if (token.types.includes('number')) color = scheme.colors.normal.magenta;
                      if (token.types.includes('comment')) color = scheme.colors.bright.black;
                      if (token.types.includes('function')) color = scheme.colors.normal.yellow;
                      if (token.types.includes('operator')) color = scheme.colors.normal.cyan;
                      if (token.types.includes('class-name')) color = scheme.colors.bright.magenta;
                      if (token.types.includes('constant')) color = scheme.colors.bright.red;
                      if (token.types.includes('punctuation')) color = scheme.colors.bright.cyan;
                      if (token.types.includes('variable')) color = scheme.colors.bright.yellow;
                      return <span key={key} {...getTokenProps({ token, key })} style={{ ...getTokenProps({ token, key }).style, color }} />;
                    })}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
        <ColorPalette 
          colors={Object.values(scheme.colors.normal).concat(Object.values(scheme.colors.bright))}
          size="large"
        />
        <div className="flex justify-center space-x-8 mt-4 z-10">
          <button 
            className="bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-colors duration-300"
            onClick={handleDislike}
          >
            <Image src={isDarkMode ? "/cross-icon-dark.svg" : "/cross-icon-light.svg"} alt="Dislike" width={28} height={28} />
          </button>
          <button 
            className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
            onClick={handleLike}
          >
            <Image src={isDarkMode ? "/heart-icon-dark.svg" : "/heart-icon-light.svg"} alt="Like" width={28} height={28} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ColorSchemeCard;