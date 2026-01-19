import type { JColor } from "../types/color"
import { J_ChangeColor } from "./J_ChangeThemeColor"

export const J_DefineBackgroundElement = (bgElement: HTMLElement, color?: JColor) => {
  bgElement.classList.add('jelly-bg')
  if (color) {
    J_ChangeColor(color, bgElement)
  }
}