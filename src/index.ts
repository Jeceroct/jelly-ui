import type { App, Component } from "vue";
import "./style/index.scss";

// Components
import JButton from "./components/button.vue";
import JField from "./components/field.vue";
import JSwitcher from "./components/switcher.vue";
import JDialog from "./components/dialog.vue";
import JAside from "./components/aside.vue";

// Types
import type {
  JellyElement,
  jellyElement,
  JellyHTMLElement,
  JellyHTMLButtonElement,
  JellyHTMLFieldElement,
  JellyHTMLSwitcherElement,
  JellyHTMLDialogElement,
  JellyHTMLAsideElement
} from "./types/jellyElement";
import type { JColor } from "./types/color";
import type { JSwitcherGroup } from "./types/jSwitcherGroup";

// Methods
import {
  initJellyElement,
  getJellyElements,
  getJellyElementsAll,
} from "./types/jellyElements";
import { isHexColor } from "./types/color.d";
import { J_ChangeThemeColor, J_ChangeColor } from "./api/J_ChangeThemeColor";
import { J_DefineBackgroundElement } from "./api/J_DefineBackground";

const components: Component[] = [JButton, JField, JSwitcher, JDialog, JAside];

export function install(app: App) {
  components.forEach((component) => {
    app.component(component.name as string, component);
  });
}
export default { install };

export { JButton, JField, JSwitcher, JDialog, JAside };

export type {
  JColor,
  JSwitcherGroup,
  JellyElement,
  jellyElement,
  JellyHTMLElement,
  JellyHTMLButtonElement,
  JellyHTMLFieldElement,
  JellyHTMLSwitcherElement,
  JellyHTMLDialogElement,
  JellyHTMLAsideElement,
};

export {
  initJellyElement,
  getJellyElements,
  getJellyElementsAll,
  isHexColor,
  J_ChangeThemeColor,
  J_ChangeColor,
  J_DefineBackgroundElement,
};
