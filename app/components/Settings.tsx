import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  outputFormat: string;
  setOutputFormat: (format: string) => void;
  codeSample: string;
  setCodeSample: (sample: string) => void;
  saveSettings: boolean;
  setSaveSettings: (save: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  onToggleDarkMode,
  outputFormat,
  setOutputFormat,
  codeSample,
  setCodeSample,
  saveSettings,
  setSaveSettings
}) => {
  const [showCookieNotice, setShowCookieNotice] = useState(false);

  useEffect(() => {
    if (saveSettings && !localStorage.getItem('cookieNoticeShown')) {
      setShowCookieNotice(true);
    }
  }, [saveSettings]);

  const handleSaveSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setSaveSettings(newValue);
    if (newValue && !localStorage.getItem('cookieNoticeShown')) {
      setShowCookieNotice(true);
    }
  };

  const handleCookieNoticeClose = () => {
    setShowCookieNotice(false);
    localStorage.setItem('cookieNoticeShown', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-[90vw] max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Settings</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <Image src={isDarkMode ? "/close-icon-dark.svg" : "/close-icon-light.svg"} alt="Close" width={24} height={24} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
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
          <div>
            <label className="block mb-2">Output Format</label>
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="json">JSON</option>
              <option value="xresources">XResources</option>
              <option value="yaml">YAML (Alacritty)</option>
              <option value="toml">TOML (Alacritty)</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Code Sample</label>
            <select
              value={codeSample}
              onChange={(e) => setCodeSample(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="c">C</option>
              <option value="python">Python</option>
              <option value="rust">Rust</option>
              <option value="go">Go</option>
              <option value="javascript">JavaScript</option>
              <option value="java">Java</option>
              <option value="bash">Bash</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="saveSettings"
              checked={saveSettings}
              onChange={handleSaveSettingsChange}
              className="mr-2"
            />
            <label htmlFor="saveSettings">Save settings in cookie</label>
          </div>
        </div>
      </div>
      {showCookieNotice && (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-500 text-white p-4">
          <p>We will save your settings in a cookie. Is this okay?</p>
          <button onClick={handleCookieNoticeClose} className="mt-2 bg-white text-blue-500 px-4 py-2 rounded">
            Accept
          </button>
        </div>
      )}
    </div>
  );
};

export default Settings;