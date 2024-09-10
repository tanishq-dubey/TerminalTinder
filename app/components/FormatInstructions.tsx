import React from 'react';
import Image from 'next/image';

interface FormatInstructionsProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const FormatInstructions: React.FC<FormatInstructionsProps> = ({ isOpen, onClose, isDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-[90vw] max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Color Scheme Installation Instructions</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <Image src={isDarkMode ? "/close-icon-dark.svg" : "/close-icon-light.svg"} alt="Close" width={24} height={24} />
          </button>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">YAML (Alacritty)</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Download the YAML file.</li>
            <li>Place it in your Alacritty configuration directory (usually <code>~/.config/alacritty/</code>).</li>
            <li>In your <code>alacritty.yml</code> file, add: <code>import: [/path/to/your/theme.yml]</code></li>
          </ol>

          <h3 className="text-xl font-semibold">JSON</h3>
          <p>JSON format can be used in various terminals. Refer to your terminal&apos;s documentation for specific instructions.</p>

          <h3 className="text-xl font-semibold">XResources</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Download the XResources file.</li>
            <li>Add the contents to your <code>~/.Xresources</code> file.</li>
            <li>Run <code>xrdb ~/.Xresources</code> to reload.</li>
          </ol>

          <h3 className="text-xl font-semibold">TOML (Alacritty)</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Download the TOML file.</li>
            <li>Place it in your Alacritty configuration directory.</li>
            <li>In your <code>alacritty.toml</code> file, add: <code>import = [&quot;/path/to/your/theme.toml&quot;]</code></li>
          </ol>

          <h3 className="text-xl font-semibold">iTerm2</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Download the iTerm2 color scheme file.</li>
            <li>Open iTerm2 preferences.</li>
            <li>Go to Profiles &gt; Colors.</li>
            <li>Click on &quot;Color Presets...&quot; and choose &quot;Import...&quot;</li>
            <li>Select the downloaded file.</li>
          </ol>

          <h3 className="text-xl font-semibold">Windows Terminal</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Download the JSON file.</li>
            <li>Open Windows Terminal settings.</li>
            <li>In the &quot;schemes&quot; array, add the contents of the downloaded JSON file.</li>
            <li>In your profile, set &quot;colorScheme&quot; to the name of your new scheme.</li>
          </ol>

          <h3 className="text-xl font-semibold">Terminal.app (macOS)</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Download the Terminal.app color scheme file.</li>
            <li>Double-click the downloaded file to import it into Terminal.app.</li>
            <li>In Terminal.app preferences, select the imported profile.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default FormatInstructions;