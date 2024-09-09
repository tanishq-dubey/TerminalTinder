import React from 'react';
import Image from 'next/image';
import { ColorScheme } from '../utils/colorSchemes';
import { generateYAML } from '../utils/yamlExport';
import { Highlight, themes } from 'prism-react-renderer';

interface ColorSchemeCardProps {
  scheme: ColorScheme;
  isSelected: boolean;
  onSelect: () => void;
}

const ColorSchemeCard: React.FC<ColorSchemeCardProps> = ({ scheme, isSelected, onSelect }) => {
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

  return (
    <div 
      className={`w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer ${isSelected ? 'ring-4 ring-blue-500' : ''}`}
      onClick={onSelect}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{scheme.name}</h2>
          <button 
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-300"
            onClick={handleDownload}
          >
            <Image src="/download-icon.svg" alt="Download" width={24} height={24} />
          </button>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md mb-4 transition-colors duration-300">
          <Highlight theme={themes.dracula} code={codeExample} language="javascript">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={`${className} text-sm overflow-x-auto`} style={{ ...style, backgroundColor: scheme.colors.primary.background }}>
                {tokens.map((line, i) => (
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
        <div className="grid grid-cols-8 gap-2">
          {Object.values(scheme.colors.normal).concat(Object.values(scheme.colors.bright)).map((color, index) => (
            <div 
              key={index} 
              className="w-full pt-full rounded-sm transition-colors duration-300 relative group" 
              style={{backgroundColor: color}}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-xs">
                {color}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorSchemeCard;