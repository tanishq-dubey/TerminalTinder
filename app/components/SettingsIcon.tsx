import React from 'react';
import Image from 'next/image';

interface SettingsIconProps {
  onClick: () => void;
}

const SettingsIcon: React.FC<SettingsIconProps> = ({ onClick }) => {
  return (
    <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={onClick}>
      <Image src="/settings-icon.svg" alt="Settings" width={24} height={24} />
    </button>
  );
};

export default SettingsIcon;