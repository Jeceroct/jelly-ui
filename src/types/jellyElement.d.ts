import type { JColor } from "..";

export type JellyHTMLElement = HTMLElement & {
  changeColor: (color: JColor) => void;
}

export type JellyHTMLButtonElement = HTMLButtonElement & JellyHTMLElement & {
  disable: (tip?: string, during?: number) => void;
  enable: (beforeEnableTip?: string, beforeEnableColor?: JColor) => void;
  disabled: boolean;
  onclick: (handler: ()=>{}) => void;
}
