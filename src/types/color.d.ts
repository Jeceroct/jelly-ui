type HexDigit = `${number}` | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
type HexColor3 = `#${HexDigit}${HexDigit}${HexDigit}`;
type HexColor6 = `#${HexDigit}${HexDigit}${HexDigit}${HexDigit}${HexDigit}${HexDigit}`;
// type HexColor = HexColor3 | HexColor6;
type HexColor = `#${string}`

export type JColor =
  'red' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'pink' | 'gray' |
  'black' | 'white' | 'cyan' | 'magenta' | 'lime' | HexColor | `rgb(${number}, ${number}, ${number})` |
  `rgba(${number}, ${number}, ${number}, ${number})`;

export const isHexColor = (color: JColor | string): boolean => {
  const hexRegex = /^#([0-9A-F]{6}){1}$/i;
  return hexRegex.test(color);
}