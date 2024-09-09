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