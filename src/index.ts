import type { App, Component } from 'vue'
import './style/index.scss'

// Components
import JButton from './components/button.vue'

// Types
import type { JellyHTMLElement, JellyHTMLButtonElement } from './types/jellyElement'
import type { JColor } from './types/color'

// Methods
import { addJellyElement, removeJellyElement, getJellyElements, getJellyElementsAll } from './types/jellyElements'
import { isHexColor } from './types/color.d'
import { changeThemeColor, changeColor } from './api/changeThemeColor'

const components: Component[] = [
  JButton
]

export function install (app: App) {
  components.forEach(component => {
    app.component(component.name as string, component)
  })
}
export default { install }

export {
  JButton,
}

export type {
  JellyHTMLElement,
  JellyHTMLButtonElement,
  JColor
}

export {
  addJellyElement, removeJellyElement, getJellyElements, getJellyElementsAll,
  isHexColor,
  changeThemeColor, changeColor
}
