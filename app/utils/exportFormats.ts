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

export function generateITerm2(scheme: ColorScheme): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Ansi 0 Color</key>
  <dict>
    <key>Color Space</key>
    <string>sRGB</string>
    <key>Blue Component</key>
    <real>${parseInt(scheme.colors.normal.black.slice(5, 7), 16) / 255}</real>
    <key>Green Component</key>
    <real>${parseInt(scheme.colors.normal.black.slice(3, 5), 16) / 255}</real>
    <key>Red Component</key>
    <real>${parseInt(scheme.colors.normal.black.slice(1, 3), 16) / 255}</real>
  </dict>
  <key>Ansi 1 Color</key>
  <dict>
    <key>Color Space</key>
    <string>sRGB</string>
    <key>Blue Component</key>
    <real>${parseInt(scheme.colors.normal.red.slice(5, 7), 16) / 255}</real>
    <key>Green Component</key>
    <real>${parseInt(scheme.colors.normal.red.slice(3, 5), 16) / 255}</real>
    <key>Red Component</key>
    <real>${parseInt(scheme.colors.normal.red.slice(1, 3), 16) / 255}</real>
  </dict>
  <key>Ansi 2 Color</key>
  <dict>
    <key>Color Space</key>
    <string>sRGB</string>
    <key>Blue Component</key>
    <real>${parseInt(scheme.colors.normal.green.slice(5, 7), 16) / 255}</real>
    <key>Green Component</key>
    <real>${parseInt(scheme.colors.normal.green.slice(3, 5), 16) / 255}</real>
    <key>Red Component</key>
    <real>${parseInt(scheme.colors.normal.green.slice(1, 3), 16) / 255}</real>
  </dict>
  <key>Ansi 3 Color</key>
  <dict>
    <key>Color Space</key>
    <string>sRGB</string>
    <key>Blue Component</key>
    <real>${parseInt(scheme.colors.normal.yellow.slice(5, 7), 16) / 255}</real>
    <key>Green Component</key>
    <real>${parseInt(scheme.colors.normal.yellow.slice(3, 5), 16) / 255}</real>
    <key>Red Component</key>
    <real>${parseInt(scheme.colors.normal.yellow.slice(1, 3), 16) / 255}</real>
  </dict>
  <key>Ansi 4 Color</key>
  <dict>
    <key>Color Space</key>
    <string>sRGB</string>
    <key>Blue Component</key>
    <real>${parseInt(scheme.colors.normal.blue.slice(5, 7), 16) / 255}</real>
    <key>Green Component</key>
    <real>${parseInt(scheme.colors.normal.blue.slice(3, 5), 16) / 255}</real>
    <key>Red Component</key>
    <real>${parseInt(scheme.colors.normal.blue.slice(1, 3), 16) / 255}</real>
  </dict>
  <key>Ansi 5 Color</key>
  <dict>
    <key>Color Space</key>
    <string>sRGB</string>
    <key>Blue Component</key>
    <real>${parseInt(scheme.colors.normal.magenta.slice(5, 7), 16) / 255}</real>
    <key>Green Component</key>
    <real>${parseInt(scheme.colors.normal.magenta.slice(3, 5), 16) / 255}</real>
    <key>Red Component</key>
    <real>${parseInt(scheme.colors.normal.magenta.slice(1, 3), 16) / 255}</real>
  </dict>
  <key>Ansi 6 Color</key>
  <dict>
    <key>Color Space</key>
    <string>sRGB</string>
    <key>Blue Component</key>
    <real>${parseInt(scheme.colors.normal.cyan.slice(5, 7), 16) / 255}</real>
    <key>Green Component</key>
    <real>${parseInt(scheme.colors.normal.cyan.slice(3, 5), 16) / 255}</real>
    <key>Red Component</key>
    <real>${parseInt(scheme.colors.normal.cyan.slice(1, 3), 16) / 255}</real>
  </dict>
  <key>Ansi 7 Color</key>
  <dict>
    <key>Color Space</key>
    <string>sRGB</string>
    <key>Blue Component</key>
    <real>${parseInt(scheme.colors.normal.white.slice(5, 7), 16) / 255}</real>
    <key>Green Component</key>
    <real>${parseInt(scheme.colors.normal.white.slice(3, 5), 16) / 255}</real>
    <key>Red Component</key>
    <real>${parseInt(scheme.colors.normal.white.slice(1, 3), 16) / 255}</real>
  </dict>
  <key>Ansi 8 Color</key>
  <dict>
    <key>Color Space</key>
    <string>sRGB</string>
    <key>Blue Component</key>
    <real>${parseInt(scheme.colors.bright.black.slice(5, 7), 16) / 255}</real>
    <key>Green Component</key>
    <real>${parseInt(scheme.colors.bright.black.slice(3, 5), 16) / 255}</real>
    <key>Red Component</key>
    <real>${parseInt(scheme.colors.bright.black.slice(1, 3), 16) / 255}</real>
  </dict>
  <key>Ansi 9 Color</key>
  <dict>
    <key>Color Space</key>
    <string>sRGB</string>
    <key>Blue Component</key>
    <real>${parseInt(scheme.colors.bright.red.slice(5, 7), 16) / 255}</real>
    <key>Green Component</key>
    <real>${parseInt(scheme.colors.bright.red.slice(3, 5), 16) / 255}</real>
    <key>Red Component</key>
    <real>${parseInt(scheme.colors.bright.red.slice(1, 3), 16) / 255}</real>
  </dict>
  <key>Ansi 10 Color</key>
  <dict>
    <key>Color Space</key>
    <string>sRGB</string>
    <key>Blue Component</key>
    <real>${parseInt(scheme.colors.bright.green.slice(5, 7), 16) / 255}</real>
    <key>Green Component</key>
    <real>${parseInt(scheme.colors.bright.green.slice(3, 5), 16) / 255}</real>
    <key>Red Component</key>
    <real>${parseInt(scheme.colors.bright.green.slice(1, 3), 16) / 255}</real>
  </dict>
  <key>Ansi 11 Color</key>
  <dict>
    <key>Color Space</key>
    <string>sRGB</string>
    <key>Blue Component</key>
    <real>${parseInt(scheme.colors.bright.yellow.slice(5, 7), 16) / 255}</real>
    <key>Green Component</key>
    <real>${parseInt(scheme.colors.bright.yellow.slice(3, 5), 16) / 255}</real>
    <key>Red Component</key>
    <real>${parseInt(scheme.colors.bright.yellow.slice(1, 3), 16) / 255}</real>
  </dict>
  <key>Ansi 12 Color</key>
  <dict>
    <key>Color Space</key>
    <string>sRGB</string>
    <key>Blue Component</key>
    <real>${parseInt(scheme.colors.bright.blue.slice(5, 7), 16) / 255}</real>
    <key>Green Component</key>
    <real>${parseInt(scheme.colors.bright.blue.slice(3, 5), 16) / 255}</real>
    <key>Red Component</key>
    <real>${parseInt(scheme.colors.bright.blue.slice(1, 3), 16) / 255}</real>
  </dict>
  <key>Ansi 13 Color</key>
  <dict>
    <key>Color Space</key>
    <string>sRGB</string>
    <key>Blue Component</key>
    <real>${parseInt(scheme.colors.bright.magenta.slice(5, 7), 16) / 255}</real>
    <key>Green Component</key>
    <real>${parseInt(scheme.colors.bright.magenta.slice(3, 5), 16) / 255}</real>
    <key>Red Component</key>
    <real>${parseInt(scheme.colors.bright.magenta.slice(1, 3), 16) / 255}</real>
  </dict>
  <key>Ansi 14 Color</key>
  <dict>
    <key>Color Space</key>
    <string>sRGB</string>
    <key>Blue Component</key>
    <real>${parseInt(scheme.colors.bright.cyan.slice(5, 7), 16) / 255}</real>
    <key>Green Component</key>
    <real>${parseInt(scheme.colors.bright.cyan.slice(3, 5), 16) / 255}</real>
    <key>Red Component</key>
    <real>${parseInt(scheme.colors.bright.cyan.slice(1, 3), 16) / 255}</real>
  </dict>
  <key>Ansi 15 Color</key>
  <dict>
    <key>Color Space</key>
    <string>sRGB</string>
    <key>Blue Component</key>
    <real>${parseInt(scheme.colors.bright.white.slice(5, 7), 16) / 255}</real>
    <key>Green Component</key>
    <real>${parseInt(scheme.colors.bright.white.slice(3, 5), 16) / 255}</real>
    <key>Red Component</key>
    <real>${parseInt(scheme.colors.bright.white.slice(1, 3), 16) / 255}</real>
  </dict>
