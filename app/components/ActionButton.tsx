import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  label: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, label }) => {
  return (
    <button 
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ActionButton;