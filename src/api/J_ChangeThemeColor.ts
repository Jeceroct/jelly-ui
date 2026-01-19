import { isHexColor, type JColor } from "..";

export const J_ChangeThemeColor = (color: JColor): void => {
  J_ChangeColor(color, document.documentElement);
};

export const J_ChangeColor = (color: JColor, element: HTMLElement): void => {
  if (color.startsWith("#") && !isHexColor(color)) {
    throw new Error(`changeThemeColor(): '${color}'不是一个有效的hex颜色值！`);
  }
  if (color.startsWith("#")) {
    element.style.setProperty(`--customTheme`, color);
  } else if (color.startsWith("rgb")) {
    element.style.setProperty(`--customTheme`, color);
  } else if (color.startsWith("rgba")) {
    element.style.setProperty(`--customTheme`, color);
  } else {
    element.style.setProperty(`--customTheme`, `var(--${color})`);
  }
  const customTheme =
    getComputedStyle(element).getPropertyValue("--customTheme");
  const rgb = customTheme.startsWith("#")
    ? (customTheme
        .slice(1)
        .match(/.{2}/g)
        ?.map((item) => parseInt(item, 16)) as number[])
    : (customTheme
        .slice(customTheme.indexOf("(") + 1, customTheme.indexOf(")"))
        .split(",")
        .map((item) => parseInt(item)) as number[]);
  // console.log(customTheme, rgb);
  const rgb_r = rgb[0];
  const rgb_g = rgb[1];
  const rgb_b = rgb[2];
  element.style.setProperty(`--theme-r`, rgb_r?.toString());
  element.style.setProperty(`--theme-g`, rgb_g?.toString());
  element.style.setProperty(`--theme-b`, rgb_b?.toString());
  element.style.setProperty(
    `--theme`,
    `rgba(var(--theme-r), var(--theme-g), var(--theme-b), 1)`
  );
  element.style.setProperty(
    `--theme-mute`,
    `rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.7)`
  );
  element.style.setProperty(
    `--theme-hover`,
    `rgba(var(--theme-r), var(--theme-g), var(--theme-b), 0.9)`
  );
  element.style.setProperty(
    `--theme-disabled`,
    `rgba(
    calc(var(--theme-r) * 0.5),
    calc(var(--theme-g) * 0.5),
    calc(var(--theme-b) * 0.5),
    0.8)`
  );
  element.style.setProperty(
    `--theme-background`,
    `rgba(
    calc(var(--theme-r) * 1.1),
    calc(var(--theme-g) * 1.1),
    calc(var(--theme-b) * 1.1),
    0.15)`
  )
  element.style.setProperty(
    `--text`,
    rgb_r * 0.299 + rgb_g * 0.587 + rgb_b * 0.114 > 165 ? "black" : "white"
  );
  element.style.setProperty(
    `--text-mute`,
    rgb_r * 0.299 + rgb_g * 0.587 + rgb_b * 0.114 > 165? "black" : "white"
  )
  element.style.setProperty(
    `--text-disabled`,
    rgb_r * 0.299 * 0.5 + rgb_g * 0.587 * 0.5 + rgb_b * 0.114 * 0.5 > 130? "black" : "white"
  )
};
