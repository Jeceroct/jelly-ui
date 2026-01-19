import type { JColor, JSelector } from "..";

export type JellyHTMLElement = HTMLElement & {
  changeColor(color: JColor): void;
  setWidth(widthOnDesktopDevice: string, widthOnMobileDevice?: string): void;
  setHeight(heightOnDesktopDevice: string, heightOnMobileDevice?: string): void;
  getJellyElements(selector: JSelector): JellyHTMLElement | null;
  getJellyElementsAll(selector: JSelector): JellyHTMLElement[];
};

export type JellyHTMLButtonElement = HTMLButtonElement &
  JellyHTMLElement & {
    disable(tip?: string, during?: number): void;
    enable(beforeEnableTip?: string, beforeEnableColor?: JColor): void;
    disabled: boolean;
    onclick(handler: () => {}): void;
  };

export type JellyHTMLFieldElement = JellyHTMLElement & {};

export type JellyHTMLSwitcherElement = HTMLInputElement &
  JellyHTMLElement & {
    check(): void;
    uncheck(): void;
    disable(tip?: string, during?: number): void;
    enable(beforeEnableTip?: string, beforeEnableColor?: JColor): void;
  };

export type JellyHTMLDialogElement = HTMLDialogElement &
  JellyHTMLElement & {
    show(): void;
    close(): void;
    _originClose: () => void;
  };

export type JellyHTMLAsideElement = HTMLAsideElement &
  JellyHTMLElement & {
    close(): void;
    open(): void;
    narrow(): void;
    widen(): void;
    unfoldAll(): void;
    foldAll(): void;
    float(ifFloat: boolean): void;
    sideWith: HTMLElement;
  };


export type JellyElement =
  | JellyHTMLElement
  | JellyHTMLButtonElement
  | JellyHTMLFieldElement
  | JellyHTMLSwitcherElement
  | JellyHTMLDialogElement
  | JellyHTMLAsideElement;

export type jellyElement =
  | `#${string}`
  | `.${string}`
  | "JellyHTMLElement"
  | "JellyHTMLButtonElement"
  | "JellyHTMLFieldElement"
  | "JellyHTMLSwitcherElement"
  | "JellyHTMLDialogElement"
  | "JellyHTMLAsideElement";
