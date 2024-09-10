import Color from 'color';

type ColorScheme = {
  name: string;
  colors: {
    primary: { background: string; foreground: string };
    normal: {
      black: string; red: string; green: string; yellow: string;
      blue: string; magenta: string; cyan: string; white: string;
    };
    bright: {
      black: string; red: string; green: string; yellow: string;
      blue: string; magenta: string; cyan: string; white: string;
    };
  };
};

import knownSchemesData from '../../formatted_themes.json';

const knownSchemes: ColorScheme[] = knownSchemesData;

function generateRandomColor(): string {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

function generateCreativeName(colors: { [key: string]: string }): string {
  const allColors = Object.values(colors);
  const dominantColor = getDominantColor(allColors);
  const mood = getMood(allColors);
  const theme = getTheme(dominantColor);

  const nameComponents = [
    generatePrefix(),
    generateSuffix(),
    mood,
    theme,
    generateCompoundWord(),
    generateFancifulWord(),
    generateColorName(dominantColor),
    generateAdjective(),
    generateNoun(),
  ].filter(Boolean);

  // Randomly choose 2 or 3 components
  const selectedComponents = shuffleArray(nameComponents).slice(0, Math.random() < 0.3 ? 2 : 3);

  // Randomly decide to combine words
  if (Math.random() < 0.3 && selectedComponents.length > 1) {
    const indexToCombine = Math.floor(Math.random() * (selectedComponents.length - 1));
    const combinedWord = combineWords(selectedComponents[indexToCombine], selectedComponents[indexToCombine + 1]);
    selectedComponents.splice(indexToCombine, 2, combinedWord);
  }

  return selectedComponents.join(' ');
}

function combineWords(word1: string, word2: string): string {
  const shortenWord = (word: string) => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let shortened = word.toLowerCase();
    // Remove ending if it's a common suffix
    shortened = shortened.replace(/(tion|sion|ism|ity|ness|ment|er|or|ous|ive|al|ic|ly)$/, '');
    // Remove last vowel if it's not at the start
    for (let i = shortened.length - 1; i > 0; i--) {
      if (vowels.includes(shortened[i])) {
        shortened = shortened.slice(0, i) + shortened.slice(i + 1);
        break;
      }
    }
    return shortened;
  };

  const short1 = shortenWord(word1);
  const short2 = shortenWord(word2);

  // Randomly choose how to combine the words
  const combinationStyles = [
    () => short1 + short2,
    () => short1 + word2,
    () => word1 + short2,
    () => short1[0].toUpperCase() + short1.slice(1) + short2,
    () => short1 + short2[0].toUpperCase() + short2.slice(1),
  ];

  const chosenStyle = combinationStyles[Math.floor(Math.random() * combinationStyles.length)];
  return chosenStyle();
}

function generatePrefix(): string {
  const prefixes = [
    'Neo', 'Retro', 'Cyber', 'Quantum', 'Astro', 'Techno', 'Synth', 'Vapor', 'Pixel', 'Neon',
    'Hyper', 'Micro', 'Macro', 'Ultra', 'Mega', 'Giga', 'Nano', 'Cosmic', 'Stellar', 'Lunar',
    'Solar', 'Galactic', 'Atomic', 'Quantum', 'Nebula', 'Plasma', 'Fusion', 'Photon', 'Quark',
    'Void', 'Flux', 'Pulse', 'Wave', 'Beam', 'Core', 'Node', 'Grid', 'Mesh', 'Nexus', 'Vortex'
  ];
  return prefixes[Math.floor(Math.random() * prefixes.length)];
}

function generateSuffix(): string {
  const suffixes = [
    'wave', 'punk', 'core', 'soft', 'hard', 'tech', 'flux', 'glow', 'shine', 'spark',
    'burn', 'fade', 'shift', 'drift', 'flow', 'pulse', 'beam', 'ray', 'haze', 'mist',
    'dust', 'aura', 'nova', 'storm', 'breeze', 'wind', 'current', 'tide', 'surge', 'burst',
    'bloom', 'flare', 'flash', 'gleam', 'glint', 'glimmer', 'glitter', 'shimmer', 'sheen', 'luster'
  ];
  return suffixes[Math.floor(Math.random() * suffixes.length)];
}

