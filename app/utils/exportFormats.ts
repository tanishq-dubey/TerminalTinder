import { ColorScheme } from './colorSchemes';

export function generateYAML(scheme: ColorScheme): string {
  return `colors:
  # Default colors
  primary:
    background: '${scheme.colors.primary.background}'
    foreground: '${scheme.colors.primary.foreground}'

  # Normal colors
  normal:
    black:   '${scheme.colors.normal.black}'
    red:     '${scheme.colors.normal.red}'
    green:   '${scheme.colors.normal.green}'
    yellow:  '${scheme.colors.normal.yellow}'
    blue:    '${scheme.colors.normal.blue}'
    magenta: '${scheme.colors.normal.magenta}'
    cyan:    '${scheme.colors.normal.cyan}'
    white:   '${scheme.colors.normal.white}'

  # Bright colors
  bright:
    black:   '${scheme.colors.bright.black}'
    red:     '${scheme.colors.bright.red}'
    green:   '${scheme.colors.bright.green}'
    yellow:  '${scheme.colors.bright.yellow}'
    blue:    '${scheme.colors.bright.blue}'
    magenta: '${scheme.colors.bright.magenta}'
    cyan:    '${scheme.colors.bright.cyan}'
    white:   '${scheme.colors.bright.white}'
`;
}

export function generateJSON(scheme: ColorScheme): string {
  return JSON.stringify(scheme.colors, null, 2);
}

export function generateXResources(scheme: ColorScheme): string {
  return `*background: ${scheme.colors.primary.background}
*foreground: ${scheme.colors.primary.foreground}

*color0: ${scheme.colors.normal.black}
*color1: ${scheme.colors.normal.red}
*color2: ${scheme.colors.normal.green}
*color3: ${scheme.colors.normal.yellow}
*color4: ${scheme.colors.normal.blue}
*color5: ${scheme.colors.normal.magenta}
*color6: ${scheme.colors.normal.cyan}
*color7: ${scheme.colors.normal.white}

*color8: ${scheme.colors.bright.black}
*color9: ${scheme.colors.bright.red}
*color10: ${scheme.colors.bright.green}
*color11: ${scheme.colors.bright.yellow}
*color12: ${scheme.colors.bright.blue}
*color13: ${scheme.colors.bright.magenta}
*color14: ${scheme.colors.bright.cyan}
*color15: ${scheme.colors.bright.white}
`;
}

export function generateTOML(scheme: ColorScheme): string {
  return `[colors.primary]
background = "${scheme.colors.primary.background}"
foreground = "${scheme.colors.primary.foreground}"

[colors.normal]
black = "${scheme.colors.normal.black}"
red = "${scheme.colors.normal.red}"
green = "${scheme.colors.normal.green}"
yellow = "${scheme.colors.normal.yellow}"
blue = "${scheme.colors.normal.blue}"
magenta = "${scheme.colors.normal.magenta}"
cyan = "${scheme.colors.normal.cyan}"
white = "${scheme.colors.normal.white}"

[colors.bright]
black = "${scheme.colors.bright.black}"
red = "${scheme.colors.bright.red}"
green = "${scheme.colors.bright.green}"
yellow = "${scheme.colors.bright.yellow}"
blue = "${scheme.colors.bright.blue}"
magenta = "${scheme.colors.bright.magenta}"
cyan = "${scheme.colors.bright.cyan}"
white = "${scheme.colors.bright.white}"
`;
}