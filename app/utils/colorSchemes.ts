type Color = string; // Hex color code
type ColorScheme = {
  name: string;
  colors: {
    primary: { background: Color; foreground: Color };
    normal: {
      black: Color; red: Color; green: Color; yellow: Color;
      blue: Color; magenta: Color; cyan: Color; white: Color;
    };
    bright: {
      black: Color; red: Color; green: Color; yellow: Color;
      blue: Color; magenta: Color; cyan: Color; white: Color;
    };
  };
};

import knownSchemesData from '../../formatted_themes.json';

const knownSchemes: ColorScheme[] = knownSchemesData;

function generateRandomColor(): Color {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

function generateCreativeName(): string {
  const adjectives = ['Cosmic', 'Neon', 'Mystic', 'Retro', 'Cyber', 'Ethereal', 'Vibrant', 'Dreamy', 'Futuristic', 'Nostalgic'];
  const nouns = ['Sunset', 'Aurora', 'Galaxy', 'Ocean', 'Forest', 'Desert', 'Nebula', 'Horizon', 'Oasis', 'Metropolis'];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
}

function generateRandomScheme(): ColorScheme {
  let x = {
    name: generateCreativeName() + "rand",
    colors: {
      primary: { background: generateRandomColor(), foreground: generateRandomColor() },
      normal: {
        black: generateRandomColor(), red: generateRandomColor(), green: generateRandomColor(), yellow: generateRandomColor(),
        blue: generateRandomColor(), magenta: generateRandomColor(), cyan: generateRandomColor(), white: generateRandomColor()
      },
      bright: {
        black: generateRandomColor(), red: generateRandomColor(), green: generateRandomColor(), yellow: generateRandomColor(),
        blue: generateRandomColor(), magenta: generateRandomColor(), cyan: generateRandomColor(), white: generateRandomColor()
      }
    }
  };

  x.colors.primary.background = x.colors.normal.black;
  x.colors.primary.foreground = x.colors.bright.white;

  return x;
}

function crossTitles(title1: string, title2: string): string {
  const words1 = title1.split(' ');
  const words2 = title2.split(' ');
  const firstWord = Math.random() < 0.5 ? words1[0] : words2[1];
  const secondWord = Math.random() < 0.5 ? words2[0] : words1[1];
  return `${firstWord} ${secondWord}`;
}

function mutateColor(color: Color): Color {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  const mutateComponent = (component: number) => {
    const mutation = Math.floor(Math.random() * 51) - 25; // Random number between -25 and 25
    return Math.max(0, Math.min(255, component + mutation));
  };

  const newR = mutateComponent(r);
  const newG = mutateComponent(g);
  const newB = mutateComponent(b);

  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}

function generateSchemeFromGeneticAlgorithm(likedSchemes: ColorScheme[], dislikedSchemes: ColorScheme[]): ColorScheme {
  if (likedSchemes.length === 0) {
    return generateRandomScheme();
  }
  
  const parentScheme = likedSchemes[Math.floor(Math.random() * likedSchemes.length)];
  const newScheme: ColorScheme = JSON.parse(JSON.stringify(parentScheme)); // Deep copy

  // Mutate colors
  Object.keys(newScheme.colors).forEach((colorGroup) => {
    Object.keys(newScheme.colors[colorGroup]).forEach((colorName) => {
      if (Math.random() < 0.3) { // 30% chance of mutation
        newScheme.colors[colorGroup][colorName] = mutateColor(newScheme.colors[colorGroup][colorName]);
      }
    });
  });

  // Avoid similarities with disliked schemes
  dislikedSchemes.forEach(dislikedScheme => {
    Object.keys(newScheme.colors).forEach((colorGroup) => {
      Object.keys(newScheme.colors[colorGroup]).forEach((colorName) => {
        if (newScheme.colors[colorGroup][colorName] === dislikedScheme.colors[colorGroup][colorName]) {
          newScheme.colors[colorGroup][colorName] = mutateColor(newScheme.colors[colorGroup][colorName]);
        }
      });
    });
  });

  newScheme.name = generateCreativeName() + "gen";
  return newScheme;
}

export type { ColorScheme };
export { knownSchemes, generateRandomScheme, generateSchemeFromGeneticAlgorithm };