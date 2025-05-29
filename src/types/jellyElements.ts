import {
  type JellyHTMLElement,
  type JellyHTMLButtonElement,
  changeColor,
  type JColor,
} from "..";

type JellyElement = JellyHTMLElement | JellyHTMLButtonElement;

const JellyElements = new Map<string, JellyElement | JellyElement[]>();

// addJellyElement用于告知JellyFlex你在页面中添加了一个新的Jelly元素，当你在jelly元素上指定了j-selector属性时，这个函数会自动调用。
const addJellyElement = (jSelector: string, element: JellyElement): void => {
  element instanceof HTMLElement && initializeHTMLElements(element!);
  element.getAttribute("j-type") == "JellyHTMLButtonElement" &&
    initializeButtonElements(element as JellyHTMLButtonElement);
  if (JellyElements.has(jSelector)) {
    const oldElement = JellyElements.get(jSelector) as
      | JellyElement
      | JellyElement[];
    if (oldElement instanceof Array) {
      oldElement.push(element);
    } else {
      JellyElements.set(jSelector, [oldElement, element]);
    }
    return;
  }
  JellyElements.set(jSelector, element);
};

// removeJellyElement接受一个j-selector字符串，然后告知JellyFlex你在页面中移除了一个Jelly元素，当你调用了HTMLElement上的remove方法时，这个函数会自动调用。
const removeJellyElement = (jSelector: string): void => {
  JellyElements.delete(jSelector);
};

// getJellyElements接受一个j-selector字符串，返回一个Jelly元素，只有当你在jelly元素上指定了j-selector属性后，才能被此函数找到。
const getJellyElements = <T extends JellyElement>(
  jSelector: string
): T | undefined => {
  if (
    JellyElements.has(jSelector) &&
    JellyElements.get(jSelector) instanceof Array
  ) {
    const res = JellyElements.get(jSelector) as T[];
    return res[0] as T;
  }
  return JellyElements.get(jSelector) as T;
};

const getJellyElementsAll = <T extends JellyElement>(
  jSelector: string
): T[] | undefined => {
  return JellyElements.get(jSelector) as T[];
};

// 初始化Jelly元素
const initializeHTMLElements = (ele: JellyElement): void => {
  ele.changeColor = (color: JColor): void => {
    changeColor(color, ele as HTMLElement);
  };
};

// 初始化Jelly按钮元素
const initializeButtonElements = (ele: JellyHTMLButtonElement): void => {
  ele.disable = (tip?: string, during?: number): void => {
    ele.classList.add("j-button--disabled");
    ele.disabled = true;
    if (tip) {
      ele.setAttribute("title", tip);
      ele.querySelector(".j-button__before")!.textContent = tip;
    }
    if (during) {
      setTimeout(() => {
        ele.enable();
      }, during);
    }
  };
  ele.enable = (beforeEnableTip?: string, beforeEnableColor?: JColor): void => {
    if (beforeEnableTip) {
      ele.querySelector(".j-button__before")!.textContent = beforeEnableTip;
      const oldColor = ele.computedStyleMap().get("--theme")
        ? ele.computedStyleMap().get('--theme')?.toString() as JColor
        : document.documentElement.computedStyleMap().get('--theme')?.toString() as JColor;
      if (beforeEnableColor) {
        ele.changeColor(beforeEnableColor);
      }
      setTimeout(() => {
        ele.changeColor(oldColor);
        ele.classList.remove("j-button--disabled");
        ele.disabled = false;
        ele.removeAttribute("title");
      }, 1500);
    } else {
      ele.classList.remove("j-button--disabled");
      ele.disabled = false;
      ele.removeAttribute("title");
    }
  };
};

export {
  addJellyElement,
  removeJellyElement,
  getJellyElements,
  getJellyElementsAll,
};
