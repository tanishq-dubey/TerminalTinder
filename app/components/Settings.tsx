import React from 'react';

interface SettingsProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isDarkMode, onToggleDarkMode, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <div className="flex items-center justify-between mb-4">
          <span>Dark Mode</span>
          <button
            onClick={onToggleDarkMode}
            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${
              isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-300 ease-in-out ${
                isDarkMode ? 'translate-x-6' : ''
              }`}
            />
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Settings;