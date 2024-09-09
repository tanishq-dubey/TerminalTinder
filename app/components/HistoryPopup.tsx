import React, { useState } from 'react';
import { ColorScheme } from '../utils/colorSchemes';
import { generateYAML } from '../utils/yamlExport';
import Image from 'next/image';
import ColorPalette from './ColorPalette';

interface HistoryPopupProps {
  likedSchemes: ColorScheme[];
  dislikedSchemes: ColorScheme[];
  onClose: () => void;
  isDarkMode: boolean;
}

const HistoryPopup: React.FC<HistoryPopupProps> = ({ likedSchemes, dislikedSchemes, onClose, isDarkMode }) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleDownload = (scheme: ColorScheme) => {
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

  const renderSchemeGrid = (schemes: ColorScheme[], title: string) => (
    <div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
        {schemes.map((scheme, index) => (
          <div key={`${scheme.name}-${index}`} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-semibold mb-2 truncate">{scheme.name}</h3>
            <ColorPalette 
              colors={Object.values(scheme.colors.normal).concat(Object.values(scheme.colors.bright))}
              size="small"
            />
            <button 
              onClick={() => handleDownload(scheme)}
              className="w-full bg-blue-500 text-white text-xs py-1 px-2 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-[90vw] h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Color Scheme History</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <Image src={isDarkMode ? "/close-icon-dark.svg" : "/close-icon-light.svg"} alt="Close" width={24} height={24} />
          </button>
        </div>
        {renderSchemeGrid(likedSchemes, "Liked Schemes")}
        {renderSchemeGrid(dislikedSchemes, "Disliked Schemes")}
      </div>
    </div>
  );
};

export default HistoryPopup;