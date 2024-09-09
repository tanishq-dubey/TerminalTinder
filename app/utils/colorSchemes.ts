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

  const nameComponents = [mood, theme].filter(Boolean);
  if (nameComponents.length === 1) {
    nameComponents.push(getRandomAdjective(dominantColor));
  }

  return nameComponents.join(' ');
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

function getRandomAdjective(color: Color): string {
  const adjectives = {
    warm: ['Cozy', 'Toasty', 'Snug'],
    cool: ['Crisp', 'Fresh', 'Breezy'],
    neutral: ['Balanced', 'Harmonious', 'Zen'],
    bright: ['Radiant', 'Luminous', 'Gleaming'],
    dark: ['Mysterious', 'Enigmatic', 'Shadowy'],
  };

  const hue = color.hue();
  const lightness = color.lightness();

  let category: keyof typeof adjectives;
  if (hue < 60 || hue > 300) category = 'warm';
  else if (hue >= 60 && hue <= 300) category = 'cool';
  else if (lightness > 70) category = 'bright';
  else if (lightness < 30) category = 'dark';
  else category = 'neutral';

  return adjectives[category][Math.floor(Math.random() * adjectives[category].length)];
}

function generateRandomScheme(): ColorScheme {
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

function mutateColor(color: string): string {
  const c = Color(color);
  const hue = (c.hue() + Math.random() * 30 - 15 + 360) % 360;
  const saturation = Math.max(0, Math.min(100, c.saturationl() + Math.random() * 20 - 10));
  const lightness = Math.max(0, Math.min(100, c.lightness() + Math.random() * 20 - 10));
  return c.hsl(hue, saturation, lightness).hex();
}

function generateSchemeFromGeneticAlgorithm(likedSchemes: ColorScheme[], dislikedSchemes: ColorScheme[]): ColorScheme {
  if (likedSchemes.length === 0) {
    return generateRandomScheme();
  }
  
  const parentScheme = likedSchemes[Math.floor(Math.random() * likedSchemes.length)];
  const newScheme: ColorScheme = JSON.parse(JSON.stringify(parentScheme)); // Deep copy

  // Mutate colors
  (Object.keys(newScheme.colors) as Array<keyof typeof newScheme.colors>).forEach((colorGroup) => {
    Object.keys(newScheme.colors[colorGroup]).forEach((colorName) => {
      if (Math.random() < 0.3) { // 30% chance of mutation
        (newScheme.colors[colorGroup] as Record<string, string>)[colorName] = mutateColor((newScheme.colors[colorGroup] as Record<string, string>)[colorName]);
      }
    });
  });

  // Avoid similarities with disliked schemes
  dislikedSchemes.forEach(dislikedScheme => {
    (Object.keys(newScheme.colors) as Array<keyof typeof newScheme.colors>).forEach((colorGroup) => {
      Object.keys(newScheme.colors[colorGroup]).forEach((colorName) => {
        if ((newScheme.colors[colorGroup] as Record<string, string>)[colorName] === (dislikedScheme.colors[colorGroup] as Record<string, string>)[colorName]) {
          (newScheme.colors[colorGroup] as Record<string, string>)[colorName] = mutateColor((newScheme.colors[colorGroup] as Record<string, string>)[colorName]);
        }
      });
    });
  });

  newScheme.name = generateCreativeName({ ...newScheme.colors.normal, ...newScheme.colors.bright });
  newScheme.colors.primary.background = newScheme.colors.normal.black;
  newScheme.colors.primary.foreground = newScheme.colors.bright.white;
  return newScheme;
}

export type { ColorScheme };
export { knownSchemes, generateRandomScheme, generateSchemeFromGeneticAlgorithm };