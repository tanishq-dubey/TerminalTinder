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
    name: generateCreativeName(),
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

function crossSchemes(scheme1: ColorScheme, scheme2: ColorScheme): ColorScheme {
  const crossColor = (color1: Color, color2: Color): Color => {
    const r = Math.round((parseInt(color1.slice(1, 3), 16) + parseInt(color2.slice(1, 3), 16)) / 2);
    const g = Math.round((parseInt(color1.slice(3, 5), 16) + parseInt(color2.slice(3, 5), 16)) / 2);
    const b = Math.round((parseInt(color1.slice(5, 7), 16) + parseInt(color2.slice(5, 7), 16)) / 2);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  return {
    name: crossTitles(scheme1.name, scheme2.name),
    colors: {
      primary: {
        background: crossColor(scheme1.colors.primary.background, scheme2.colors.primary.background),
        foreground: crossColor(scheme1.colors.primary.foreground, scheme2.colors.primary.foreground)
      },
      normal: {
        black: crossColor(scheme1.colors.normal.black, scheme2.colors.normal.black),
        red: crossColor(scheme1.colors.normal.red, scheme2.colors.normal.red),
        green: crossColor(scheme1.colors.normal.green, scheme2.colors.normal.green),
        yellow: crossColor(scheme1.colors.normal.yellow, scheme2.colors.normal.yellow),
        blue: crossColor(scheme1.colors.normal.blue, scheme2.colors.normal.blue),
        magenta: crossColor(scheme1.colors.normal.magenta, scheme2.colors.normal.magenta),
        cyan: crossColor(scheme1.colors.normal.cyan, scheme2.colors.normal.cyan),
        white: crossColor(scheme1.colors.normal.white, scheme2.colors.normal.white)
      },
      bright: {
        black: crossColor(scheme1.colors.bright.black, scheme2.colors.bright.black),
        red: crossColor(scheme1.colors.bright.red, scheme2.colors.bright.red),
        green: crossColor(scheme1.colors.bright.green, scheme2.colors.bright.green),
        yellow: crossColor(scheme1.colors.bright.yellow, scheme2.colors.bright.yellow),
        blue: crossColor(scheme1.colors.bright.blue, scheme2.colors.bright.blue),
        magenta: crossColor(scheme1.colors.bright.magenta, scheme2.colors.bright.magenta),
        cyan: crossColor(scheme1.colors.bright.cyan, scheme2.colors.bright.cyan),
        white: crossColor(scheme1.colors.bright.white, scheme2.colors.bright.white)
      }
    }
  };
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

  newScheme.name = generateCreativeName();
  return newScheme;
}

export type { ColorScheme };
export { knownSchemes, generateRandomScheme, crossSchemes, generateSchemeFromGeneticAlgorithm };