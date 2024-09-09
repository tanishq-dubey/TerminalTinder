import React, { useState, useRef } from 'react';

interface ColorPaletteProps {
  colors: string[];
  size?: 'small' | 'large';
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors, size = 'small' }) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleColorClick = (color: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(color).then(() => {
        setCopiedColor(color);
        setTimeout(() => setCopiedColor(null), 1500);
      });
    } else {
      // Fallback method for iOS and other unsupported browsers
      const textArea = textAreaRef.current;
      if (textArea) {
        textArea.value = color;
        textArea.select();
        try {
          document.execCommand('copy');
          setCopiedColor(color);
          setTimeout(() => setCopiedColor(null), 1500);
        } catch (err) {
          console.error('Failed to copy color: ', err);
        }
        textArea.blur();
      }
    }
  };

  const sizeClasses = size === 'small' ? 'w-full pt-full' : 'w-8 h-8 pt-full';

  return (
    <>
      <div className={`grid grid-cols-8 gap-2 ${size === 'large' ? 'mb-4' : 'mb-2'} z-10`}>
        {colors.map((color, index) => (
          <div 
            key={index} 
            className={`${sizeClasses} rounded-sm cursor-pointer relative group`}
            style={{backgroundColor: color}}
            onClick={() => handleColorClick(color)}
            onMouseEnter={() => setHoveredColor(color)}
            onMouseLeave={() => setHoveredColor(null)}
          >
            {size === 'small' && hoveredColor === color && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-white dark:bg-gray-800 rounded shadow-lg z-10">
                <div className="w-4 h-4 rounded-sm mb-1" style={{backgroundColor: color}}></div>
                <span className="text-xs">{color}</span>
              </div>
            )}
            {size === 'large' && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-[8px]">
                {color}
              </div>
            )}
            {copiedColor === color && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white text-xs">
                Copied!
              </div>
            )}
          </div>
        ))}
      </div>
      <textarea
        ref={textAreaRef}
        style={{ position: 'absolute', left: '-9999px' }}
        aria-hidden="true"
      />
    </>
  );
};

export default ColorPalette;