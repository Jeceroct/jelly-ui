import {
  type JellyElement,
  type jellyElement,
  type JellyHTMLButtonElement,
  J_ChangeColor,
  type JColor,
  type JellyHTMLSwitcherElement,
  type JellyHTMLDialogElement,
} from "..";

const initJellyElement = (element: JellyElement): void => {
  // 类型初始化
  element instanceof HTMLElement && initializeHTMLElements(element!);
  element.getAttribute("j-type") == "JellyHTMLButtonElement" &&
    initializeButtonElements(element as JellyHTMLButtonElement);
  element.getAttribute("j-type") == "JellyHTMLSwitcherElement" &&
    initializeSwitcherElements(element as JellyHTMLSwitcherElement);
  element.getAttribute("j-type") == "JellyHTMLDialogElement" &&
    initializeDialogElements(element as JellyHTMLDialogElement);
};

const getJellyElements = <T extends JellyElement>(
  jSelector: jellyElement,
  ele = document.documentElement
): T | null => {
  const jSelectorArr = jSelector.split(" ", 2) as jellyElement[];
  let resultEle: T | null = null;
  if (jSelectorArr[0].startsWith("#") || jSelectorArr[0].startsWith(".")) {
    ele.childNodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        if (node.getAttribute("j-selector")?.match(jSelectorArr[0])) {
          resultEle = node as T;
        } else {
          const res = getJellyElements(jSelectorArr[0], node);
          if (res) resultEle = res as T;
        }
      }
    });
  } else {
    ele.childNodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        if (node.getAttribute("j-type") == jSelectorArr[0]) {
          resultEle = node as T;
        } else {
          const res = getJellyElements(jSelectorArr[0], node);
          if (res) resultEle = res as T;
        }
      }
    });
  }
  if (jSelectorArr.length > 1 && resultEle) {
    const res = getJellyElements(jSelectorArr[1], resultEle);
    if (res) resultEle = res as T;
  }
  return resultEle;
};

const getJellyElementsAll = <T extends JellyElement>(
  jSelector: jellyElement,
  ele = document.documentElement
): T[] => {
  const jSelectorArr = jSelector.split(" ", 2) as jellyElement[];
  let resultEle: T[] = [];
  if (jSelectorArr[0].startsWith("#") || jSelectorArr[0].startsWith(".")) {
    ele.childNodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        if (node.getAttribute("j-selector")?.match(jSelectorArr[0])) {
          resultEle.push(node as T);
        } else {
          const res = getJellyElementsAll(jSelectorArr[0], node);
          if (res) resultEle = resultEle.concat(res as T[]);
        }
      }
    });
  } else {
    ele.childNodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        if (node.getAttribute("j-type") == jSelectorArr[0]) {
          resultEle.push(node as T);
        } else {
          const res = getJellyElementsAll(jSelectorArr[0], node);
          if (res) resultEle = resultEle.concat(res as T[]);
        }
      }
    });
  }
  if (jSelectorArr.length > 1 && resultEle) {
    resultEle.forEach((ele) => {
      const res = getJellyElementsAll(jSelectorArr[1], ele);
      if (res) resultEle = resultEle.concat(res as T[]);
    });
  }
  return resultEle;
};

// 初始化Jelly元素
const initializeHTMLElements = (ele: JellyElement): void => {
  ele.changeColor = (color: JColor): void => {
    J_ChangeColor(color, ele as HTMLElement);
  };

  // const _isKeywords = (str: string): boolean => {
  //     const keywords = [
  //         "auto",
  //         "max-content",
  //         "min-content",
  //         "fit-content",
  //         "unset",
  //         "inherit",
  //         "initial",
  //     ];
  //     return keywords.includes(str);
  // };

  const mediaQuery = window.matchMedia("(min-width: 768px)");
  let timer: number;
  const _mediaQueryHandler = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const isDesktop = mediaQuery.matches;
      const width = isDesktop
        ? ele.style.getPropertyValue("--width-on-desktop-device")
        : ele.style.getPropertyValue("--width-on-mobile-device") ||
          ele.style.getPropertyValue("--width-on-desktop-device");
      const height = isDesktop
        ? ele.style.getPropertyValue("--height-on-desktop-device")
        : ele.style.getPropertyValue("--height-on-mobile-device") ||
          ele.style.getPropertyValue("--height-on-desktop-device");

      ele.style.setProperty("--width", width);
      ele.style.setProperty("--height", height);

      // _isKeywords(width) &&
      //   requestAnimationFrame(() => {
      //     ele.style.setProperty("--width", ele.offsetWidth + "px");
      //   });
      // _isKeywords(height) &&
      //   requestAnimationFrame(() => {
      //     ele.style.setProperty("--height", ele.offsetHeight + "px");
      //   });
    }, 100);
  };

  // mediaQuery.addEventListener("change", _mediaQueryHandler);
  window.addEventListener("resize", _mediaQueryHandler);

  ele.setWidth = (
    widthOnDesktopDevice: string,
    widthOnMobileDevice?: string
  ): void => {
    const desktopValue = widthOnDesktopDevice;
    const mobileValue = widthOnMobileDevice ? widthOnMobileDevice : undefined;

    ele.style.setProperty("--width-on-desktop-device", desktopValue);
    if (mobileValue) {
      ele.style.setProperty("--width-on-mobile-device", mobileValue);
    }

    mediaQuery.matches
      ? ele.style.setProperty("--width", desktopValue)
      : ele.style.setProperty("--width", mobileValue || desktopValue);

    // _isKeywords(!mobileValue ? desktopValue : mobileValue!) &&
    // requestAnimationFrame(() => {
    //     ele.style.setProperty("--width", ele.offsetWidth + "px");
    // });
  };

  ele.setHeight = (
    heightOnDesktopDevice: string,
    heightOnMobileDevice?: string
  ): void => {
    const desktopValue = heightOnDesktopDevice;
    const mobileValue = heightOnMobileDevice ? heightOnMobileDevice : undefined;

    ele.style.setProperty("--height-on-desktop-device", desktopValue);
    if (mobileValue) {
      ele.style.setProperty("--height-on-mobile-device", mobileValue);
    }

    mediaQuery.matches
      ? ele.style.setProperty("--height", desktopValue)
      : ele.style.setProperty("--height", mobileValue || desktopValue);

    // _isKeywords(!mobileValue ? desktopValue : mobileValue) &&
    // requestAnimationFrame(() => {
    //     ele.style.setProperty("--height", ele.offsetHeight + "px");
    // });
  };

  ele.getJellyElements = (selector: jellyElement): JellyElement | null => {
    return getJellyElements(selector, ele);
  };

  ele.getJellyElementsAll = (selector: jellyElement): JellyElement[] => {
    return getJellyElementsAll(selector, ele);
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
        ? (ele.computedStyleMap().get("--theme")?.toString() as JColor)
        : (document.documentElement
            .computedStyleMap()
            .get("--theme")
            ?.toString() as JColor);
      if (beforeEnableColor) {
        ele.changeColor(beforeEnableColor);
        setTimeout(() => {
          ele.changeColor(oldColor);
          ele.classList.remove("j-button--disabled");
          ele.disabled = false;
          ele.removeAttribute("title");
        }, 1500);
      }
    } else {
      ele.classList.remove("j-button--disabled");
      ele.disabled = false;
      ele.removeAttribute("title");
    }
  };
};