function generateCompoundWord(): string {
  const compounds = [
    'Nightfall', 'Daybreak', 'Sunburst', 'Moonbeam', 'Stardust', 'Skyline', 'Seashore', 'Treeline',
    'Cloudscape', 'Firefly', 'Rainbowdrop', 'Thunderbolt', 'Snowflake', 'Leafstorm', 'Sandstorm',
    'Iceberg', 'Volcano', 'Earthquake', 'Tidepool', 'Windmill', 'Sunflower', 'Moonstone', 'Stargaze',
    'Raindrop', 'Snowdrift', 'Firestorm', 'Icecrystal', 'Sandcastle', 'Waterfalls', 'Skyscraper'
  ];
  return compounds[Math.floor(Math.random() * compounds.length)];
}

function generateFancifulWord(): string {
  const prefixes = ['Lum', 'Chrom', 'Spec', 'Pris', 'Aur', 'Sol', 'Lun', 'Stel', 'Cos', 'Astr', 'Neb', 'Phos', 'Zeph', 'Crys', 'Aeth'];
  const suffixes = ['escence', 'arium', 'opia', 'ology', 'orama', 'osyne', 'osphere', 'olith', 'onomy', 'ology', 'ium', 'eon', 'alis', 'ora', 'yx'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return prefix + suffix;
}

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getDominantColor(colors: string[]): Color {
  return colors.reduce((dominant, color) => {
    const current = Color(color);
    return current.luminosity() > dominant.luminosity() ? current : dominant;
  }, Color(colors[0]));
}

function getMood(colors: string[]): string {
  const avgSaturation = colors.reduce((sum, color) => sum + Color(color).saturationl(), 0) / colors.length;
  const avgLightness = colors.reduce((sum, color) => sum + Color(color).lightness(), 0) / colors.length;

  if (avgSaturation > 50 && avgLightness > 50) return 'Vibrant';
  if (avgSaturation < 30 && avgLightness < 40) return 'Muted';
  if (avgLightness > 70) return 'Bright';
  if (avgLightness < 30) return 'Dark';
  return '';
}

function getTheme(dominantColor: Color): string {
  const hue = dominantColor.hue();
  const themes = [
    { name: 'Sunset', range: [0, 60] },
    { name: 'Citrus', range: [45, 90] },
    { name: 'Forest', range: [90, 150] },
    { name: 'Ocean', range: [150, 210] },
    { name: 'Twilight', range: [210, 270] },
    { name: 'Lavender', range: [270, 330] },
    { name: 'Berry', range: [330, 360] },
  ];

  const theme = themes.find(t => hue >= t.range[0] && hue < t.range[1]);
  return theme ? theme.name : '';
}

// function getRandomAdjective(color: Color): string {
//   const adjectives = {
//     warm: ['Cozy', 'Toasty', 'Snug'],
//     cool: ['Crisp', 'Fresh', 'Breezy'],
//     neutral: ['Balanced', 'Harmonious', 'Zen'],
//     bright: ['Radiant', 'Luminous', 'Gleaming'],
//     dark: ['Mysterious', 'Enigmatic', 'Shadowy'],
//   };

//   const hue = color.hue();
//   const lightness = color.lightness();

//   let category: keyof typeof adjectives;
//   if (hue < 60 || hue > 300) category = 'warm';
//   else if (hue >= 60 && hue <= 300) category = 'cool';
//   else if (lightness > 70) category = 'bright';
//   else if (lightness < 30) category = 'dark';
//   else category = 'neutral';

//   return adjectives[category][Math.floor(Math.random() * adjectives[category].length)];
// }

function generateRandomScheme(totalSchemes: number): ColorScheme {
  if (totalSchemes < 30) {
    return generateCompletelyRandomScheme();
  } else {
    return generateJitteredKnownScheme(totalSchemes);
  }
}

function generateCompletelyRandomScheme(): ColorScheme {
  const colors = {
    primary: { background: generateRandomColor(), foreground: generateRandomColor() },
    normal: {
      black: generateRandomColor(), red: generateRandomColor(), green: generateRandomColor(), yellow: generateRandomColor(),
      blue: generateRandomColor(), magenta: generateRandomColor(), cyan: generateRandomColor(), white: generateRandomColor()
    },
    bright: {
      black: generateRandomColor(), red: generateRandomColor(), green: generateRandomColor(), yellow: generateRandomColor(),
      blue: generateRandomColor(), magenta: generateRandomColor(), cyan: generateRandomColor(), white: generateRandomColor()
    }
  };

  colors.primary.background = colors.normal.black;
  colors.primary.foreground = colors.bright.white;

  return {
    name: generateCreativeName({ ...colors.normal, ...colors.bright }),
    colors: colors
  };
}

function generateJitteredKnownScheme(totalSchemes: number): ColorScheme {
  const baseScheme = knownSchemes[Math.floor(Math.random() * knownSchemes.length)];
  const jitterAmount = Math.min(0.5, (totalSchemes - 30) / 140);

  const jitteredColors = {
    primary: {
      background: jitterColor(baseScheme.colors.primary.background, jitterAmount),
      foreground: jitterColor(baseScheme.colors.primary.foreground, jitterAmount)
    },
    normal: Object.fromEntries(
      Object.entries(baseScheme.colors.normal).map(([key, value]) => [key, jitterColor(value, jitterAmount)])
    ) as ColorScheme['colors']['normal'],
    bright: Object.fromEntries(
      Object.entries(baseScheme.colors.bright).map(([key, value]) => [key, jitterColor(value, jitterAmount)])
    ) as ColorScheme['colors']['bright']
  };

  return {
    name: generateCreativeName({ ...jitteredColors.normal, ...jitteredColors.bright }),
    colors: jitteredColors
  };
}

function jitterColor(color: string, amount: number): string {
  const c = Color(color);
  const hue = (c.hue() + (Math.random() * 2 - 1) * amount * 360 + 360) % 360;
  const saturation = Math.max(0, Math.min(100, c.saturationl() + (Math.random() * 2 - 1) * amount * 100));
  const lightness = Math.max(0, Math.min(100, c.lightness() + (Math.random() * 2 - 1) * amount * 100));
  return c.hsl(hue, saturation, lightness).hex();
}

function generateSchemeFromGeneticAlgorithm(likedSchemes: ColorScheme[], dislikedSchemes: ColorScheme[], totalSchemes: number): ColorScheme {
  const recentLikedSchemes = likedSchemes.slice(-15);
  const recentDislikedSchemes = dislikedSchemes.slice(-15);

  if (recentLikedSchemes.length === 0) {
    return generateRandomScheme(totalSchemes);
  }
  
  const parentScheme = recentLikedSchemes[Math.floor(Math.random() * recentLikedSchemes.length)];
  const newScheme: ColorScheme = JSON.parse(JSON.stringify(parentScheme)); // Deep copy

  const mutationRate = Math.max(0.1, 0.5 - totalSchemes / 200); // Decreases from 0.5 to 0.1 as totalSchemes increases

  // Mutate colors
  (Object.keys(newScheme.colors) as Array<keyof typeof newScheme.colors>).forEach((colorGroup) => {
    Object.keys(newScheme.colors[colorGroup]).forEach((colorName) => {
      if (Math.random() < mutationRate) {
        (newScheme.colors[colorGroup] as Record<string, string>)[colorName] = mutateColor((newScheme.colors[colorGroup] as Record<string, string>)[colorName], mutationRate);
      }
    });
  });

  // Avoid similarities with disliked schemes
  recentDislikedSchemes.forEach(dislikedScheme => {
    (Object.keys(newScheme.colors) as Array<keyof typeof newScheme.colors>).forEach((colorGroup) => {
      Object.keys(newScheme.colors[colorGroup]).forEach((colorName) => {
        if ((newScheme.colors[colorGroup] as Record<string, string>)[colorName] === (dislikedScheme.colors[colorGroup] as Record<string, string>)[colorName]) {
          (newScheme.colors[colorGroup] as Record<string, string>)[colorName] = mutateColor((newScheme.colors[colorGroup] as Record<string, string>)[colorName], mutationRate * 2);
        }
      });
    });
  });

  newScheme.name = generateCreativeName({ ...newScheme.colors.normal, ...newScheme.colors.bright });
  newScheme.colors.primary.background = newScheme.colors.normal.black;
  newScheme.colors.primary.foreground = newScheme.colors.bright.white;
  return newScheme;
}

function mutateColor(color: string, mutationRate: number): string {
  const c = Color(color);
  const hue = (c.hue() + (Math.random() * 2 - 1) * mutationRate * 360 + 360) % 360;
  const saturation = Math.max(0, Math.min(100, c.saturationl() + (Math.random() * 2 - 1) * mutationRate * 100));
  const lightness = Math.max(0, Math.min(100, c.lightness() + (Math.random() * 2 - 1) * mutationRate * 100));
  return c.hsl(hue, saturation, lightness).hex();
}

function generateColorName(color: Color): string {
  const hue = color.hue();
  const saturation = color.saturationl();
  const lightness = color.lightness();

  const hueNames = [
    'Red', 'Crimson', 'Scarlet', 'Ruby', 'Vermilion',
    'Orange', 'Amber', 'Gold', 'Marigold', 'Tangerine',
    'Yellow', 'Lemon', 'Canary', 'Saffron', 'Mustard',
    'Lime', 'Chartreuse', 'Olive', 'Sage', 'Emerald',
    'Green', 'Jade', 'Forest', 'Mint', 'Pine',
    'Cyan', 'Turquoise', 'Aqua', 'Teal', 'Azure',
    'Blue', 'Cobalt', 'Sapphire', 'Navy', 'Indigo',
    'Purple', 'Violet', 'Lavender', 'Plum', 'Amethyst',
    'Magenta', 'Fuchsia', 'Pink', 'Rose', 'Cerise',
  ];

  const index = Math.floor(hue / (360 / hueNames.length));
  let colorName = hueNames[index];

  if (saturation < 20) {
    colorName = ['Gray', 'Ash', 'Slate', 'Stone', 'Pewter'][Math.floor(Math.random() * 5)];
  }

  if (lightness > 80) {
    colorName = `Pale ${colorName}`;
  } else if (lightness < 20) {
    colorName = `Dark ${colorName}`;
  }

  return colorName;
}

function generateAdjective(): string {
  const adjectives = [
    'Ethereal', 'Vivid', 'Serene', 'Dynamic', 'Mellow', 'Vibrant', 'Tranquil', 'Radiant',
    'Subtle', 'Bold', 'Elegant', 'Rustic', 'Sleek', 'Vintage', 'Modern', 'Classic',
    'Dreamy', 'Energetic', 'Calm', 'Lively', 'Soft', 'Intense', 'Gentle', 'Fierce',
    'Mystical', 'Enchanted', 'Whimsical', 'Surreal', 'Fantastical', 'Otherworldly',
    'Harmonious', 'Balanced', 'Contrasting', 'Complementary', 'Unified', 'Diverse',
  ];
  return adjectives[Math.floor(Math.random() * adjectives.length)];
}

function generateNoun(): string {
  const nouns = [
    'Horizon', 'Cascade', 'Prism', 'Spectrum', 'Mirage', 'Oasis', 'Zenith', 'Abyss',
    'Echo', 'Whisper', 'Tempest', 'Serenity', 'Harmony', 'Rhythm', 'Melody', 'Symphony',
    'Essence', 'Spirit', 'Soul', 'Aura', 'Nimbus', 'Halo', 'Veil', 'Shroud',
    'Crystal', 'Gem', 'Jewel', 'Pearl', 'Diamond', 'Sapphire', 'Emerald', 'Ruby',
    'Nebula', 'Galaxy', 'Cosmos', 'Universe', 'Infinity', 'Eternity', 'Dimension', 'Realm',
  ];
  return nouns[Math.floor(Math.random() * nouns.length)];
}

export type { ColorScheme };
export { knownSchemes, generateRandomScheme, generateSchemeFromGeneticAlgorithm };