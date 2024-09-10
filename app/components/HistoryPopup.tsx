import React from 'react';
import { ColorScheme, encodeThemeForUrl } from '../utils/colorSchemes';
import { generateYAML, generateJSON, generateXResources, generateTOML } from '../utils/exportFormats';
import Image from 'next/image';
import ColorPalette from './ColorPalette';
import { useRouter } from 'next/navigation';

interface HistoryPopupProps {
  likedSchemes: ColorScheme[];
  dislikedSchemes: ColorScheme[];
  onClose: () => void;
  onClearHistory: () => void;
  isDarkMode: boolean;
  outputFormat: string;
}

const HistoryPopup: React.FC<HistoryPopupProps> = ({ 
  likedSchemes, 
  dislikedSchemes, 
  onClose, 
  onClearHistory,
  isDarkMode, 
  outputFormat 
}) => {
  const router = useRouter();

  const handleDownload = (scheme: ColorScheme) => {
    let content: string;
    let fileExtension: string;

    switch (outputFormat) {
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

  const handleThemeClick = (scheme: ColorScheme) => {
    const encodedTheme = encodeThemeForUrl(scheme);
    router.push(`/share/${encodedTheme}`);
  };

  const renderSchemeGrid = (schemes: ColorScheme[], title: string) => (
    <div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
        {schemes.map((scheme, index) => (
          <div 
            key={`${scheme.name}-${index}`} 
            className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleThemeClick(scheme)}
          >
            <h3 className="text-sm font-semibold mb-2 truncate">{scheme.name}</h3>
            <ColorPalette 
              colors={Object.values(scheme.colors.normal).concat(Object.values(scheme.colors.bright))}
              size="small"
            />
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(scheme);
              }}
              className="w-full bg-blue-500 text-white text-xs py-1 px-2 rounded hover:bg-blue-600 transition-colors duration-300 mt-2"
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
          <div className="flex items-center space-x-4">
            <button
              onClick={onClearHistory}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-300"
            >
              Clear History
            </button>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <Image src={isDarkMode ? "/close-icon-dark.svg" : "/close-icon-light.svg"} alt="Close" width={24} height={24} />
            </button>
          </div>
        </div>
        {renderSchemeGrid(likedSchemes, "Liked Schemes")}
        {renderSchemeGrid(dislikedSchemes, "Disliked Schemes")}
      </div>
    </div>
  );
};

export default HistoryPopup;