// 初始化switcher元素
const initializeSwitcherElements = (ele: JellyHTMLSwitcherElement): void => {
  ele.check = () => {
    if (ele.getAttribute("multi") == "true") {
      throw new Error(
        "JellyHTMLSwitcherElement.check(): check方法只能作用于单选按钮"
      );
    }
    ele.querySelector<HTMLInputElement>('input[type="checkbox"]')!.checked =
      true;
  };

  ele.uncheck = () => {
    if (ele.getAttribute("multi") == "true") {
      throw new Error(
        "JellyHTMLSwitcherElement.uncheck(): uncheck方法只能作用于单选按钮"
      );
    }
    ele.querySelector<HTMLInputElement>('input[type="checkbox"]')!.checked =
      false;
  };

  ele.enable = (_beforeEnableTip?: string, _beforeEnableColor?: JColor) => {
    const disableEle = ele.querySelector<HTMLDivElement>(
      ".j-switcher__disable-text"
    )!;
    disableEle.classList.remove("j-switcher__disable-text--show");
    disableEle.textContent = "";
    ele.querySelectorAll<HTMLInputElement>("input")!.forEach((input) => {
      input.disabled = false;
    });
  };

  ele.disable = (tip?: string, during?: number) => {
    const disableEle = ele.querySelector<HTMLDivElement>(
      ".j-switcher__disable-text"
    )!;
    disableEle.classList.add("j-switcher__disable-text--show");
    tip && (disableEle.textContent = tip);
    ele.querySelectorAll<HTMLInputElement>("input")!.forEach((input) => {
      input.disabled = true;
    });
    if (during) {
      setTimeout(() => {
        ele.enable();
      }, during);
    }
  };
};

// 初始化Dialog元素
const initializeDialogElements = (ele: JellyHTMLDialogElement): void => {
  const _setContentColor = () => {
    const r = ele.style.getPropertyValue('--theme-r') || document.documentElement.style.getPropertyValue('--theme-r')
    const g = ele.style.getPropertyValue('--theme-g') || document.documentElement.style.getPropertyValue('--theme-g')
    const b = ele.style.getPropertyValue('--theme-b') || document.documentElement.style.getPropertyValue('--theme-b')
    const [rgb_r, rgb_g, rgb_b] = [r, g, b].map((v) => parseInt(v))
    console.log(rgb_r, rgb_g, rgb_b)
    ele.style.setProperty('--content-bg-color', (rgb_r * 0.299 + rgb_g * 0.587 + rgb_b * 0.114 > 165) ? "rgba(237, 229, 229)" : "rgba(50, 50, 50)")
    ele.style.setProperty('--content-text-color', (rgb_r * 0.299 + rgb_g * 0.587 + rgb_b * 0.114 > 165)? "rgba(20, 20, 20)" : "rgba(237, 229, 229)")
  }
  ele.show = () => {
    _setContentColor();
    ele.showModal();
    ele.classList.contains("j-dialog--beforeClose") &&
      ele.classList.remove("j-dialog--beforeClose");
    ele.classList.contains("j-dialog--close") &&
      ele.classList.remove("j-dialog--close");
  };

  ele._originClose = ele.close;
  ele.close = () => {
    !ele.classList.contains("j-dialog--beforeClose") &&
      ele.classList.add("j-dialog--beforeClose");
    !ele.classList.contains("j-dialog--close") &&
      setTimeout(() => {
        ele.classList.add("j-dialog--close");
        ele.classList.contains("j-dialog--beforeClose") &&
          ele.classList.remove("j-dialog--beforeClose");
        ele._originClose();
      }, 200);
  };
};

export {
  initJellyElement,
  // removeJellyElement,
  getJellyElements,
  getJellyElementsAll,
};
