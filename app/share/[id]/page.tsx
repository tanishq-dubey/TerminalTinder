'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Head from 'next/head';
import { ColorScheme, decodeThemeFromUrl } from '../../utils/colorSchemes';
import ColorPalette from '../../components/ColorPalette';
import CodePreview from '../../components/CodePreview';
import DynamicSocialPreview from '../../components/DynamicSocialPreview';
import { CodeSample } from '../../utils/types';
import { generateYAML, generateJSON, generateXResources, generateTOML, generateITerm2, generateWindowsTerminal, generateTerminalApp } from '../../utils/exportFormats';

const SharedTheme: React.FC = () => {
  const params = useParams();
  const [scheme, setScheme] = useState<ColorScheme | null>(null);
  const [codeSample] = useState<CodeSample>('javascript');
  const [outputFormat, setOutputFormat] = useState('yaml');
  const [, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (params.id) {
      const decodedScheme = decodeThemeFromUrl(params.id as string);
      setScheme(decodedScheme);
    }
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, [params.id]);

  useEffect(() => {
    if (scheme) {
      document.title = `${scheme.name} - Terminal Tinder Color Scheme`;
    }
  }, [scheme]);

  if (!scheme) {
    return <div>Loading...</div>;
  }

  const handleDownload = () => {
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
      case 'iterm2':
        content = generateITerm2(scheme);
        fileExtension = 'itermcolors';
        break;
      case 'windows-terminal':
        content = generateWindowsTerminal(scheme);
        fileExtension = 'json';
        break;
      case 'terminal-app':
        content = generateTerminalApp(scheme);
        fileExtension = 'terminal';
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

  const socialPreviewSvg = DynamicSocialPreview({ scheme });
  const socialPreviewUrl = `data:image/svg+xml,${encodeURIComponent(socialPreviewSvg as string)}`;

  return (
    <>
      <Head>
        <title>{`${scheme.name} - Terminal Tinder Color Scheme`}</title>
        <meta name="description" content={`Check out this beautiful color scheme: ${scheme.name}`} />
        <meta property="og:title" content={`${scheme.name} - Terminal Tinder Color Scheme`} />
        <meta property="og:description" content={`Check out this beautiful color scheme: ${scheme.name}`} />
        <meta property="og:image" content={socialPreviewUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${scheme.name} - Terminal Tinder Color Scheme`} />
        <meta name="twitter:description" content={`Check out this beautiful color scheme: ${scheme.name}`} />
        <meta name="twitter:image" content={socialPreviewUrl} />
      </Head>
      <div className="min-h-screen w-screen overflow-hidden font-[family-name:var(--font-geist-sans)] dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <header className="absolute top-2 left-2 right-2 flex justify-between items-start z-20">
          <div className="flex items-center">
            <Image src="/app-icon.svg" alt="App Icon" width={32} height={32} className="mr-2" />
            <div>
              <h1 className="text-lg font-bold">TerminalTinder</h1>
              <p className="text-xs">Fall in love with your next color scheme</p>
            </div>
          </div>
        </header>
        <main className="pt-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-4">{scheme.name}</h1>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Color Palette</h2>
                <ColorPalette 
                  colors={Object.values(scheme.colors.normal).concat(Object.values(scheme.colors.bright))}
                  size="large"
                />
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Code Preview</h2>
                <CodePreview scheme={scheme} codeSample={codeSample} />
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Download</h2>
                <div className="flex items-center space-x-4">
                  <select
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="yaml">YAML (Alacritty)</option>
                    <option value="json">JSON</option>
                    <option value="xresources">XResources</option>
                    <option value="toml">TOML (Alacritty)</option>
                    <option value="iterm2">iTerm2</option>
                    <option value="windows-terminal">Windows Terminal</option>
                    <option value="terminal-app">Terminal.app</option>
                  </select>
                  <button
                    onClick={handleDownload}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                  >
                    Download
                  </button>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Share</h2>
                <input
                  type="text"
                  value={typeof window !== 'undefined' ? window.location.href : ''}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SharedTheme;