</dict>
</plist>`;
}

export function generateWindowsTerminal(scheme: ColorScheme): string {
  return JSON.stringify({
    "name": scheme.name,
    "background": scheme.colors.primary.background,
    "foreground": scheme.colors.primary.foreground,
    "black": scheme.colors.normal.black,
    "red": scheme.colors.normal.red,
    "green": scheme.colors.normal.green,
    "yellow": scheme.colors.normal.yellow,
    "blue": scheme.colors.normal.blue,
    "purple": scheme.colors.normal.magenta,
    "cyan": scheme.colors.normal.cyan,
    "white": scheme.colors.normal.white,
    "brightBlack": scheme.colors.bright.black,
    "brightRed": scheme.colors.bright.red,
    "brightGreen": scheme.colors.bright.green,
    "brightYellow": scheme.colors.bright.yellow,
    "brightBlue": scheme.colors.bright.blue,
    "brightPurple": scheme.colors.bright.magenta,
    "brightCyan": scheme.colors.bright.cyan,
    "brightWhite": scheme.colors.bright.white
  }, null, 2);
}

export function generateTerminalApp(scheme: ColorScheme): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>ANSIBlackColor</key>
  <data>${colorToBase64(scheme.colors.normal.black)}</data>
  <key>ANSIRedColor</key>
  <data>${colorToBase64(scheme.colors.normal.red)}</data>
  <key>ANSIGreenColor</key>
  <data>${colorToBase64(scheme.colors.normal.green)}</data>
  <key>ANSIYellowColor</key>
  <data>${colorToBase64(scheme.colors.normal.yellow)}</data>
  <key>ANSIBlueColor</key>
  <data>${colorToBase64(scheme.colors.normal.blue)}</data>
  <key>ANSIMagentaColor</key>
  <data>${colorToBase64(scheme.colors.normal.magenta)}</data>
  <key>ANSICyanColor</key>
  <data>${colorToBase64(scheme.colors.normal.cyan)}</data>
  <key>ANSIWhiteColor</key>
  <data>${colorToBase64(scheme.colors.normal.white)}</data>
  <key>ANSIBrightBlackColor</key>
  <data>${colorToBase64(scheme.colors.bright.black)}</data>
  <key>ANSIBrightRedColor</key>
  <data>${colorToBase64(scheme.colors.bright.red)}</data>
  <key>ANSIBrightGreenColor</key>
  <data>${colorToBase64(scheme.colors.bright.green)}</data>
  <key>ANSIBrightYellowColor</key>
  <data>${colorToBase64(scheme.colors.bright.yellow)}</data>
  <key>ANSIBrightBlueColor</key>
  <data>${colorToBase64(scheme.colors.bright.blue)}</data>
  <key>ANSIBrightMagentaColor</key>
  <data>${colorToBase64(scheme.colors.bright.magenta)}</data>
  <key>ANSIBrightCyanColor</key>
  <data>${colorToBase64(scheme.colors.bright.cyan)}</data>
  <key>ANSIBrightWhiteColor</key>
  <data>${colorToBase64(scheme.colors.bright.white)}</data>
  <key>BackgroundColor</key>
  <data>${colorToBase64(scheme.colors.primary.background)}</data>
  <key>TextColor</key>
  <data>${colorToBase64(scheme.colors.primary.foreground)}</data>
  <key>CursorColor</key>
  <data>${colorToBase64(scheme.colors.primary.foreground)}</data>
</dict>
</plist>`;
}

function colorToBase64(color: string): string {
  const r = parseInt(color.slice(1, 3), 16) / 255;
  const g = parseInt(color.slice(3, 5), 16) / 255;
  const b = parseInt(color.slice(5, 7), 16) / 255;
  const binaryData = new Float32Array([r, g, b, 1]);
  return Buffer.from(binaryData.buffer).toString('base64');
}
