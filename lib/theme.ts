/*
 * ============================================
 *  VIBE THEME CONFIGURATION
 * ============================================
 *  Change primary and secondary colors here.
 *  All components will automatically update.
 * ============================================
 */

export const theme = {
  /** Primary color (HSL) */
  primary: {
    hue: 250,
    saturation: 90,
    lightness: 58,
  },
  /** Secondary color (HSL) */
  secondary: {
    hue: 340,
    saturation: 82,
    lightness: 58,
  },
} as const;

/** CSS custom property key → value for primary/secondary */
export function getThemeVars(): Record<string, string> {
  const p = theme.primary;
  const s = theme.secondary;

  return {
    '--color-primary': `hsl(${p.hue}, ${p.saturation}%, ${p.lightness}%)`,
    '--color-primary-light': `hsl(${p.hue}, ${p.saturation}%, ${p.lightness + 15}%)`,
    '--color-primary-dark': `hsl(${p.hue}, ${p.saturation}%, ${p.lightness - 12}%)`,
    '--color-primary-rgb': hslToRgbString(p.hue, p.saturation, p.lightness),

    '--color-secondary': `hsl(${s.hue}, ${s.saturation}%, ${s.lightness}%)`,
    '--color-secondary-light': `hsl(${s.hue}, ${s.saturation}%, ${s.lightness + 15}%)`,
    '--color-secondary-dark': `hsl(${s.hue}, ${s.saturation}%, ${s.lightness - 12}%)`,
    '--color-secondary-rgb': hslToRgbString(s.hue, s.saturation, s.lightness),
  };
}

function hslToRgbString(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return `${Math.round(f(0) * 255)}, ${Math.round(f(8) * 255)}, ${Math.round(f(4) * 255)}`;
}
