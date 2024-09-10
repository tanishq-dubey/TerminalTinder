import React from 'react';
import Image from 'next/image';

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onClose, isDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-[90vw] max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">How to Use TerminalTinder</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <Image src={isDarkMode ? "/close-icon-dark.svg" : "/close-icon-light.svg"} alt="Close" width={24} height={24} />
          </button>
        </div>
        <div className="space-y-4">
          <p>Welcome to TerminalTinder, the dating app that actually designed to be used over and over again.</p>
          <p>The more you interact with TerminalTinder, the better it becomes at suggesting color schemes and even creating new ones.</p>
          
          <h3 className="text-xl font-semibold">How it works:</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>You&apos;ll be presented with color schemes one at a time.</li>
            <li>Swipe right or click the heart icon to like a scheme.</li>
            <li>Swipe left or click the cross icon to dislike a scheme.</li>
            <li>The app learns from your preferences and generates new schemes based on what you like.</li>
          </ol>

          <h3 className="text-xl font-semibold">Features:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>View a live preview of the color scheme applied to code.</li>
            <li>Change the programming language of the preview in the settings.</li>
            <li>Download color schemes in various formats (YAML, JSON, TOML, Xresources, and more).</li>
            <li>View your liked and disliked schemes in the history.</li>
          </ul>

          <hr className="my-4 border-t border-gray-200 w-full" />
          <p>DWS - It&apos;s your internet, take it back.</p>
          <hr className="my-4 border-t border-gray-200 w-full" />
          <p>All credit for any non generated color schemes goes to their original creators. Color schemes are sourced from <a href="https://github.com/Mayccoll/Gogh" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">Gogh</a>.</p>
          
        </div>
      </div>
    </div>
  );
};

export default HelpDialog;